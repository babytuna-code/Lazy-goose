
(function () {

    // =======================================
    // 1. คลังโจทย์ 5 ข้อ สำหรับด่านที่ 1
    // =======================================

    const questionBank = [
        {
            question: "ในตะกร้ามีส้ม 6 ผล และแตงโม 3 ผล อัตราส่วนแตงโมต่อส้มคือเท่าใด",
            answer1: 3,
            answer2: 6,
            answerText: "3 : 6 หรือ 1 : 2",
            explanation: "เพราะมีแตงโม 3 ผล และส้ม 6 ผล"
        },
        {
            question: "มีแมว 4 ตัว และสุนัข 8 ตัว อัตราส่วนแมวต่อสุนัขคือเท่าใด",
            answer1: 4,
            answer2: 8,
            answerText: "4 : 8 หรือ 1 : 2",
            explanation: "เพราะมีแมว 4 ตัว และสุนัข 8 ตัว"
        },
        {
            question: "มีดินสอ 10 แท่ง และปากกา 5 ด้าม อัตราส่วนปากกาต่อดินสอคือเท่าใด",
            answer1: 5,
            answer2: 10,
            answerText: "5 : 10 หรือ 1 : 2",
            explanation: "เพราะมีปากกา 5 ด้าม และดินสอ 10 แท่ง"
        },
        {
            question: "มีลูกบอลสีแดง 9 ลูก และสีน้ำเงิน 6 ลูก อัตราส่วนสีแดงต่อสีน้ำเงินคือเท่าใด",
            answer1: 9,
            answer2: 6,
            answerText: "9 : 6 หรือ 3 : 2",
            explanation: "เพราะมีลูกบอลสีแดง 9 ลูก และสีน้ำเงิน 6 ลูก"
        },
        {
            question: "มีนักเรียนชาย 12 คน และนักเรียนหญิง 8 คน อัตราส่วนนักเรียนชายต่อหญิงคือเท่าใด",
            answer1: 12,
            answer2: 8,
            answerText: "12 : 8 หรือ 3 : 2",
            explanation: "เพราะมีนักเรียนชาย 12 คน และนักเรียนหญิง 8 คน"
        }
    ];


    // =======================================
    // 2. ตั้งค่าด่าน
    // =======================================

    const currentStage = Number(document.body.dataset.stage);
    const nextPage = document.body.dataset.next;

    const QUESTION_KEY = "ratioStage1Question";


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

    const circles = document.querySelectorAll(".step-circle");
    const lines = document.querySelectorAll(".progress-line");
    const stageText = document.getElementById("stageText");


    // ตรวจสอบ HTML
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
        console.error("ไม่พบ Element ใน HTML กรุณาตรวจสอบ ID");
        return;
    }

    if (currentStage !== 1) {
        console.error("ไฟล์นี้ใช้สำหรับด่านที่ 1 เท่านั้น");
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

    const currentQuestion = questionBank[randomIndex];

    // แสดงโจทย์
    questionText.textContent = currentQuestion.question;


    // =======================================
    // 5. ตั้งค่าสถานะเริ่มต้น
    // =======================================

    let numbers = [1, 1];
    let hasSubmitted = false;

    // ซ่อน Popup และปุ่มถัดไปตั้งแต่เริ่มเกม
    feedbackOverlay.hidden = true;
    nextButton.hidden = true;

    // เปิดใช้งานปุ่มทั้งหมดตอนเริ่มเกม
    submitButton.disabled = false;

    document.querySelectorAll(".arrow").forEach(button => {
        button.disabled = false;
    });


    // =======================================
    // 6. Progress Bar
    // =======================================

    circles.forEach((circle, index) => {

        const stage = index + 1;

        if (stage < currentStage) {
            circle.classList.add("completed");
            circle.textContent = "✓";
        }

        else if (stage === currentStage) {
            circle.classList.add("active");
        }
    });

    lines.forEach((line, index) => {
        if (index + 1 < currentStage) {
            line.classList.add("completed");
        }
    });

    if (stageText) {
        stageText.textContent = "ด่าน 1 / 5";
    }


    // =======================================
    // 7. อัปเดตตัวเลข
    // =======================================

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

            console.log("ตัวเลขปัจจุบัน:", numbers);
        });
    });


    // =======================================
    // 9. กดส่งคำตอบ
    // =======================================

    submitButton.addEventListener("click", () => {

        if (hasSubmitted) return;

        hasSubmitted = true;

        // ตรวจสอบคำตอบ
        const isCorrect =
            numbers[0] * currentQuestion.answer2 ===
            numbers[1] * currentQuestion.answer1;


        // บันทึกผลคำตอบ
        let results = {};

        try {
            results = JSON.parse(
                localStorage.getItem("ratioResults") || "{}"
            );
        } catch (error) {
            results = {};
        }

        results[1] = isCorrect;

        localStorage.setItem(
            "ratioResults",
            JSON.stringify(results)
        );


        // บันทึกคะแนน
        const score = Object.values(results)
            .filter(result => result === true).length;

        localStorage.setItem("ratioScore", String(score));


        // แสดงผล Popup
        if (isCorrect) {

            feedbackTitle.textContent = "เก่งมาก! ตอบถูกแล้ว";
            feedbackTitle.className = "feedback-title correct";

        } else {

            feedbackTitle.textContent = "ยังไม่ถูกนะ";
            feedbackTitle.className = "feedback-title wrong";
        }

        feedbackMessage.textContent =
            `คำตอบของคุณคือ ${numbers[0]} : ${numbers[1]} ` +
            `เฉลยคือ ${currentQuestion.answerText} ` +
            currentQuestion.explanation;


        // ปิดการใช้งานปุ่มลูกศรและปุ่มส่งคำตอบ
        document.querySelectorAll(".arrow").forEach(button => {
            button.disabled = true;
        });

        submitButton.disabled = true;


        // แสดง Popup หลังจากกดส่งคำตอบเท่านั้น
        feedbackOverlay.hidden = false;

        feedbackDone.focus();

        console.log("ตรวจคำตอบเรียบร้อย:", isCorrect);

    });


    // =======================================
    // 10. กดตกลงเพื่อปิด Popup
    // =======================================

    feedbackDone.addEventListener("click", () => {

        feedbackOverlay.hidden = true;

        // แสดงปุ่มถัดไปหลังปิด Popup
        nextButton.hidden = false;

        console.log("แสดงปุ่มถัดไปแล้ว");

    });


    // กด Escape เพื่อปิด Popup
    document.addEventListener("keydown", event => {

        if (
            event.key === "Escape" &&
            feedbackOverlay.hidden === false &&
            hasSubmitted
        ) {
            feedbackOverlay.hidden = true;
            nextButton.hidden = false;
        }
    });


    // =======================================
    // 11. ปุ่มถัดไป
    // =======================================

    nextButton.addEventListener("click", () => {

        if (!hasSubmitted) return;

        if (nextPage) {
            window.location.href = nextPage;
        }
    });


    // =======================================
    // 12. เริ่มต้นเกม
    // =======================================

    updateNumbers();

    console.log("เริ่มเกมด่านที่ 1");
    console.log("โจทย์ที่สุ่มได้:", currentQuestion.question);

})();
