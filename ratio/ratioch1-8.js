// =====================================================
// ratioch1-8 : เกมเลือกอัตราส่วนที่เท่ากับอัตราส่วนที่กำหนด
// สุ่มโจทย์ 1 ใน 5 ข้อ แต่ละข้อมีคำตอบที่ถูก 3 คำตอบ
// คลิกเลือกได้หลายคำตอบในกล่องใหญ่ แล้วกด "ส่งคำตอบ"
// =====================================================

(function () {

    // คลังโจทย์ 5 ข้อ: [อัตราส่วนที่กำหนด, คำตอบที่ถูก 3 คำตอบ, ตัวลวง 8 ตัว]
    const QUESTIONS = [
        { target: "1 : 3", correct: ["4 : 12", "3 : 9", "2 : 6"],
          wrong: ["2 : 3", "2 : 9", "3 : 4", "2 : 10", "4 : 11", "6 : 9", "2 : 5", "4 : 2"] },
        { target: "1 : 2", correct: ["2 : 4", "3 : 6", "5 : 10"],
          wrong: ["2 : 1", "3 : 5", "4 : 6", "2 : 5", "6 : 10", "3 : 4", "4 : 9", "5 : 8"] },
        { target: "2 : 3", correct: ["4 : 6", "6 : 9", "8 : 12"],
          wrong: ["3 : 2", "4 : 9", "2 : 6", "6 : 8", "3 : 4", "5 : 6", "8 : 10", "9 : 6"] },
        { target: "3 : 4", correct: ["6 : 8", "9 : 12", "12 : 16"],
          wrong: ["4 : 3", "3 : 8", "6 : 9", "8 : 12", "9 : 16", "4 : 5", "12 : 9", "5 : 6"] },
        { target: "2 : 5", correct: ["4 : 10", "6 : 15", "8 : 20"],
          wrong: ["5 : 2", "2 : 10", "4 : 5", "6 : 10", "10 : 4", "3 : 5", "4 : 8", "5 : 15"] }
    ];

    // ตำแหน่งตัวเลือกในกล่อง (ซ้าย%, บน%) — เว้นมุมขวาล่างไว้ให้รูปห่าน
    const POSITIONS = [
        [20, 4], [57, 10], [6, 20], [39, 26], [18, 42], [60, 40],
        [5, 60], [36, 57], [62, 60], [8, 80], [40, 80]
    ];

    const board = document.getElementById("gameBoard");
    const title = document.getElementById("gameTitle");
    const submitButton = document.getElementById("gameSubmit");
    const retryButton = document.getElementById("gameRetry");
    const hint = document.getElementById("gameHint");
    const win = document.getElementById("gameWin");
    const status = document.getElementById("gameStatus");

    let current = null;
    let chips = [];
    let lastIndex = -1;

    function shuffle(list) {
        const a = list.slice();
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }

    // สุ่มโจทย์ใหม่ (ไม่ซ้ำข้อเดิม) แล้ววางตัวเลือกแบบสุ่มตำแหน่ง
    function newQuestion() {
        let index;
        do {
            index = Math.floor(Math.random() * QUESTIONS.length);
        } while (index === lastIndex && QUESTIONS.length > 1);
        lastIndex = index;
        current = QUESTIONS[index];

        title.textContent = `เลือกอัตราส่วนที่เท่ากับอัตราส่วน ${current.target} !`;

        board.querySelectorAll(".ratio-chip").forEach(chip => chip.remove());

        const values = shuffle([...current.correct, ...current.wrong]);
        const goose = board.querySelector(".board-goose");

        chips = values.map((value, i) => {
            const chip = document.createElement("button");
            chip.type = "button";
            chip.className = "ratio-chip";
            chip.dataset.value = value;
            chip.style.left = POSITIONS[i][0] + "%";
            chip.style.top = POSITIONS[i][1] + "%";
            chip.setAttribute("aria-pressed", "false");
            chip.textContent = value;
            chip.addEventListener("click", () => {
                chip.classList.remove("wrong");
                chip.classList.toggle("selected");
                chip.setAttribute("aria-pressed", String(chip.classList.contains("selected")));
            });
            board.insertBefore(chip, goose);
            return chip;
        });

        win.hidden = true;
        hint.hidden = true;
        status.textContent = "คลิกเพื่อเลือกคำตอบที่ถูกต้องทั้งหมด";
        status.classList.remove("c-red");
        submitButton.hidden = false;
        retryButton.hidden = true;
    }

    // ส่งคำตอบ
    submitButton.addEventListener("click", () => {

        const answers = current.correct;
        const selected = chips.filter(chip => chip.classList.contains("selected"));
        const wrongPicks = selected.filter(chip => !answers.includes(chip.dataset.value));
        const correctPicks = selected.filter(chip => answers.includes(chip.dataset.value));

        const isCorrect = wrongPicks.length === 0 && correctPicks.length === answers.length;

        if (isCorrect) {
            chips.forEach(chip => {
                chip.disabled = true;
                if (answers.includes(chip.dataset.value)) {
                    chip.classList.remove("selected");
                    chip.classList.add("correct");
                }
            });

            hint.hidden = true;
            win.hidden = false;
            win.innerHTML = `เก่งมาก ! ตอบถูกครบทั้ง 3 คำตอบ<br>${answers.join(" = ")} = ${current.target}`;
            status.textContent = "ถูกต้อง !";
            status.classList.remove("c-red");
            submitButton.hidden = true;
            retryButton.hidden = false;
            return;
        }

        // ตอบผิดหรือตอบไม่ครบ → ตัวที่เลือกผิดจะสั่นแล้วถูกยกเลิก
        wrongPicks.forEach(chip => {
            chip.classList.remove("selected");
            chip.classList.add("wrong");
            chip.setAttribute("aria-pressed", "false");
            setTimeout(() => chip.classList.remove("wrong"), 700);
        });

        status.textContent = "(ตอบผิดหรือตอบไม่ครบ)";
        status.classList.add("c-red");
        hint.hidden = false;
    });

    // เล่นอีกครั้ง (สุ่มข้อใหม่)
    retryButton.addEventListener("click", newQuestion);

    newQuestion();

})();
