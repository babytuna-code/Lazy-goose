// =====================================================
// student.js — กรอก username ก่อนเริ่มแบบทดสอบรวมบท
// =====================================================

(function () {

    const form = document.getElementById("studentForm");
    const nameInput = document.getElementById("studentName");
    const errorText = document.getElementById("formError");

    // ส่งคะแนนที่ยังค้างอยู่ (ถ้าครั้งก่อนไม่มีอินเทอร์เน็ต)
    Scorebook.resendPending();

    // เติม username เดิม (กรณีทำแบบทดสอบอีกครั้ง)
    const previous = Scorebook.getStudent();
    if (previous) {
        nameInput.value = previous.name || "";
    }

    form.addEventListener("submit", event => {
        event.preventDefault();

        const name = nameInput.value.trim();

        if (!name) {
            errorText.textContent = "กรุณากรอก username";
            errorText.hidden = false;
            nameInput.focus();
            return;
        }

        Scorebook.startAttempt({ name });
        window.location.href = "./quiz1.html";
    });

})();
