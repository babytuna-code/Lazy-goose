
(function () {

    // =======================================
    // 1. คลังโจทย์ 5 ข้อ สำหรับด่านที่ 3
    // =======================================

    const questionBank = [
        {
            question: "สินค้าราคา 800 บาท เพิ่มราคาขึ้น 15% สินค้าจะมีราคาใหม่เท่าใด",
            choices: ["790", "850", "920"],
            correctAnswer: "920",
            // วิธีทำ (แนว สสวท.) เขียนเศษส่วนด้วย {ตัวเศษ|ตัวส่วน}
            explanation: [
                "15% หมายถึง 15 ส่วนใน 100 ส่วน เขียนเป็นเศษส่วนได้ {15|100}",
                "เพิ่มราคา 15% หมายความว่า ราคาเดิม 100 บาท ราคาใหม่เป็น 100 + 15 = 115 บาท",
                "ให้สินค้ามีราคาใหม่ p บาท",
                "เขียนเป็นสัดส่วนได้ {p|800} = {115|100}",
                "p = {115|100} × 800",
                "p = 920",
                "ดังนั้น สินค้าจะมีราคาใหม่ 920 บาท"
            ]
        },
        {
            question: "กระเป๋าราคา 600 บาท เพิ่มราคาขึ้น 12% กระเป๋าจะมีราคาใหม่เท่าใด",
            choices: ["660", "672", "725"],
            correctAnswer: "672",
            // วิธีทำ (แนว สสวท.) เขียนเศษส่วนด้วย {ตัวเศษ|ตัวส่วน}
            explanation: [
                "12% หมายถึง 12 ส่วนใน 100 ส่วน เขียนเป็นเศษส่วนได้ {12|100}",
                "เพิ่มราคา 12% หมายความว่า ราคาเดิม 100 บาท ราคาใหม่เป็น 100 + 12 = 112 บาท",
                "ให้กระเป๋ามีราคาใหม่ p บาท",
                "เขียนเป็นสัดส่วนได้ {p|600} = {112|100}",
                "p = {112|100} × 600",
                "p = 672",
                "ดังนั้น กระเป๋าจะมีราคาใหม่ 672 บาท"
            ]
        },
        {
            question: "ตู้หนังสือราคา 1,500 บาท เพิ่มราคาขึ้น 8% ตู้หนังสือจะมีราคาใหม่เท่าใด",
            choices: ["1580", "1620", "1700"],
            correctAnswer: "1620",
            // วิธีทำ (แนว สสวท.) เขียนเศษส่วนด้วย {ตัวเศษ|ตัวส่วน}
            explanation: [
                "8% หมายถึง 8 ส่วนใน 100 ส่วน เขียนเป็นเศษส่วนได้ {8|100}",
                "เพิ่มราคา 8% หมายความว่า ราคาเดิม 100 บาท ราคาใหม่เป็น 100 + 8 = 108 บาท",
                "ให้ตู้หนังสือมีราคาใหม่ p บาท",
                "เขียนเป็นสัดส่วนได้ {p|1,500} = {108|100}",
                "p = {108|100} × 1,500",
                "p = 1,620",
                "ดังนั้น ตู้หนังสือจะมีราคาใหม่ 1,620 บาท"
            ]
        },
        {
            question: "รองเท้าราคา 900 บาท เพิ่มราคาขึ้น 20% รองเท้าจะมีราคาใหม่เท่าใด",
            choices: ["1080", "1220", "1500"],
            correctAnswer: "1080",
            // วิธีทำ (แนว สสวท.) เขียนเศษส่วนด้วย {ตัวเศษ|ตัวส่วน}
            explanation: [
                "20% หมายถึง 20 ส่วนใน 100 ส่วน เขียนเป็นเศษส่วนได้ {20|100}",
                "เพิ่มราคา 20% หมายความว่า ราคาเดิม 100 บาท ราคาใหม่เป็น 100 + 20 = 120 บาท",
                "ให้รองเท้ามีราคาใหม่ p บาท",
                "เขียนเป็นสัดส่วนได้ {p|900} = {120|100}",
                "p = {120|100} × 900",
                "p = 1,080",
                "ดังนั้น รองเท้าจะมีราคาใหม่ 1,080 บาท"
            ]
        },
        {
            question: "พัดลมราคา 240 บาท เพิ่มราคาขึ้น 5% พัดลมจะมีราคาใหม่เท่าใด",
            choices: ["124", "168", "252"],
            correctAnswer: "252",
            // วิธีทำ (แนว สสวท.) เขียนเศษส่วนด้วย {ตัวเศษ|ตัวส่วน}
            explanation: [
                "5% หมายถึง 5 ส่วนใน 100 ส่วน เขียนเป็นเศษส่วนได้ {5|100}",
                "เพิ่มราคา 5% หมายความว่า ราคาเดิม 100 บาท ราคาใหม่เป็น 100 + 5 = 105 บาท",
                "ให้พัดลมมีราคาใหม่ p บาท",
                "เขียนเป็นสัดส่วนได้ {p|240} = {105|100}",
                "p = {105|100} × 240",
                "p = 252",
                "ดังนั้น พัดลมจะมีราคาใหม่ 252 บาท"
            ]
        }
    ];


    // =======================================
    // 2. ตั้งค่าด่านที่ 3
    // =======================================

    const body = document.body;

    const currentStage = Number(body.dataset.stage);
    const nextPage = body.dataset.next || "./percentplay4.html";
    const backPage = body.dataset.back || "./percentplay2.html";

    const QUESTION_KEY = "percentStage3Question";

    if (currentStage !== 3) {
        console.error("ไฟล์นี้ใช้สำหรับด่านที่ 3 เท่านั้น");
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

        // บันทึกผลด่านที่ 3
        results[3] = isCorrect;

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

    console.log("Percentplay3 พร้อมใช้งาน");
    console.log("โจทย์ที่สุ่มได้:", currentQuestion);
    console.log("ตัวเลือกลูกบอล:", currentChoices);

})();
