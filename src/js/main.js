import { Player } from './modules/player.js'
import * as Request from './modules/request.js'
import * as Timer from './modules/timer.js'
export { errorMessage }

const startingApiURL = 'https://courselab.lnu.se/quiz/question/1'

let player

const questionText = document.getElementById('question')
const startButton = document.getElementById('start-button')
const submitButton = document.getElementById('submit')
const quizBox = document.getElementById('quiz')
const registrationBox = document.getElementById('registration-box')
const winningBox = document.getElementById('winning-box')
const inputNameForm = document.getElementById('nickName')
const resultsBox = document.getElementById('results_box')
const errorBox = document.getElementById('errors')
const restartButton = document.getElementById('restart')
const leaderboardButtonWin = document.getElementById('results_in_winning_box')
const leaderboardButtonError = document.getElementById('results_in_error_box')

startButton.addEventListener('click', () => {
  quizBox.classList.remove('hidden')
  registrationBox.classList.add('hidden')
  startGame()
})

submitButton.addEventListener('click', () => {
  const playedTime = Timer.getPlayedTime()
  player.addPlayedTime(playedTime)
  Timer.stopTimer()
  Timer.startTimer(10)
})

restartButton.addEventListener('click', () => {
  player = null
  location.reload()
  errorBox.classList.add('hidden')
  registrationBox.classList.remove('hidden')
})

leaderboardButtonWin.addEventListener('click', () => {
  winningBox.classList.add('hidden')
  resultsBox.classList.remove('hidden')

  showLeaderBoard()
})

leaderboardButtonError.addEventListener('click', () => {
  errorBox.classList.add('hidden')
  resultsBox.classList.remove('hidden')

  showLeaderBoard()
})

/**
 *
 */
function startGame () {
  player = new Player(inputNameForm.value)
  Timer.startTimer(10)
  loadQuestion(startingApiURL)
}

/**
 *
 * @param {string} url //The first url of giving api
 */
async function loadQuestion (url) {
  const data = await Request.GET(url)
  questionText.innerHTML = data.question
  if (Object.prototype.hasOwnProperty.call(data, 'alternatives')) {
    multiAnswers(data)
  } else {
    singleAnswer(data)
  }
}

/**
 *
 * @param {JSON} data //The data provided by api
 */
function singleAnswer (data) {
  const input = document.createElement('input')
  input.classList.add('input')
  const targetElement = document.getElementById('submit')
  const parent = targetElement.parentNode
  input.setAttribute('type', 'text')
  input.setAttribute('id', 'answer')
  input.setAttribute('name', 'answer')
  parent.insertBefore(input, targetElement)

  submitButton.addEventListener('click', async function () {
    const response = await Request.POST(input.value, data.nextURL)
    const dataJson = await response.json()

    if (response.status === 400) {
      errorMessage()
    } else if (!Object.prototype.hasOwnProperty.call(dataJson, 'nextURL') && response.status === 200) {
      finishGame()
    }

    loadQuestion(dataJson.nextURL)
    input.remove()
  }, { once: true })
}

/**
 *
 * @param {JSON} data //The data provided by api
 */
function multiAnswers (data) {
  const alternatives = data.alternatives
  const form = document.createElement('form')
  form.classList.add('form')
  const targetElement = document.getElementById('submit')
  const parent = targetElement.parentNode
  parent.insertBefore(form, targetElement)

  for (const alternative in alternatives) {
    addRadioButton(form, alternative, alternatives[alternative])
  }

  submitButton.addEventListener('click', async function () {
    const selectedRadio = form.querySelector('input[name="buttonsGroup"]:checked')
    const response = await Request.POST(selectedRadio.value, data.nextURL)
    const dataJson = await response.json()

    if (response.status === 400) {
      errorMessage(dataJson)
    } else if (!Object.prototype.hasOwnProperty.call(dataJson, 'nextURL') && response.status === 200) {
      finishGame()
    }

    loadQuestion(dataJson.nextURL)
    form.remove()
  }, { once: true })
}

/**
 *
 * @param {HTMLFormElement} form // The form where we need to add radio buttons
 * @param {string} value // Value of the radio buttons
 * @param {HTMLLabelElement} labelText // Labels of the radio buttons
 */
function addRadioButton (form, value, labelText) {
  const radioButton = document.createElement('input')
  radioButton.type = 'radio'
  radioButton.name = 'buttonsGroup'
  radioButton.value = value

  const label = document.createElement('label')
  label.appendChild(radioButton)
  label.appendChild(document.createTextNode(labelText))

  form.appendChild(label)
}

/**
 *
 */
function finishGame () {
  quizBox.classList.add('hidden')
  Timer.stopTimer()
  const playerResult = document.getElementById('player_result')
  playerResult.innerHTML = 'Your result is: ' + player.getPlayedTime() + ' seconds'
  winningBox.classList.remove('hidden')
  sessionStorage.setItem(player.getPlayerName(), player.getPlayedTime())
}

/**
 *
 */
function errorMessage () {
  Timer.stopTimer()
  quizBox.classList.add('hidden')
  errorBox.classList.remove('hidden')
}

/**
 *
 */
function showLeaderBoard () {
  for (let i = 1; i < sessionStorage.length; i++) {
    const key = sessionStorage.key(i)
    const value = sessionStorage.getItem(key)
    const node = document.createElement('LI')
    const textnode = document.createTextNode('{Nickname: ' + key + '; Seconds: ' + value + '}')
    node.appendChild(textnode)
    document.getElementById('data').appendChild(node)
  }
}
