//#region variables
// debugger;
var startTimer = document.querySelector("#btn");
var pageDivElement = document.querySelector("#page-quizlet");
var total = 0;
const value = 10;
const valuePenalty = -10
var currentQuestionIndex = 0;
var pageWrapperContent = null;
var pageHighScore = null;
var timer = 0;
var pageFormElement = document.querySelector("#page-welcome-txt-btn");
var pageHighScoreWrapper = null;
var initialsSubmitBtn = null;

var questionList = [
    {
        question: "Which one of the following options it's NOT a JavaScript data type?",
        button1: "1. Number",
        button2: "2. Stream",
        button3: "3. Object",
        button4: "4. Boolean",
        correctAnswer: "2. Stream"
    },
    {
        question: "What is the escape character used by JavaScript?",
        button1: "1. Backslash",
        button2: "2. Double Quotes",
        button3: "3. Single Quotes",
        button4: "4. Ampersand",
        correctAnswer: "1. Backslash"
    },
    {
        question: "Which of the following it's a valid JavaScript var declaration?",
        button1: "1. var()",
        button2: "2. 'var=10'",
        button3: "3. var = 10,",
        button4: "4. var = 10;",
        correctAnswer: "4. var = 10;"
    },
    {
        question: "What does the 'var myArray = [[[]]];' statement declare?",
        button1: "1. An Array",
        button2: "2. An Object Array",
        button3: "3. An Array of Arrays",
        button4: "4. A three-dimensional Array",
        correctAnswer: "4. A three-dimensional Array"
    },
    {
        question: "Which operations below it's NOT considered a valid loop for JavaScript?",
        button1: "1. For Loop",
        button2: "2. For/In Loop",
        button3: "3. While/Floor Loop",
        button4: "4. Do/While Loop",
        correctAnswer: "3. While/Floor Loop"
    },
    {
        question: "Which type of JavaScript language is ___?",
        button1: "1. Object-Oriented",
        button2: "2. Object-Based",
        button3: "3. Assembly-language",
        button4: "4. High-level",
        correctAnswer: "2. Object-Based"
    },
    {
        question: "Which one of the following also known as Conditional Expression:",
        button1: "1. Alternative to if-else",
        button2: "2. Switch statement",
        button3: "3. If-then-else statement",
        button4: "4. Immediate if",
        correctAnswer: "4. Immediate if"
    },
    {
        question: "In JavaScript, what is a block of statement?",
        button1: "1. Conditional block",
        button2: "2. Block that combines a number of statements into a single compound statement",
        button3: "3. Both conditional block and a single statement",
        button4: "4. Block that contains a single statement",
        correctAnswer: "2. Block that combines a number of statements into a single compound statement"
    },
    {
        question: "The 'function' and 'var' are known as:",
        button1: "1. Keywords",
        button2: "2. Data types",
        button3: "3. Declaration statements",
        button4: "4. Prototypes",
        correctAnswer: "3. Declaration statements"
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
            alert("Your timer is over! Save your results and compare with your friends");
            return createHighScoreElement(total);
        }
    }, 1000);

    return timer;
};

function createQuestionsElements() {
    // #region create elements
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

    // Creating the H2 element to present answer response to user
    var pageH2ResponseElement = document.createElement("h2");
    pageH2ResponseElement.style.textAlign = "left";
    pageH2ResponseElement.className = "pageH2ResponseElement";
    pageWrapperContent.appendChild(pageH2ResponseElement);

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
                // Increases the value based on the correct answer and add response to user
                total += value;
                var pageDivElement = document.querySelector("#page-quizlet");
                console.log(pageDivElement);
                var pageH2ResponseElement = document.querySelector(".pageH2ResponseElement");
                console.log(pageH2ResponseElement);
                pageH2ResponseElement.textContent = "Correct";
                pageH2ResponseElement.style.borderTop = "#959191 5px solid";
                pageDivElement.appendChild(pageH2ResponseElement, pageDivElement);
                console.log("correct answer")
            } else {
                var pageDivElement = document.querySelector("#page-quizlet");
                console.log(pageDivElement);
                var pageH2ResponseElement = document.querySelector(".pageH2ResponseElement");
                console.log(pageH2ResponseElement);
                pageH2ResponseElement.textContent = "Wrong";
                pageH2ResponseElement.style.borderTop = "#959191 5px solid";
                pageDivElement.appendChild(pageH2ResponseElement, pageDivElement);
                console.log("wrong answer")
            }
            setTimeout(createNextQuestion, 3000);
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
            createHighScoreElement(total);

        }
    };
};

function createHighScoreElement(value) {
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
    pageInputElement.id = "page-initials-input-txt";
    pageInputElement.type = "text";
    pageInputElement.name = "initials";
    pageFormElement.appendChild(pageInputElement);

    // Creating the input field element and adding it to the page-wrapper-content
    var pageBtnElement = document.createElement("input");
    pageBtnElement.className = "page-welcome-txt btn";
    pageBtnElement.id = "page-welcome-txt-btn";
    pageBtnElement.type = "button";
    pageBtnElement.value = "Submit";
    pageBtnElement.addEventListener("click", submitScores);
    pageFormElement.appendChild(pageBtnElement);
    pageHighScoreButtonWrapper.appendChild(pageFormElement);
    pageHighScoreWrapper.appendChild(pageHighScoreButtonWrapper);

    var pageDivElement = document.querySelector("#page-quizlet");

    pageDivElement.parentElement.replaceChild(pageHighScoreWrapper, pageDivElement);
    console.log("page element", pageDivElement);

    //#endregion create elements
};

function submitScores() {
    saveScores();
    createHighScoreSummary();
    getMaxValueKey();
};

