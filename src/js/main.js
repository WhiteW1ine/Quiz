import { Player } from './modules/player.js';
import { Timer } from './modules/timer.js';
import * as Request from './modules/request.js';



const startingApiURL=  'https://courselab.lnu.se/quiz/question/1'  

const timer = new Timer(17);
const question_text = document.getElementById('question')
const submit = document.getElementById('submit')
const start_button = document.getElementById('start')
const submit_button = document.getElementById('submit')
const quiz_box = document.getElementById('quiz')
const registration_box = document.getElementById('registration')
const input_name_form = document.getElementById('nickName')
const localStorage = window.localStorage;
const resulsts_box = document.getElementById('results')




start_button.addEventListener('click', () => {
    quiz_box.classList.remove('hidden')
    registration_box.classList.add('hidden')
    startGame()
}, {once: true})

submit_button.addEventListener('click', () => {
    startTimer()
}, {once: true})


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
        console.log('multi')
    }
    else {
        singleAnswer(data)
        console.log('single')
    }
       
}


function multiAnswers(data) {
    
    let alternatives = data.alternatives
    let form = document.createElement('form')
    form.classList.add('form')
    let targetElement = document.getElementById("submit");
    let parent = targetElement.parentNode
    parent.insertBefore(form, targetElement)

    for(let alternative in alternatives){
        addRadioButton(form, alternative, alternatives[alternative])
    }


    submit_button.addEventListener('click', async function() {
        let selectedRadio = form.querySelector('input[name="buttonsGroup"]:checked')
        let postData = await Request.POST(selectedRadio.value, data.nextURL)
        if (!postData.hasOwnProperty('nextURL')){
            finishGame()
        }
        loadQuestion(postData.nextURL)
        form.remove()
    },{once: true})


}

function addRadioButton(form, value, labelText) {
    let radioButton = document.createElement('input')
    radioButton.type = 'radio';
    radioButton.name = 'buttonsGroup';
    radioButton.value = value;

    let label = document.createElement('label')
    label.appendChild(radioButton);
    label.appendChild(document.createTextNode(labelText))

    form.appendChild(label)
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
        let postData = await Request.POST(input.value, data.nextURL)
        if (!postData.hasOwnProperty('nextURL')){
            finishGame()
        }
        loadQuestion(postData.nextURL)
        input.remove()
    }, {once:true})

}

function finishGame() {
    quiz_box.classList.add('hidden')
    resulsts_box.classList.remove('hidden')
    
}


