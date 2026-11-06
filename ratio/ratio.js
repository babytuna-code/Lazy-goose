
function goTomenu1() {
    window.location.href = "../menu/menu.html";
}

function goToratio() {
    window.location.href = "./ratio.html";
}

function goTorecheck1() {
    window.location.href = "./ratioans.html";
}

function goToplay1() {

    sessionStorage.removeItem("ratioStage1Question");
    sessionStorage.removeItem("ratioStage2Question");
    sessionStorage.removeItem("ratioStage3Question");
    sessionStorage.removeItem("ratioStage4Question");
    sessionStorage.removeItem("ratioStage5Question");

    localStorage.removeItem("ratioResults");
    localStorage.removeItem("ratioScore");

    window.location.href = "./ratioplay1.html";
}

// ปุ่มย้อนกลับไปหน้าเมนู
const backButton = document.getElementById("backButton");

if (backButton) {
    backButton.addEventListener("click", function () {
        goTomenu1();
    });
}
