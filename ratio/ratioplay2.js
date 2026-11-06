
(function () {

    // =======================================
    // 1. คลังโจทย์ 5 ข้อ สำหรับด่านที่ 2
    // =======================================

    const questionBank = [

        // ข้อ 1
        {
            question: "อัตราส่วนใดเท่ากับ 2 : 7",

            choices: ["4:14", "4:15", "4:16"],

            correctAnswer: "4:14",

            explanation:
                "เพราะนำ 2 : 7 คูณด้วย 2 ทั้งสองจำนวน จะได้ 4 : 14"
        },

        // ข้อ 2
        {
            question: "อัตราส่วนใดเท่ากับ 3 : 5",

            choices: ["6:10", "6:12", "9:10"],

            correctAnswer: "6:10",

            explanation:
                "เพราะนำ 3 : 5 คูณด้วย 2 ทั้งสองจำนวน จะได้ 6 : 10"
        },

        // ข้อ 3
        {
            question: "อัตราส่วนใดเท่ากับ 4 : 9",

            choices: ["8:16", "12:27", "12:18"],

            correctAnswer: "12:27",

            explanation:
                "เพราะนำ 4 : 9 คูณด้วย 3 ทั้งสองจำนวน จะได้ 12 : 27"
        },

        // ข้อ 4
        {
            question: "อัตราส่วนใดเท่ากับ 5 : 8",

            choices: ["10:18", "15:24", "20:30"],

            correctAnswer: "15:24",

            explanation:
                "เพราะนำ 5 : 8 คูณด้วย 3 ทั้งสองจำนวน จะได้ 15 : 24"
        },

        // ข้อ 5
        {
            question: "อัตราส่วนใดเท่ากับ 3 : 4",

            choices: ["9:16", "12:16", "6:10"],

            correctAnswer: "12:16",

            explanation:
                "เพราะนำ 3 : 4 คูณด้วย 4 ทั้งสองจำนวน จะได้ 12 : 16"
        }

    ];


    // =======================================
    // 2. ตั้งค่าด่านที่ 2
    // =======================================

    const currentStage = Number(document.body.dataset.stage);

    const nextPage = document.body.dataset.next ||
        "./ratioplay3.html";

    const QUESTION_KEY = "ratioStage2Question";

    if (currentStage !== 2) {
        console.error("ไฟล์นี้ใช้สำหรับด่านที่ 2 เท่านั้น");
        return;
    }


    // =======================================
    // 3. เชื่อม Element ใน HTML
    // =======================================

    const questionText = document.getElementById("questionText");

    const balloons = [
        ...document.querySelectorAll(".balloon")
    ];

    const submitButton = document.getElementById("submitButton");

    const nextButton = document.getElementById("nextButton");

    const feedback = document.getElementById("feedback");

    const feedbackTitle = document.getElementById("feedbackTitle");

    const feedbackMessage = document.getElementById("feedbackMessage");

    const feedbackDone = document.getElementById("feedbackDone");

    const stageText = document.getElementById("stageText");

    const circles = document.querySelectorAll(".step-circle");

    const lines = document.querySelectorAll(".progress-line");

    const backButton = document.getElementById("backButton");


    // ตรวจสอบ HTML

    if (
        !questionText ||
        balloons.length !== 3 ||
        !submitButton ||
        !nextButton ||
        !feedback ||
        !feedbackTitle ||
        !feedbackMessage ||
        !feedbackDone
    ) {
        console.error("ไม่พบ Element ที่จำเป็นใน HTML ด่าน 2");
        return;
    }


    // =======================================
    // 4. ฟังก์ชันสุ่มสลับตัวเลือก
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
    // 5. สุ่มโจทย์ 1 ข้อจากทั้งหมด 5 ข้อ
    // =======================================

    let savedQuestion = null;

    try {
        savedQuestion = JSON.parse(
            sessionStorage.getItem(QUESTION_KEY)
        );
    } catch (error) {
        savedQuestion = null;
    }


    // ตรวจสอบว่ามีโจทย์เดิมอยู่หรือไม่

    function isValidSavedQuestion(data) {

        return (
            data &&
            Number.isInteger(data.index) &&
            data.index >= 0 &&
            data.index < questionBank.length &&
            Array.isArray(data.choices) &&
            data.choices.length === 3 &&
            data.choices.every(choice =>
                questionBank[data.index].choices.includes(choice)
            )
        );
    }


    // ถ้าไม่มีข้อมูลเดิม ให้สุ่มใหม่

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


    // เลือกโจทย์ที่สุ่มได้

    const currentQuestion = questionBank[savedQuestion.index];

    const currentChoices = savedQuestion.choices;


    // =======================================
    // 6. แสดงโจทย์และลูกโป่ง
    // =======================================

    questionText.textContent = currentQuestion.question;


    balloons.forEach((balloon, index) => {

        const choice = currentChoices[index];

        balloon.dataset.answer = choice;

        balloon.querySelector("span").textContent = choice;

        balloon.setAttribute(
            "aria-label",
            `ตัวเลือกที่ ${index + 1}: ${choice}`
        );

        balloon.setAttribute("aria-pressed", "false");

        balloon.classList.remove("selected", "pop");

        balloon.disabled = false;
    });


    // =======================================
    // 7. แสดง Progress Bar
    // =======================================

    circles.forEach((circle, index) => {

        const stage = index + 1;

        circle.classList.remove("active", "completed");

        if (stage < currentStage) {

            circle.classList.add("completed");

            circle.textContent = "✓";

        } else if (stage === currentStage) {

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
        stageText.textContent = "ด่าน 2 / 5";
    }


    // =======================================
    // 8. ตั้งค่าสถานะเริ่มเกม
    // =======================================

    let selectedAnswer = null;

    let answered = false;

    feedback.hidden = true;

    nextButton.hidden = true;

    submitButton.disabled = false;


    // =======================================
    // 9. เลือกลูกโป่ง
    // =======================================

    balloons.forEach(balloon => {

        balloon.addEventListener("click", () => {

            if (answered) return;

            // ล้างสถานะลูกโป่งก่อนหน้า
            balloons.forEach(item => {

                item.classList.remove("selected");

                item.setAttribute("aria-pressed", "false");
            });


            // เลือกลูกโป่งปัจจุบัน
            balloon.classList.add("selected");

            balloon.setAttribute("aria-pressed", "true");

            selectedAnswer = balloon.dataset.answer;

        });
    });


    // =======================================
    // 10. บันทึกคะแนน
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


        // บันทึกผลของด่านที่ 2
        results[2] = isCorrect;

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
    // 11. แสดง Popup
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
            `คุณเลือกลูกโป่ง ${selectedAnswer} ` +
            `เฉลยคือ ${currentQuestion.correctAnswer} ` +
            currentQuestion.explanation;


        feedback.hidden = false;

        feedbackDone.hidden = false;

        feedbackDone.focus();
    }


    // =======================================
    // 12. ปุ่มส่งคำตอบ
    // =======================================

    submitButton.addEventListener("click", () => {

        if (answered) return;


        // ยังไม่ได้เลือกลูกโป่ง
        if (selectedAnswer === null) {

            feedbackTitle.textContent =
                "เลือกคำตอบก่อนนะ!";

            feedbackTitle.className =
                "feedback-title wrong";

            feedbackMessage.textContent =
                "กรุณาเลือกลูกโป่ง 1 ลูกก่อนกดส่งคำตอบ";

            feedback.hidden = false;

            nextButton.hidden = true;

            return;
        }


        answered = true;

        // ตรวจสอบคำตอบ
        const isCorrect =
            selectedAnswer === currentQuestion.correctAnswer;


        // บันทึกคะแนน
        saveAnswer(isCorrect);


        // ปิดปุ่มส่งคำตอบ
        submitButton.disabled = true;


        // ปิดลูกโป่งและแสดงเอฟเฟกต์
        balloons.forEach((balloon, index) => {

            balloon.disabled = true;

            setTimeout(() => {

                balloon.classList.add("pop");

            }, index * 120);
        });


        // เปิด Popup เฉลย
        showFeedback(isCorrect);

    });


    // =======================================
    // 13. ปิด Popup เมื่อกดตกลง
    // =======================================

    feedbackDone.addEventListener("click", () => {

        feedback.hidden = true;

        // แสดงปุ่มถัดไปเฉพาะเมื่อตอบแล้ว
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
    // 15. ปุ่มย้อนกลับ (ถ้ามี)
    // =======================================

    if (backButton) {

        backButton.addEventListener("click", () => {

            window.location.href =
                document.body.dataset.back || "./ratioans.html";
        });
    }


    // =======================================
    // 16. เริ่มเกม
    // =======================================

    console.log("Ratioplay stage 2 พร้อมใช้งาน");

    console.log("โจทย์ที่สุ่มได้:", currentQuestion);

    console.log("ตัวเลือกที่สุ่มได้:", currentChoices);

})();
