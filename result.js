let quizuser = JSON.parse(localStorage.getItem("quiz_user"));
console.log(quizuser);

let userResult = quizuser.quiz;

let main = document.querySelector("main");
let score = 0;


//& for displaying user result 
userResult.forEach((e) => {
    let div = document.createElement("div");
    main.append(div);
    if (e.userAnswer == e.crctAnswer) {
        div.className = "crct";
        score++;
    } else {
        div.className = "wrong"
    }

    let p = document.createElement("p");
    p.innerHTML = e.question;
    let h3 = document.createElement("h3");
    h3.innerHTML = `your answer: ${e.userAnswer}`
    let h4 = document.createElement("h4");
    h4.innerHTML = `correct answer: ${e.crctAnswer}`;

    div.append(p, h3, h4);
});

//& for displaying user name and score 

let userName = document.querySelector("#name");
let userScore = document.querySelector("#score");
let innerDiv = document.querySelector("#innerDiv")

userName.innerHTML = quizuser.first;
userScore.innerHTML = `${score}/${userResult.length}`;

//&progress bar

let width = 0;
let marks = document.querySelector("#marks")
let interval = setInterval(() => {
    width++;
    innerDiv.style.width = `${width}%`;

    if (width >=(score / userResult.length) * 100) {
        clearInterval(interval);
        marks.innerHTML = `${((score/userResult.length)*100).toFixed(2)}%`;
        marks.style.display="inline"
    }
}, 20)


