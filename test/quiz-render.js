// =====================================================
// quiz-render.js — สร้างหน้าโจทย์จากคลังข้อสอบ (question-sets.js)
// ตามชุดข้อสอบที่นักเรียนได้รับ (เก็บไว้ตอนกรอกชื่อ) และเลขข้อของหน้า (data-q)
// ทำงานก่อน quiz.js ซึ่งเป็นตัวตรวจคำตอบ/บันทึกผล
// =====================================================

(function () {

    const questionNo = Number(document.body.dataset.q);

    // โจทย์ที่สุ่มไว้ให้ผู้สอบตอนกรอก username (ถ้าไม่มีข้อมูลใช้ชุดที่ 1)
    let ids = [];
    try {
        const student = JSON.parse(localStorage.getItem("testStudent") || "null");
        if (student && Array.isArray(student.questions)) ids = student.questions;
    } catch (error) { /* ใช้ชุดที่ 1 */ }

    const q = window.getQuestion(ids[questionNo - 1], questionNo);
    const area = document.getElementById("quizArea");

    const GOOSE = '<img class="goose xs" src="../pics/goose.png" alt="ห่านขาว">';
    const HEART = '<div class="heart"><svg viewBox="0 0 64 58" aria-hidden="true"><path d="M32 54S4 36 4 18C4 9 11 3 19 3c6 0 10 3 13 8 3-5 7-8 13-8 8 0 15 6 15 15 0 18-28 36-28 36Z" fill="#e8202a" stroke="#111" stroke-width="2"/><path d="M12 26h12l4-8 5 16 4-10 3 2h12" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg></div>';

    function attr(text) {
        return String(text).replace(/&/g, "&amp;").replace(/"/g, "&quot;");
    }

    // โจทย์สั้น: หัวข้ออย่างเดียว (ไม่มีห่านด้านซ้าย)
    // โจทย์ยาว: ห่านอยู่ด้านบน หัวข้อกว้างเต็มแถว
    function headRow(promptHTML) {
        const plain = promptHTML.replace(/<[^>]+>/g, "");
        if (plain.length > 45) {
            return `${GOOSE}<span class="pill small">${promptHTML}</span>`;
        }
        return `<span class="pill small">${promptHTML}</span>`;
    }

    function choiceButtons(options, cls) {
        return options.map(v =>
            `<button class="choice option" type="button" data-value="${attr(v)}" aria-pressed="false">${v}</button>`
        ).join("");
    }

    let html = "";

    switch (q.type) {

        case "match": {
            const left = q.left.map(item =>
                `<button class="m-item m-left" type="button" data-key="${item.key}"><span class="m-text">${item.text}</span><span class="dot"></span></button>`
            ).join("");
            const right = q.right.map(value =>
                `<button class="m-item m-right" type="button" data-value="${attr(value)}"><span class="dot"></span><span class="m-text">${value.replace(":", " : ")}</span></button>`
            ).join("");
            const answer = Object.entries(q.answer).map(([k, v]) => `${k}=${v}`).join(",");
            html = `${headRow(q.prompt)}
                <p class="q-help">คลิกจุดด้านซ้าย แล้วคลิกจุดด้านขวาเพื่อลากเส้นจับคู่</p>
                <div class="quiz" id="quiz" data-type="match" data-answer="${attr(answer)}">
                    <div class="match-area" id="matchArea">
                        <svg class="match-lines" id="matchLines" aria-hidden="true"></svg>
                        <div class="match-col left">${left}</div>
                        <div class="match-col right">${right}</div>
                    </div>
                </div>`;
            break;
        }

        case "tiles": {
            const tiles = q.tiles.join("").split("")
                .map(c => `<span class="tile${c === "1" ? " g" : ""}"></span>`).join("");
            html = `<p class="b">${q.intro}</p>
                <div class="tiles" aria-label="ตารางกระเบื้อง 5 คูณ 5 แผ่น">${tiles}</div>
                <span class="pill small">${q.prompt}</span>
                <div class="quiz" id="quiz" data-type="choice" data-answer="${attr(q.answer)}">
                    <div class="choices grid">${choiceButtons(q.options)}</div>
                </div>`;
            break;
        }

        case "balloon": {
            const colors = ["red", "green", "purple"];
            const balloons = q.options.map((v, i) =>
                `<button class="balloon option ${colors[i]}" type="button" data-value="${attr(v)}" aria-pressed="false"><span>${v}</span></button>`
            ).join("");
            html = `${headRow(q.prompt)}
                <div class="quiz" id="quiz" data-type="choice" data-answer="${attr(q.answer)}">
                    <div class="balloon-area">
                        <svg class="strings" viewBox="0 0 300 260" preserveAspectRatio="none" aria-hidden="true">
                            <line x1="62" y1="140" x2="150" y2="245"/>
                            <line x1="150" y1="90" x2="150" y2="245"/>
                            <line x1="238" y1="150" x2="150" y2="245"/>
                            <circle cx="150" cy="245" r="6"/>
                        </svg>
                        ${balloons}
                    </div>
                </div>`;
            break;
        }

        case "list": {
            const top = q.icon === "heart"
                ? `${HEART}<span class="pill small">${q.prompt}</span>`
                : headRow(q.prompt);
            html = `${top}
                <div class="quiz" id="quiz" data-type="choice" data-answer="${attr(q.answer)}">
                    <div class="choices list">${choiceButtons(q.options)}</div>
                </div>`;
            break;
        }

        case "tf": {
            html = `${headRow("พิจารณาข้อความดังต่อไปนี้")}
                <div class="box bordered statement">${q.statement}</div>
                <div class="quiz" id="quiz" data-type="choice" data-answer="${q.answer}">
                    <div class="tf-row">
                        <button class="tf option yes" type="button" data-value="true" aria-pressed="false">ถูกต้อง</button>
                        <button class="tf option no" type="button" data-value="false" aria-pressed="false">ไม่ถูกต้อง</button>
                    </div>
                </div>`;
            break;
        }

        case "beaker": {
            html = `${headRow(q.prompt)}
                <div class="quiz" id="quiz" data-type="beaker" data-max="${q.max}" data-step="${q.step}"
                    data-answer="${q.answer}" data-unit="${q.unit || ""}">
                    <div class="beaker-wrap">
                        <div class="beaker-controls">
                            <button class="arrow arrow-up" type="button" id="beakerUp" aria-label="เพิ่มค่า"></button>
                            <span class="beaker-value" id="beakerValue">0</span>
                            <button class="arrow arrow-down" type="button" id="beakerDown" aria-label="ลดค่า"></button>
                        </div>
                        <div class="beaker" id="beaker" data-ticks="${q.ticks.join(",")}" style="--liquid:${q.color}"
                            role="slider" tabindex="0" aria-label="เลื่อนระดับของเหลวเพื่อเลือกคำตอบ"
                            aria-valuemin="0" aria-valuenow="0">
                            <div class="liquid" id="liquid"></div>
                            <div class="ticks" id="ticks"></div>
                        </div>
                        <p class="beaker-help">( ลากขึ้น-ลงในบีกเกอร์ หรือกดลูกศร )</p>
                    </div>
                </div>`;
            break;
        }
    }

    area.outerHTML = html;

})();
