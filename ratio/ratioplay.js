
const currentStage = Number(document.body.dataset.stage);
const nextPage = document.body.dataset.next;
const backPage = document.body.dataset.back || "ratio.html";

const circles = document.querySelectorAll(".step-circle");
const lines = document.querySelectorAll(".progress-line");
const stageText = document.getElementById("stageText");
const nextButton = document.getElementById("nextButton");
const backButton = document.getElementById("backButton");

// แสดงสถานะ Progress Bar
circles.forEach((circle, index) => {
  const stage = index + 1;

  if (stage < currentStage) {
    circle.classList.add("completed");
    circle.textContent = "✓";
  } else if (stage === currentStage) {
    circle.classList.add("active");
  }
});

// แสดงเส้นเชื่อมของด่านที่ผ่านแล้ว
lines.forEach((line, index) => {
  if (index + 1 < currentStage) {
    line.classList.add("completed");
  }
});

// แสดงหมายเลขด่าน
if (stageText) {
  stageText.textContent = `ด่าน ${currentStage} / 5`;
}

// ปุ่มถัดไป
if (nextButton && nextPage) {
  nextButton.addEventListener("click", () => {
    window.location.href = nextPage;
  });
}

// ปุ่มย้อนกลับ
if (backButton) {
  backButton.addEventListener("click", () => {
    window.location.href = backPage;
  });
}
