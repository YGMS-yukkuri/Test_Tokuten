const subjectBox = document.getElementById("subject");
const scoreBox = document.getElementById("score");
const avgscoreBox = document.getElementById("avgscore");
const inputDisplay = document.querySelector(".inputBox");

const tbody = document.querySelector(".tbody");

let subject;
let score;
let avgscore;
let gapscore;
let nowJST;
let editingIndex = null;

let X;
let Y;

let InnerX;
let InnerY;

let isHolding = false;
let HoldingDelay = 20;

let isNight = false;

document.addEventListener("mousemove", (e) => {
    X = e.clientX;
    Y = e.clientY;
    if (isHolding) {
        if (HoldingDelay < 0) {
            const div = document.querySelector(".editElement");
            if (!div) return;

            div.style.top = `${Y}px`;
            div.style.left = `${X}px`;
        }
        else {
            HoldingDelay--
        }
    }
    else {
        HoldingDelay = 20;
    }
})

function unshowRegister() {
    inputDisplay.style.display = "none";
}

function showRegister() {
    inputDisplay.style.display = "flex";
}

function register(Lsubject, Lscore, Lavg, Ldate) {
    if (Lsubject) {
        subject = Lsubject;
        score = Lscore;
        avgscore = Lavg;
        nowJST = Ldate;
    } else {
        subject = subjectBox.value;
        score = scoreBox.value;
        avgscore = avgscoreBox.value;
        const nowTime = new Date();
        nowJST = nowTime.toLocaleString("ja-jp", {
            timeZone: "Asia/Tokyo",
            year: "numeric",
            month: "2-digit",
            day: "2-digit"
        })
    }



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
    if (isNight) tr.classList.add("dark");

    const th = document.createElement("th");
    th.scope = "row";

    th.classList.add("rows", "subject");
    if (isNight) th.classList.add("dark");

    th.textContent = subject;

    const tdScore = document.createElement("td");
    tdScore.textContent = String(score);
    tdScore.classList.add("score");
    if (isNight) tdScore.classList.add("dark");

    const tdAverage = document.createElement("td");
    tdAverage.textContent = String(avgscore);
    tdAverage.classList.add("avg");
    if (isNight) tdAverage.classList.add("dark");

    const tdGap = document.createElement("td");
    if (gapscore > 0) {
        gapscore = `+${String(gapscore)}`
    }
    tdGap.classList.add("gap");
    if (isNight) tdGap.classList.add("dark");
    tdGap.textContent = gapscore;

    const tdTime = document.createElement("td");
    tdTime.classList.add("date");
    if (isNight) tdTime.classList.add("dark");
    tdTime.textContent = nowJST;

    tr.appendChild(th);
    tr.appendChild(tdScore);
    tr.appendChild(tdAverage);
    tr.appendChild(tdGap);
    tr.appendChild(tdTime);

    tbody.appendChild(tr);

    subjectBox.value = "";
    scoreBox.value = "";
    avgscoreBox.value = "";

    inputDisplay.style.display = "none";

    UpdateEditDiv();
    Saving();
};

