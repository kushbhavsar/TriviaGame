$( document ).ready(function() {

    var queNum;
    var timerInterval;
    var queTime;
    var inBetweenTimer;
    var correct=0;
    var wrong=0;
    var unanswerd=0;


    var generalQue = [
        {
            question: "Javascript is _________ language?",
            correct:1,
            answers:["Programing","Scripting","Application","None of these"]
    
        },
        {
            question: "JavaScript Code can be called by using _________?",
            correct:2,
            answers:["Functions Only","RMI","Triggering Event","Preprocessor"]
        },
        {
            question: "Which of the following Attribute is used to include External JS code inside your HTML Document ?",
            correct:2,
            answers:["Link","Script","Src","Ext"]
        },
        {
            question: "JavaScript Statements are executed by ________ .?",
            correct:3,
            answers:["Server","JVM","Compiler","Browser"]
        },
        {
            question: "JavaScript was invented at _______ Lab .?",
            correct:0,
            answers:["Netscape","Google Lab","Sun Microsystem","AT&T Bell Lab"]
        },
        {
            question: "JavaScript was originally developed under the name _______.?",
            correct:1,
            answers:["Oak","Mocha","Sencha","Action Script"]
        },
        {
            question: "Which JavaScript variable cannot be used as First character but can be use after first character ?",
            correct:3,
            answers:["Asterisk","Doller Sign","Underscore","Digit"]
        },
        {
            question: "Tripal equals operator is _______________.?",
            correct:2,
            answers:["Is equal to","Is Identical(Is equal and is of the different type)","Is Identical(Is equal and is of the same type)","None of these"]
        },
        {
            question: "Which of the following is not an logical operator ? ?",
            correct:3,
            answers:[" && "," || "," ! "," | "]
        },
        {
            question: "Adding String and Integer always results in _________. ?",
            correct:3,
            answers:["Character","Boolean","Integer","None of these"]
        }
    ]
    


$("#startButton").on("click", startGame);

function startGame(){
    queNum=0;
    correct=0;
    wrong=0;
    unanswerd=0;
    nextQue();
}

function decrementTimer(){
    
    var timeLeft = parseInt($("#displayTimer").text());
    timeLeft--;
    $("#displayTimer").text(timeLeft);

}

function outOfTime(){

    unanswerd++;
    clearInterval(timerInterval);
    clearTimeout(queTime);


    $("#answerDiv").remove();
    $("#question").remove();
    $("#head").append("<h2>Out Of Time!<h2/>");
    queNum++;

    if(queNum === generalQue.length)
    {
        inBetweenTimer = setTimeout(displayResults, 2000);
    }
    else{
        inBetweenTimer = setTimeout(nextQue, 2000);

    }

}



$(document).on("click",".answerButton",checkAnswer);
$(document).on("click","#restart",startGame);



function checkAnswer(){

    clearInterval(timerInterval);
    clearTimeout(queTime);

    $("#answerDiv").remove();
    $("#question").remove();
    console.log(this);
    var answerIndex = parseInt($(this).attr("answerindex"));
    var successDisplay = $("<h2>");
    if(answerIndex===generalQue[queNum].correct)
    {
        correct++;
        successDisplay.text("You are Right congrats..");
        $("#head").append(successDisplay);

    }
    else{
        wrong++;
        successDisplay.text("Wrong")
        var correctAnswerDisplay = $("<h2>")
        correctAnswerDisplay.text("The right answer was : "+generalQue[queNum].answers[generalQue[queNum].correct]);
        $("#head").append(successDisplay);
        $("#head").append(correctAnswerDisplay);

    }

    queNum++;


    if(queNum === generalQue.length)
    {
        inBetweenTimer = setTimeout(displayResults, 3000);
    }
    else{
        inBetweenTimer = setTimeout(nextQue, 3000);

    }
}


function nextQue(){


    $("#head").empty();
    $("#middle").empty();


    
    var question = $("<h2>");
    var timerDisplay = $("<p>");
    var answerDiv= $("<div>");
    
    timerDisplay.attr("id", "displayTimer");
    timerDisplay.text("30");

    question.attr("id", "question");
    question.text(generalQue[queNum].question);

    answerDiv.attr("id", "answerDiv");

    var answers = generalQue[queNum].answers;
    for(var i = 0; i<answers.length; i++){

        var answerDisplay = $("<button>");
        answerDisplay.attr({class:"answerButton", answerindex:i});
        answerDisplay.text(answers[i]);
        answerDiv.append(answerDisplay);
    }


    $("#head").append(timerDisplay);


    $("#head").append(question);

    $("#head").append(answerDiv);

    timerInterval=setInterval(decrementTimer, 1000);
    queTime=setTimeout(outOfTime, 30000);

}

function displayResults(){
    var result = $("#head");
    result.empty();
    result.append("<h2>Results<h2/>");
    result.append("<h3>Correct Answers: " +correct);
    result.append("<h3>Wrong Answers: " +wrong);
    result.append("<h3>Unanswered: " +unanswerd);
    result.append("<input id=restart type=submit value=Restart>");
}

});