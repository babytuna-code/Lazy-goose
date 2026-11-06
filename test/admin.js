// =====================================================
// admin.js — หน้าหลังบ้านสำหรับครู
// ดูคะแนนแบบทดสอบรวมบท และดาวน์โหลดเป็นไฟล์ Excel
// =====================================================

(function () {

    const TOTAL = Scorebook.TOTAL;
    const SESSION_KEY = "lazyGooseAdmin";
    const PIN_KEY = "lazyGooseAdminPin";

    const pinCard = document.getElementById("pinCard");
    const pinForm = document.getElementById("pinForm");
    const pinInput = document.getElementById("pinInput");
    const pinError = document.getElementById("pinError");
    const panel = document.getElementById("adminPanel");

    const tableHead = document.getElementById("tableHead");
    const tableBody = document.getElementById("tableBody");
    const emptyText = document.getElementById("emptyText");
    const exportButton = document.getElementById("exportButton");
    const clearButton = document.getElementById("clearButton");
    const exportNote = document.getElementById("exportNote");
    const sheetStatus = document.getElementById("sheetStatus");

    // ---------- 1. รหัสผ่าน ----------

    // แหล่งข้อมูล: Google Sheets (ทุกเครื่อง) ถ้าตั้งค่าไว้ / ไม่เช่นนั้นใช้ข้อมูลในเครื่องนี้
    let records = [];
    let source = "local";
    let loadError = "";

    async function loadRecords() {
        loadError = "";
        if (Scorebook.hasSheet()) {
            sheetStatus.textContent = "กำลังโหลดคะแนนจาก Google Sheets...";
            try {
                records = await Scorebook.fetchSheetRecords(currentPin());
                source = "sheet";
            } catch (error) {
                records = Scorebook.getRecords();
                source = "local";
                loadError = "โหลดจาก Google Sheets ไม่สำเร็จ (" + error.message + ") จึงแสดงข้อมูลในเครื่องนี้แทน";
            }
        } else {
            records = Scorebook.getRecords();
            source = "local";
        }
        render();
    }

    function currentPin() {
        try { return sessionStorage.getItem(PIN_KEY) || ""; } catch (error) { return ""; }
    }

    function openPanel() {
        pinCard.hidden = true;
        panel.hidden = false;
        loadRecords();
    }

    let unlocked = false;
    try {
        unlocked = sessionStorage.getItem(SESSION_KEY) === "1";
    } catch (error) { /* ไม่เป็นไร */ }

    if (unlocked) {
        openPanel();
    } else {
        pinInput.focus();
    }

    pinForm.addEventListener("submit", event => {
        event.preventDefault();
        if (pinInput.value === String(Scorebook.config.adminPin || "")) {
            try {
                sessionStorage.setItem(SESSION_KEY, "1");
                sessionStorage.setItem(PIN_KEY, pinInput.value);
            } catch (error) { /* ไม่เป็นไร */ }
            openPanel();
        } else {
            pinError.hidden = false;
            pinInput.select();
        }
    });

    // ---------- 2. ตารางคะแนน ----------

    function filteredRecords() {
        return records;
    }

    function escapeHTML(text) {
        const div = document.createElement("div");
        div.textContent = String(text);
        return div.innerHTML;
    }

    function render() {
        const records = filteredRecords();

        // หัวตาราง
        let head = "<th>ลำดับ</th><th>วันที่-เวลา</th><th>Username</th><th>คะแนน</th><th>ร้อยละ</th><th>เกมอัตราส่วน</th><th>เกมสัดส่วน</th><th>เกมร้อยละ</th><th>แบบทดสอบ:อัตราส่วน</th><th>แบบทดสอบ:สัดส่วน</th><th>แบบทดสอบ:ร้อยละ</th>";
        for (let q = 1; q <= TOTAL; q++) head += `<th>ข้อ ${q}</th>`;
        tableHead.innerHTML = head;

        // แถวข้อมูล
        tableBody.innerHTML = records.map((r, i) => {
            const marks = r.questions.map(q => {
                if (!q.answered) return '<td class="mark">-</td>';
                return q.correct
                    ? `<td class="mark right" title="${escapeHTML(q.answer)}">✓</td>`
                    : `<td class="mark wrong" title="${escapeHTML(q.answer)}">✗</td>`;
            }).join("");
            return `<tr>
                <td>${i + 1}</td>
                <td class="nowrap">${escapeHTML(r.finishedText)}</td>
                <td class="name">${escapeHTML(r.name)}</td>
                <td class="score">${r.score}/${r.total}</td>
                <td>${r.percent}%</td>
                ${["ratio", "prop", "percent"].map(k => {
                    const v = r.games ? r.games[k] : null;
                    return `<td>${v === null || v === undefined ? "-" : v + "/5"}</td>`;
                }).join("")}
                ${["ratio", "prop", "percent"].map(k => {
                    const c = r.chapters && r.chapters[k];
                    return `<td>${c ? c.right + "/" + c.total : "-"}</td>`;
                }).join("")}
                ${marks}
            </tr>`;
        }).join("");

        emptyText.hidden = records.length > 0;
        exportButton.disabled = records.length === 0;

        // สถิติ
        const scores = records.map(r => r.score);
        document.getElementById("statCount").textContent = records.length;
        document.getElementById("statAvg").textContent = scores.length
            ? (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(2) : "-";
        document.getElementById("statMax").textContent = scores.length ? Math.max(...scores) : "-";
        document.getElementById("statMin").textContent = scores.length ? Math.min(...scores) : "-";

        if (source === "sheet") {
            sheetStatus.innerHTML = "แสดงคะแนนของนักเรียนทุกเครื่องจาก Google Sheets"
                + (Scorebook.config.googleSheetViewUrl
                    ? ` (<a href="${Scorebook.config.googleSheetViewUrl}" target="_blank" rel="noopener">เปิด Google Sheets</a>)`
                    : "");
        } else if (loadError) {
            sheetStatus.textContent = loadError;
        } else {
            sheetStatus.textContent = "ยังไม่ได้ใส่ลิงก์ Google Sheets ใน score-config.js: แสดงเฉพาะคะแนนที่เก็บในเครื่องนี้";
        }
        clearButton.hidden = source === "sheet";
    }


    // ---------- 3. ดาวน์โหลด Excel ----------

    exportButton.addEventListener("click", () => {
        const records = filteredRecords();
        if (!records.length) return;
        const type = Scorebook.exportExcel(records);
        exportNote.hidden = false;
        exportNote.textContent = type === "xlsx"
            ? "ดาวน์โหลดไฟล์ Excel (.xlsx) แล้ว — มี 3 ชีต: สรุปคะแนน, คำตอบที่เลือก, วิเคราะห์รายข้อ-รายบท"
            : "ไม่มีอินเทอร์เน็ตจึงโหลดตัวสร้าง .xlsx ไม่ได้ — ดาวน์โหลดเป็นไฟล์ .csv แทน (เปิดด้วย Excel ได้)";
    });

    // ---------- 4. ลบข้อมูล (กดยืนยัน 2 ครั้ง) ----------

    let confirmTimer = null;

    clearButton.addEventListener("click", () => {
        if (!clearButton.classList.contains("confirm")) {
            clearButton.classList.add("confirm");
            clearButton.textContent = "กดอีกครั้งเพื่อยืนยันการลบ";
            confirmTimer = setTimeout(() => {
                clearButton.classList.remove("confirm");
                clearButton.textContent = "ลบข้อมูลทั้งหมด";
            }, 4000);
            return;
        }
        clearTimeout(confirmTimer);
        Scorebook.clearRecords();
        clearButton.classList.remove("confirm");
        clearButton.textContent = "ลบข้อมูลทั้งหมด";
        loadRecords();
    });

    // โหลดข้อมูลล่าสุด
    document.getElementById("reloadButton").addEventListener("click", loadRecords);

})();
