//id counter
var questionIdCounter = 0;
var questionEl = document.querySelector("#question-id"); //question title element
var choicesEl = document.querySelector("#choices-id"); //choice element
var answerText = document.querySelector("#answer-id"); //save the answer section in this variable
var quizStart = document.querySelector("#quiz-start");

var scoreArray = [];

var timerEl = document.querySelector("#timer");
var timeLeft = 60;
var score =0;

//questions and answer arrays
var questionArray = [
    {
        q: "How are you?",
        c: ["Good", "Meh", "Awful no good terrible"],
        answer: "Good"
    },

    {
        q: "Why are you?",
        c: ["Why am I what?", "Just because", "Therefore I am"],
        answer: "Therefore I am"
    },

    {
        q: "Where are you?",
        c: ["Here", "There", "Everywhere"],
        answer: "Everywhere"
    },

    {
        q: "What was the point of these questions?",
        c: ["No point", "Made up examples on the spot", "Homework"],
        answer: "Homework"
    }
]; 

//subtract one from timeLeft 
var setTime = function(){
    timeLeft = timeLeft-1;
    if (timeLeft === 0){
        clearInterval(setTime);
        quizEnding();
    }
};


//restart timer and then show questions
var begin = function(){
    timeLeft = 60;
    appearQuestion();
}

//Question and choice will appear one by one after choosing an option
var appearQuestion = function(event){
    quizStart.textContent="";
    //question text will be according to index
    questionEl.textContent = questionArray[questionIdCounter].q;

    //choices will be according to index number
    var choices = questionArray[questionIdCounter].c;

    //create element for each choice and do action once a choice is clicked
    for (var i = 0; i < choices.length; i++){
        var choiceBtn = document.createElement("ol"); //make unordered list for every choice
        choiceBtn.textContent = choices[i]; //go through every choice

        choicesEl.append(choiceBtn); //add choices in element
        choiceBtn.addEventListener("click", userChoice); //add event listener to choice click
    }

}



//when a choice is clicked
var userChoice = function(event) { 
    var userEl = event.target.textContent; //save the text of whatever you clicked on

    if (userEl === questionArray[questionIdCounter].answer){ //if what you chose is my correct answer
        answerText.textContent = "Correct!"; //then you are correct
        score++;
    }

    else { 
        answerText.textContent = "Wrong!";
        //minus time from timer
    }

    if (questionIdCounter < questionArray.length-1){ //if we haven't finished going through all questions
        questionIdCounter++; //add to id counter
        choicesEl.textContent = ""; //clear choices for next batch
        appearQuestion();
    }

    else { //otherwise game has ended
        quizEnding();
    }
}

//when user first opens quiz
var quizOpening = function(){
    quizStart.textContent = "Would You Like To Start My Quiz?";

    var startBtn = document.createElement("button");
    startBtn.textContent = "Sure why not";
    quizStart.appendChild(startBtn);

    startBtn.addEventListener("click", function(){
        var timeLeft = 60;

        var quizTimer = setInterval(function function1(){
            timerEl.innerHTML = timeLeft + " " + "seconds remaining";
            timeLeft-=1;
            if(timeLeft <=0){
                clearInterval(quizTImer);
                timerEl.innerHTML = "Time is up"
            }
        }, 1000);
    });

}



var clearEverything = function(){
    questionEl.textContent = "";
    choicesEl.textContent = "";
    answerText.textContent = "";
};

//when timer is over or choices are complete
var quizEnding = function(){
    clearEverything();
    var scoreText = document.createElement("div");
    scoreText.textContent = "Your Final Score is: " + score;
    quizStart.appendChild(scoreText);

    var initialEl = document.createElement("input");
    initialEl.setAttribute("type", "text");
    quizStart.appendChild(initialEl);

    //save score and initials here

    var startBtn = document.createElement("button");
    startBtn.textContent = "Submit";
    quizStart.appendChild(startBtn);
    questionIdCounter = 0;
    score= 0;
    startBtn.addEventListener("click", begin);
};

var saveScore = function(initial, scores){
    scoreArray.appendChild(initial, scores);
    scoreArrayJson = JSON.stringify(scoreArray);
    localStorage.setItem("scoreArray", scoreArrayJson);
    //loadScore("scoreArray");
};

var loadScore = function (array){
    var str = localStorage.getItem(array);
    var parsedArr = JSON.parse(str);
    console.log(parsedArr);
};
quizOpening();

