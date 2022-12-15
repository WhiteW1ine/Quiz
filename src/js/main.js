import { Player } from './modules/player.js';
import { Timer } from './modules/timer.js';



const startingApiURL=  "https://courselab.lnu.se/quiz/question/1"   


const question_text = document.getElementById('question')
const first_option_answer = document.getElementById('a_text')
const second_option_answer = document.getElementById('b_text')
const third_option_answer = document.getElementById('c_text')
const fourth_option_answer = document.getElementById('d_text')
const submit = document.getElementById('submit')
const start_button = document.getElementById('start')
const submit_button = document.getElementById('submit')
const quiz_box = document.getElementById('quiz')
const registration_box = document.getElementById('registration')
const input_name_form = document.getElementById('nickName')
const localStorage = window.localStorage;




function startGame() {
    let player = new Player(input_name_form.value)
    console.log(playerd)
    startTimer();           
}

function startTimer() {
    const timer = new Timer(17);
    timer.start();
}

start_button.addEventListener('click', () => {
    quiz_box.classList.remove('hidden')
    registration_box.classList.add('hidden')
    startGame()
})

function loadQuestion() {
    GET(startingApiURL)
}