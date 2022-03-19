var startTimer = document.querySelector("#btn");

// Querying the first DIV inside the section with id="page-quizlet"
var pageDivElement = document.querySelector("#page-quizlet");


// Set interval 
setTimer = function(duration, display) {
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

clearDivElement = function () {
    // pageDivElement.remove();
    createQuestionsElements();
}

createQuestionsElements = function () {
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
        pageButtonWrapper.appendChild(pageButtonElement);
        pageWrapperContent.appendChild(pageButtonWrapper);
    };
//#endregion buttons

    pageDivElement.parentElement.replaceChild(pageWrapperContent, pageDivElement);


    // console.log("inside create elements" + pageWrapperContent);
    // return pageWrapperContent;
    
    createRandomQuestions(pageWrapperContent);
};


createRandomQuestions = function (pageWrapperContent, question1, question2) {
    var content = pageWrapperContent;
    // var obj =JSON.parse(content);
    console.log(content);
    // debugger;
    //#region questions
    var questionsObject = {
        question1: "What is your name?",
        q1Button1: "x",
        q1Button2: "y",
        q1Button3: "z",
        q1Button4: "k",

        question2: "What is your city?",
        q2Button1: "a",
        q2Button2: "b",
        q2Button3: "c",
        q2Button4: "d",
    };
    console.log(questionsObject);
//#endregion questions

    // console.log(content.querySelector("h2"));
    var h2TagContent = content.querySelector("h2");
    var button1 = content.querySelector("#btn-answer1");
    var button2 = content.querySelector("#btn-answer2");
    var button3 = content.querySelector("#btn-answer3");
    var button4 = content.querySelector("#btn-answer4");
    // console.log(h2TagContent);
    console.log(button1);

    // // console.log(h2TagContent);
    // if (h2TagContent == true) {
    //         console.log(h2TagContent);
            h2TagContent.textContent = "Test 1";
            button1.innerHTML = "test1";
            button2.innerHTML = "test2";
            button3.innerHTML = "test3";
            button4.innerHTML = "test4";
    // }
    
    // console.log("Show the content from createQuestionsElements function " + content);

};

startQuiz = function () {
    var duration = 4 * 1;
    display = document.querySelector('#timer-count');

    // send values to setTimer function
    setTimer(duration, display);
    clearDivElement();
    // createQuestionsElements();
};

startTimer.addEventListener("click", startQuiz);

// End of timer related functions


