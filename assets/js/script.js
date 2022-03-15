// Timer related functions
var startingQuiz = document.querySelector("#btn");

// console.log("hello");

// Set interval 
setTimer = function(duration, display) {
    var timer = duration, minutes, seconds;
    setInterval(function() {
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
            alert("Time's UP!");
            return false;
        }
    }, 1000);
};

startQuiz = function () {
    var duration = 4 * 1;
    display = document.querySelector('#timer-count');

    // send values to setTimer function
    setTimer(duration, display);
};

startingQuiz.addEventListener("click", startQuiz);


// startQuiz();


// End of timer related functions
