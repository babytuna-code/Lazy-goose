
const playButton = document.getElementById("playButton");

playButton.addEventListener("click", () => {
  window.location.href = "./menu/menu.html";
});

const openGuide = document.getElementById("openGuide");
const closeGuide = document.getElementById("closeGuide");
const doneGuide = document.getElementById("doneGuide");
const guideOverlay = document.getElementById("guideOverlay");

// เปิดป๊อปอัพคู่มือ (ตอนนี้เปิดจากปุ่มฟันเฟือง → คู่มือ ผ่าน common/settings.js)
function showGuide() {
    guideOverlay.hidden = false;
    doneGuide.focus({ preventScroll: true });
}

// ปิดป๊อปอัพคู่มือ
function hideGuide() {
    guideOverlay.hidden = true;
}

// ปุ่มเปิดคู่มือ (ถ้ายังมีปุ่มเดิมอยู่)
if (openGuide) {
    openGuide.addEventListener("click", showGuide);
}

// ปุ่มตกลงปิดคู่มือ
doneGuide.addEventListener("click", hideGuide);

// คลิกบริเวณมืดด้านนอกเพื่อปิด
guideOverlay.addEventListener("click", function (event) {
    if (event.target === guideOverlay) {
        hideGuide();
    }
});

// กด Escape เพื่อปิด
document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && !guideOverlay.hidden) {
        hideGuide();
    }
});
