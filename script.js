const subjectBox = document.getElementById("subject");
const scoreBox = document.getElementById("score");
const avgscoreBox = document.getElementById("avgscore");
const editSubjectBox = document.getElementById("editSubject");

const tbody = document.querySelector(".tbody");

let subject;
let score;
let avgscore;
let gapscore;

function register() {
    subject = subjectBox.value;
    score = scoreBox.value;
    avgscore = avgscoreBox.value;

    if (subject.length >= 10) {
        alert("教科名が長すぎます");
        subjectBox.value = "";
        return;
    }
    if (!subject || !score) return;

    score = Number(score);
    if (!avgscore) {
        avgscore = "なし";
    }
    else {
        avgscore = Number(avgscore);
        gapscore = score - avgscore;
    }

    const tr = document.createElement("tr");
    tr.classList.add("data");

    const th = document.createElement("th");
    th.scope = "row";
    th.classList.add("rows", "subject");
    th.textContent = subject;

    const tdScore = document.createElement("td");
    tdScore.classList.add("score");
    tdScore.textContent = String(score);

    const tdAverage = document.createElement("td");
    tdAverage.classList.add("avg");
    tdAverage.textContent = String(avgscore);

    const tdGap = document.createElement("td");
    if (gapscore > 0) {
        gapscore = `+${String(gapscore)}`
    }
    tdGap.classList.add("gap");
    tdGap.textContent = gapscore;

    const tdTime = document.createElement("td");
    const nowTime = new Date();
    const nowJST = nowTime.toLocaleString("ja-jp", {
        timeZone: "Asia/Tokyo",
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
    })
    tdTime.classList.add("date");
    tdTime.textContent = nowJST;

    tr.appendChild(th);
    tr.appendChild(tdScore);
    tr.appendChild(tdAverage);
    tr.appendChild(tdGap);
    tr.appendChild(tdTime);

    tbody.appendChild(tr);
};

function search() {
    const allSubject = document.querySelectorAll(".subject");
    const allScore = document.querySelectorAll(".score");
    const allAvg = document.querySelectorAll(".avg");
    const allGap = document.querySelectorAll(".gap");
    const allDate = document.querySelectorAll(".date");

    console.log(allSubject);

    allSubject.forEach((element, index) => {
        if (element.textContent == editSubjectBox.value) {
            const prevScore = Number(allScore[index].textContent);
            const prevAvg = Number(allAvg[index].textContent);
            const prevGap = Number(allGap[index].textContent);
            const prevDate = Number(allDate[index].textContent);

            const EditBox = document.createElement("div");
            EditBox.style.display = "flex";
            EditBox.style.flexDirection = "column";
            EditBox.style.justifyContent = "center";
            EditBox.style.alignItems = "center";
            EditBox.style.width = "80dvw";
            EditBox.style.height = "50dvh";
            EditBox.style.transform = "translate(-50%,-50%)";
            EditBox.style.position = "fixed";
            EditBox.style.top = "50%";
            EditBox.style.left = "50%";

            const EditDiv = document.createElement("div");

            
            const EditScoreLabel = document.createElement("label");
            EditScoreLabel.textContent = "得点を入力";
            EditScoreLabel.htmlFor = "EditScoreInput";

            const EditScore = document.createElement("input");
            EditScore.type = "number";
            EditScore.id = "EditScoreInput"
            EditScore.defaultValue = prevScore;

            const EditAvgLabel = document.createElement("label");
            EditAvgLabel.textContent = "平均点を入力";
            EditAvgLabel.htmlFor = "EditAvgInput";

            const EditAvg = document.createElement("input");
            EditAvg.type = "number";
            EditAvg.id = "EditAvgInput";
            EditAvg.defaultValue = prevAvg;

            EditDiv.appendChild(EditScoreLabel);
            EditDiv.appendChild(EditScore);
            EditDiv.appendChild(EditAvgLabel);
            EditDiv.appendChild(EditAvg);
        }
    })


}