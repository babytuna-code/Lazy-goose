

function goTomenu3() {
    window.location.href = "../menu/menu.html";
}

function goTopercent() {
    window.location.href = "./percent.html";
}

function goTorecheck3() {
    window.location.href = "./percentans.html";
}

function goToplay3() {
    window.location.href = "./percentplay1.html";
}

// ปุ่มย้อนกลับไปหน้าเมนู
const backButton = document.getElementById("backButton");

if (backButton) {
    backButton.addEventListener("click", function () {
        goTomenu3();
    });
}
function goToplay2() {

    sessionStorage.removeItem("percentStage1Question");
    sessionStorage.removeItem("percentStage2Question");
    sessionStorage.removeItem("percentStage3Question");
    sessionStorage.removeItem("percentStage4Question");
    sessionStorage.removeItem("percentStage5Question");

    localStorage.removeItem("percentoResults");
    localStorage.removeItem("percentoScore");

    window.location.href = "./percentplay1.html";
}