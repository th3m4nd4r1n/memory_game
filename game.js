var userClickedPattern = [];
var gamePattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var started = false;
var userChosenColour;
var randomChosenColour;
//2. Create a new variable called level and start at level 0.
var level = 0;

//1. Use jQuery to detect when a keyboard key has been pressed, when that happens for the first time, call nextSequence().
$(document).keypress(function() {
  if (!started) {

    //3. The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});



$(".btn").click(function(){
  if(started == true){

    userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
  }
});


function checkAnswer(currentLevel){
  if(gamePattern[currentLevel] == userClickedPattern[currentLevel]){
    console.log("success");
    if(gamePattern.length == userClickedPattern.length){
      $("#level-title").text("Level " + currentLevel);
setTimeout(function(){

  nextSequence();
},1000);
    }
  }
  else
  {
    console.log("wrong");
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
    $("#level-title").text("Game Over!!, press any key to restart.");
    $("body").addClass("game-over"); 
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200
  );
  started = false;
  startOver();

  }

}


function nextSequence() {
  userClickedPattern=[];
    var a = Math.floor(Math.random()*4);
 randomChosenColour = buttonColors[a];
gamePattern.push(randomChosenColour);
$("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
playSound(randomChosenColour);
}


function playSound(name){
    
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}


function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");
 setTimeout(function(){
    $("#" + currentColor).removeClass("pressed");
 }, 100);
}

function startOver(){
  level = 0;
  gamePattern = [];
  started = false;
}