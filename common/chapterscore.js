// =====================================================
// chapterscore.js — รวมองค์ประกอบหน้าคะแนนเกมท้ายบทไว้ในกล่องเดียวกลางจอ
// (บางหน้ามีแท็ก div ปิดไม่ครบ ทำให้ตำแหน่งเพี้ยน)
// =====================================================

(function () {
    const wrap = document.createElement("main");
    wrap.className = "cs-wrap";
    [".score-heading", ".score-box", ".goose-container", "#result-message",
        "#retry-button", "#lesson-button"].forEach(selector => {
        const el = document.querySelector(selector);
        if (el) wrap.appendChild(el);
    });
    document.body.appendChild(wrap);
})();
