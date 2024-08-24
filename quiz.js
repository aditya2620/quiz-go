let details = JSON.parse(localStorage.getItem("details"));
let quizuser = JSON.parse(localStorage.getItem("quiz_user"));
let body = document.querySelector("body");
console.log(details, quizuser);

if (quizuser) {//* user logged in 
    if(quizuser.quiz){ //* test is taken
        body.innerHTML = `test already completed to see result, <a href=${"./result.html"}>click here</a>`
    }
    else{ //* test not taken
        mainFunction();

    }

} else {
    alert("please login first");
    window.location.href = "./login.html"
}

function mainFunction(){




let storage = [
    {
        quesId: "1",
        question: "1. Which data type is used to store a single character in Java?",
        options: [" char", "String", "byte", "int"],
        crctAnswer: "char",
        userAnswer: null,
        visited: false
    },

    {
        quesId: "2",
        question: "2. What is the superclass of all classes in Java?",
        options: ["Object", "class", "Interface", "Package"],
        crctAnswer: "Object",
        userAnswer: null,
        visited: false
    },

    {
        quesId: "3",
        question: "3. Which keyword is used to refer to the current object in Java?",
        options: ["this", "super", "self", "here"],
        crctAnswer: "this",
        userAnswer: null,
        visited: false
    },

    {
        quesId: "4",
        question: "4. Which keyword is used to stop a loop in Java?",
        options: ["while", "do-while", "for", "enhanced-for"],
        crctAnswer: "do-while",
        userAnswer: null,
        visited: false
    },

    {
        quesId: "5",
        question: "5. Which type of loop checks the condition at the end in Java?",
        options: ["break", "exit", "halt", 'stop'],
        crctAnswer: "break",
        userAnswer: null,
        visited: false
    },
    {
        quesId: "6",
        question: "6. Which components is used to compile,debug and execute java programs?",
        options: ["JRE", "JIT", "JDK", "JVM"],
        crctAnswer: "JDK",
        userAnswer: null,
        visited: false
    },
    {
        quesId: "7",
        question: "7. Which of the following is not a primitive data type in Java?",
        options: ["String", "int", "char", "boolean"],
        crctAnswer: "String",
        userAnswer: null,
        visited: false
    },
    {
        quesId: "8",
        question: "8. Which of the following is not an OOPs concept in java?",
        options: ["Polymorphism", "Inheritance", "Compilation", "Encapsulation"],
        crctAnswer: "Compilation",
        userAnswer: null,
        visited: false
    },
    {
        quesId: "9",
        question: "9. Which exception is thrown when java is out of memory?",
        options: ["MemoryError", "OutOfMemoryError", "MemoryOutOfBoundsException", "MemoryFullException"],
        crctAnswer: "OutOfMemoryError",
        userAnswer: null,
        visited: false
    },
    {
        quesId: "10",
        question: "10. Which of these are selection statements in java?",
        options: ["break", "continue", "for()", "if()"],
        crctAnswer: "if()",
        userAnswer: null,
        visited: false
    },

];

let questCont = document.querySelector("#actual-question");
let optionCont = document.querySelector("#actual-option")
let btnCont = document.querySelector("#actual-btn");

let footer = document.querySelector("footer");
let previousBtn = footer.querySelectorAll("button")[0];
let nextBtn = footer.querySelectorAll("button")[1];
let saveBtn = footer.querySelectorAll("button")[2];
let submitBtn = footer.querySelectorAll("button")[3];

let index = 0;

// console.log(questCont,optionCont,btnCont,previousBtn,nextBtn,saveBtn,submitBtn);

//& creating button based on total questions

function createbtn() {
    storage.forEach((e) => {
        let btn = document.createElement("button");
        btn.id = e.quesId; //* matching button id with question id so we can navigate to question after we click 
        btn.innerHTML = e.quesId;

        btnCont.append(btn);

    })

}
createbtn();

let allBtn = btnCont.querySelectorAll("button");

//& displaying the questions with options
function display() {
    questCont.innerHTML = storage[index].question;
    optionCont.innerHTML = "";

    storage[index].options.map((e) => {
        let opt = document.createElement("input");
        opt.type = "radio";
        opt.value = e; //* this will point to every option
        opt.name = "option"

        let label = document.createElement("label");
        label.innerHTML = e; //* this will display the option

        if (storage[index].userAnswer == opt.value) { //* it will iterate and check if opt value == userans value or not
            opt.checked = true;
        }
        optionCont.append(opt, label);
    })

    allBtn.forEach((btn) => { //* to highlight the current question
        if (btn.id - 1 == index) {
            btn.style.backgroundColor = "hotpink"
        }
    })
}
display()

//& add listeners for navigating buttons
nextBtn.addEventListener("click", () => {
    notSave();
    index = (index + 1) % storage.length; //* to go forward
    display();
    legends();
})

previousBtn.addEventListener("click", () => {
    notSave();
    index = (index - 1 + storage.length) % storage.length; //* to go backward
    display();
    legends();
})

saveBtn.addEventListener("click", () => {
    saveAns();
    notSave();
    index = (index + 1) % storage.length;
    display();
    legends();

});


// console.log(allBtn);

//& each button questions

function individualBtn() {
    allBtn.forEach((btn) => {
        btn.addEventListener("click", () => {
            //* it will compare with index i.e if it's 1st questionid is 1-1 and the index will be 0 ;
            notSave();
            index = btn.id - 1;
            display();
            legends();


        })
    })
}
individualBtn();

//& save answers

function saveAns() {
    let opt = document.querySelectorAll("input");
    // console.log(opt)
    opt.forEach((individualOpt) => {
        if (individualOpt.checked) {
            storage[index].userAnswer = individualOpt.value;
            console.log(storage);
            allBtn.forEach((btn) => {
                if (btn.id - 1 == index) {
                    btn.style.backgroundColor = "green"
                }
            })

        }

    })
}

//& not save function if user clicks previous or revisit& next also if clicks on save&next without selecting the option
function notSave() {
    storage[index].visited = true;
    if (!storage[index].userAnswer) {
        allBtn.forEach((btn) => {
            if (btn.id - 1 == index) {
                btn.style.backgroundColor = "purple";
            }
        })
    }
}

//& legends updation

function legends() {
    let legendCont = document.querySelector("#legends");
    let answered = legendCont.querySelectorAll("span")[0];
    let notAnswered = legendCont.querySelectorAll("span")[1];
    let marked = legendCont.querySelectorAll("span")[2];
    let notVisited = legendCont.querySelectorAll("span")[3];


    let answerCount = 0;
    let notAnsweredCount = storage.length; //* total question not answered
    let markedCount = 0;
    let notVisitedCount = storage.length; //* total questions not visited


    storage.map((e) => {
        if (e.userAnswer) {
            answerCount++;
            notAnsweredCount--;
        }

        if (e.visited) {
            notVisitedCount--;
        }

        if (e.visited && !(e.userAnswer)) {
            markedCount++;
        }
    });

    answered.innerHTML = answerCount;
    notAnswered.innerHTML = notAnsweredCount;
    marked.innerHTML = markedCount;
    notVisited.innerHTML = notVisitedCount;

}
legends();


//& timer setup
function timer() {
    let header = document.querySelector("header");
    let hrs = header.querySelectorAll("span")[0];
    let mins = header.querySelectorAll("span")[1];
    let secs = header.querySelectorAll("span")[2];

    let duration = 2 * 60 * 60; //* 2hr timer=7200secs
    let stopInterval = setInterval(() => {
        duration--;
        hrs.innerHTML = `${Math.floor(duration / 3600)}`;
        mins.innerHTML = `${Math.floor((duration % 3600) / 60)}`;
        secs.innerHTML = `${(duration % 3600) % 60}`

        if (duration == 0) {
            clearInterval(stopInterval);
            //& for auto-submit
            quizuser.quiz = storage; //* js quizuser
            localStorage.setItem("quiz_user", JSON.stringify(quizuser));
            details = details.filter((e) => {
                if (e.phone != quizuser.phone) {
                    return e;
                }
            })
            details.push(quizuser);
            localStorage.setItem("details", JSON.stringify(details))
            window.location.href = "./result.html";
        }
    }, 1000);
}
timer();

//& submit button

submitBtn.addEventListener("click", () => {
    let conf = confirm("Are you sure you want to submit?");
    if (conf) {
        quizuser.quiz = storage; //* js quizuser
        localStorage.setItem("quiz_user", JSON.stringify(quizuser));
        details = details.filter((e) => {
            if (e.phone != quizuser.phone) {
                return e;
            }
        })
        details.push(quizuser);
        localStorage.setItem("details", JSON.stringify(details))
        window.location.href = "./result.html";
    }

})
}

