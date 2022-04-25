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

//id counter
var questionIdCounter = 0;
var questionEl = document.querySelector("#question-id"); //question title element
var choicesEl = document.querySelector("#choices-id"); //choice element

//Question and choice will appear one by one after choosing an option
var appearQuestion = function(){
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
    var answerText = document.querySelector("#answer-id"); //save the answer section in this variable

    if (userEl === questionArray[questionIdCounter].answer){ //if what you chose is my correct answer
        answerText.textContent = "Correct!"; //then you are correct
        //add to score
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
        //high score function
    }
}

appearQuestion();

//within each object is a questions, choices, answers
//
