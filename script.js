const subjectBox = document.getElementById("subject");
const scoreBox = document.getElementById("score");
const avgscoreBox = document.getElementById("avgscore");

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
}