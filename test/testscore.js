// =====================================================
// testscore.js — รวมคะแนนแบบทดสอบรวมบท 10 ข้อ
// (รูปแบบเดียวกับ ratioscore / propscore / percentscore)
// + บันทึกผลเข้าระบบหลังบ้าน (scorebook.js)
// =====================================================

document.addEventListener("DOMContentLoaded", () => {

    const TOTAL = 10;
    const scoreElement = document.getElementById("player-score");
    const messageElement = document.getElementById("result-message");
    const nameElement = document.getElementById("scoreName");
    const statusElement = document.getElementById("saveStatus");
    const dotsElement = document.getElementById("scoreDots");
    const retryButton = document.getElementById("retry-button");
    const homeButton = document.getElementById("home-button");

    // อ่านผลคำตอบทั้ง 10 ข้อ
    let results = {};

    try {
        results = JSON.parse(localStorage.getItem("testResults") || "{}");
    } catch (error) {
        results = {};
    }

    // นับจำนวนข้อที่ตอบถูก
    const score = Object.values(results).filter(result => result === true).length;

    scoreElement.textContent = score;

    // แสดงผลรายข้อ ✓ / ✗
    for (let q = 1; q <= TOTAL; q++) {
        const dot = document.createElement("span");
        dot.className = "score-dot";
        if (results[q] === true) {
            dot.classList.add("right");
            dot.textContent = "✓";
        } else if (results[q] === false) {
            dot.classList.add("wrong");
            dot.textContent = "✗";
        } else {
            dot.textContent = q;
        }
        dot.title = `ข้อ ${q}`;
        dotsElement.appendChild(dot);
    }

    // ข้อความตามคะแนน
    if (score === TOTAL) {
        messageElement.textContent = "เก่งมาก !";
    } else if (score >= 6) {
        messageElement.textContent = "ทำได้ดีมาก !";
    } else if (score >= 1) {
        messageElement.textContent = "พยายามอีกนิดนะ !";
    } else {
        messageElement.textContent = "ลองใหม่อีกครั้งนะ !";
    }

    // ---------- คะแนนแยกรายบท และคำแนะนำ ----------

    const studentInfo = Scorebook.getStudent();
    const perChapter = Scorebook.chapterScores(studentInfo, results);

    // เกณฑ์: ตอบถูกตั้งแต่ร้อยละ 70 ของข้อในบทนั้น = ทำได้ดี
    const PASS = 70;
    const good = [];
    const practice = [];

    document.getElementById("chapterScores").innerHTML = Scorebook.CHAPTERS.map(c => {
        const s = perChapter[c.key];
        if (!s.total) return "";
        const percent = Math.round((s.right / s.total) * 100);
        (percent >= PASS ? good : practice).push({ ...c, ...s, percent });
        return `<span class="chip ${percent >= PASS ? "ok" : "low"}">${c.name} ${s.right}/${s.total}</span>`;
    }).join("");

    // บทที่ตอบผิดมากที่สุดขึ้นก่อน
    practice.sort((a, b) => a.percent - b.percent);

    const advice = document.getElementById("advice");

    if (!practice.length) {
        advice.innerHTML = `<p class="advice-title">ยอดเยี่ยม!</p>
            <p>ทำได้ดีทุกบทเลย เข้าใจเรื่องอัตราส่วน สัดส่วน และร้อยละแล้ว</p>`;
    } else {
        advice.innerHTML =
            (good.length ? `<p><span class="advice-label ok">บทที่ทำได้ดี :</span> ${good.map(c => c.name).join(", ")}</p>` : "") +
            `<p><span class="advice-label low">บทที่ควรฝึกเพิ่มเติม :</span> ${practice.map(c => c.name).join(", ")}</p>
            <p class="advice-hint">ลองกลับไปทบทวนเนื้อหาและเล่นเกมบทนี้อีกครั้งนะ</p>
            <div class="advice-buttons">
                ${practice.map(c => `<a class="menu-btn" href="${c.url}">${c.name}</a>`).join("")}
            </div>`;
    }

    // ---------- บันทึกคะแนนเข้าระบบหลังบ้าน ----------

    const student = Scorebook.getStudent();

    if (student) {
        nameElement.textContent = `${student.name} ทำแบบทดสอบได้`;
    }

    const { record, isNew } = Scorebook.saveCurrentAttempt();

    if (!record) {
        statusElement.textContent = "ไม่ได้บันทึกคะแนน (ไม่พบข้อมูลชื่อผู้สอบ)";
    } else if (Scorebook.hasSheet()) {
        if (isNew || !record.sentToSheet) {
            statusElement.textContent = "กำลังส่งคะแนนให้ครู...";
            Scorebook.sendToSheet(record).then(ok => {
                statusElement.textContent = ok
                    ? "✓ ส่งคะแนนให้ครูเรียบร้อยแล้ว"
                    : "บันทึกคะแนนในเครื่องแล้ว (ส่งออนไลน์ไม่สำเร็จ)";
            });
        } else {
            statusElement.textContent = "✓ ส่งคะแนนให้ครูเรียบร้อยแล้ว";
        }
    } else {
        statusElement.textContent = "✓ บันทึกคะแนนเรียบร้อยแล้ว";
    }

    // ทำแบบทดสอบอีกครั้ง → กลับไปหน้ากรอกชื่อ (ข้อมูลเดิมเติมไว้ให้)
    retryButton.addEventListener("click", () => {
        localStorage.removeItem("testResults");
        localStorage.removeItem("testAnswers");
        window.location.href = "./student.html";
    });

    // ดูเฉลยพร้อมวิธีทำ ตามชุดข้อสอบที่ทำ
    document.getElementById("answer-button").addEventListener("click", () => {
        window.location.href = "./testanswer.html";
    });

    // กลับสู่หน้าแรก
    homeButton.addEventListener("click", () => {
        window.location.href = "../index.html";
    });
});
