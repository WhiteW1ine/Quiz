import { Player } from './modules/player.js';
import { Timer } from './modules/timer.js';
import * as Request from './modules/request.js';



const startingApiURL=  'https://courselab.lnu.se/quiz/question/1'  

const timer = new Timer(17);
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




start_button.addEventListener('click', () => {
    quiz_box.classList.remove('hidden')
    registration_box.classList.add('hidden')
    startGame()
})

submit_button.addEventListener('click', () => {
    startTimer()
})


function startGame() {
    let player = new Player(input_name_form.value)
    console.log(player)
    timer.start();      
    loadQuestion(startingApiURL);  
}



async function loadQuestion(url) {
    let data = await Request.GET(url)
    if (data.hasOwnProperty('alternatives')){
        multiAnswers();
    }
    else {
        singleAnswer();
    }   
    question_text.innerHTML = data.question
    checkAnswerGetNextQuestion()
}

async function checkAnswerGetNextQuestion() {
    let postData = await Request.POST(2, 'https://courselab.lnu.se/quiz/answer/1')
    submit_button.addEventListener('click', () => {
        loadQuestion(postData.nextURL)
    })
}

function singleAnswer() {
    let input = document.createElement('input')
    input.setAttribute("type", "text");
    input.setAttribute("id", "answer");
    input.setAttribute("name", "answer");
    document.body.appendChild(input);
}