//id counter
var questionIdCounter = 0;
var questionEl = document.querySelector("#question-id"); //question title element
var choicesEl = document.querySelector("#choices-id"); //choice element
var answerText = document.querySelector("#answer-id"); //save the answer section in this variable
var quizStart = document.querySelector("#quiz-start");

var timerEl = document.querySelector("#timer");
var timerText = document.createElement("p");
var timeLeft = 60;
var score =0;

var setTime = function(){
    timeLeft = timeLeft-1;
    if (timeLeft === 0){
        clearInterval(setTime);
        quizEnding();
    }
};

//questions and answer arrays
var questionArray = [
    {
        q: "How are you?",
        c: ["Good", "Meh", "Awful no good terrible"],
        answer: "Good"
    },

    {
        q: "Why are you?",
        c: ["Idk", "Because", "Therefore I am"],
        answer: "Idk"
    },

    {
        q: "Where are you?",
        c: ["Here", "There", "Everywhere"],
        answer: "Everywhere"
    }
]; 

//begin timer and then show text
var begin = function(){
    timeLeft = 60;
    setInterval(setTime, 1000);
    timerText.textContent = "Timer: "+ timeLeft;
    timerEl.append(timerText);
    appearQuestion();
}

//Question and choice will appear one by one after choosing an option
var appearQuestion = function(event){
    quizStart.textContent="";
    //question text will be according to index
    questionEl.textContent = questionArray[questionIdCounter].q;

    //choices will be according to index number
    //var choices = choicesEl.textContent;
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
    console.log(userEl);

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
    quizStart.textContent = "Would You Like To Start My Pointless Quiz?";

    var startBtn = document.createElement("button");
    startBtn.textContent = "Sure why not";
    quizStart.appendChild(startBtn);

    startBtn.addEventListener("click", begin);
   
}

//when timer is over or choices are complete
var quizEnding = function(){
    questionEl.textContent = "";
    choicesEl.textContent = "";
    answerText.textContent = "";
    var scoreText = document.createElement("p");
    scoreText.textContent = "Your Score: " + score;
    quizStart.appendChild(scoreText);

    var initialEl = document.createElement("input");
    initialEl.setAttribute("type", "text");

    var startBtn = document.createElement("button");
    startBtn.textContent = "Try Again";
    quizStart.appendChild(startBtn);
    questionIdCounter = 0;
    score= 0;
    startBtn.addEventListener("click", begin);
};
quizOpening();

