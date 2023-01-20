import { Player } from './modules/player.js'
import * as Request from './modules/request.js'
import * as Timer from './modules/timer.js'
export { errorMessage }

const startingApiURL = 'https://courselab.lnu.se/quiz/question/1'

let player

const question_text = document.getElementById('question')
const start_button = document.getElementById('start-button')
const submit_button = document.getElementById('submit')
const quiz_box = document.getElementById('quiz')
const registration_box = document.getElementById('registration-box')
const winning_box = document.getElementById('winning-box')
const input_name_form = document.getElementById('nickName')
const results_box = document.getElementById('results_box')
const error_box = document.getElementById('errors')
const restart_button = document.getElementById('restart')
const leaderboard_button_win = document.getElementById('results_in_winning_box')

const leaderboard_button_error = document.getElementById('results_in_error_box')

start_button.addEventListener('click', () => {
  quiz_box.classList.remove('hidden')
  registration_box.classList.add('hidden')
  startGame()
})

submit_button.addEventListener('click', () => {
  const played_time = Timer.getPlayedTime()
  player.addPlayedTime(played_time)
  Timer.stopTimer()
  Timer.startTimer(10)
})

restart_button.addEventListener('click', () => {
  player = null
  error_box.classList.add('hidden')
  registration_box.classList.remove('hidden')
})

leaderboard_button_win.addEventListener('click', () => {
  winning_box.classList.add('hidden')
  results_box.classList.remove('hidden')

  showLeaderBoard()
})

leaderboard_button_error.addEventListener('click', () => {
  error_box.classList.add('hidden')
  results_box.classList.remove('hidden')

  showLeaderBoard()
})

/**
 *
 */
function startGame () {
  player = new Player(input_name_form.value)
  Timer.startTimer(10)
  loadQuestion(startingApiURL)
}

/**
 *
 * @param url
 */
async function loadQuestion (url) {
  const data = await Request.GET(url)
  question_text.innerHTML = data.question
  if (data.hasOwnProperty('alternatives')) {
    multiAnswers(data)
  } else {
    singleAnswer(data)
  }
}

/**
 *
 * @param data
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

  submit_button.addEventListener('click', async function () {
    const response = await Request.POST(input.value, data.nextURL)
    const data_json = await response.json()

    if (response.status === 400) {
      errorMessage()
    } else if (!data_json.hasOwnProperty('nextURL') && response.status === 200) {
      finishGame()
    }

    loadQuestion(data_json.nextURL)
    input.remove()
  }, { once: true })
}

/**
 *
 * @param data
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

  submit_button.addEventListener('click', async function () {
    const selectedRadio = form.querySelector('input[name="buttonsGroup"]:checked')
    const response = await Request.POST(selectedRadio.value, data.nextURL)
    const data_json = await response.json()

    if (response.status === 400) {
      errorMessage(data_json)
    } else if (!data_json.hasOwnProperty('nextURL') && response.status === 200) {
      finishGame()
    }

    loadQuestion(data_json.nextURL)
    form.remove()
  }, { once: true })
}

/**
 *
 * @param form
 * @param value
 * @param labelText
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
  quiz_box.classList.add('hidden')
  Timer.stopTimer()
  const player_result = document.getElementById('player_result')
  player_result.innerHTML = 'Your result is: ' + player.getPlayedTime() + ' seconds'
  winning_box.classList.remove('hidden')
  sessionStorage.setItem(player.getPlayerName(), player.getPlayedTime())
}

/**
 *
 */
function errorMessage () {
  Timer.stopTimer()
  quiz_box.classList.add('hidden')
  error_box.classList.remove('hidden')
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
