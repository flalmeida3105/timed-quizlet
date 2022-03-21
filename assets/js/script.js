//#region variables
// debugger;
var startTimer = document.querySelector("#btn");
var pageDivElement = document.querySelector("#page-quizlet");
var total = 0;
const value = 10;
var currentQuestionIndex = 0;
var pageWrapperContent = null;
var pageHighScore = null;
var timer = 0;
var pageFormElement = document.querySelector("#page-welcome-txt-btn");
var pageHighScoreWrapper = null;

var questionList = [
    // {
    //     question: "Which one of the following options it's NOT a JavaScript data type?",
    //     button1: "1. Number",
    //     button2: "2. Stream",
    //     button3: "3. Object",
    //     button4: "4. Boolean",
    //     correctAnswer: "2. Stream"
    // },
    // {
    //     question: "What is the escape character used by JavaScript?",
    //     button1: "1. Backslash",
    //     button2: "2. Double Quotes",
    //     button3: "3. Single Quotes",
    //     button4: "4. Ampersand",
    //     correctAnswer: "1. Backslash"
    // },
    // {
    //     question: "Which of the following it's a valid JavaScript var declaration?",
    //     button1: "1. var()",
    //     button2: "2. 'var=10'",
    //     button3: "3. var = 10,",
    //     button4: "4. var = 10;",
    //     correctAnswer: "4. var = 10;"
    // },
    // {
    //     question: "What does the 'var myArray = [[[]]];' statement declare?",
    //     button1: "1. An Array",
    //     button2: "2. An Object Array",
    //     button3: "3. An Array of Arrays",
    //     button4: "4. A three-dimensional Array",
    //     correctAnswer: "4. A three-dimensional Array"
    // },
    {
        question: "Which operations below it's NOT considered a valid loop for JavaScript?",
        button1: "1. For Loop",
        button2: "2. For/In Loop",
        button3: "3. While/Floor Loop",
        button4: "4. Do/While Loop",
        correctAnswer: "3. While/Floor Loop"
    }
];
//#endregion variables

// Set interval 
function setTimer(duration, display) {
    var timer = duration, minutes, seconds;
    var interval = setInterval(function () {
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
        if (--timer < -1) {
            display.textContent = minutes + ":00";
            clearInterval(interval);
            // alert("Your timer is over! Save your results and compare with your friends");
            // return viewHighScores(total);
        }
    }, 1000);

    return timer;
};

function createQuestionsElements() {
    //#region create elements

    // create and define div classes name
    var pageWrapperContent = document.createElement("div");
    pageWrapperContent.className = "page-wrapper-content-swap";
    pageWrapperContent.id = 'page-quizlet';

    // Creating the H2 element and adding it to the page-wrapper-content
    var pageH2TagElement = document.createElement("h2");
    pageH2TagElement.style.textAlign = "left";
    pageH2TagElement.className = "page-welcome-txt";
    pageWrapperContent.appendChild(pageH2TagElement);

    // create page buttons
    var pageButtonWrapper = document.createElement("div");
    pageButtonWrapper.className = "btn-wrapper";

    // declare new buttons variables to be used as id
    var buttons = [
        "answer1",
        "answer2",
        "answer3",
        "answer4",
    ];

    // loop to create buttons and append to pageButtons div
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

    // append all recently created elements to parent element 
    pageDivElement.parentElement.replaceChild(pageWrapperContent, pageDivElement);

    return pageWrapperContent;
    //#endregion create elements
};

function checkAnswer(questionElement) {
    // prevents the function to be called without the contents from createQuestionElements()
    if (pageWrapperContent) {
        // compares the currentIndex with questionList length
        if (currentQuestionIndex < questionList.length) {
            var currentQuestion = questionList[currentQuestionIndex];
            // ensures the correct answer is selected based on the target innerHTML
            if (currentQuestion.correctAnswer == questionElement.target.innerHTML) {
                // Increases the value based on the correct answer
                total += value;
                console.log("correct answer")
            } else {
                console.log("wrong answer")
            }
            createNextQuestion();
        }
    }
    return total;

};

function createNextQuestion(increment = true) {
    // prevents the function to be called without the contents from createQuestionElements()
    if (pageWrapperContent) {
        var content = pageWrapperContent;

        // prevents the function from incrementing after clicking on Start Quiz button
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
            viewHighScores(total);

        }
    };
};

