var questionArray = [
    {
        question: "How are you?",
        choices: ["Good", "Meh", "Awful no good terrible"],
        answer: "Good"
    },

    {
        question: "Why are you?",
        choices: ["Idk", "Because", "Therefore I am"],
        answer: "Idk"
    },

    {
        question: "Where are you?",
        choices: ["Here", "There", "Everywhere"],
        answer: "Everywhere"
    }
]; 

var questionIdCounter = 0;


var appearQuestion = function(){
    var questionTitle = document.querySelector("#question-id");
    questionTitle.textContent = questionArray[questionIdCounter].question;

    var questionChoices = document.querySelector("#choices-id");

    for (var i = 0; i < questionArray[questionIdCounter].choices.length; i++){
        var choiceBtn = document.createElement("li");
        choiceBtn.textContent = questionArray[questionIdCounter].choices[i];
        choiceBtn.addEventListener("click", userChoice);
        questionChoices.append(choiceBtn);
    }

    console.log(questionTitle);

}

var userChoice = function(event) { // this variable gonna do something w/event
    var userEl = event.target.textContent;
    console.log(userEl);
    var answerText = document.querySelector("#answer-id");

    if (userEl === questionArray[questionIdCounter].answer){
        answerText.textContent = "Correct!";
        //add to score
    }

    else {
        answerText.textContent = "Wrong!";
        //minus time from timer
    }

    if (questionIdCounter < questionArray.length-1){
        questionIdCounter++;
        appearQuestion();
    }

    else {
        //high score function
    }
}

appearQuestion();

//within each object is a questions, choices, answers
//
