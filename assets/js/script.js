var startTimer = document.querySelector("#btn");

// Querying the first DIV inside the section with id="page-quizlet"
var pageDivElement = document.querySelector("#page-quizlet");

var questionList = [
    {
        question: "What is your name?",
        button1: "x",
        button2: "y",
        button3: "z",
        button4: "k",
        correctAnswer: "k"
    },
    {
        question: "What is your city?",
        button1: "a",
        button2: "b",
        button3: "c",
        button4: "d",
        correctAnswer: "b"
    }
];

var total = 0;
const value = 10;

// var h2TagContent;
// var button1;
// var button2;
// var button3;
// var button4; 

var currentQuestionIndex = 0;
var pageWrapperContent = null;


// Set interval 
function setTimer (duration, display) {
    var timer = duration, minutes, seconds;
    var interval = setInterval(function() {
        minutes = parseInt(timer / 60);
        seconds = parseInt(timer % 60);

        if (minutes < 10) {
            minutes = "0" + minutes;
        }
        if (seconds < 10) {
            seconds = "0" + seconds;
        }

        display.textContent = minutes + ":" + seconds;

        // -- decreases value by one
        if (--timer < -1 ) {
            display.textContent = minutes + ":00";
            clearInterval(interval);
            // alert("Time's UP!");

        }
    }, 1000);
};

function clearDivElement() {
    // pageDivElement.remove();
    createQuestionsElements();
}

function createQuestionsElements() {
    //#region vars 
    

    // create and define div classes name
    var pageWrapperContent = document.createElement("div");
    pageWrapperContent.className = "page-wrapper-content-swap"; 


    // Creating the H2 element and adding it to the page-wrapper-content
    var pageH2TagElement = document.createElement("h2");
    pageH2TagElement.style.textAlign = "left";
    pageH2TagElement.className = "page-welcome-txt";
    pageWrapperContent.appendChild(pageH2TagElement);

    //#endregion vars

    //#region buttons
    // create page buttons
    var pageButtonWrapper = document.createElement("div");
    pageButtonWrapper.className = "btn-wrapper";

    // assigns the new buttons   
    var buttons = [
        "answer1",
        "answer2",
        "answer3",
        "answer4",
    ];

    // creating buttons and append to pageButtons div
    for (i = 0; i < buttons.length; i++) {
        var pageButtonElement = document.createElement("button");
        pageButtonElement.className = "btn-swap";
        pageButtonElement.innerHTML = buttons[i];
        pageButtonElement.id = 'btn-' + buttons[i];
        pageButtonElement.type = "click";
        pageButtonElement.addEventListener("click", checkAnswer, pageButtonElement);
        pageButtonWrapper.appendChild(pageButtonElement);  
        pageWrapperContent.appendChild(pageButtonWrapper);
    };
    //#endregion buttons

    pageDivElement.parentElement.replaceChild(pageWrapperContent, pageDivElement);
   
    return pageWrapperContent;
};

function checkAnswer(questionElement) {
    if (pageWrapperContent) {
        console.log("ANSWER", currentQuestionIndex, questionList.length)

        if (currentQuestionIndex < questionList.length) {
            var currentQuestion = questionList[currentQuestionIndex]
            if (currentQuestion.correctAnswer == questionElement.target.innerHTML) {
                total += value;
                console.log("correct answer")
            } else {
                console.log("wrong answer animal")
            }

            createNextQuestion();
        } 
    }
}


function createNextQuestion(increment = true) {
   

    if (pageWrapperContent) {
    
        var content = pageWrapperContent;

            if (increment) {
                currentQuestionIndex++;
            }

            if (currentQuestionIndex < questionList.length) {
                var currentQuestion = questionList[currentQuestionIndex];
                

                var h2TagContent = content.querySelector("h2");
                var button1 = content.querySelector("#btn-answer1");
                var button2 = content.querySelector("#btn-answer2");
                var button3 = content.querySelector("#btn-answer3");
                var button4 = content.querySelector("#btn-answer4");
                
            
                h2TagContent.textContent = currentQuestion.question;
                button1.innerHTML = currentQuestion.button1;
                button2.innerHTML = currentQuestion.button2;
                button3.innerHTML = currentQuestion.button3;
                button4.innerHTML = currentQuestion.button4;
            } else {
                console.log("total", total)
            }
       

    }

}; //#endregion

function timeoutQuestion () {
    timeout = setTimeout(createNextQuestion, 10000);
    createNextQuestion(timeout);
};

function startQuiz () {
    var duration = 4 * 1;
    display = document.querySelector('#timer-count');
    
    pageWrapperContent = createQuestionsElements();

    // send values to setTimer function
    setTimer(duration, display);
    createNextQuestion(false);
};

startTimer.addEventListener("click", startQuiz);



// End of timer related functions
