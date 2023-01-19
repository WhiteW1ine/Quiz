import { errorMessage } from "../main.js";


let downloadTimer;
let playedTime
let timeLeft;



function startTimer(duration) {

    timeLeft = duration

      downloadTimer = setInterval(function(){
      
      if (timeLeft<= 0) {
        stopTimer();
        errorMessage();
      }

      document.getElementById('seconds').innerHTML = timeLeft + 's';
      timeLeft -= 1;
      playedTime = duration - timeLeft;

    }, 1000);
}

function stopTimer() {
    clearInterval(downloadTimer)
}

function getPlayedTime() {
    return playedTime;
}


export {startTimer, stopTimer, getPlayedTime};
