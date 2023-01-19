let downloadTimer;
let playedTime
let timeLeft;



function startTimer(duration) {

    timeLeft = duration

      downloadTimer = setInterval(function(){
      
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

function timeIsOver() {

    if (timeLeft<= 0) {
        stopTimer();
        errorMessage();
      }
      
}

export {startTimer, stopTimer, getPlayedTime, timeIsOver};