function createHighScoreSummary() {
    // create and define div classes name
    var pageHighScoreSummaryWrapper = document.createElement("div");
    pageHighScoreSummaryWrapper.className = "page-wrapper-history-summary-swap";
    pageHighScoreSummaryWrapper.id = "page-wrapper-history-summary-swap";

    // create page buttons
    var pageHighScoreSummaryButtonWrapper = document.createElement("div");
    pageHighScoreSummaryButtonWrapper.className = "btn-history-summary-wrapper-swap";

    // Creating the H2 element and adding it to the page-wrapper-content
    var pageHighScoreSummaryH2TagElement = document.createElement("h2");
    pageHighScoreSummaryH2TagElement.style.textAlign = "left";
    pageHighScoreSummaryH2TagElement.className = "page-welcome-txt";
    pageHighScoreSummaryH2TagElement.textContent = "High Scores!";
    pageHighScoreSummaryWrapper.appendChild(pageHighScoreSummaryH2TagElement);

    // Creating the p tag element and adding it to the page-wrapper-content
    var pageHighScoreSummaryInputElement = document.createElement("input");
    pageHighScoreSummaryInputElement.style.textAlign = "left";
    pageHighScoreSummaryInputElement.className = "page-welcome-txt";
    pageHighScoreSummaryInputElement.id = "page-summary-input-txt";
    pageHighScoreSummaryInputElement.type = "text";
    pageHighScoreSummaryInputElement.name = "higher-score";
    pageHighScoreSummaryWrapper.appendChild(pageHighScoreSummaryInputElement);

    // Creating the input field element and adding it to the page-wrapper-content
    var pageHighScoreSummaryBtnElement = document.createElement("input");
    pageHighScoreSummaryBtnElement.className = "page-welcome-txt btn-history-swap";
    pageHighScoreSummaryBtnElement.id = "#btn-history-summary-swap1";
    pageHighScoreSummaryBtnElement.type = "button";
    pageHighScoreSummaryBtnElement.value = "Go back";
    pageHighScoreSummaryBtnElement.addEventListener("click", restartGame);
    pageHighScoreSummaryButtonWrapper.appendChild(pageHighScoreSummaryBtnElement);
    pageHighScoreSummaryWrapper.appendChild(pageHighScoreSummaryButtonWrapper);

    // Creating the input field element and adding it to the page-wrapper-content
    var returnPageBtnElement = document.createElement("input");
    returnPageBtnElement.className = "page-welcome-txt btn-history-swap";
    returnPageBtnElement.id = "#btn-history-summary-swap2";
    returnPageBtnElement.type = "button";
    returnPageBtnElement.value = "Clear high scores";
    returnPageBtnElement.addEventListener("click", clearScores);
    pageHighScoreSummaryButtonWrapper.appendChild(returnPageBtnElement);
    pageHighScoreSummaryWrapper.appendChild(pageHighScoreSummaryButtonWrapper);

    var pageDivElement = document.querySelector("#page-wrapper-content-swap");
    pageDivElement.parentElement.replaceChild(pageHighScoreSummaryWrapper, pageDivElement);
};

function getMaxValueKey() {
    var savedScores = localStorage.getItem("score");
    savedScores = JSON.parse(savedScores);

    for (player in savedScores) {
        var max = Math.max.apply(Math, savedScores.map(function (object) { return object.score; }));
        
        if (savedScores[player].score == max) {
            var highest = savedScores[player].name + ": " + max;        
            console.log(highest);
        }
    }
    var input = document.querySelector("#page-summary-input-txt");
    input.value = highest;
};


function saveScores() {
    // getting new input element
    var inputElement = document.querySelector("#page-initials-input-txt");
    var initials = inputElement.value;  

    if (!initials) {
        alert("This is a required field, ensure to type your initials")
        // return createHighScoreElement();
    } 
    console.log(initials)
    // Create the object array to be saved into Local Storage
    var scoreObj = 
        {
            name: initials,
            score: total
        }
    // trying to get saved scores from local storage
    var savedScores = localStorage.getItem("score");
    savedScores = JSON.parse(savedScores);

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
            localStorage.setItem("score", JSON.stringify(savedScores[i]));
        }
    }
    // save data to local storage   
    localStorage.setItem("score", JSON.stringify(savedScores));
    
    // clearing input form
    inputElement.value = "";  
};

function clearScores() {
    var savedScores = localStorage.getItem("score");
    if (savedScores) {
        localStorage.removeItem("score");
        alert("High Score has been removed!")
    }
};

function restartGame() {
    window.location.reload();
}

function loadHighScores() {
    // trying to get saved scores from local storage
    var savedScores = localStorage.getItem("score");
    savedScores = JSON.parse(savedScores);

    savedScores.sort((a, b) => (a.score > b.score) ? -1 : 1 );
    console.log(savedScores);

    for (player in savedScores) {
        var loadHighScoresPage = document.querySelector("#page-score-list");
        var loadHighScoresElement = document.createElement("h2");
        loadHighScoresElement.className = "page-h2-score-list";
        loadHighScoresElement.id = "page-h2-score-list-" + player;
        loadHighScoresElement.innerHTML = "Name: " + savedScores[player].name + "<br>" + " Score: " + savedScores[player].score;
        loadHighScoresPage.appendChild(loadHighScoresElement, loadHighScoresPage);
    };
};

function startQuiz() {
    var duration = 60 * 1;
    display = document.querySelector('#timer-count');
    pageWrapperContent = createQuestionsElements();

    // send values to setTimer function
    setTimer(duration, display);
    if (timer < 0) return;
    createNextQuestion(false);
};

startTimer.addEventListener("click", startQuiz);

// End of timer related functions