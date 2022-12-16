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
    question_text.innerHTML = data.question
    if (data.hasOwnProperty('alternatives')){
        multiAnswers(data)
    }
    else {
        singleAnswer(data)
    }
       
}


function multiAnswers(data) {
    let alternatives = data.alternatives
    let form = document.createElement('form')
    
    let targetElement = document.getElementById("submit");
    let parent = targetElement.parentNode
    parent.insertBefore(form, targetElement)
    for(let alternative in alternatives){
        addRadioButton(form, alternative, alternative.key, alternative.value)
    }
}

function addRadioButton(form, name, value) {
    let radioButton = document.createElement('input')
    radioButton.type = "radio";
    radioButton.name = name;
    radioButton.value = value;
    form.appendChild(radioButton)
}



function singleAnswer(data) {

    let input = document.createElement('input')
    input.classList.add('input')
    let targetElement = document.getElementById("submit");
    let parent = targetElement.parentNode
    input.setAttribute("type", "text");
    input.setAttribute("id", "answer");
    input.setAttribute("name", "answer");
    parent.insertBefore(input, targetElement)

    
    submit_button.addEventListener('click', async function() {
        console.log(input.value)
        let postData = await Request.POST(input.value, data.nextURL)
        loadQuestion(postData.nextURL)
        input.remove()
    })



}