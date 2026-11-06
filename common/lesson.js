// =====================================================
// lesson.js — สคริปต์กลางของหน้าเนื้อหาและหน้าแบบทดสอบรวมบท
//  - ปุ่มย้อนกลับ / ถัดไป (อ่านปลายทางจาก data-prev, data-next ของ <body>)
//  (ปุ่มตั้งค่า/คู่มือ อยู่ใน settings.js)
//  - Flashcard คลิกเพื่อพลิก
//  - ปุ่ม "แบบทดสอบท้ายบท" ล้างคะแนนรอบก่อนแล้วเริ่มเกม
// =====================================================

(function () {

    const body = document.body;

    function goTo(url) {
        if (url) {
            window.location.href = url;
        }
    }

    // ---------- 1. ปุ่มย้อนกลับ / ถัดไป ----------

    const backBtn = document.getElementById("backBtn");
    const nextBtn = document.getElementById("nextBtn");

    if (backBtn) {
        backBtn.addEventListener("click", () => goTo(body.dataset.prev));
    }

    if (nextBtn) {
        nextBtn.addEventListener("click", () => goTo(body.dataset.next));
    }


    // ---------- 4. Flashcard ----------

    document.querySelectorAll(".flashcard").forEach(card => {
        card.addEventListener("click", () => {
            card.classList.toggle("flipped");
            card.setAttribute("aria-pressed", String(card.classList.contains("flipped")));
        });
    });


    // ---------- 5. ปุ่มเริ่มแบบทดสอบท้ายบท ----------
    // <button data-start-quiz="ratioplay1.html" data-prefix="ratio">

    document.querySelectorAll("[data-start-quiz]").forEach(button => {

        button.addEventListener("click", () => {

            const prefix = button.dataset.prefix;

            if (prefix) {
                for (let stage = 1; stage <= 5; stage++) {
                    sessionStorage.removeItem(`${prefix}Stage${stage}Question`);
                }
                localStorage.removeItem(`${prefix}Results`);
                localStorage.removeItem(`${prefix}Score`);
            }

            goTo(button.dataset.startQuiz);
        });
    });


})();
