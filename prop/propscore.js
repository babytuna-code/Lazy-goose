
const currentStage = Number(document.body.dataset.stage);
const nextPage = document.body.dataset.next;
const backPage = document.body.dataset.back || "prop.html";

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


document.addEventListener("DOMContentLoaded", () => {
    const scoreElement = document.getElementById("player-score");
    const messageElement = document.getElementById("result-message");
    const retryButton = document.getElementById("retry-button");

    // อ่านผลคำตอบทั้ง 5 ข้อที่บันทึกไว้
    let results = {};

    try {
        results = JSON.parse(
            localStorage.getItem("propResults") || "{}"
        );
    } catch (error) {
        results = {};
    }

    // นับจำนวนข้อที่ตอบถูก
    const score = Object.values(results)
        .filter(result => result === true).length;

    // แสดงคะแนนจาก 5 ข้อ
    if (scoreElement) {
        scoreElement.textContent = score;
    }

    // แสดงข้อความตามคะแนน
    if (messageElement) {
        if (score === 5) {
            messageElement.textContent = "เก่งมาก !";
        } else if (score >= 3) {
            messageElement.textContent = "ทำได้ดีมาก !";
        } else if (score >= 1) {
            messageElement.textContent = "พยายามอีกนิดนะ !";
        } else {
            messageElement.textContent = "ลองใหม่อีกครั้งนะ !";
        }
    }

    // ปุ่มทำแบบทดสอบอีกครั้ง
    if (retryButton) {
        retryButton.addEventListener("click", () => {
            // ล้างคะแนนและผลคำตอบรอบก่อน
            localStorage.removeItem("propResults");
            localStorage.removeItem("propScore");

            // กลับไปหน้าเริ่มต้นของบทอัตราส่วน
            window.location.href = "prop.html";
        });
    }
});

