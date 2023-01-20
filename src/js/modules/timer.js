import { errorMessage } from '../main.js'

let downloadTimer
let playedTime
let timeLeft

/**
 *
 * @param {string} duration // duration of the timer
 */
function startTimer (duration) {
  timeLeft = duration

  downloadTimer = setInterval(function () {
    if (timeLeft <= 0) {
      stopTimer()
      errorMessage()
    }

    document.getElementById('seconds').innerHTML = timeLeft + 's'
    timeLeft -= 1
    playedTime = duration - timeLeft
  }, 1000)
}

/**
 *
 */
function stopTimer () {
  clearInterval(downloadTimer)
}

/**
 * @returns {string} // Returns the played time of the user for one question
 */
function getPlayedTime () {
  return playedTime
}

export { startTimer, stopTimer, getPlayedTime }
