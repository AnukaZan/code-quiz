//questions and answer arrays
var questionArray = [
    {
        q: "How are you?",
        c: ["Good", "Meh", "Awful no good terrible"],
        answer: "Good"
    },

    {
        q: "Which is a real coding language?",
        c: ["OrangutanX", "SnakeDB", "Python"],
        answer: "Python"
    },

    {
        q: "How do you create an element on JS?",
        c: ["document.PleaseCreateMeAnElement", "document.GiveMeAnElementNOW", "document.createElement"],
        answer: "document.createElement"
    },

    {
        q: "How do you assign a font on CS?",
        c: ["font-familia", "font-miFamilia", "font-family"],
        answer: "font-family"
    },

    {
        q: "How do you fetch an API?",
        c: ["fetch(apiUrl)", "getMe(apiUrl)", "getMe(apiUrl).please"],
        answer: "fetch(apiUrl)"
    },

    {
        q: "What was the point of these questions?",
        c: ["No point", "Made up examples on the spot", "Homework"],
        answer: "Homework"
    }
]; 

//id counter
var questionIdCounter = 0;
var questionEl = document.querySelector("#question-id"); //question title element
var choicesEl = document.querySelector("#choices-id"); //choice element
var answerText = document.querySelector("#answer-id"); //save the answer section in this variable
var quizStart = document.querySelector("#quiz-start");
var showHighScores = document.querySelector("#showHighScores");

var startBtn = document.getElementById("#startBtn");
var backBtn = document.querySelector("#backToQuiz");
var clearBtn = document.querySelector("#clearScore");
var quizArea = document.querySelector("#quizArea");
var scoreText = document.querySelector("#scoreText");
var quizEndingEl = document.querySelector("#quizEnding");
var saveScoreBtn = document.querySelector("#saveScoreBtn");

var scoreArray = [];

var timerEl = document.querySelector("#timer");
var timeLeft = 60;
var score =0;


//restart timer and then show questions
var begin = function(){
    questionIdCounter = 0;
    timeLeft = 60;
    appearQuestion();
}

//Question and choice will appear one by one after choosing an option
var appearQuestion = function(){
    $("#quiz-start").removeClass();
    $("#quiz-start").attr("style", "display:none");
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

    // if (questionIdCounter >= questionArray.length-1){
    //     quizEnding();
    // }

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
        timeLeft = timeLeft-10;
    }

    questionIdCounter++;

    //if we haven't finished going through all questions, next question.
    if (questionIdCounter < questionArray.length){
        choicesEl.textContent = ""; //clear choices for next batch
        appearQuestion();
    } 
    // If we have, game ends
    else {
        quizEnding();
    }
    console.log(questionIdCounter);
}

//when user first opens quiz and click "start" timer will start
var quizOpening = function(){
    timerEl.innerHTML = "";
    $(quizStart).addClass("block");
    startBtn = document.getElementById("#startBtn");
    questionIdCounter = 0;
    score= 0;

    //when start button is clicked
    $("button").on("click", function(){
        timeLeft = 60;
        console.log("clicked");
        //timer will start
        var quizTimer = setInterval(function(){
            timeLeft--;
            timerEl.innerHTML = "Timer: " + timeLeft;
            if(timeLeft <=0 || questionIdCounter >= questionArray.length-1){
                clearInterval(quizTimer);
                timerEl.innerHTML = "Game Over!";
                quizEnding();
            };
        }, 1000);
           
        appearQuestion();
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
    timerEl.innerHTML = "Game Over!";
    $("#quizEnding").removeClass();
    $("#quizEnding").attr("style", "display:block");
    scoreText.textContent = score;
};

var inputInitial = document.getElementById("inputInitials")

//input score area
var inputScore = function(event){
   event.preventDefault();
   //make quiz area empty
   quizArea.style.display = "none";
   //show high score area
   showHighScores.style.display = "block";
   
   var savedScores = localStorage.getItem("scores");
   
   //if local storage empty, keep it empty. If not, parse the saved scores
   if(savedScores === null){
       scoreArray = [];
   } else {
       scoreArray = JSON.parse(savedScores)
   }

   //save current score as array item
   var currentScore = {
       initials: inputInitial.ariaValueMax,
       score: score.textContent
   };

   //push current score to array
   scoreArray = scoreArray.push(currentScore);

   //make array string to store
   var str= JSON.stringify(scoreArray);
   localStorage.setItem("scores", str);

   displayScore();
}

var listofHS = document.getElementById("#listofHS");

var displayScore = function(){
   //make quiz area empty
   quizArea.style.display = "none";
   //show high score area
   showHighScores.style.display = "block";
   var savedScores = localStorage.getItem("scores");

   if (savedScores === null){
       return;
   }

   var scoreHistory = JSON.parse(savedScores);

   for (var i = 0; i<savedScores.length; i++){
       var eachScore = document.createElement("li");
       eachScore.innerHTML = scoreHistory[i].initials + "has a score of " + scoreHistory[i].score;
        listofHS.appendChild(eachScore);
   }

   
}

quizOpening();


saveScoreBtn.addEventListener("click", function(event){
    inputScore(event);
});

backBtn.addEventListener("click", function(){
    quizOpening();
})