function search() {
    const allSubject = document.querySelectorAll(".subject");
    const allScore = document.querySelectorAll(".score");
    const allAvg = document.querySelectorAll(".avg");
    const allGap = document.querySelectorAll(".gap");
    const allDate = document.querySelectorAll(".date");

    const SearchSubjectBox = document.getElementById("editSubject");

    allSubject.forEach((element, index) => {
        if (element.textContent == SearchSubjectBox.value) {
            const prevSubject = allSubject[index].textContent;
            const prevScore = Number(allScore[index].textContent);
            const prevAvg = Number(allAvg[index].textContent);
            const prevGap = Number(allGap[index].textContent);
            const prevDate = Number(allDate[index].textContent);
            editingIndex = index;

            const EditBox = document.createElement("div");
            EditBox.classList.add("editing")
            EditBox.style.width = "100dvw";
            EditBox.style.height = "100dvh";
            EditBox.style.transform = "translate(-50%,-50%)";
            EditBox.style.position = "fixed";
            EditBox.style.top = "50%";
            EditBox.style.left = "50%";
            EditBox.style.backgroundColor = "#00000040"

            const EditDiv = document.createElement("div");
            EditDiv.classList.add("editElement")
            EditDiv.style.display = "flex"
            EditDiv.style.width = "70%"
            EditDiv.style.height = "50%"
            EditDiv.style.flexDirection = "column";
            EditDiv.style.justifyContent = "center";
            EditDiv.style.alignItems = "center";
            EditDiv.style.position = "absolute"
            EditDiv.style.top = "50%"
            EditDiv.style.left = "50%"
            EditDiv.style.transform = "translate(-50%,-50%)"
            EditDiv.style.userSelect = "none"
            if (isNight) {
                EditDiv.style.backgroundColor = "oklch(50% 0.035 240)"
                EditDiv.style.border = "1px solid #FAFAFA"
                EditDiv.style.color = "#FAFAFA"
            } else {
                EditDiv.style.backgroundColor = "oklch(90% 0.035 240)"
                EditDiv.style.border = "1px solid #000"
                EditDiv.style.color = "#000"
            }


            const EditSubjectLabel = document.createElement("label");
            EditSubjectLabel.textContent = `教科を入力(編集前:${prevSubject})`;
            EditSubjectLabel.htmlFor = "EditSubjectInput";

            const EditSubject = document.createElement("input");
            EditSubject.type = "text";
            EditSubject.id = "EditSubjectInput";
            EditSubject.defaultValue = prevSubject;

            const EditScoreLabel = document.createElement("label");
            EditScoreLabel.textContent = `得点を入力(編集前:${prevScore})`;
            EditScoreLabel.htmlFor = "EditScoreInput";

            const EditScore = document.createElement("input");
            EditScore.type = "number";
            EditScore.id = "EditScoreInput"
            EditScore.defaultValue = prevScore;

            const EditAvgLabel = document.createElement("label");
            EditAvgLabel.textContent = `平均点を入力(編集前:${prevAvg})`;
            EditAvgLabel.htmlFor = "EditAvgInput";

            const EditAvg = document.createElement("input");
            EditAvg.type = "number";
            EditAvg.id = "EditAvgInput";
            EditAvg.defaultValue = prevAvg;

            const SubmitButton = document.createElement("button");
            SubmitButton.onclick = () => Editing();
            SubmitButton.textContent = "データを修正";

            const DeleteButton = document.createElement("button");
            DeleteButton.onclick = () => removedata(index, prevSubject);
            DeleteButton.textContent = "データを削除";

            EditDiv.appendChild(EditSubjectLabel);
            EditDiv.appendChild(EditSubject);
            EditDiv.appendChild(EditScoreLabel);
            EditDiv.appendChild(EditScore);
            EditDiv.appendChild(EditAvgLabel);
            EditDiv.appendChild(EditAvg);
            EditDiv.appendChild(SubmitButton);
            EditDiv.appendChild(DeleteButton);

            EditBox.appendChild(EditDiv);
            document.querySelector("main").appendChild(EditBox);

            EditDiv.addEventListener("mousedown", () => {
                isHolding = true
            })
            EditDiv.addEventListener("mouseup", () => {
                isHolding = false
            })
            EditDiv.addEventListener("mousemove", (e) => {
                InnerX = e.clientX;
                InnerY = e.clientY;
            })
        }
    })
};

function Editing() {
    if (editingIndex == null) return;

    const allSubject = document.querySelectorAll(".subject");
    const allScore = document.querySelectorAll(".score");
    const allAvg = document.querySelectorAll(".avg");
    const allGap = document.querySelectorAll(".gap");
    const allDate = document.querySelectorAll(".date");

    const newSubjectInput = document.querySelector("#EditSubjectInput");
    const newScoreInput = document.querySelector("#EditScoreInput");
    const newAvgInput = document.querySelector("#EditAvgInput");

    let editedPrams;

    if (newSubjectInput.value.length > 10) {
        alert("教科名が長すぎます");
        return;
    }

    const nowTime = new Date();
    const nowJST = nowTime.toLocaleString("ja-jp", {
        timeZone: "Asia/Tokyo",
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
    })

    if (!newAvgInput.value) {
        editedPrams = {
            Subject: newSubjectInput.value,
            Score: Number(newScoreInput.value),
            Avg: "なし",
            Gap: "",
            Date: nowJST
        }
    } else {
        Gap = Number(newScoreInput.value) - Number(newAvgInput.value);
        if (Gap > 0) {
            editedPrams = {
                Subject: newSubjectInput.value,
                Score: Number(newScoreInput.value),
                Avg: Number(newAvgInput.value),
                Gap: `+${Gap}`,
                Date: nowJST
            }
        }
        else {
            editedPrams = {
                Subject: newSubjectInput.value,
                Score: Number(newScoreInput.value),
                Avg: Number(newAvgInput.value),
                Gap: Number(newScoreInput.value) - Number(newAvgInput.value),
                Date: nowJST
            }
        }
    }

    allSubject[editingIndex].textContent = editedPrams.Subject;
    allScore[editingIndex].textContent = editedPrams.Score;
    allAvg[editingIndex].textContent = editedPrams.Avg;
    allGap[editingIndex].textContent = editedPrams.Gap;
    allDate[editingIndex].textContent = editedPrams.Date;

    const EditingUI = document.querySelector(".editing");
    if (EditingUI) {
        EditingUI.remove();
    }

    UpdateEditDiv();
    Saving();
};

