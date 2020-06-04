var QandA = [
    {
        q:"Commonly used data types DO NOT include:",
        a:"alerts",
        mc:["strings", "boolean", "alerts", "numbers"]
    },
    {
        q:"The condition in an if / else statement is enclosed within ___.",
        a:"parentheses",
        mc:["quotes", "curly braces", "parentheses", "square brackets"]
    },
    
    {
        q:"Arrays in JavaScripts can be used to store ____.",
        a:"all of the above",
        mc:["numbers and strings", "other arrays", "booleans", "all of the above"]
    },
    
    {
        q:"String values must be enclosed within ____ when being assigned to variables.",
        a:"quotes",
        mc:["commas", "curly braces", "quotes", "parentheses"]
    }
    
    ];
    

//observe the start button
var startButton = document.querySelector("#start-button");

//observe the start jumbotron
var startPage = document.querySelector("#start-page");
// //observe the question jumbotron

//observe the time left
var timeLeft = document.querySelector(".time");

//observe the question element
var question = document.querySelector("#question-page");

//observe the question portion element
var questionPortion = document.querySelector("#question-portion");

//observe the answerBtn element
var buttonGroup = document.querySelector(".button-group");

//observe correct alert
var correct = document.querySelector("#correct");

//observe wrong alert
var wrong = document.querySelector("#wrong");

//observe HighScore-Form
var scoreForm = document.querySelector("#HighScore-Form");

//observe initials
var initials = document.querySelector("#initials");

//observe initials-word
var initialsWord = document.querySelector("#intials-word");

//observe submit-button
var submitButton = document.querySelector("#submit-button");

//observe clear-button
var clearButton = document.querySelector("#clear-button");

//observe clear-button
var gobackButton = document.querySelector("#goback-button");

//observe high-score
var highScoreLink = document.querySelector(".high-score");

var allDonePhrase = document.querySelector("#all-done");


//listen to the clicking on start button
startButton.addEventListener("click", startQuiz);


//observe score-display
var scoreDisplay = document.querySelector("#score-display");



var timeRemaining = 75;
var score = 0;
var finalScore = 0;
var current_question = 0;
var people =[{}];
var currentId = 0;

//write the function to startQuiz
function startQuiz(event){

event.preventDefault();

    //the start page has to disapper
    startPage.classList.add("hide");

    //display the questions page
    question.classList.remove("hide");

    //the time has to countdown from 75 seconds
    var timer = setInterval(timeCalculation, 1000);

    function timeCalculation(){    
        timeLeft.textContent = "Time left: " + timeRemaining;
         
        if (timeRemaining <= 0 || current_question === QandA.length) {
            clearInterval(timer);
            finalScore = score;
            viewHighScores();
            reset();

        }

        timeRemaining--;   
 
    }
    questions(current_question);



}

    //write a function to circulate the questions
    function questions(i){
        
        questionPortion.innerHTML = "";
        buttonGroup.innerHTML = "";
        correct.classList.add("hide");
        wrong.classList.add("hide");
    


        var questionEl = document.createElement("p");
        questionEl.textContent = QandA[i].q;
        questionPortion.appendChild(questionEl);

        var CorrectAnswer = QandA[i].a;  


        // answerBtn1.textContent = QandA[0].mc[0];
        var answer1El = document.createElement("a");
        answer1El.setAttribute("class", "btn btn-primary btn-lg");
        answer1El.textContent = QandA[i].mc[0];
	    answer1El.href = "javascript: checkClickedAnswer('" + QandA[i].mc[0] + "');";
        buttonGroup.appendChild(answer1El);


        // answerBtn2.textContent = QandA[0].mc[1];
        var answer2El = document.createElement("a");
        answer2El.setAttribute("class", "btn btn-primary btn-lg");
        answer2El.textContent = QandA[i].mc[1];
	    answer2El.href = "javascript: checkClickedAnswer('" + QandA[i].mc[1] + "');";
        buttonGroup.appendChild(answer2El);


        // answerBtn3.textContent = QandA[0].mc[2];
        var answer3El = document.createElement("a");
        answer3El.setAttribute("class", "btn btn-primary btn-lg");
        answer3El.textContent = QandA[i].mc[2];
	    answer3El.href = "javascript: checkClickedAnswer('" + QandA[i].mc[2] + "');";
        buttonGroup.appendChild(answer3El);



        // answerBtn4.textContent = QandA[0].mc[3];
        var answer4El = document.createElement("a");
        answer4El.setAttribute("class", "btn btn-primary btn-lg");
        answer4El.textContent = QandA[i].mc[3];
	    answer4El.href = "javascript: checkClickedAnswer('" + QandA[i].mc[3] + "');";
        buttonGroup.appendChild(answer4El);
        
}


    function checkClickedAnswer(event){

    var answer = QandA[current_question].a;

            if(event === answer ){
                correct.classList.remove("hide");
                score++;
            }

            else{
                wrong.classList.remove("hide");
                timeRemaining -= 10;
                score--;
            }
       
    setTimeout(() => { questions(++current_question); }, 500);
    
    }

        function reset(){    
            scoreForm.classList.remove("hide");
            timeLeft.textContent = "Time left: " + 0;
            correct.classList.add("hide");
            wrong.classList.add("hide");
            question.classList.add("hide");
            current_question = 0;
            timeRemaining = 75;
            score = 0;

        }

        function viewHighScores(){
            allDonePhrase.classList.remove("hide");
            initials.classList.remove("hide");
            initialsWord.classList.remove("hide");
            submitButton.classList.remove("hide");
            
            
            var newHighscore = document.createElement("h3");
            newHighscore.textContent = "Your score is: " + finalScore;
            scoreDisplay.appendChild(newHighscore);

            submitButton.addEventListener("click", saveScore);

            function saveScore(event){

                event.preventDefault();

                var name = initials.value;
                var highScoreDiv = document.createElement("div");
                var h5 = document.createElement("h5");
                highScoreDiv.setAttribute("class", "alert alert-primary");
                highScoreDiv.setAttribute("style", "width: 50%");
                h5.innerHTML = name + " -- High Score : " + finalScore;
                people.push({name: name});
                scoreDisplay.appendChild(highScoreDiv);
                highScoreDiv.appendChild(h5); 
                
                clearButton.classList.remove("hide");
                gobackButton.classList.remove("hide");  
                initials.classList.add("hide");
                initialsWord.classList.add("hide");
                submitButton.classList.add("hide");
                scoreDisplay.removeChild(newHighscore);

                clearButton.addEventListener("click", clearContent);

                function clearContent(){
                scoreDisplay.remove(h5);
                scoreForm.removeChild(scoreDisplay);

            }



            }

            gobackButton.addEventListener("click", goback);

            function goback(){
                scoreForm.classList.add("hide");
                startPage.classList.remove("hide");              


            }

            highScoreLink.addEventListener("click", highScoreDisplay);

            function highScoreDisplay(){

                scoreForm.classList.remove("hide"); 
                clearButton.classList.remove("hide");
                gobackButton.classList.remove("hide");
                startPage.classList.add("hide"); 
                allDonePhrase.classList.add("hide");
                submitButton.classList.add("hide");
                initials.classList.add("hide");
                initialsWord.classList.add("hide");


            }        
          
            
        }

