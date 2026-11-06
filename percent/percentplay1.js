
(function () {

    // =======================================
    // 1. คลังโจทย์ 5 ข้อ สำหรับด่านที่ 1
    // =======================================

    const questionBank = [
        {
            question: "36% ของ 250 เป็นเท่าไร",
            choices: ["80", "90", "100"],
            correctAnswer: "90",
            // วิธีทำ (แนว สสวท.) เขียนเศษส่วนด้วย {ตัวเศษ|ตัวส่วน}
            explanation: [
                "36% หมายถึง 36 ส่วนใน 100 ส่วน เขียนเป็นเศษส่วนได้ {36|100}",
                "36% ของ 250 หมายความว่า ถ้ามี 100 ส่วน คิดเป็น 36 ส่วน ถ้ามี 250 ส่วน จะคิดเป็นกี่ส่วน",
                "ให้ 36% ของ 250 เท่ากับ a",
                "เขียนเป็นสัดส่วนได้ {a|250} = {36|100}",
                "a = {36|100} × 250",
                "a = 90",
                "ดังนั้น 36% ของ 250 เท่ากับ 90"
            ]
        },
        {
            question: "28% ของ 250 เป็นเท่าไร",
            choices: ["70", "80", "90"],
            correctAnswer: "70",
            // วิธีทำ (แนว สสวท.) เขียนเศษส่วนด้วย {ตัวเศษ|ตัวส่วน}
            explanation: [
                "28% หมายถึง 28 ส่วนใน 100 ส่วน เขียนเป็นเศษส่วนได้ {28|100}",
                "28% ของ 250 หมายความว่า ถ้ามี 100 ส่วน คิดเป็น 28 ส่วน ถ้ามี 250 ส่วน จะคิดเป็นกี่ส่วน",
                "ให้ 28% ของ 250 เท่ากับ a",
                "เขียนเป็นสัดส่วนได้ {a|250} = {28|100}",
                "a = {28|100} × 250",
                "a = 70",
                "ดังนั้น 28% ของ 250 เท่ากับ 70"
            ]
        },
        {
            question: "15% ของ 400 เป็นเท่าไร",
            choices: ["20", "40", "60"],
            correctAnswer: "60",
            // วิธีทำ (แนว สสวท.) เขียนเศษส่วนด้วย {ตัวเศษ|ตัวส่วน}
            explanation: [
                "15% หมายถึง 15 ส่วนใน 100 ส่วน เขียนเป็นเศษส่วนได้ {15|100}",
                "15% ของ 400 หมายความว่า ถ้ามี 100 ส่วน คิดเป็น 15 ส่วน ถ้ามี 400 ส่วน จะคิดเป็นกี่ส่วน",
                "ให้ 15% ของ 400 เท่ากับ a",
                "เขียนเป็นสัดส่วนได้ {a|400} = {15|100}",
                "a = {15|100} × 400",
                "a = 60",
                "ดังนั้น 15% ของ 400 เท่ากับ 60"
            ]
        },
        {
            question: "48% ของ 300 เป็นเท่าไร",
            choices: ["172", "144", "96"],
            correctAnswer: "144",
            // วิธีทำ (แนว สสวท.) เขียนเศษส่วนด้วย {ตัวเศษ|ตัวส่วน}
            explanation: [
                "48% หมายถึง 48 ส่วนใน 100 ส่วน เขียนเป็นเศษส่วนได้ {48|100}",
                "48% ของ 300 หมายความว่า ถ้ามี 100 ส่วน คิดเป็น 48 ส่วน ถ้ามี 300 ส่วน จะคิดเป็นกี่ส่วน",
                "ให้ 48% ของ 300 เท่ากับ a",
                "เขียนเป็นสัดส่วนได้ {a|300} = {48|100}",
                "a = {48|100} × 300",
                "a = 144",
                "ดังนั้น 48% ของ 300 เท่ากับ 144"
            ]
        },
        {
            question: "30% ของ 280 เป็นเท่าไร",
            choices: ["84", "96", "108"],
            correctAnswer: "84",
            // วิธีทำ (แนว สสวท.) เขียนเศษส่วนด้วย {ตัวเศษ|ตัวส่วน}
            explanation: [
                "30% หมายถึง 30 ส่วนใน 100 ส่วน เขียนเป็นเศษส่วนได้ {30|100}",
                "30% ของ 280 หมายความว่า ถ้ามี 100 ส่วน คิดเป็น 30 ส่วน ถ้ามี 280 ส่วน จะคิดเป็นกี่ส่วน",
                "ให้ 30% ของ 280 เท่ากับ a",
                "เขียนเป็นสัดส่วนได้ {a|280} = {30|100}",
                "a = {30|100} × 280",
                "a = 84",
                "ดังนั้น 30% ของ 280 เท่ากับ 84"
            ]
        }
    ];


    // =======================================
    // 2. ตั้งค่าด่านที่ 1
    // =======================================

    const body = document.body;

    const currentStage = Number(body.dataset.stage);
    const nextPage = body.dataset.next || "./percentplay2.html";
    const backPage = body.dataset.back || "./percent.html";

    const QUESTION_KEY = "percentStage1Question";

    if (currentStage !== 1) {
        console.error("ไฟล์นี้ใช้สำหรับด่านที่ 1 เท่านั้น");
        return;
    }


    // =======================================
    // 3. เชื่อม Element กับ HTML
    // =======================================

    const questionText = document.getElementById("questionText");

    const balls = [
        ...document.querySelectorAll(".ball-option")
    ];

    const submitButton = document.getElementById("submitButton");
    const nextButton = document.getElementById("nextButton");

    const feedback = document.getElementById("feedback");
    const feedbackTitle = document.getElementById("feedbackTitle");
    const feedbackMessage = document.getElementById("feedbackMessage");
    const feedbackDone = document.getElementById("feedbackDone");

    const circles = document.querySelectorAll(".step-circle");
    const lines = document.querySelectorAll(".progress-line");
    const stageText = document.getElementById("stageText");

    if (
        !questionText ||
        balls.length !== 3 ||
        !submitButton ||
        !nextButton ||
        !feedback ||
        !feedbackTitle ||
        !feedbackMessage ||
        !feedbackDone
    ) {
        console.error("ไม่พบ Element ที่จำเป็นใน HTML");
        return;
    }


    // =======================================
    // 4. ฟังก์ชันสุ่มตัวเลือก
    // =======================================

    function shuffleArray(array) {
        const shuffled = [...array];

        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));

            [shuffled[i], shuffled[j]] =
                [shuffled[j], shuffled[i]];
        }

        return shuffled;
    }


    // =======================================
    // 5. สุ่มโจทย์ 1 ข้อจาก 5 ข้อ
    // =======================================

    let savedQuestion = null;

    try {
        savedQuestion = JSON.parse(
            sessionStorage.getItem(QUESTION_KEY)
        );
    } catch (error) {
        savedQuestion = null;
    }

    function isValidSavedQuestion(data) {
        return (
            data &&
            Number.isInteger(data.index) &&
            data.index >= 0 &&
            data.index < questionBank.length &&
            Array.isArray(data.choices) &&
            data.choices.length === 3 &&
            new Set(data.choices).size === 3 &&
            data.choices.every(choice =>
                questionBank[data.index].choices.includes(choice)
            )
        );
    }

    // ถ้ายังไม่มีโจทย์ ให้สุ่มใหม่
    if (!isValidSavedQuestion(savedQuestion)) {

        const randomIndex = Math.floor(
            Math.random() * questionBank.length
        );

        const randomChoices = shuffleArray(
            questionBank[randomIndex].choices
        );

        savedQuestion = {
            index: randomIndex,
            choices: randomChoices
        };

        sessionStorage.setItem(
            QUESTION_KEY,
            JSON.stringify(savedQuestion)
        );
    }

    const currentQuestion =
        questionBank[savedQuestion.index];

    const currentChoices =
        savedQuestion.choices;


    // =======================================
    // 6. แสดงโจทย์และลูกบอลในตะกร้า
    // =======================================

    questionText.textContent = currentQuestion.question;

    balls.forEach((ball, index) => {

        const choice = currentChoices[index];

        ball.dataset.answer = choice;

        const label = ball.querySelector("span");

        if (label) {
            label.textContent = choice;
        }

        ball.setAttribute(
            "aria-label",
            `ลูกบอลตัวเลือกที่ ${index + 1}: ${choice}`
        );

        ball.setAttribute("aria-pressed", "false");

        ball.classList.remove("selected", "pop");

        ball.disabled = false;
    });


    // =======================================
    // 7. Progress Bar
    // =======================================

    circles.forEach((circle, index) => {

        const stage = index + 1;

        circle.classList.remove("active", "completed");

        if (stage < currentStage) {
            circle.classList.add("completed");
            circle.textContent = "✓";
        }

        else if (stage === currentStage) {
            circle.classList.add("active");
            circle.textContent = stage;
        }
    });

    lines.forEach((line, index) => {
        line.classList.toggle(
            "completed",
            index + 1 < currentStage
        );
    });

    if (stageText) {
        stageText.textContent = `ด่าน ${currentStage} / 5`;
    }


    // =======================================
    // 8. สถานะเริ่มต้น
    // =======================================

    let selectedAnswer = null;
    let answered = false;

    feedback.hidden = true;
    nextButton.hidden = true;

    submitButton.disabled = false;


    // =======================================
    // 9. เลือกลูกบอลในตะกร้า
    // =======================================

    balls.forEach(ball => {

        ball.addEventListener("click", () => {

            if (answered) return;

            // ยกเลิกการเลือกลูกบอลเดิม
            balls.forEach(item => {
                item.classList.remove("selected");
                item.setAttribute("aria-pressed", "false");
            });

            // เลือกลูกบอลใหม่
            ball.classList.add("selected");
            ball.setAttribute("aria-pressed", "true");

            selectedAnswer = ball.dataset.answer;
        });
    });


    // =======================================
    // 10. บันทึกคะแนน
    // =======================================

    function saveAnswer(isCorrect) {

        let results = {};

        try {
            results = JSON.parse(
                localStorage.getItem("percentResults") || "{}"
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

        // บันทึกผลด่านที่ 1
        results[1] = isCorrect;

        localStorage.setItem(
            "percentResults",
            JSON.stringify(results)
        );

        // คำนวณคะแนนรวม
        const score = Object.values(results).filter(
            result => result === true
        ).length;

        localStorage.setItem("percentScore", String(score));
    }


    // =======================================
    // 11. แสดง Popup เฉลย
    // =======================================

    function showFeedback(isCorrect) {

        if (isCorrect) {
            feedbackTitle.textContent = "เก่งมาก! ตอบถูกแล้ว ";
            feedbackTitle.className = "feedback-title correct";
        } else {
            feedbackTitle.textContent = "ยังไม่ถูกนะ ";
            feedbackTitle.className = "feedback-title wrong";
        }

        // แสดงคำตอบ + วิธีทำ (แปลง {a|b} เป็นเศษส่วน)
        const toFraction = text => text.replace(/\{([^|{}]+)\|([^{}]+)\}/g,
            '<span class="frac"><span>$1</span><span>$2</span></span>');

        feedbackMessage.innerHTML =
            `<span class="sol-head">คุณเลือก ${selectedAnswer} &nbsp;เฉลยคือ ${currentQuestion.correctAnswer}</span>` +
            `<span class="sol-box"><span class="sol-label">วิธีทำ</span>` +
            currentQuestion.explanation.map(toFraction).join("<br>") +
            `</span>`;

        feedback.hidden = false;

        feedbackDone.focus();
    }


    // =======================================
    // 12. ปุ่มส่งคำตอบ
    // =======================================

    submitButton.addEventListener("click", () => {

        if (answered) return;

        // ตรวจสอบว่ามีการเลือกลูกบอลหรือยัง
        if (selectedAnswer === null) {

            feedbackTitle.textContent = "เลือกลูกบอลก่อนนะ!";
            feedbackTitle.className = "feedback-title wrong";

            feedbackMessage.textContent =
                "กรุณาเลือกลูกบอล 1 ลูกก่อนกดส่งคำตอบ";

            feedback.hidden = false;

            nextButton.hidden = true;

            return;
        }

        answered = true;

        const isCorrect =
            selectedAnswer === currentQuestion.correctAnswer;

        // บันทึกคะแนน
        saveAnswer(isCorrect);

        // ปิดการเลือกลูกบอล
        balls.forEach(ball => {
            ball.disabled = true;
        });

        // ปิดปุ่มส่งคำตอบ
        submitButton.disabled = true;

        // แสดง Popup
        showFeedback(isCorrect);
    });


    // =======================================
    // 13. ปิด Popup เมื่อกดตกลง
    // =======================================

    feedbackDone.addEventListener("click", () => {

        feedback.hidden = true;

        // แสดงปุ่มถัดไปหลังตอบคำถามแล้วเท่านั้น
        if (answered) {
            nextButton.hidden = false;
        }
    });


    // กด Escape เพื่อปิด Popup
    document.addEventListener("keydown", event => {

        if (
            event.key === "Escape" &&
            !feedback.hidden
        ) {

            feedback.hidden = true;

            if (answered) {
                nextButton.hidden = false;
            }
        }
    });


    // =======================================
    // 14. ปุ่มถัดไป
    // =======================================

    nextButton.addEventListener("click", () => {

        if (!answered) return;

        window.location.href = nextPage;
    });


    // =======================================
    // 15. เริ่มเกม
    // =======================================

    console.log("Percentplay1 พร้อมใช้งาน");
    console.log("โจทย์ที่สุ่มได้:", currentQuestion);
    console.log("ตัวเลือกลูกบอล:", currentChoices);

})();
