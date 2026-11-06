
(function () {

    // =======================================
    // 1. คลังโจทย์ 5 ข้อ สำหรับด่านที่ 2
    // =======================================

    const questionBank = [
        {
            question: "5 เป็น 20% ของจำนวนใด",
            choices: ["25", "30", "35"],
            correctAnswer: "25",
            // วิธีทำ (แนว สสวท.) เขียนเศษส่วนด้วย {ตัวเศษ|ตัวส่วน}
            explanation: [
                "20% หมายถึง 20 ส่วนใน 100 ส่วน เขียนเป็นเศษส่วนได้ {20|100}",
                "5 เป็น 20% ของจำนวนใด หมายความว่า ถ้ามี 100 ส่วน คิดเป็น 20 ส่วน แล้วจำนวนใดที่คิดเป็น 5 ส่วน",
                "ให้ n แทนจำนวนที่ต้องการหา ซึ่ง 5 เป็น 20% ของ n",
                "เขียนเป็นสัดส่วนได้ {5|n} = {20|100}",
                "คูณไขว้ จะได้ 20 × n = 5 × 100",
                "n = {500|20} = 25",
                "ดังนั้น 5 เป็น 20% ของ 25"
            ]
        },
        {
            question: "12 เป็น 30% ของจำนวนใด",
            choices: ["30", "40", "50"],
            correctAnswer: "40",
            // วิธีทำ (แนว สสวท.) เขียนเศษส่วนด้วย {ตัวเศษ|ตัวส่วน}
            explanation: [
                "30% หมายถึง 30 ส่วนใน 100 ส่วน เขียนเป็นเศษส่วนได้ {30|100}",
                "12 เป็น 30% ของจำนวนใด หมายความว่า ถ้ามี 100 ส่วน คิดเป็น 30 ส่วน แล้วจำนวนใดที่คิดเป็น 12 ส่วน",
                "ให้ n แทนจำนวนที่ต้องการหา ซึ่ง 12 เป็น 30% ของ n",
                "เขียนเป็นสัดส่วนได้ {12|n} = {30|100}",
                "คูณไขว้ จะได้ 30 × n = 12 × 100",
                "n = {1,200|30} = 40",
                "ดังนั้น 12 เป็น 30% ของ 40"
            ]
        },
        {
            question: "15 เป็น 25% ของจำนวนใด",
            choices: ["15", "40", "60"],
            correctAnswer: "60",
            // วิธีทำ (แนว สสวท.) เขียนเศษส่วนด้วย {ตัวเศษ|ตัวส่วน}
            explanation: [
                "25% หมายถึง 25 ส่วนใน 100 ส่วน เขียนเป็นเศษส่วนได้ {25|100}",
                "15 เป็น 25% ของจำนวนใด หมายความว่า ถ้ามี 100 ส่วน คิดเป็น 25 ส่วน แล้วจำนวนใดที่คิดเป็น 15 ส่วน",
                "ให้ n แทนจำนวนที่ต้องการหา ซึ่ง 15 เป็น 25% ของ n",
                "เขียนเป็นสัดส่วนได้ {15|n} = {25|100}",
                "คูณไขว้ จะได้ 25 × n = 15 × 100",
                "n = {1,500|25} = 60",
                "ดังนั้น 15 เป็น 25% ของ 60"
            ]
        },
        {
            question: "18 เป็น 15% ของจำนวนใด",
            choices: ["90", "120", "150"],
            correctAnswer: "120",
            // วิธีทำ (แนว สสวท.) เขียนเศษส่วนด้วย {ตัวเศษ|ตัวส่วน}
            explanation: [
                "15% หมายถึง 15 ส่วนใน 100 ส่วน เขียนเป็นเศษส่วนได้ {15|100}",
                "18 เป็น 15% ของจำนวนใด หมายความว่า ถ้ามี 100 ส่วน คิดเป็น 15 ส่วน แล้วจำนวนใดที่คิดเป็น 18 ส่วน",
                "ให้ n แทนจำนวนที่ต้องการหา ซึ่ง 18 เป็น 15% ของ n",
                "เขียนเป็นสัดส่วนได้ {18|n} = {15|100}",
                "คูณไขว้ จะได้ 15 × n = 18 × 100",
                "n = {1,800|15} = 120",
                "ดังนั้น 18 เป็น 15% ของ 120"
            ]
        },
        {
            question: "35 เป็น 70% ของจำนวนใด",
            choices: ["10", "25", "50"],
            correctAnswer: "50",
            // วิธีทำ (แนว สสวท.) เขียนเศษส่วนด้วย {ตัวเศษ|ตัวส่วน}
            explanation: [
                "70% หมายถึง 70 ส่วนใน 100 ส่วน เขียนเป็นเศษส่วนได้ {70|100}",
                "35 เป็น 70% ของจำนวนใด หมายความว่า ถ้ามี 100 ส่วน คิดเป็น 70 ส่วน แล้วจำนวนใดที่คิดเป็น 35 ส่วน",
                "ให้ n แทนจำนวนที่ต้องการหา ซึ่ง 35 เป็น 70% ของ n",
                "เขียนเป็นสัดส่วนได้ {35|n} = {70|100}",
                "คูณไขว้ จะได้ 70 × n = 35 × 100",
                "n = {3,500|70} = 50",
                "ดังนั้น 35 เป็น 70% ของ 50"
            ]
        }
    ];


    // =======================================
    // 2. ตั้งค่าด่านที่ 2
    // =======================================

    const body = document.body;

    const currentStage = Number(body.dataset.stage);
    const nextPage = body.dataset.next || "./percentplay3.html";
    const backPage = body.dataset.back || "./percentplay1.html";

    const QUESTION_KEY = "percentStage2Question";

    if (currentStage !== 2) {
        console.error("ไฟล์นี้ใช้สำหรับด่านที่ 2 เท่านั้น");
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

        // บันทึกผลด่านที่ 2
        results[2] = isCorrect;

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

    console.log("percentplay2 พร้อมใช้งาน");
    console.log("โจทย์ที่สุ่มได้:", currentQuestion);
    console.log("ตัวเลือกลูกบอล:", currentChoices);

})();
