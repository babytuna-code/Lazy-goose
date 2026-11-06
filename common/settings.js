// =====================================================
// settings.js — ปุ่มตั้งค่า (ฟันเฟือง) → เมนู "คู่มือ" และ "บทเรียน"
// และป๊อปอัปคู่มือ ใช้ร่วมกันทุกหน้า
// =====================================================

(function () {

    function goTo(url) {
        if (url) {
            window.location.href = url;
        }
    }

    // ---------- 1. ป๊อปอัปคู่มือ ----------

    const guideHTML = `
        <div class="guide-overlay" id="guideOverlay" hidden>
            <section class="guide-popup" role="dialog" aria-modal="true" aria-labelledby="guideTitle">
                <div class="guide-header">
                    <span class="guide-title" id="guideTitle">คู่มือ</span>
                </div>
                <div class="guide-content">
                    <h3>คำแนะนำในการใช้สื่อ</h3>
                    <ol>
                        <li>ศึกษาเนื้อหาตามลำดับที่กำหนด</li>
                        <li>ทำความเข้าใจตัวอย่างและวิธีการแก้โจทย์ในแต่ละหัวข้อ</li>
                        <li>ทบทวนเนื้อหาและทำแบบฝึกหัดเพื่อประเมินความเข้าใจของตนเอง</li>
                        <li>หากไม่เข้าใจเนื้อหา สามารถย้อนกลับไปศึกษาเนื้อหาและตัวอย่างในหัวข้อนั้นได้อีกครั้ง</li>
                        <li>ควรศึกษาด้วยตนเองอย่างสม่ำเสมอ เพื่อพัฒนาความรู้และทักษะทางคณิตศาสตร์</li>
                    </ol>
                    <p class="guide-credit">ผู้จัดทำ : <span class="nw">ปรัชญา ฤทธิ์ขันธ์,</span> <span class="nw">จตุรพร ตั้งประสมสุข</span> <span class="nw">และธีรภัทร กาบแก้ว</span></p>
                </div>
                <div class="guide-footer">
                    <button type="button" class="guide-done" id="guideDone">ตกลง</button>
                </div>
            </section>
        </div>`;

    // ถ้าหน้านั้นมีป๊อปอัปคู่มืออยู่แล้ว (เช่น index.html) ให้ใช้ของเดิม
    if (!document.getElementById("guideOverlay")) {
        document.body.insertAdjacentHTML("beforeend", guideHTML);
    }

    const guideOverlay = document.getElementById("guideOverlay");

    // ย้ายป๊อปอัปมาไว้ท้าย body เพื่อให้ลอยอยู่เหนือคลื่นและทุกอย่างในหน้า
    if (guideOverlay.parentElement !== document.body) {
        document.body.appendChild(guideOverlay);
    }
    const guideDone = document.getElementById("guideDone") || document.getElementById("doneGuide");

    function showGuide() {
        guideOverlay.hidden = false;
        guideDone.focus({ preventScroll: true });
    }

    function hideGuide() {
        guideOverlay.hidden = true;
    }

    guideDone.addEventListener("click", hideGuide);

    guideOverlay.addEventListener("click", event => {
        if (event.target === guideOverlay) hideGuide();
    });



    // ---------- 1.5 ป๊อปอัปสรุปเนื้อหา (แยกหน้าละบท เลื่อนซ้าย-ขวา) ----------

    const SUMMARY_PAGES = [
        {
            key: "ratio",
            title: "อัตราส่วน",
            html: `
                <h4>อัตราส่วน</h4>
                <p>เป็นการเปรียบเทียบ<b class="r">สองปริมาณ</b> อาจมีหน่วยเดียวกันหรือต่างกันก็ได้
                อัตราส่วนของปริมาณ a ต่อ b เขียนแทนด้วย <b>a : b</b> หรือ <span class="sfrac"><span>a</span><span>b</span></span></p>
                <h4>อัตราส่วนที่เท่ากัน</h4>
                <p><b class="b">หลักการคูณ</b> เมื่อคูณแต่ละจำนวนในอัตราส่วนด้วยจำนวนเดียวกันที่ไม่เท่ากับศูนย์
                จะได้อัตราส่วนใหม่ที่เท่ากับอัตราส่วนเดิม</p>
                <p><b class="b">หลักการหาร</b> เมื่อหารแต่ละจำนวนในอัตราส่วนด้วยจำนวนเดียวกันที่ไม่เท่ากับศูนย์
                จะได้อัตราส่วนใหม่ที่เท่ากับอัตราส่วนเดิม</p>
                <p>ตรวจสอบการเท่ากันของอัตราส่วนได้ด้วยการคูณไขว้</p>
                <h4>อัตราส่วนหลาย ๆ จำนวน</h4>
                <p>จาก a : b : c เขียนอัตราส่วนทีละสองจำนวนได้เป็น <b>a : b, b : c, a : c</b>
                ถ้ามีมากกว่าสามจำนวนก็ใช้หลักการเดียวกัน</p>`
        },
        {
            key: "prop",
            title: "สัดส่วน",
            html: `
                <h4>สัดส่วน</h4>
                <p>ประโยคที่แสดงการเท่ากันของอัตราส่วน<b class="r">สองอัตราส่วน</b></p>
                <h4>สัดส่วนตรง</h4>
                <p>ปริมาณ 2 ชุดที่เปลี่ยนแปลงค่าไปใน<b class="b">ทางเดียวกัน</b></p>
                <p class="center"><span class="sfrac"><span>A<sub>1</sub></span><span>A<sub>2</sub></span></span> = <span class="sfrac"><span>B<sub>1</sub></span><span>B<sub>2</sub></span></span></p>
                <h4>สัดส่วนผกผัน</h4>
                <p>ปริมาณ 2 ชุดที่เปลี่ยนแปลงค่าไปใน<b class="b">ทางกลับกัน</b></p>
                <p class="center"><span class="sfrac"><span>X<sub>1</sub></span><span>X<sub>2</sub></span></span> = <span class="sfrac"><span>Y<sub>2</sub></span><span>Y<sub>1</sub></span></span></p>
                <h4>เมื่อมีจำนวนที่ไม่ทราบค่า</h4>
                <p>หาจำนวนที่แทนตัวแปรได้โดย<b class="r">ใช้การคูณไขว้และการแก้สมการ</b></p>`
        },
        {
            key: "percent",
            title: "ร้อยละ",
            html: `
                <h4>ร้อยละ หรือ เปอร์เซ็นต์ (Percent)</h4>
                <p>เป็นอัตราส่วนแสดงการเปรียบเทียบปริมาณใดปริมาณหนึ่ง<b class="r">ต่อ 100</b>
                เช่น 50% หมายถึง 50 ส่วนใน 100 ส่วน เขียนแทนด้วย 50 : 100 หรือ <span class="sfrac"><span>50</span><span>100</span></span></p>
                <h4>อัตราส่วน → ร้อยละ</h4>
                <p>ทำให้จำนวนหลังของอัตราส่วนเป็น 100 แล้วจำนวนแรกคือค่าของร้อยละ
                เช่น <span class="sfrac"><span>1</span><span>4</span></span> = <span class="sfrac"><span>1 × 25</span><span>4 × 25</span></span> = <span class="sfrac"><span>25</span><span>100</span></span> = 25%</p>
                <h4>ร้อยละ → อัตราส่วน</h4>
                <p>เขียนเป็นอัตราส่วนที่มีจำนวนแรกเป็นค่าของร้อยละ และจำนวนหลังเป็น 100
                เช่น 33% = 33 : 100 = <span class="sfrac"><span>33</span><span>100</span></span></p>
                <h4>การคำนวณเกี่ยวกับร้อยละ</h4>
                <p>ใช้ความรู้เรื่อง<b class="b">สัดส่วน</b> เช่น 25% ของ 60 ให้เท่ากับ a
                จะได้ <span class="sfrac"><span>a</span><span>60</span></span> = <span class="sfrac"><span>25</span><span>100</span></span> ดังนั้น a = 15</p>`
        }
    ];

    const summaryHTML = `
        <div class="guide-overlay" id="summaryOverlay" hidden>
            <section class="guide-popup summary-popup" role="dialog" aria-modal="true" aria-labelledby="summaryTitle">
                <div class="guide-header">
                    <span class="guide-title" id="summaryTitle">สรุป</span>
                </div>
                <p class="summary-chapter" id="summaryChapter"></p>
                <div class="guide-content summary-content" id="summaryContent"></div>
                <div class="summary-nav">
                    <button type="button" class="summary-arrow" id="summaryPrev" aria-label="บทก่อนหน้า">◀</button>
                    <span class="summary-dots" id="summaryDots"></span>
                    <button type="button" class="summary-arrow" id="summaryNext" aria-label="บทถัดไป">▶</button>
                </div>
                <div class="guide-footer">
                    <button type="button" class="guide-done" id="summaryDone">ตกลง</button>
                </div>
            </section>
        </div>`;

    document.body.insertAdjacentHTML("beforeend", summaryHTML);

    const summaryOverlay = document.getElementById("summaryOverlay");
    const summaryContent = document.getElementById("summaryContent");
    const summaryChapter = document.getElementById("summaryChapter");
    const summaryDots = document.getElementById("summaryDots");
    const summaryPrev = document.getElementById("summaryPrev");
    const summaryNext = document.getElementById("summaryNext");
    let summaryIndex = 0;

    function renderSummary() {
        const page = SUMMARY_PAGES[summaryIndex];
        summaryChapter.textContent = `บทที่ ${summaryIndex + 1} ${page.title}`;
        summaryContent.innerHTML = page.html;
        summaryContent.scrollTop = 0;
        summaryDots.innerHTML = SUMMARY_PAGES.map((_, i) =>
            `<span class="sdot${i === summaryIndex ? " on" : ""}"></span>`).join("");
        summaryPrev.disabled = summaryIndex === 0;
        summaryNext.disabled = summaryIndex === SUMMARY_PAGES.length - 1;
    }

    function showSummary() {
        // เปิดที่บทของหน้าปัจจุบัน (ถ้าอยู่ในโฟลเดอร์บทนั้น)
        const folder = window.location.pathname.split("/").slice(-2, -1)[0];
        const found = SUMMARY_PAGES.findIndex(p => p.key === folder);
        summaryIndex = found >= 0 ? found : 0;
        renderSummary();
        summaryOverlay.hidden = false;
        document.getElementById("summaryDone").focus({ preventScroll: true });
    }

    function hideSummary() {
        summaryOverlay.hidden = true;
    }

    summaryPrev.addEventListener("click", () => { if (summaryIndex > 0) { summaryIndex--; renderSummary(); } });
    summaryNext.addEventListener("click", () => { if (summaryIndex < SUMMARY_PAGES.length - 1) { summaryIndex++; renderSummary(); } });
    document.getElementById("summaryDone").addEventListener("click", hideSummary);
    summaryOverlay.addEventListener("click", event => { if (event.target === summaryOverlay) hideSummary(); });
    document.addEventListener("keydown", event => {
        if (summaryOverlay.hidden) return;
        if (event.key === "ArrowLeft") summaryPrev.click();
        if (event.key === "ArrowRight") summaryNext.click();
        if (event.key === "Escape") hideSummary();
    });

    // ---------- 2. ปุ่มตั้งค่า (ฟันเฟือง) ----------

    const settingsButton = document.getElementById("settingsButton");
    const settingsMenu = document.getElementById("settingsMenu");

    if (settingsButton && settingsMenu) {

        settingsButton.addEventListener("click", event => {
            event.stopPropagation();
            settingsMenu.hidden = !settingsMenu.hidden;
            settingsButton.setAttribute("aria-expanded", String(!settingsMenu.hidden));
        });

        // คลิกที่อื่นเพื่อปิดเมนู
        document.addEventListener("click", event => {
            if (!settingsMenu.hidden && !settingsMenu.contains(event.target)) {
                settingsMenu.hidden = true;
                settingsButton.setAttribute("aria-expanded", "false");
            }
        });

        // เพิ่มปุ่ม "สรุป" ต่อจาก "คู่มือ" (เฉพาะเมนูที่มีปุ่ม "บทเรียน")
        if (settingsMenu.querySelector("[data-action='lessons']") &&
            !settingsMenu.querySelector("[data-action='summary']")) {
            const summaryItem = document.createElement("button");
            summaryItem.type = "button";
            summaryItem.dataset.action = "summary";
            summaryItem.textContent = "สรุป";
            settingsMenu.querySelector("[data-action='lessons']").before(summaryItem);
        }

        const summaryItemButton = settingsMenu.querySelector("[data-action='summary']");
        if (summaryItemButton) {
            summaryItemButton.addEventListener("click", () => {
                settingsMenu.hidden = true;
                showSummary();
            });
        }

        const guideItem = settingsMenu.querySelector("[data-action='guide']");
        const lessonItem = settingsMenu.querySelector("[data-action='lessons']");

        if (guideItem) {
            guideItem.addEventListener("click", () => {
                settingsMenu.hidden = true;
                showGuide();
            });
        }

        // "บทเรียน" → กลับไปหน้าเลือกบทเรียน
        if (lessonItem) {
            lessonItem.addEventListener("click", () => goTo("../menu/menu.html"));
        }
    }

    // กด Escape เพื่อปิดเมนูและคู่มือ
    document.addEventListener("keydown", event => {
        if (event.key !== "Escape") return;
        hideGuide();
        if (settingsMenu) settingsMenu.hidden = true;
    });


})();
