//#region variables
var startTimer = document.querySelector("#btn");
var pageDivElement = document.querySelector("#page-quizlet");
var total = 0;
const value = 10;
var currentQuestionIndex = 0;
var pageWrapperContent = null;
var pageHighScore = null;

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
    }
];
//#endregion variables

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
            // alert("Your timer is over! Save your results and compare with your friends");
            // return viewHighScores(total);
        }
    }, 1000);
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
            return viewHighScores(total);
        } 
    };
};

function viewHighScores (value) {
    var total = value;
    console.log("View High Scores", total);
    
    //#region create elements

    // create and define div classes name
    var pageHighScore = document.createElement("div");
    pageHighScore.className = "page-wrapper-content-swap";

    // Creating the H2 element and adding it to the page-wrapper-content
    var pageH2TagElement = document.createElement("h2");
    pageH2TagElement.style.textAlign = "left";
    pageH2TagElement.className = "page-welcome-txt";
    pageH2TagElement.textContent = "All Done!";
    pageHighScore.appendChild(pageH2TagElement);

    // Creating the p tag element and adding it to the page-wrapper-content
    var pagePTagElement = document.createElement("p");
    pagePTagElement.style.textAlign = "left";
    pagePTagElement.className = "page-welcome-txt";
    pagePTagElement.textContent = "Your final score is: " + total;
    pageHighScore.appendChild(pagePTagElement);

    // Creating the input field element and adding it to the page-wrapper-content
    var pageFormElement = document.createElement("form");
    pageFormElement.style.textAlign = "left";
    pageFormElement.className = "page-welcome-txt";
    pageFormElement.type = "text";
    pageFormElement.name = "Enter Initials:";
    pageFormElement.textContent = "Your final score is:";
    pageHighScore.appendChild(pageFormElement);

    console.log("This is the page score content", pageHighScore);
    console.log(pageDivElement);

    var pageDivElement = document.querySelector("#page-quizlet");

    pageDivElement.parentElement.replaceChild(pageHighScore, pageDivElement);

    console.log("This is the page score content", pageHighScore);
    
    console.log(pageDivElement);

    
    // <input type="text" name="task-name" class="text-input" placeholder="Enter Task Name" /

    return pageHighScore;
    //#endregion create elements
};



function startQuiz () {
    var duration = 2 * 1;
    display = document.querySelector('#timer-count');
    
    // total = checkAnswer()
    // console.log("Start Quiz", total)

    pageWrapperContent = createQuestionsElements();

    // send values to setTimer function
    setTimer(duration, display);
    createNextQuestion(false);
    // viewHighScores(total);
};

startTimer.addEventListener("click", startQuiz);



// End of timer related functions