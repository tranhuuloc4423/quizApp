const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const DS_DE_THI = "danhSachDeThi"

const DeThi = $('#dethi')
const cauHoi = $$('.cauhoi')
const answers = Array.from($$('.answers'))
const correct = $$('input[type="radio"]')
const saveBtn = $('#save')
const addBtn = $('#add')
let boxQuestion = $('.box__questions')

const dsDeThi = JSON.parse(localStorage.getItem(DS_DE_THI)) || []



let currentIndex = 0;
let maDeThi = dsDeThi.length
let index = 0;

function createQuestion() {
    return `
        <div class="question" id="form-${currentIndex}">
            <label for="cauhoi">Câu hỏi số ${currentIndex + 1}:</label>
            <input type="text" id="cauhoi-${currentIndex}" name="cauhoi">
            <br>
            <label for="phuongan">Phương án :</label>
            <div class="box__answers">
                <div class="box__answers-item">
                    <label for="a">A</label>
                    <input type="text" class="answers">
                    <input type="radio" name="dapan-${currentIndex}" class="a">
                </div>
                <div class="box__answers-item">
                    <label for="b">B</label>
                    <input type="text" class="answers">
                    <input type="radio" name="dapan-${currentIndex}" class="b">
                </div>
                <div class="box__answers-item">
                    <label for="c">C</label>
                    <input type="text" class="answers">
                    <input type="radio" name="dapan-${currentIndex}" class="c">
                </div>
                <div class="box__answers-item">
                    <label for="d">D</label>
                    <input type="text" class="answers">
                    <input type="radio" name="dapan-${currentIndex}" class="d">
                </div>
            </div>
        </div>
    `
}

function getInputDatas() {
    const questionArray = Array.from($$('.question'))
    let array = []
    
    questionArray.forEach((item, index) => {
        const questionValue = item.querySelector(`#cauhoi-${index}`).value
        const correct = item.querySelector('input[type="radio"]:checked')
        const answers = Array.from(item.querySelectorAll('.answers'))
        if(correct) {
            array.push({
                question: questionValue,
                answers: {
                    a: answers[0].value,
                    b: answers[1].value,
                    c: answers[2].value,
                    d: answers[3].value,
                },
                correct: correct.className
            })
        } else {
            alert('Vui long nhap day du!')
        }
    })

    array.forEach(item => {
        console.log(item)
    })

    return array
}

function pushDatas() {
    if(DeThi.value && getInputDatas().length >= 1) {
        dsDeThi.push({
            id: maDeThi,
            name: DeThi.value,
            questions: getInputDatas()
        })
    } else {
        alert("vui long nhap de thi!")
    }
    localStorage.setItem(DS_DE_THI, JSON.stringify(dsDeThi))
}
// function test() {
//     return dsDeThi
// }

// export default test

// export default test;

function handleEvents() {
    saveBtn.onclick = function() {
        pushDatas()
        location.reload()
    }
    
    addBtn.onclick = () => {
        currentIndex++
        boxQuestion.innerHTML += createQuestion()
    }
}
handleEvents()

// const array = dsDeThi
// export default array