import { Player } from './player.js';



const api_url =  "https://courselab.lnu.se/quiz/question/1"   


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
var players = [];


start_button.onclick = function() {
    quiz_box.style.display = "flex";
    registration_box.style.display = "none";
    let player = new Player(input_name_form.value)
    players.push(player);
}

submit_button.onclick = function() {
    
}


