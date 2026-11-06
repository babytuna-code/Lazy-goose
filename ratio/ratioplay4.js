
(function () {

    // =======================================
    // 1. คลังโจทย์ 5 ข้อ สำหรับด่านที่ 4
    // =======================================

    const questionBank = [

        // ข้อ 1
        {
            question: "อัตราส่วนใดเท่ากับอัตราส่วน 1 : 3 : 2",

            choices: ["3:9:6", "2:4:5", "3:9:8"],

            correctAnswer: "3:9:6",

            explanation:
                "เพราะนำ 1 : 3 : 2 คูณด้วย 3 ทุกจำนวน จะได้ 3 : 9 : 6"
        },

        // ข้อ 2
        {
            question: "อัตราส่วนใดเท่ากับอัตราส่วน 2 : 5 : 3",

            choices: ["4:10:6", "4:10:8", "6:10:6"],

            correctAnswer: "4:10:6",

            explanation:
                "เพราะนำ 2 : 5 : 3 คูณด้วย 2 ทุกจำนวน จะได้ 4 : 10 : 6"
        },

        // ข้อ 3
        {
            question: "อัตราส่วนใดเท่ากับอัตราส่วน 3 : 2 : 4",

            choices: ["6:4:8", "6:8:8", "9:4:12"],

            correctAnswer: "6:4:8",

            explanation:
                "เพราะนำ 3 : 2 : 4 คูณด้วย 2 ทุกจำนวน จะได้ 6 : 4 : 8"
        },

        // ข้อ 4
        {
            question: "อัตราส่วนใดเท่ากับอัตราส่วน 2 : 3 : 5",

            choices: ["4:6:10", "4:9:10", "6:9:12"],

            correctAnswer: "4:6:10",

            explanation:
                "เพราะนำ 2 : 3 : 5 คูณด้วย 2 ทุกจำนวน จะได้ 4 : 6 : 10"
        },

        // ข้อ 5
        {
            question: "อัตราส่วนใดเท่ากับอัตราส่วน 4 : 1 : 3",

            choices: ["8:2:6", "8:3:6", "12:3:12"],

            correctAnswer: "8:2:6",

            explanation:
                "เพราะนำ 4 : 1 : 3 คูณด้วย 2 ทุกจำนวน จะได้ 8 : 2 : 6"
        }

    ];


    // =======================================
    // 2. ตั้งค่าด่านที่ 4
    // =======================================

    const currentStage = Number(document.body.dataset.stage);

    const nextPage = document.body.dataset.next ||
        "./ratioplay5.html";

    const backPage = document.body.dataset.back ||
        "./ratioplay3.html";

    const QUESTION_KEY = "ratioStage4Question";

    if (currentStage !== 4) {
        console.error("ไฟล์นี้ใช้สำหรับด่านที่ 4 เท่านั้น");
        return;
    }


    // =======================================
    // 3. เชื่อม HTML
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

    const circles = document.querySelectorAll(".step-circle");

    const lines = document.querySelectorAll(".progress-line");

    const stageText = document.getElementById("stageText");

    const backButton = document.getElementById("backButton");


    // ตรวจสอบ Element ใน HTML

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

        console.error("ไม่พบ Element ที่จำเป็นใน HTML ด่าน 4");
        return;
    }


    // =======================================
    // 4. ฟังก์ชันสุ่มตำแหน่งตัวเลือก
    // =======================================

    function shuffleArray(array) {

        const shuffled = [...array];

        for (let i = shuffled.length - 1; i > 0; i--) {

            const j = Math.floor(
                Math.random() * (i + 1)
            );

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


    // ตรวจสอบข้อมูลโจทย์เดิม

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


    // ถ้าไม่มีข้อมูลเดิม ให้สุ่มใหม่

    if (!isValidSavedQuestion(savedQuestion)) {

        // สุ่มโจทย์ 1 ข้อ
        const randomIndex = Math.floor(
            Math.random() * questionBank.length
        );

        // สุ่มตำแหน่งตัวเลือกทั้ง 3 ลูก
        const randomChoices = shuffleArray(
            questionBank[randomIndex].choices
        );

        savedQuestion = {
            index: randomIndex,
            choices: randomChoices
        };

        // บันทึกโจทย์ที่สุ่มได้
        sessionStorage.setItem(
            QUESTION_KEY,
            JSON.stringify(savedQuestion)
        );
    }


    // เลือกโจทย์ปัจจุบัน

    const currentQuestion =
        questionBank[savedQuestion.index];

    const currentChoices =
        savedQuestion.choices;


    // =======================================
    // 6. แสดงโจทย์และตัวเลือกลูกโป่ง
    // =======================================

    questionText.textContent =
        currentQuestion.question;


    balloons.forEach((balloon, index) => {

        const choice = currentChoices[index];

        balloon.dataset.answer = choice;

        balloon.querySelector("span").textContent =
            choice;

        balloon.setAttribute(
            "aria-label",
            `ตัวเลือกที่ ${index + 1}: ${choice}`
        );

        balloon.setAttribute(
            "aria-pressed",
            "false"
        );

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
        stageText.textContent = "ด่าน 4 / 5";
    }


    // =======================================
    // 8. ตั้งค่าสถานะเริ่มต้น
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

            // ล้างสถานะลูกโป่งเดิม
            balloons.forEach(item => {

                item.classList.remove("selected");

                item.setAttribute(
                    "aria-pressed",
                    "false"
                );
            });


            // เลือกลูกโป่งปัจจุบัน
            balloon.classList.add("selected");

            balloon.setAttribute(
                "aria-pressed",
                "true"
            );

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


        // บันทึกผลของด่านที่ 4
        results[4] = isCorrect;

        localStorage.setItem(
            "ratioResults",
            JSON.stringify(results)
        );


        // คำนวณคะแนนรวม
        const score = Object.values(results).filter(
            result => result === true
        ).length;

        localStorage.setItem(
            "ratioScore",
            String(score)
        );
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

        feedbackDone.focus();
    }


    // =======================================
    // 12. ปุ่มส่งคำตอบ
    // =======================================

    submitButton.addEventListener("click", () => {

        if (answered) return;


        // ถ้ายังไม่ได้เลือกคำตอบ

        if (selectedAnswer === null) {

            feedbackTitle.textContent =
                "เลือกลูกโป่งก่อนนะ!";

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


        // บันทึกคะแนนด่านที่ 4

        saveAnswer(isCorrect);


        // ปิดการเลือกลูกโป่งและปุ่มส่งคำตอบ

        balloons.forEach((balloon, index) => {

            balloon.disabled = true;

            // เอฟเฟกต์ลูกโป่งแตก
            setTimeout(() => {

                balloon.classList.add("pop");

            }, index * 120);
        });

        submitButton.disabled = true;


        // แสดง Popup เฉลย

        showFeedback(isCorrect);
    });


    // =======================================
    // 13. ปิด Popup เมื่อกดตกลง
    // =======================================

    feedbackDone.addEventListener("click", () => {

        feedback.hidden = true;

        // แสดงปุ่มถัดไปหลังตอบและปิด Popup
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

            window.location.href = backPage;
        });
    }


    // =======================================
    // 16. เริ่มต้นเกม
    // =======================================

    console.log("Ratioplay stage 4 พร้อมใช้งาน");
    console.log("โจทย์ที่สุ่มได้:", currentQuestion);
    console.log("ตัวเลือกลูกโป่ง:", currentChoices);

})();
