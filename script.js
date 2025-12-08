const subjectBox = document.getElementById("subject");
const scoreBox = document.getElementById("score");
const avgscoreBox = document.getElementById("avgscore");

let subject;
let score;
let avgscore;
let gapscore;

function register() {
    subject = subjectBox.value;
    score = scoreBox.value;
    avgscore = avgscoreBox.value;

    score = Number(score);
    avgscore = Number(avgscore);
    gapscore = score - avgscore;
    
    
}