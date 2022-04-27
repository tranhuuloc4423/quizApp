const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

var url = location.href
var indexPage = url.substr(url.length - 1)
// console.log(indexPage)
const DS_DE_THI = 'danhSachDeThi'

const dsDeThi = JSON.parse(localStorage.getItem(DS_DE_THI)) || []
const nextBtn = $('#next')
const result = $('#result')
const submitBtn = $('#submit')
const questionTitle = $('.quiz__title')
const answer__text = Array.from($$('.answer__text'))
let chooseAnswers = Array.from($$('input[name="answers"]'))

let currentQuestion = 0
let chooseAnsersArray = []
let score = 0;

const currentExem = dsDeThi[indexPage]

function getCorrectAnswer() {
    let array = []
    let corrects = currentExem.questions
    corrects.forEach(item => {
        array.push(item.correct)
    })
    return array
}
getCorrectAnswer()

function renderQuestion() {
    if(currentQuestion < currentExem.questions.length) {
        let questionArray = currentExem.questions
        questionTitle.innerHTML = `Câu hỏi số ${currentQuestion + 1} : ${questionArray[currentQuestion].question}`
        let answers = questionArray[currentQuestion].answers
        let i = 0
        for(let key in answers) {
            
            i++
        }
        answer__text[0].innerHTML = `A: ${answers.a}`
        answer__text[1].innerHTML = `B: ${answers.b}`
        answer__text[2].innerHTML = `C: ${answers.c}`
        answer__text[3].innerHTML = `D: ${answers.d}`
        // chooseAnswers.onchange = function() {
        
        // }
        getChoiceAnswer()
    }
}
renderQuestion()

function getChoiceAnswer() {
    chooseAnswers.forEach(item => {
        if(item.checked) {
            chooseAnsersArray.push(item.id)
        }
    })
    return chooseAnsersArray
}
// renderQuestion()

function deselect() {
    chooseAnswers.forEach(item => item.checked = false)
}

function checkResult() {
    for(let i = 0; i < getCorrectAnswer().length; i++) {
        if(chooseAnsersArray[i] === getCorrectAnswer()[i]) {
            score++;
        }
    }
}

function showResult() {
    result.innerHTML = `
        <h2>Chúc mừng bạn đã hoàn thành bài kiểm tra</h2>
        <p>Số điểm của bạn là ${score}/${currentExem.questions.length} câu</p>
    `
}


function handleEvents() {
    

    nextBtn.onclick = function() {
        currentQuestion++;
        renderQuestion()
        deselect()
        if(currentQuestion === currentExem.questions.length - 1) {
            nextBtn.classList.add('hide')
            // submitBtn.classList.remove('hide')
        }
    }
    
    
    submitBtn.onclick = function() {
        $('#quiz').classList.add('hide')
        result.classList.remove('hide')
        submitBtn.classList.add('hide')
        nextBtn.classList.add('hide')
        $('#home').classList.remove('hide')
        renderQuestion()
        checkResult()
        showResult()
    }
}
handleEvents()