// =====================================================
// quiz.js — ระบบแบบทดสอบรวมบท 10 ข้อ (quiz1 - quiz10)
// แต่ละหน้ากำหนดโจทย์ผ่าน data-* ใน <div id="quiz">
//   data-type   : choice | match | beaker
//   data-answer : คำตอบที่ถูกต้อง
// กดส่งคำตอบ → บันทึกผลใน localStorage "testResults" แล้วปุ่มถัดไปเด้งขึ้นมา
// (ไม่แสดงเฉลย) แล้วไปรวมคะแนนที่ testscore.html
// =====================================================

(function () {

    const RESULT_KEY = "testResults";

    const body = document.body;
    const questionNo = Number(body.dataset.q);

    const quiz = document.getElementById("quiz");
    const type = quiz.dataset.type;

    const submitButton = document.getElementById("submitButton");
    const nextButton = document.getElementById("nextBtn");

    const feedbackOverlay = document.getElementById("feedbackOverlay");
    const feedbackTitle = document.getElementById("feedbackTitle");
    const feedbackMessage = document.getElementById("feedbackMessage");
    const feedbackDone = document.getElementById("feedbackDone");

    let hasSubmitted = false;


    // ---------- อ่าน / บันทึกผล ----------

    function readResults() {
        try {
            return JSON.parse(localStorage.getItem(RESULT_KEY) || "{}");
        } catch (error) {
            return {};
        }
    }

    // บันทึกถูก/ผิด และคำตอบที่เลือก (ให้หน้าหลังบ้านนำไปทำไฟล์ Excel)
    function saveResult(isCorrect, answerText) {
        const results = readResults();
        results[questionNo] = isCorrect;
        try {
            localStorage.setItem(RESULT_KEY, JSON.stringify(results));
            const answers = JSON.parse(localStorage.getItem("testAnswers") || "{}");
            answers[questionNo] = answerText;
            localStorage.setItem("testAnswers", JSON.stringify(answers));
        } catch (error) {
            console.warn("บันทึกคะแนนไม่ได้", error);
        }
    }

    // ซ่อนปุ่มถัดไปจนกว่าจะส่งคำตอบ (ถ้าเคยตอบข้อนี้แล้วให้แสดงได้เลย)
    if (nextButton && !(questionNo in readResults())) {
        nextButton.hidden = true;
    }


    // =====================================================
    // 1. แบบเลือกตอบ (แถบ / ลูกโป่ง / ถูก-ผิด)
    // =====================================================

    const options = Array.from(quiz.querySelectorAll(".option"));
    let chosen = null;

    options.forEach(option => {
        option.addEventListener("click", () => {
            if (hasSubmitted) return;
            options.forEach(o => {
                o.classList.remove("selected");
                o.setAttribute("aria-pressed", "false");
            });
            option.classList.add("selected");
            option.setAttribute("aria-pressed", "true");
            chosen = option.dataset.value;
        });
    });


    // =====================================================
    // 2. แบบจับคู่ (ข้อ 1)
    // =====================================================

    const pairs = {};          // { key ด้านซ้าย : value ด้านขวา }
    let pending = null;        // ปุ่มที่คลิกค้างไว้ (ซ้ายหรือขวา)
    const matchArea = document.getElementById("matchArea");
    const matchLines = document.getElementById("matchLines");

    function dotCenter(item) {
        const dot = item.querySelector(".dot").getBoundingClientRect();
        const area = matchArea.getBoundingClientRect();
        return {
            x: dot.left + dot.width / 2 - area.left,
            y: dot.top + dot.height / 2 - area.top
        };
    }

    function drawLines(wrongKeys = []) {
        if (!matchArea) return;
        matchLines.innerHTML = "";

        quiz.querySelectorAll(".m-item").forEach(item => item.classList.remove("linked"));

        Object.entries(pairs).forEach(([key, value]) => {
            const left = quiz.querySelector(`.m-left[data-key="${key}"]`);
            const right = quiz.querySelector(`.m-right[data-value="${value}"]`);
            if (!left || !right) return;

            left.classList.add("linked");
            right.classList.add("linked");

            const a = dotCenter(left);
            const b = dotCenter(right);
            const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
            line.setAttribute("x1", a.x);
            line.setAttribute("y1", a.y);
            line.setAttribute("x2", b.x);
            line.setAttribute("y2", b.y);
            if (wrongKeys.includes(key)) line.classList.add("wrong");
            matchLines.appendChild(line);
        });
    }

    function link(leftItem, rightItem) {
        const key = leftItem.dataset.key;
        const value = rightItem.dataset.value;

        // ด้านขวาหนึ่งช่องจับคู่ได้เพียงเส้นเดียว
        Object.keys(pairs).forEach(k => {
            if (pairs[k] === value) delete pairs[k];
        });

        pairs[key] = value;
        drawLines();
    }

    if (type === "match") {

        quiz.querySelectorAll(".m-item").forEach(item => {
            item.addEventListener("click", () => {
                if (hasSubmitted) return;

                const isLeft = item.classList.contains("m-left");

                if (pending && pending !== item &&
                    pending.classList.contains("m-left") !== isLeft) {
                    // จับคู่ได้: ซ้าย + ขวา
                    const leftItem = isLeft ? item : pending;
                    const rightItem = isLeft ? pending : item;
                    pending.classList.remove("pending");
                    pending = null;
                    link(leftItem, rightItem);
                    return;
                }

                // เริ่มเลือกใหม่
                if (pending) pending.classList.remove("pending");
                pending = (pending === item) ? null : item;
                if (pending) pending.classList.add("pending");
            });
        });

        window.addEventListener("resize", () => drawLines());
    }


    // =====================================================
    // 3. แบบบีกเกอร์เลื่อนขึ้น-ลง (ข้อ 8-9)
    // =====================================================

    const beaker = document.getElementById("beaker");
    const liquid = document.getElementById("liquid");
    const beakerValue = document.getElementById("beakerValue");
    const beakerUp = document.getElementById("beakerUp");
    const beakerDown = document.getElementById("beakerDown");

    const MAX = Number(quiz.dataset.max || 0);
    const STEP = Number(quiz.dataset.step || 1);
    const BASE = 18;    // % ความสูงของเลข 0 (ก้นบีกเกอร์โค้ง)
    const RANGE = 70;   // % ความสูงจาก 0 ถึงค่าสูงสุด
    let level = 0;
    let touched = false;

    function levelToPercent(value) {
        return BASE + (value / MAX) * RANGE;
    }

    function setLevel(value) {
        level = Math.max(0, Math.min(MAX, Math.round(value / STEP) * STEP));
        liquid.style.height = `${levelToPercent(level)}%`;
        beakerValue.textContent = level + (quiz.dataset.unit || "");
        beaker.setAttribute("aria-valuenow", String(level));
    }

    if (type === "beaker") {

        beaker.setAttribute("aria-valuemax", String(MAX));

        // สร้างขีดบอกค่า
        const ticks = document.getElementById("ticks");
        beaker.dataset.ticks.split(",").map(Number).forEach(value => {
            const tick = document.createElement("span");
            tick.className = "tick";
            tick.style.bottom = `${levelToPercent(value)}%`;
            tick.textContent = value;
            ticks.appendChild(tick);
        });

        function fromPointer(event) {
            const rect = beaker.getBoundingClientRect();
            const percent = ((rect.bottom - event.clientY) / rect.height) * 100;
            touched = true;
            setLevel(((percent - BASE) / RANGE) * MAX);
        }

        let dragging = false;

        beaker.addEventListener("pointerdown", event => {
            if (hasSubmitted) return;
            dragging = true;
            beaker.setPointerCapture(event.pointerId);
            fromPointer(event);
        });

        beaker.addEventListener("pointermove", event => {
            if (dragging && !hasSubmitted) fromPointer(event);
        });

        beaker.addEventListener("pointerup", () => { dragging = false; });
        beaker.addEventListener("pointercancel", () => { dragging = false; });

        beaker.addEventListener("keydown", event => {
            if (hasSubmitted) return;
            if (event.key === "ArrowUp") { touched = true; setLevel(level + STEP); event.preventDefault(); }
            if (event.key === "ArrowDown") { touched = true; setLevel(level - STEP); event.preventDefault(); }
        });

        beakerUp.addEventListener("click", () => { if (!hasSubmitted) { touched = true; setLevel(level + STEP); } });
        beakerDown.addEventListener("click", () => { if (!hasSubmitted) { touched = true; setLevel(level - STEP); } });

        setLevel(0);
    }


    // =====================================================
    // 4. ส่งคำตอบ
    // =====================================================

    function showPopup(title, titleClass, html) {
        feedbackTitle.textContent = title;
        feedbackTitle.className = `feedback-title ${titleClass}`;
        feedbackMessage.innerHTML = html;
        feedbackOverlay.hidden = false;
        feedbackDone.focus();
    }

    submitButton.addEventListener("click", () => {

        if (hasSubmitted) return;

        let isCorrect = false;
        let answerText = "";
        let wrongKeys = [];

        if (type === "choice") {
            if (chosen === null) {
                showPopup("ยังไม่ได้เลือกคำตอบ", "info", "กรุณาเลือกคำตอบก่อนกดส่งคำตอบนะ");
                return;
            }
            isCorrect = chosen === quiz.dataset.answer;
            const chosenButton = options.find(o => o.dataset.value === chosen);
            answerText = chosenButton ? chosenButton.textContent.trim() : chosen;
        }

        if (type === "match") {
            const lefts = quiz.querySelectorAll(".m-left");
            if (Object.keys(pairs).length < lefts.length) {
                showPopup("ยังจับคู่ไม่ครบ", "info", `กรุณาลากเส้นจับคู่ให้ครบทั้ง ${lefts.length} คู่`);
                return;
            }
            const answer = Object.fromEntries(
                quiz.dataset.answer.split(",").map(p => p.split("="))
            );
            wrongKeys = Object.keys(answer).filter(k => pairs[k] !== answer[k]);
            isCorrect = wrongKeys.length === 0;
            // เช่น "ซ้าย1→1:3, ซ้าย2→3:7, ซ้าย3→72:1"
            answerText = Array.from(lefts)
                .map((left, i) => `ซ้าย${i + 1}→${pairs[left.dataset.key]}`)
                .join(", ");
        }

        if (type === "beaker") {
            if (!touched) {
                showPopup("ยังไม่ได้เลือกคำตอบ", "info", "ลากระดับในบีกเกอร์ขึ้น-ลง หรือกดลูกศรเพื่อเลือกคำตอบ");
                return;
            }
            isCorrect = level === Number(quiz.dataset.answer);
            answerText = level + (quiz.dataset.unit || "");
        }

        hasSubmitted = true;
        saveResult(isCorrect, answerText);

        // ล็อกคำตอบ (ไม่แสดงเฉลย — ไปดูคะแนนรวมที่หน้าสุดท้าย)
        quiz.querySelectorAll("button").forEach(b => { b.disabled = true; });
        if (beaker) beaker.style.cursor = "default";
        submitButton.disabled = true;

        // แสดงปุ่มถัดไปทันที
        if (nextButton) {
            nextButton.hidden = false;
            nextButton.classList.add("pop-in");
            nextButton.focus({ preventScroll: true });
        }
    });


    // ---------- ปิด Popup ----------

    // ใช้เฉพาะตอนแจ้งเตือนว่ายังไม่ได้เลือกคำตอบ
    function closePopup() {
        feedbackOverlay.hidden = true;
    }

    feedbackDone.addEventListener("click", closePopup);

    document.addEventListener("keydown", event => {
        if (event.key === "Escape" && !feedbackOverlay.hidden) closePopup();
    });

})();
