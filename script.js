// global constants
var clueHoldTime = 1000; //how long to hold each clue's light/sound
const cluePauseTime = 333; //how long to pause in between clues
const nextClueWaitTime = 1000; //how long to wait before starting playback of the clue sequence

//Global Variables
var pattern = [];
var progress = 0; 
var gamePlaying = false;
var tonePlaying = false;
var volume = 0.5;  //must be between 0.0 and 1.0
var guessCounter = 0;

var currentStrikes = 3;


function startGame(){
  //initialize game variables
  context.resume()
  progress = 0;
  gamePlaying = true;
  randomPattern();
  
  // swap the Start and Stop buttons
  document.getElementById("startBtn").classList.add("hidden");
  document.getElementById("stopBtn").classList.remove("hidden");
  playClueSequence();
}

function stopGame(){
  gamePlaying = false;
  document.getElementById("startBtn").classList.remove("hidden");
  document.getElementById("stopBtn").classList.add("hidden");
  currentStrikes = 3;
  document.querySelector("#strikes > span").innerHTML = currentStrikes;
}

//Random pattern
function randomPattern(){
  
  pattern = [];
  for(var i = 0; i<8; i++){
    pattern.push(1 + Math.floor(Math.random() * 5));
  }
  
  console.log(pattern);
  
  
}

// Sound Synthesis Functions
const freqMap = {
  1: 261.6,
  2: 329.6,
  3: 392,
  4: 466.2,
  5: 500.2,
  6: 150.4
}

function clearScoreToWhite(){
  document.querySelector("#strikes > span").style.color="white";
}
function playIncorrectTone(len){
  o.frequency.value = freqMap[6]
  g.gain.setTargetAtTime(volume,context.currentTime + 0.05,0.025)
  tonePlaying = true
  setTimeout(function(){
    stopTone()
  },len)
}


function playTone(btn,len){ 
  o.frequency.value = freqMap[btn]
  g.gain.setTargetAtTime(volume,context.currentTime + 0.05,0.025)
  tonePlaying = true
  setTimeout(function(){
    stopTone()
  },len)
}
function startTone(btn){
  context.resume()
  if(!tonePlaying){
    o.frequency.value = freqMap[btn]
    g.gain.setTargetAtTime(volume,context.currentTime + 0.05,0.025)
    tonePlaying = true
  }
}
function stopTone(){
    g.gain.setTargetAtTime(0,context.currentTime + 0.05,0.025)
    tonePlaying = false
}

function lightButton(btn){
  document.getElementById("button"+btn).classList.add("lit")
}
function clearButton(btn){
  document.getElementById("button"+btn).classList.remove("lit")
}

function playSingleClue(btn){
  if(gamePlaying){
    lightButton(btn);
    playTone(btn,clueHoldTime);
    setTimeout(clearButton,clueHoldTime,btn);
  }
}

function playClueSequence(){
  guessCounter = 0;
  clueHoldTime = clueHoldTime - (25 * progress);
  let tempClueHoldTime = clueHoldTime;
  let delay = nextClueWaitTime; //set delay to initial wait time
  for(let i=0;i<=progress;i++){ // for each clue that is revealed so far
    console.log("play single clue: " + pattern[i] + " in " + delay + "ms")
    setTimeout(playSingleClue,delay,pattern[i]) // set a timeout to play that clue
    delay += clueHoldTime 
    delay += cluePauseTime;
    if(progress <=2){
      clueHoldTime = clueHoldTime - 35;
    }else if(progress <=5){
      clueHoldTime = clueHoldTime - 40;
    }else {
      clueHoldTime = clueHoldTime - 50;
    }
  }
  
  clueHoldTime = tempClueHoldTime;
}

function loseGame(){
  stopTone();
  setTimeout(function() {
    stopGame();
  	alert("Game Over. You lost.");
    
  },100);
}

function winGame(){
  stopGame();
  alert("Game Over. You won!.");
  
}

function guess(btn){
  context.resume()
  console.log("user guessed: " + btn);
  
  if(!gamePlaying){
    
    return;
  }

  // add game logic here
  if(btn == pattern[guessCounter]){
    if(guessCounter == progress){
      if(guessCounter == pattern.length-1){
        winGame();
      }else{
        progress++;
        playClueSequence();
      }
    }else{
      guessCounter++;
    }
  }else{
    playIncorrectTone(800);
    if(currentStrikes == 1){
      currentStrikes--;
      //console.log("currentStrikes: " + currentStrikes);
      document.querySelector("#strikes > span").innerHTML = currentStrikes;
      document.querySelector("#strikes > span").style.color="red";
      setTimeout(function(){
        clearScoreToWhite();
      },200)

      loseGame();
    }else{
      currentStrikes--;
      document.querySelector("#strikes > span").innerHTML = currentStrikes;
      document.querySelector("#strikes > span").style.color="red";
      setTimeout(function(){
        clearScoreToWhite();
      },200)


    }
    
  }
}


//Page Initialization
// Init Sound Synthesizer
var context = new AudioContext()
var o = context.createOscillator()
var g = context.createGain()
g.connect(context.destination)
g.gain.setValueAtTime(0,context.currentTime)
o.connect(g)
o.start(0)
