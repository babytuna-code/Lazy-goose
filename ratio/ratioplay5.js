
(function () {

    // =======================================
    // 1. คลังโจทย์ 5 ข้อ สำหรับด่านที่ 5
    // =======================================

    const questionBank = [

        // ข้อ 1
        {
            question:
                "มีลูกบอล 10 ลูก แบ่งเป็นสีแดง 6 ลูก และสีเขียว 4 ลูก จงหาอัตราส่วนของลูกบอลสีแดงต่อจำนวนลูกบอลทั้งหมด",

            answer1: 6,
            answer2: 10,

            answerText: "6 : 10 หรือ 3 : 5",

            explanation:
                "เพราะมีลูกบอลสีแดง 6 ลูก จากลูกบอลทั้งหมด 10 ลูก"
        },

        // ข้อ 2
        {
            question:
                "มีลูกแก้ว 15 ลูก เป็นสีน้ำเงิน 9 ลูก และสีแดง 6 ลูก จงหาอัตราส่วนของลูกแก้วสีน้ำเงินต่อจำนวนลูกแก้วทั้งหมด",

            answer1: 9,
            answer2: 15,

            answerText: "9 : 15 หรือ 3 : 5",

            explanation:
                "เพราะมีลูกแก้วสีน้ำเงิน 9 ลูก จากลูกแก้วทั้งหมด 15 ลูก"
        },

        // ข้อ 3
        {
            question:
                "ห้องเรียนมีนักเรียน 20 คน เป็นนักเรียนหญิง 12 คน และนักเรียนชาย 8 คน จงหาอัตราส่วนของนักเรียนหญิงต่อจำนวนนักเรียนทั้งหมด",

            answer1: 12,
            answer2: 20,

            answerText: "12 : 20 หรือ 3 : 5",

            explanation:
                "เพราะมีนักเรียนหญิง 12 คน จากนักเรียนทั้งหมด 20 คน"
        },

        // ข้อ 4
        {
            question:
                "ในตะกร้ามีผลไม้ 18 ผล เป็นกล้วย 6 ผล และส้ม 12 ผล จงหาอัตราส่วนของกล้วยต่อจำนวนผลไม้ทั้งหมด",

            answer1: 6,
            answer2: 18,

            answerText: "6 : 18 หรือ 1 : 3",

            explanation:
                "เพราะมีกล้วย 6 ผล จากผลไม้ทั้งหมด 18 ผล"
        },

        // ข้อ 5
        {
            question:
                "มีดอกไม้ทั้งหมด 25 ดอก เป็นดอกไม้สีเหลือง 10 ดอก และสีชมพู 15 ดอก จงหาอัตราส่วนของดอกไม้สีเหลืองต่อจำนวนดอกไม้ทั้งหมด",

            answer1: 10,
            answer2: 25,

            answerText: "10 : 25 หรือ 2 : 5",

            explanation:
                "เพราะมีดอกไม้สีเหลือง 10 ดอก จากดอกไม้ทั้งหมด 25 ดอก"
        }

    ];


    // =======================================
    // 2. ตั้งค่าด่านที่ 5
    // =======================================

    const currentStage = Number(document.body.dataset.stage);
    const nextPage = document.body.dataset.next;
    const backPage = document.body.dataset.back || "ratioplay4.html";

    const QUESTION_KEY = "ratioStage5Question";


    if (currentStage !== 5) {
        console.error("ไฟล์นี้ใช้สำหรับด่านที่ 5 เท่านั้น");
        return;
    }


    // =======================================
    // 3. เชื่อม HTML
    // =======================================

    const questionText = document.getElementById("questionText");

    const numberElements = [
        document.getElementById("number1"),
        document.getElementById("number2")
    ];

    const submitButton = document.getElementById("submitButton");
    const nextButton = document.getElementById("nextButton");

    const feedbackOverlay = document.getElementById("feedbackOverlay");
    const feedbackTitle = document.getElementById("feedbackTitle");
    const feedbackMessage = document.getElementById("feedbackMessage");
    const feedbackDone = document.getElementById("feedbackDone");

    const backButton = document.getElementById("backButton");

    const circles = document.querySelectorAll(".step-circle");
    const lines = document.querySelectorAll(".progress-line");
    const stageText = document.getElementById("stageText");


    // ตรวจสอบ Element ใน HTML

    const requiredElements = [
        questionText,
        numberElements[0],
        numberElements[1],
        submitButton,
        nextButton,
        feedbackOverlay,
        feedbackTitle,
        feedbackMessage,
        feedbackDone
    ];

    if (requiredElements.some(element => !element)) {
        console.error("ไม่พบ Element ที่จำเป็นใน HTML ด่าน 5");
        return;
    }


    // =======================================
    // 4. สุ่มโจทย์ 1 ข้อจาก 5 ข้อ
    // =======================================

    let randomIndex = sessionStorage.getItem(QUESTION_KEY);

    if (
        randomIndex === null ||
        !Number.isInteger(Number(randomIndex)) ||
        Number(randomIndex) < 0 ||
        Number(randomIndex) >= questionBank.length
    ) {

        randomIndex = Math.floor(
            Math.random() * questionBank.length
        );

        sessionStorage.setItem(
            QUESTION_KEY,
            String(randomIndex)
        );

    } else {

        randomIndex = Number(randomIndex);
    }


    // เลือกโจทย์ที่สุ่มได้
    const currentQuestion = questionBank[randomIndex];


    // =======================================
    // 5. แสดงโจทย์
    // =======================================

    questionText.textContent = currentQuestion.question;


    // =======================================
    // 6. แสดง Progress Bar
    // =======================================

    circles.forEach((circle, index) => {

        const stage = index + 1;

        if (stage < currentStage) {

            circle.classList.add("completed");
            circle.textContent = "✓";

        } else if (stage === currentStage) {

            circle.classList.add("active");
        }
    });


    lines.forEach((line, index) => {

        if (index + 1 < currentStage) {
            line.classList.add("completed");
        }
    });


    if (stageText) {
        stageText.textContent = "ด่าน 5 / 5";
    }


    // =======================================
    // 7. ตั้งค่าตัวเลขเริ่มต้น
    // =======================================

    let numbers = [1, 1];
    let hasSubmitted = false;

    // ซ่อน Popup และปุ่มถัดไปตอนเริ่มเกม
    feedbackOverlay.hidden = true;
    nextButton.hidden = true;

    submitButton.disabled = false;

    document.querySelectorAll(".arrow").forEach(button => {
        button.disabled = false;
    });


    function updateNumbers() {

        numberElements.forEach((element, index) => {
            element.textContent = numbers[index];
        });
    }


    // =======================================
    // 8. ปุ่มลูกศรเพิ่มและลดตัวเลข
    // =======================================

    document.querySelectorAll(".arrow").forEach(button => {

        button.addEventListener("click", () => {

            if (hasSubmitted) return;

            const index = Number(button.dataset.index);
            const change = Number(button.dataset.change);

            if (index !== 0 && index !== 1) return;

            const newValue = numbers[index] + change;

            if (newValue < 1 || newValue > 99) return;

            numbers[index] = newValue;

            updateNumbers();

        });
    });


    // =======================================
    // 9. บันทึกคะแนน
    // =======================================

    function saveAnswer(isCorrect) {

        let results = {};

        try {

            results = JSON.parse(
                localStorage.getItem("ratioResults") || "{}"
            );

            if (
                !results ||
                typeof results !== "object" ||
                Array.isArray(results)
            ) {
                results = {};
            }

        } catch (error) {

            results = {};
        }


        // บันทึกผลของด่านที่ 5
        results[5] = isCorrect;

        localStorage.setItem(
            "ratioResults",
            JSON.stringify(results)
        );


        // คำนวณคะแนนรวม
        const score = Object.values(results).filter(
            result => result === true
        ).length;

        localStorage.setItem("ratioScore", String(score));
    }


    // =======================================
    // 10. แสดง Popup
    // =======================================

    function showFeedback(isCorrect) {

        if (isCorrect) {

            feedbackTitle.textContent =
                "เก่งมาก! ตอบถูกแล้ว";

            feedbackTitle.className =
                "feedback-title correct";

        } else {

            feedbackTitle.textContent =
                "ยังไม่ถูกนะ";

            feedbackTitle.className =
                "feedback-title wrong";
        }


        feedbackMessage.textContent =
            `คำตอบของคุณคือ ${numbers[0]} : ${numbers[1]} ` +
            `เฉลยคือ ${currentQuestion.answerText} ` +
            currentQuestion.explanation;


        feedbackOverlay.hidden = false;

        feedbackDone.focus();
    }


    // =======================================
    // 11. ส่งคำตอบและตรวจคำตอบ
    // =======================================

    submitButton.addEventListener("click", () => {

        if (hasSubmitted) return;

        hasSubmitted = true;


        // ตรวจสอบอัตราส่วนที่เท่ากัน
        const isCorrect =
            numbers[0] * currentQuestion.answer2 ===
            numbers[1] * currentQuestion.answer1;


        // บันทึกผลด่านที่ 5
        saveAnswer(isCorrect);


        // ปิดปุ่มลูกศร
        document.querySelectorAll(".arrow").forEach(button => {
            button.disabled = true;
        });

        submitButton.disabled = true;


        // แสดง Popup เฉลย
        showFeedback(isCorrect);

    });


    // =======================================
    // 12. ปิด Popup เมื่อกดตกลง
    // =======================================

    function closeFeedback() {

        if (!hasSubmitted) return;

        feedbackOverlay.hidden = true;

        // แสดงปุ่มไปหน้าสรุปคะแนน
        nextButton.hidden = false;
    }

    feedbackDone.addEventListener("click", closeFeedback);


    // กด Escape เพื่อปิด Popup
    document.addEventListener("keydown", event => {

        if (
            event.key === "Escape" &&
            !feedbackOverlay.hidden &&
            hasSubmitted
        ) {
            closeFeedback();
        }
    });


    // =======================================
    // 13. ปุ่มถัดไป
    // =======================================

    nextButton.addEventListener("click", () => {

        if (!hasSubmitted) return;

        if (nextPage) {
            window.location.href = nextPage;
        }
    });


    // =======================================
    // 14. ปุ่มย้อนกลับ (ถ้ามี)
    // =======================================

    if (backButton) {

        backButton.addEventListener("click", () => {
            window.location.href = backPage;
        });
    }


    // =======================================
    // 15. เริ่มต้นเกม
    // =======================================

    updateNumbers();

    console.log("Ratioplay stage 5 พร้อมใช้งาน");
    console.log("โจทย์ที่สุ่มได้:", currentQuestion.question);

})();