function CreateEditdiv() {
    const allSubject = document.querySelectorAll(".subject");
    const editBox = document.querySelector(".editBox");

    const editInput = document.createElement("div");
    editInput.classList.add("editInput");

    const editSubjectLabel = document.createElement("label");
    editSubjectLabel.htmlFor = "editSubject";
    editSubjectLabel.textContent = "データを編集する教科を選択";

    const editSubjectSelector = document.createElement("select");
    editSubjectSelector.id = "editSubject";

    const SubmitButton = document.createElement("button");
    SubmitButton.textContent = "選択"
    SubmitButton.type = "button";
    SubmitButton.onclick = () => search();

    allSubject.forEach(element => {
        const editSubjectOptions = document.createElement("option");
        editSubjectOptions.textContent = element.textContent;
        editSubjectOptions.value = element.textContent;
        editSubjectSelector.appendChild(editSubjectOptions);
    });

    if (isNight) {
        editSubjectSelector.classList.add("dark")
        editInput.classList.add("dark")
    }

    editInput.appendChild(editSubjectLabel);
    editInput.appendChild(editSubjectSelector);
    editInput.appendChild(SubmitButton);

    editBox.appendChild(editInput);
};

function UpdateEditDiv() {
    const editInput = document.querySelector(".editInput");
    editInput.remove();
    CreateEditdiv();
};

function Saving() {
    const subjectElems = document.querySelectorAll(".subject");
    const scoreElems = document.querySelectorAll(".score");
    const avgElems = document.querySelectorAll(".avg");
    const dateElems = document.querySelectorAll(".date");

    const data = [];
    subjectElems.forEach((elem, idx) => {
        data.push({
            subject: elem.textContent,
            score: scoreElems[idx].textContent,
            avg: avgElems[idx].textContent,
            date: dateElems[idx].textContent
        })
    })
    localStorage.removeItem("Datas");
    localStorage.setItem("Datas", JSON.stringify(data));
    console.log(JSON.parse(localStorage.getItem("Datas")));
};

function Load() {
    const Datas = localStorage.getItem("Datas");
    if (!Datas) return;

    const DatasJSON = JSON.parse(Datas);
    DatasJSON.forEach(elem => {
        Loadsubject = elem.subject;
        Loadscore = elem.score;
        Loadavg = elem.avg;
        Loaddate = elem.date;

        register(Loadsubject, Loadscore, Loadavg, Loaddate)
    });
};

function removedata(i, name) {
    const Table = document.querySelectorAll(".data");
    const EditingDiv = document.querySelector(".editing");
    const EditDiv = document.querySelector(".editElement");
    while (EditDiv.firstChild) {
        EditDiv.removeChild(EditDiv.firstChild)
    }

    const InnerDiv = document.createElement("div");
    InnerDiv.style.width = "100%"
    InnerDiv.style.height = "100%"
    InnerDiv.style.display = "flex"
    InnerDiv.style.flexDirection = "column"
    InnerDiv.style.justifyContent = "center"
    InnerDiv.style.alignItems = "center"
    InnerDiv.style.scale = "1.3"

    const ConfirmLabel = document.createElement("label");
    ConfirmLabel.htmlFor = "ConfirmButton";
    ConfirmLabel.textContent = "本当にデータを削除しますか？";

    const ConfirmSubj = document.createElement("a")
    ConfirmSubj.textContent = `「${name}」`

    const ButtonDiv = document.createElement("div");
    ButtonDiv.style.display = "flex";
    ButtonDiv.style.gap = "10px";

    const ConfirmButton = document.createElement("button");
    ConfirmButton.id = "ConfirmButton";
    ConfirmButton.textContent = "削除します";
    ConfirmButton.style.backgroundColor = "oklch(90% 0.035 0)";
    ConfirmButton.style.width = "100%";
    ConfirmButton.onclick = () => {
        Table[i].remove();
        EditingDiv.remove();

        Saving();
        UpdateEditDiv();
    }

    const CancelButton = document.createElement("button");
    CancelButton.id = "CancelButton";
    CancelButton.textContent = "キャンセル";
    CancelButton.style.backgroundColor = "oklch(90% 0.035 120)";
    CancelButton.style.width = "100%";
    CancelButton.onclick = () => {
        EditingDiv.remove();
        search();
    }

    ButtonDiv.appendChild(ConfirmButton)
    ButtonDiv.appendChild(CancelButton)

    InnerDiv.appendChild(ConfirmLabel)
    InnerDiv.appendChild(ConfirmSubj)
    InnerDiv.appendChild(ButtonDiv)

    EditDiv.appendChild(InnerDiv)
};

function changeNight() {
    const body = document.querySelector("body");
    const input = document.querySelectorAll("input");
    const all = document.querySelectorAll("*")
    if (!isNight) {
        isNight = true;
        localStorage.setItem("dark",true)
        body.style.backgroundColor = "#303030"
        all.forEach((elem) => {
            elem.classList.add("dark")
        })
    }
    else {
        isNight = false;
        localStorage.setItem("dark", false)
        body.style.backgroundColor = "#FFFFFF"
        all.forEach((elem) => {
            elem.classList.remove("dark")
        })
    }
}

if (localStorage.getItem("dark") === "true") {
    changeNight()
};

function allReset() {
    localStorage.clear()
}

CreateEditdiv();
Load();