function viewHighScores(value) {
    var total = value;
    console.log("View High Scores", total);

    //#region create elements

    // create and define div classes name
    var pageHighScoreWrapper = document.createElement("div");
    pageHighScoreWrapper.className = "page-wrapper-content-swap";
    pageHighScoreWrapper.id = "page-wrapper-content-swap";

    // create page buttons
    var pageHighScoreButtonWrapper = document.createElement("div");
    pageHighScoreButtonWrapper.className = "btn-wrapper-swap";

    // Creating the H2 element and adding it to the page-wrapper-content
    var pageH2TagElement = document.createElement("h2");
    pageH2TagElement.style.textAlign = "left";
    pageH2TagElement.className = "page-welcome-txt";
    pageH2TagElement.textContent = "All Done!";
    pageHighScoreWrapper.appendChild(pageH2TagElement);

    // Creating the p tag element and adding it to the page-wrapper-content
    var pagePTagElement = document.createElement("p");
    pagePTagElement.style.textAlign = "left";
    pagePTagElement.className = "page-welcome-txt";
    pagePTagElement.id = "page-welcome-txt";
    pagePTagElement.textContent = "Your final score is: " + total;
    pageHighScoreWrapper.appendChild(pagePTagElement);

    // Creating the p tag element and adding it to the page-wrapper-content
    var pageFormElement = document.createElement("form");
    pageFormElement.style.textAlign = "left";
    pageFormElement.className = "page-highscore-form";

    // Creating the p tag element and adding it to the page-wrapper-content
    var pagePTagElement = document.createElement("p");
    pagePTagElement.style.textAlign = "left";
    pagePTagElement.className = "page-welcome-txt";
    pagePTagElement.id = "page-welcome-txt";
    pagePTagElement.textContent = "Enter Initials:";
    pageFormElement.appendChild(pagePTagElement);

    // Creating the p tag element and adding it to the page-wrapper-content
    var pageInputElement = document.createElement("input");
    pageInputElement.style.textAlign = "left";
    pageInputElement.className = "page-welcome-txt";
    pageInputElement.id = "page-welcome-input-txt";
    pageInputElement.type = "text";
    pageInputElement.name = "initials";
    pageFormElement.appendChild(pageInputElement);

    // Creating the input field element and adding it to the page-wrapper-content
    var pageBtnElement = document.createElement("input");
    pageBtnElement.className = "page-welcome-txt btn";
    pageBtnElement.id = "page-welcome-txt-btn";
    pageBtnElement.type = "button";
    pageBtnElement.value = "Submit";
    pageBtnElement.addEventListener("click", saveScores);
    pageFormElement.appendChild(pageBtnElement);
    pageHighScoreButtonWrapper.appendChild(pageFormElement);
    pageHighScoreWrapper.appendChild(pageHighScoreButtonWrapper);

    var pageDivElement = document.querySelector("#page-quizlet");
    pageDivElement.parentElement.replaceChild(pageHighScoreWrapper, pageDivElement);

    //#endregion create elements
};

function saveScores() {
    debugger;
    // getting new input element
    var inputElement = document.getElementById("page-welcome-input-txt");
    var initials = inputElement.value;

    // Create the object array to be saved into Local Storage
    var scoreObj = 
        {
            name: initials,
            score: total
        }
    // ];


    // trying to get saved scores from local storage
    var savedScores = localStorage.getItem("score");
    savedScores = JSON.parse(savedScores);
    
    // console.log("1", scoreObj);

    // if there no score saved, create a list with scores, otherwise append
    if (!savedScores) {
        savedScores = [scoreObj];
    }
    else {
        // If saved score exists then add income object
        savedScores.push( scoreObj );
        console.log("2", savedScores);

        // append score
        for (var i = 0; i < savedScores.length; i++) {
            console.log(i);
            console.log(savedScores.length);
            console.log(savedScores[i]);
            localStorage.setItem("score", JSON.stringify(savedScores[i]));
        }
    }
    // save data to local storage   
    localStorage.setItem("score", JSON.stringify(savedScores));
    
    // clearing input form
    inputElement.value = "";

};



//#region OLD Stuff



    // // debugger;
    // // var input = value2;
    // var inputElement = document.getElementById("page-welcome-input-txt");
    // var initials = inputElement.value;

    // // creating object array 
    // var scoreObj = {
    //     name: initials,
    //     score: total
    // }
    // var scoreJson = JSON.stringify(scoreObj);
    // localStorage.setItem("score", scoreJson);

    // // clearing input form
    // inputElement.value = "";

// };

// function loadTasks() {
//     debugger;
//     var savedScores = localStorage.getItem("score");
//     // console.log(savedTasks);

//     if (!savedScores) {
//         return false;
//     }
//     console.log("Saved scores found!");
//     savedScores = JSON.parse(savedScores);
//     console.log(savedScores);
//     highScores = savedScores
//     viewHighScores(highScores);
// };
//#endregion

function startQuiz() {

    var duration = 2 * 1;
    display = document.querySelector('#timer-count');

    // total = checkAnswer()
    // console.log("Start Quiz", total)

    pageWrapperContent = createQuestionsElements();

    // send values to setTimer function
    setTimer(duration, display);
    if (timer < 0) return;
    createNextQuestion(false);
    // viewHighScores(total);
};

// loadTasks();
startTimer.addEventListener("click", startQuiz);


// End of timer related functions