// Timer related functions
var startTimer = document.querySelector("#btn");

// Querying the first DIV inside the section with id="page-quizlet"
var pageDivEl = document.querySelector("#page-quizlet");


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


createQuestionsElements = function () {
    // Define div classes name
    var pageWrapperContent = document.createElement("div");
    pageWrapperContent.className = "page-wrapper-content"; 
    
    // Creating the H2 element and adding it to the page-wrapper-content
    var pageH2El = document.createElement("h2");
    pageH2El.style.textAlign = "left";
    pageH2El.className = "page-welcome-txt";
    pageH2El.textContent = "Coding Quiz Challenge 222huahsuhduahushdasuhdu ashdasuhdashhdasudhsauhsau    22";
    pageWrapperContent.appendChild(pageH2El);
    pageDivEl.parentElement.replaceChild(pageWrapperContent, pageDivEl);

    // create page buttons div
    var pageButtonWrapper = document.createElement("div");
    pageButtonWrapper.className = "btn-wrapper";

    // assigns the new buttons   
    var buttons = [
        "Answer1",
        "Answer2",
        "Answer3",
        "Answer4",
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
};

startQuiz = function () {
    var duration = 4 * 1;
    display = document.querySelector('#timer-count');

    // send values to setTimer function
    setTimer(duration, display);
    createQuestionsElements();
};

startTimer.addEventListener("click", startQuiz);

// End of timer related functions


