// =====================================================
// testanswer.js — หน้าเฉลยพร้อมวิธีทำรายข้อ ตามชุดข้อสอบที่นักเรียนได้รับ
// ข้อมูลโจทย์จาก question-sets.js และวิธีทำจาก answer-key.js
// =====================================================

(function () {

    const sets = window.QUESTION_SETS || [];
    const solutions = window.SOLUTIONS || [];
    const list = document.getElementById("answerList");
    const setLabel = document.getElementById("setLabel");

    function readJSON(key, fallback) {
        try {
            const value = localStorage.getItem(key);
            return value ? JSON.parse(value) : fallback;
        } catch (error) {
            return fallback;
        }
    }

    const student = readJSON("testStudent", null);
    const results = readJSON("testResults", {});
    const answers = readJSON("testAnswers", {});

    const ids = (student && Array.isArray(student.questions)) ? student.questions : [];
    const questions = [];
    for (let n = 1; n <= 10; n++) questions.push(window.getQuestion(ids[n - 1], n));
    setLabel.textContent = student && student.name ? student.name : "";

    // วิธีทำของโจทย์แต่ละรหัส เช่น "s2q5" → SOLUTIONS[1][4]
    function solutionOf(id) {
        const m = /^s(\d+)q(\d+)$/.exec(id || "");
        return m && solutions[m[1] - 1] ? (solutions[m[1] - 1][m[2] - 1] || []) : [];
    }

    // {a|b} → เศษส่วน
    function withFractions(text) {
        return text.replace(/\{([^|{}]+)\|([^{}]+)\}/g,
            '<span class="frac"><span>$1</span><span>$2</span></span>');
    }

    function escapeHTML(text) {
        const div = document.createElement("div");
        div.textContent = String(text);
        return div.innerHTML;
    }

    function plain(html) {
        return html.replace(/<br>/g, " ").replace(/<[^>]+>/g, "");
    }

    // ข้อความโจทย์ของแต่ละรูปแบบ
    function questionText(q) {
        switch (q.type) {
            case "match":
                return "จงจับคู่ให้ถูกต้อง: " + q.left.map(l => plain(l.text)).join(" / ");
            case "tiles":
                return plain(q.intro) + " " + plain(q.prompt);
            case "tf":
                return "พิจารณาข้อความ: " + plain(q.statement);
            default:
                return plain(q.prompt);
        }
    }

    // คำตอบที่ถูก
    function correctText(q) {
        switch (q.type) {
            case "match":
                return q.left.map(l => `${plain(l.text)} → ${q.answer[l.key].replace(":", " : ")}`).join("<br>");
            case "tf":
                return q.answer === "true" ? "ถูกต้อง" : "ไม่ถูกต้อง";
            case "beaker":
                return q.answer + (q.unit || "");
            default:
                return q.answer;
        }
    }

    // แปลงคำตอบจับคู่ที่บันทึกไว้ ("ซ้าย1→1:3, ซ้าย2→3:7, ...") เป็นคู่ [ลำดับซ้าย, ค่าด้านขวา]
    function parsePairs(text) {
        const pairs = {};
        String(text || "").split(",").forEach(part => {
            const m = part.match(/ซ้าย(\d+)\s*→\s*(.+)/);
            if (m) pairs[Number(m[1]) - 1] = m[2].trim();
        });
        return pairs;
    }

    // คำตอบของนักเรียน: ข้อจับคู่แสดงเป็นภาพเส้นจับคู่เหมือนตอนทำ
    function yourAnswerHTML(q, text) {
        if (q.type !== "match") {
            return `<p class="sol-your">คำตอบของคุณ: <b>${escapeHTML(text || "-")}</b></p>`;
        }
        const pairs = parsePairs(text);
        const left = q.left.map((l, i) => {
            const value = pairs[i];
            const ok = value === q.answer[l.key];
            return `<div class="tm-item tm-left" data-index="${i}" data-to="${escapeHTML(value || "")}" data-ok="${ok}">
                        <span class="tm-text">${l.text}</span><span class="tm-dot"></span></div>`;
        }).join("");
        const right = q.right.map(v =>
            `<div class="tm-item tm-right" data-value="${escapeHTML(v)}"><span class="tm-dot"></span><span class="tm-text">${v.replace(":", " : ")}</span></div>`
        ).join("");
        return `<p class="sol-your">คำตอบของคุณ:</p>
            <div class="tm-area">
                <svg class="tm-lines" aria-hidden="true"></svg>
                <div class="tm-col">${left}</div>
                <div class="tm-col tm-col-right">${right}</div>
            </div>
            <p class="tm-legend"><span class="ok">━ จับคู่ถูก</span> <span class="bad">┅ จับคู่ผิด</span></p>`;
    }

    // วาดเส้นจับคู่ตามคำตอบของนักเรียน
    function drawMatchLines() {
        document.querySelectorAll(".tm-area").forEach(area => {
            const svg = area.querySelector(".tm-lines");
            const box = area.getBoundingClientRect();
            svg.innerHTML = "";
            area.querySelectorAll(".tm-left").forEach(left => {
                const to = left.dataset.to;
                if (!to) return;
                const right = [...area.querySelectorAll(".tm-right")].find(r => r.dataset.value === to);
                if (!right) return;
                const a = left.querySelector(".tm-dot").getBoundingClientRect();
                const b = right.querySelector(".tm-dot").getBoundingClientRect();
                const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
                line.setAttribute("x1", a.left + a.width / 2 - box.left);
                line.setAttribute("y1", a.top + a.height / 2 - box.top);
                line.setAttribute("x2", b.left + b.width / 2 - box.left);
                line.setAttribute("y2", b.top + b.height / 2 - box.top);
                line.setAttribute("class", left.dataset.ok === "true" ? "ok" : "bad");
                svg.appendChild(line);
            });
        });
    }

    const html = questions.map((q, i) => {
        const no = i + 1;
        const answered = no in results;
        const isRight = results[no] === true;
        const badge = !answered
            ? '<span class="badge none">ไม่ได้ตอบ</span>'
            : (isRight ? '<span class="badge right">✓ ตอบถูก</span>' : '<span class="badge wrong">✗ ตอบผิด</span>');

        const steps = solutionOf(q.id)
            .map(line => `<li>${withFractions(line)}</li>`).join("");

        return `
            <article class="sol-card">
                <header class="sol-head">
                    <span class="sol-no">ข้อ ${no}</span>
                    ${badge}
                </header>
                <p class="sol-question">${questionText(q)}</p>
                ${answered ? yourAnswerHTML(q, answers[no]) : ""}
                <p class="sol-label">วิธีทำ</p>
                <ol class="sol-steps">${steps}</ol>
                ${q.type === "match" ? "" : `<p class="sol-answer">ตอบ&nbsp; ${correctText(q)}</p>`}
            </article>`;
    }).join("");

    list.innerHTML = html;

    drawMatchLines();
    window.addEventListener("resize", drawMatchLines);
    window.addEventListener("load", drawMatchLines);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(drawMatchLines);

})();
