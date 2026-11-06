
(function () {

    // =======================================
    // 1. คลังโจทย์ 5 ข้อ สำหรับด่านที่ 5
    // =======================================

    const questionBank = [
        {
            question: "โรงเรียนนี้มีนักเรียนทั้งหมด 800 คน โดยมีนักเรียนเข้าร่วมกิจกรรม 65% ของนักเรียนทั้งหมด จะมีนักเรียนที่เข้าร่วมกิจกรรมกี่คน",
            choices: ["400", "520", "640"],
            correctAnswer: "520",
            // วิธีทำ (แนว สสวท.) เขียนเศษส่วนด้วย {ตัวเศษ|ตัวส่วน}
            explanation: [
                "65% หมายถึง 65 ส่วนใน 100 ส่วน เขียนเป็นเศษส่วนได้ {65|100}",
                "นักเรียนที่เข้าร่วมกิจกรรม 65% ของนักเรียนทั้งหมด หมายความว่า ถ้ามีนักเรียน 100 คน จะเป็นนักเรียนที่เข้าร่วมกิจกรรม 65 คน",
                "ให้มีนักเรียนที่เข้าร่วมกิจกรรม s คน",
                "เขียนเป็นสัดส่วนได้ {s|800} = {65|100}",
                "s = {65|100} × 800",
                "s = 520",
                "ดังนั้น มีนักเรียนที่เข้าร่วมกิจกรรม 520 คน"
            ]
        },
        {
            question: "ห้องสมุดมีหนังสือทั้งหมด 600 เล่ม โดยเป็นหนังสือนิทาน 45% ของหนังสือทั้งหมด ห้องสมุดมีหนังสือนิทานกี่เล่ม",
            choices: ["270", "300", "360"],
            correctAnswer: "270",
            // วิธีทำ (แนว สสวท.) เขียนเศษส่วนด้วย {ตัวเศษ|ตัวส่วน}
            explanation: [
                "45% หมายถึง 45 ส่วนใน 100 ส่วน เขียนเป็นเศษส่วนได้ {45|100}",
                "หนังสือนิทาน 45% ของหนังสือทั้งหมด หมายความว่า ถ้ามีหนังสือ 100 เล่ม จะเป็นหนังสือนิทาน 45 เล่ม",
                "ให้มีหนังสือนิทาน b เล่ม",
                "เขียนเป็นสัดส่วนได้ {b|600} = {45|100}",
                "b = {45|100} × 600",
                "b = 270",
                "ดังนั้น มีหนังสือนิทาน 270 เล่ม"
            ]
        },
        {
            question: "บริษัทแห่งหนึ่งมีพนักงานทั้งหมด 1,200 คน โดยมีพนักงานที่ทำงานในแผนกผลิต 35% ของพนักงานทั้งหมด จะมีพนักงานในแผนกผลิตกี่คน",
            choices: ["210", "350", "420"],
            correctAnswer: "420",
            // วิธีทำ (แนว สสวท.) เขียนเศษส่วนด้วย {ตัวเศษ|ตัวส่วน}
            explanation: [
                "35% หมายถึง 35 ส่วนใน 100 ส่วน เขียนเป็นเศษส่วนได้ {35|100}",
                "พนักงานในแผนกผลิต 35% ของพนักงานทั้งหมด หมายความว่า ถ้ามีพนักงาน 100 คน จะเป็นพนักงานในแผนกผลิต 35 คน",
                "ให้มีพนักงานในแผนกผลิต e คน",
                "เขียนเป็นสัดส่วนได้ {e|1,200} = {35|100}",
                "e = {35|100} × 1,200",
                "e = 420",
                "ดังนั้น มีพนักงานในแผนกผลิต 420 คน"
            ]
        },
        {
            question: "สวนแห่งหนึ่งมีต้นไม้ทั้งหมด 480 ต้น โดยเป็นต้นมะม่วง 75% ของต้นไม้ทั้งหมด สวนแห่งนี้มีต้นมะม่วงกี่ต้น",
            choices: ["120", "360", "520"],
            correctAnswer: "360",
            // วิธีทำ (แนว สสวท.) เขียนเศษส่วนด้วย {ตัวเศษ|ตัวส่วน}
            explanation: [
                "75% หมายถึง 75 ส่วนใน 100 ส่วน เขียนเป็นเศษส่วนได้ {75|100}",
                "ต้นมะม่วง 75% ของต้นไม้ทั้งหมด หมายความว่า ถ้ามีต้นไม้ 100 ต้น จะเป็นต้นมะม่วง 75 ต้น",
                "ให้มีต้นมะม่วง m ต้น",
                "เขียนเป็นสัดส่วนได้ {m|480} = {75|100}",
                "m = {75|100} × 480",
                "m = 360",
                "ดังนั้น มีต้นมะม่วง 360 ต้น"
            ]
        },
        {
            question: "หมู่บ้านแห่งหนึ่งมีประชากรทั้งหมด 900 คน โดยมีประชากรที่เข้าร่วมงานประเพณีลอยกระทง 55% ของประชากรทั้งหมด จะมีผู้เข้าร่วมงานประเพณีลอยกระทงกี่คน",
            choices: ["495", "575", "750"],
            correctAnswer: "495",
            // วิธีทำ (แนว สสวท.) เขียนเศษส่วนด้วย {ตัวเศษ|ตัวส่วน}
            explanation: [
                "55% หมายถึง 55 ส่วนใน 100 ส่วน เขียนเป็นเศษส่วนได้ {55|100}",
                "ผู้เข้าร่วมงานประเพณีลอยกระทง 55% ของประชากรทั้งหมด หมายความว่า ถ้ามีประชากร 100 คน จะเป็นผู้เข้าร่วมงานประเพณีลอยกระทง 55 คน",
                "ให้มีผู้เข้าร่วมงานประเพณีลอยกระทง p คน",
                "เขียนเป็นสัดส่วนได้ {p|900} = {55|100}",
                "p = {55|100} × 900",
                "p = 495",
                "ดังนั้น มีผู้เข้าร่วมงานประเพณีลอยกระทง 495 คน"
            ]
        }
    ];


    // =======================================
    // 2. ตั้งค่าด่านที่ 5
    // =======================================

    const body = document.body;

    const currentStage = Number(body.dataset.stage);
    const nextPage = body.dataset.next || "./percentscore.html";
    const backPage = body.dataset.back || "./percentplay4.html";

    const QUESTION_KEY = "percentStage5Question";

    if (currentStage !== 5) {
        console.error("ไฟล์นี้ใช้สำหรับด่านที่ 5 เท่านั้น");
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

        // บันทึกผลด่านที่ 5
        results[5] = isCorrect;

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

    console.log("Percentplay5 พร้อมใช้งาน");
    console.log("โจทย์ที่สุ่มได้:", currentQuestion);
    console.log("ตัวเลือกลูกบอล:", currentChoices);

})();
