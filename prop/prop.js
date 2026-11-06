
function goTomenu2() {
    window.location.href = "../menu/menu.html";
}


function goToprop() {
    window.location.href = "./prop.html";
}

function goTorecheck2() {
    window.location.href = "./propans.html";
}

function goToplay2() {

    sessionStorage.removeItem("propStage1Question");
    sessionStorage.removeItem("propStage2Question");
    sessionStorage.removeItem("propStage3Question");
    sessionStorage.removeItem("propStage4Question");
    sessionStorage.removeItem("propStage5Question");

    localStorage.removeItem("propoResults");
    localStorage.removeItem("propoScore");

    window.location.href = "./propplay1.html";
}

// ปุ่มย้อนกลับไปหน้าเมนู
const backButton = document.getElementById("backButton");

if (backButton) {
    backButton.addEventListener("click", function () {
        goTomenu1();
    });
}
