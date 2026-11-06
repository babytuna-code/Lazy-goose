// =====================================================
// scorebook.js — ระบบหลังบ้านเก็บคะแนนแบบทดสอบรวมบท
//  - บันทึกผลสอบแต่ละครั้งลง localStorage ("testRecords")
//  - ส่งผลไป Google Sheets (ถ้าตั้งค่า googleSheetUrl ใน score-config.js)
//  - ส่งออกเป็นไฟล์ Excel (.xlsx) สำหรับครู
// =====================================================

window.Scorebook = (function () {

    const TOTAL = 10;
    const RECORDS_KEY = "testRecords";     // ผลสอบทุกครั้งในเครื่องนี้
    const STUDENT_KEY = "testStudent";     // ข้อมูลผู้สอบปัจจุบัน
    const RESULTS_KEY = "testResults";     // ถูก/ผิด รายข้อ (จาก quiz.js)
    const ANSWERS_KEY = "testAnswers";     // คำตอบที่เลือกรายข้อ (จาก quiz.js)
    const ROUND_KEY = "testRound";         // นับครั้งที่ทำ (ใช้หมุนบทที่ได้ 4 ข้อ)

    const config = window.SCORE_CONFIG || {};

    // คะแนนเกมท้ายบทล่าสุดในเครื่องนี้ (ใช้ดูว่าเล่นเกมแล้วทำแบบทดสอบได้หรือไม่)
    function gameScore(prefix) {
        const results = readJSON(`${prefix}Results`, null);
        if (!results || typeof results !== "object" || !Object.keys(results).length) return null;
        return Object.values(results).filter(v => v === true).length;
    }

    function readJSON(key, fallback) {
        try {
            const value = localStorage.getItem(key);
            return value ? JSON.parse(value) : fallback;
        } catch (error) {
            return fallback;
        }
    }

    function writeJSON(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (error) {
            console.warn("บันทึกข้อมูลไม่ได้", error);
            return false;
        }
    }

    // ---------- ผู้สอบ ----------

    function getStudent() {
        return readJSON(STUDENT_KEY, null);
    }

    // ---------- สุ่มโจทย์แบบสมดุลรายบท ----------
    // แต่ละครั้งได้ 10 ข้อ สัดส่วน 3 : 3 : 4 และสลับบทที่ได้ 4 ข้อวนไปทุกครั้งที่ทำ
    const ROTATION = [
        { ratio: 3, prop: 3, percent: 4 },
        { ratio: 4, prop: 3, percent: 3 },
        { ratio: 3, prop: 4, percent: 3 }
    ];

    // ตำแหน่งข้อหลักของแต่ละบท (เลือกจากตำแหน่งเหล่านี้ก่อน ให้ได้รูปแบบโจทย์ไม่ซ้ำกัน)
    const CORE_SLOTS = { ratio: [1, 2, 3], prop: [4, 5, 6], percent: [7, 8, 9, 10] };

    function shuffle(list) {
        const a = list.slice();
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }

    function pickQuestions(round) {
        const pool = Object.values(window.QUESTION_POOL || {});
        const target = ROTATION[round % ROTATION.length];
        const chosen = [];

        ["ratio", "prop", "percent"].forEach(chapter => {
            const items = pool.filter(q => q.chapter === chapter);
            const picked = [];

            // 1) ข้อหลัก: สุ่มตำแหน่ง แล้วสุ่มโจทย์จากชุดใดก็ได้ในตำแหน่งนั้น
            shuffle(CORE_SLOTS[chapter]).forEach(slot => {
                if (picked.length >= target[chapter]) return;
                const options = items.filter(q => q.slot === slot);
                if (options.length) picked.push(shuffle(options)[0]);
            });

            // 2) ข้อเพิ่ม (กรณีบทนี้ได้ 4 ข้อ): สุ่มจากโจทย์ที่เหลือของบทนี้
            //    เลือกรูปแบบโจทย์ที่ยังไม่มีก่อน เพื่อไม่ให้ได้โจทย์แบบเดียวกันซ้ำ
            const usedSlots = () => picked.map(q => q.slot);
            const rest = shuffle(items.filter(q => !picked.includes(q)))
                .sort((a, b) => usedSlots().includes(a.slot) - usedSlots().includes(b.slot));
            rest.forEach(q => {
                if (picked.length < target[chapter]) picked.push(q);
            });

            // เรียงตามตำแหน่งเดิม (จับคู่ → กระเบื้อง → ลูกโป่ง ...)
            picked.sort((a, b) => a.slot - b.slot);
            chosen.push(...picked.map(q => q.id));
        });

        return chosen;
    }

    function startAttempt(student) {
        let round = 0;
        try {
            round = Number(localStorage.getItem(ROUND_KEY) || 0);
            localStorage.setItem(ROUND_KEY, String(round + 1));
        } catch (error) { /* ไม่เป็นไร */ }

        const attempt = {
            name: student.name.trim(),
            attemptId: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
            questions: pickQuestions(round),
            startedAt: new Date().toISOString()
        };
        writeJSON(STUDENT_KEY, attempt);
        try {
            localStorage.removeItem(RESULTS_KEY);
            localStorage.removeItem(ANSWERS_KEY);
        } catch (error) { /* ไม่เป็นไร */ }
        return attempt;
    }

    // ---------- คะแนนแยกรายบท ----------

    const CHAPTERS = [
        { key: "ratio", name: "อัตราส่วน", url: "../ratio/ratio.html" },
        { key: "prop", name: "สัดส่วน", url: "../prop/prop.html" },
        { key: "percent", name: "ร้อยละ", url: "../percent/percent.html" }
    ];

    // โจทย์ 10 ข้อของการสอบครั้งนี้ (ตามรหัสที่สุ่มไว้)
    function attemptQuestions(attempt) {
        const ids = (attempt && attempt.questions) || [];
        const list = [];
        for (let n = 1; n <= TOTAL; n++) {
            list.push(window.getQuestion ? window.getQuestion(ids[n - 1], n) : null);
        }
        return list;
    }

    // นับข้อที่ตอบถูกของแต่ละบท
    function chapterScores(attempt, results) {
        const list = attemptQuestions(attempt);
        const out = {};
        CHAPTERS.forEach(c => { out[c.key] = { right: 0, total: 0 }; });
        list.forEach((q, i) => {
            if (!q) return;
            if (!out[q.chapter]) return;
            out[q.chapter].total++;
            if (results[i + 1] === true) out[q.chapter].right++;
        });
        return out;
    }

    // ---------- ผลสอบ ----------

    function getRecords() {
        return readJSON(RECORDS_KEY, []);
    }

    function formatThaiDate(iso) {
        const d = new Date(iso);
        return d.toLocaleString("th-TH", {
            year: "numeric", month: "short", day: "numeric",
            hour: "2-digit", minute: "2-digit"
        });
    }

    // สร้างผลสอบจากคำตอบปัจจุบัน แล้วบันทึก (ครั้งเดียวต่อการสอบหนึ่งรอบ)
    function saveCurrentAttempt() {
        const student = getStudent();
        if (!student || !student.attemptId) return { record: null, isNew: false };

        const records = getRecords();
        const existing = records.find(r => r.id === student.attemptId);
        if (existing) return { record: existing, isNew: false };

        const results = readJSON(RESULTS_KEY, {});
        const answers = readJSON(ANSWERS_KEY, {});
        const score = Object.values(results).filter(v => v === true).length;

        const list = attemptQuestions(student);
        const perQuestion = [];
        for (let q = 1; q <= TOTAL; q++) {
            const item = list[q - 1];
            perQuestion.push({
                q,
                id: item ? item.id : "",
                chapter: item ? item.chapter : "",
                correct: results[q] === true,
                answered: q in results,
                answer: answers[q] || ""
            });
        }

        const finishedAt = new Date().toISOString();
        const record = {
            id: student.attemptId,
            finishedAt,
            finishedText: formatThaiDate(finishedAt),
            name: student.name,
            games: {
                ratio: gameScore("ratio"),
                prop: gameScore("prop"),
                percent: gameScore("percent")
            },
            chapters: chapterScores(student, results),
            score,
            total: TOTAL,
            percent: Math.round((score / TOTAL) * 100),
            questions: perQuestion,
            sentToSheet: false
        };

        records.push(record);
        writeJSON(RECORDS_KEY, records);
        return { record, isNew: true };
    }

    function clearRecords() {
        try {
            localStorage.removeItem(RECORDS_KEY);
        } catch (error) { /* ไม่เป็นไร */ }
    }

    // ---------- Google Sheets ----------

    function hasSheet() {
        return Boolean(config.googleSheetUrl && config.googleSheetUrl.trim());
    }

    // ส่งผลสอบไป Google Apps Script (no-cors: ส่งได้แต่ไม่สามารถอ่านคำตอบกลับ)
    async function sendToSheet(record) {
        if (!hasSheet() || !record) return false;
        try {
            await fetch(config.googleSheetUrl.trim(), {
                method: "POST",
                mode: "no-cors",
                headers: { "Content-Type": "text/plain;charset=utf-8" },
                body: JSON.stringify(record)
            });
            const records = getRecords();
            const target = records.find(r => r.id === record.id);
            if (target) {
                target.sentToSheet = true;
                writeJSON(RECORDS_KEY, records);
            }
            return true;
        } catch (error) {
            console.warn("ส่งคะแนนไป Google Sheets ไม่สำเร็จ", error);
            return false;
        }
    }

    // ดึงคะแนนของทุกเครื่องจาก Google Sheets (ใช้ในหน้าหลังบ้าน)
    async function fetchSheetRecords(pin) {
        const url = config.googleSheetUrl.trim() + "?action=list&pin=" + encodeURIComponent(pin);
        const response = await fetch(url);
        const data = await response.json();
        if (!data.ok) throw new Error(data.error || "ดึงข้อมูลไม่สำเร็จ");
        return data.records || [];
    }

    // ส่งผลสอบที่ยังส่งไม่สำเร็จอีกครั้ง (เช่น ตอนสอบเสร็จไม่มีอินเทอร์เน็ต)
    async function resendPending() {
        if (!hasSheet()) return 0;
        const pending = getRecords().filter(r => !r.sentToSheet);
        let sent = 0;
        for (const record of pending) {
            if (await sendToSheet(record)) sent++;
        }
        return sent;
    }

    // ---------- ส่งออก Excel ----------

    function summaryRows(records) {
        const header = ["ลำดับ", "วันที่-เวลา", "Username",
            `คะแนน (เต็ม ${TOTAL})`, "ร้อยละ",
            "เกมอัตราส่วน (เต็ม 5)", "เกมสัดส่วน (เต็ม 5)", "เกมร้อยละ (เต็ม 5)",
            "แบบทดสอบ: อัตราส่วน", "แบบทดสอบ: สัดส่วน", "แบบทดสอบ: ร้อยละ"];
        for (let q = 1; q <= TOTAL; q++) header.push(`ข้อ ${q}`);

        const g = (r, k) => (r.games && r.games[k] !== null && r.games[k] !== undefined) ? r.games[k] : "ยังไม่เล่น";

        const rows = records.map((r, i) => {
            const row = [i + 1, r.finishedText, r.name, r.score, r.percent,
                g(r, "ratio"), g(r, "prop"), g(r, "percent"),
                ...["ratio", "prop", "percent"].map(k =>
                    r.chapters && r.chapters[k] ? `${r.chapters[k].right}/${r.chapters[k].total}` : "-")];
            r.questions.forEach(q => row.push(!q.answered ? "-" : (q.correct ? "ถูก" : "ผิด")));
            return row;
        });
        return [header, ...rows];
    }

    function answerRows(records) {
        const header = ["ลำดับ", "Username"];
        for (let q = 1; q <= TOTAL; q++) header.push(`โจทย์ข้อ ${q}`, `คำตอบข้อ ${q}`);
        const rows = records.map((r, i) => {
            const row = [i + 1, r.name];
            r.questions.forEach(q => row.push(q.id || "-", q.answer || "-"));
            return row;
        });
        return [header, ...rows];
    }

    // วิเคราะห์รายข้อตามรหัสโจทย์ (แต่ละคนได้โจทย์ต่างกัน)
    function itemRows(records) {
        const names = { ratio: "อัตราส่วน", prop: "สัดส่วน", percent: "ร้อยละ" };
        const stats = {};
        records.forEach(r => r.questions.forEach(q => {
            if (!q.id) return;
            stats[q.id] = stats[q.id] || { chapter: q.chapter, right: 0, n: 0 };
            stats[q.id].n++;
            if (q.correct) stats[q.id].right++;
        }));
        const plain = html => String(html || "").replace(/<br>/g, " ").replace(/<[^>]+>/g, "");
        const rows = [["รหัสโจทย์", "บท", "โจทย์", "จำนวนคนตอบถูก", "จำนวนคนที่ได้ข้อนี้", "ร้อยละที่ตอบถูก"]];
        Object.keys(stats).sort().forEach(id => {
            const s = stats[id];
            const q = window.QUESTION_POOL && window.QUESTION_POOL[id];
            const text = q ? plain(q.prompt || q.statement || q.intro) : "";
            rows.push([id, names[s.chapter] || "", text, s.right, s.n, Math.round((s.right / s.n) * 100)]);
        });

        // สรุปรายบทของทั้งห้อง
        rows.push([], ["บท", "", "", "ตอบถูกรวม", "จำนวนข้อรวม", "ร้อยละที่ตอบถูก"]);
        ["ratio", "prop", "percent"].forEach(k => {
            let right = 0, total = 0;
            records.forEach(r => {
                if (r.chapters && r.chapters[k]) { right += r.chapters[k].right; total += r.chapters[k].total; }
            });
            rows.push([names[k], "", "", right, total, total ? Math.round((right / total) * 100) : 0]);
        });
        return rows;
    }

    function fileName(ext) {
        const d = new Date();
        const pad = n => String(n).padStart(2, "0");
        return `LazyGoose_test_scores_${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}.${ext}`;
    }

    function downloadBlob(blob, name) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = name;
        document.body.appendChild(a);
        a.click();
        a.remove();
        setTimeout(() => URL.revokeObjectURL(url), 1000);
    }

    // ถ้าโหลดไลบรารี Excel (SheetJS) ไม่ได้ เช่น ไม่มีอินเทอร์เน็ต → ส่งออกเป็น CSV ที่เปิดด้วย Excel ได้
    function exportExcel(records) {
        if (window.XLSX) {
            const wb = XLSX.utils.book_new();

            const s1 = XLSX.utils.aoa_to_sheet(summaryRows(records));
            s1["!cols"] = [{ wch: 6 }, { wch: 20 }, { wch: 22 },
                { wch: 13 }, { wch: 8 }, { wch: 18 }, { wch: 17 }, { wch: 17 }, { wch: 18 }, { wch: 16 }, { wch: 16 }, ...Array(TOTAL).fill({ wch: 6 })];
            XLSX.utils.book_append_sheet(wb, s1, "สรุปคะแนน");

            const s2 = XLSX.utils.aoa_to_sheet(answerRows(records));
            s2["!cols"] = [{ wch: 6 }, { wch: 22 }, ...Array(TOTAL * 2).fill({ wch: 12 })];
            XLSX.utils.book_append_sheet(wb, s2, "คำตอบที่เลือก");

            const s3 = XLSX.utils.aoa_to_sheet(itemRows(records));
            s3["!cols"] = [{ wch: 10 }, { wch: 10 }, { wch: 50 }, { wch: 14 }, { wch: 16 }, { wch: 14 }];
            XLSX.utils.book_append_sheet(wb, s3, "วิเคราะห์รายข้อ-รายบท");

            const data = XLSX.write(wb, { bookType: "xlsx", type: "array" });
            downloadBlob(new Blob([data], {
                type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            }), fileName("xlsx"));
            return "xlsx";
        }

        const csv = summaryRows(records)
            .map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(","))
            .join("\r\n");
        // ใส่ BOM ให้ Excel อ่านภาษาไทยถูกต้อง
        downloadBlob(new Blob(["﻿" + csv], { type: "text/csv;charset=utf-8" }), fileName("csv"));
        return "csv";
    }

    return {
        TOTAL,
        CHAPTERS,
        chapterScores,
        attemptQuestions,
        RESULTS_KEY,
        ANSWERS_KEY,
        getStudent,
        startAttempt,
        getRecords,
        saveCurrentAttempt,
        clearRecords,
        hasSheet,
        sendToSheet,
        resendPending,
        fetchSheetRecords,
        exportExcel,
        config
    };

})();
