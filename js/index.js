// import array from "./nhapde.js";

const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const DS_DE_THI = 'danhSachDeThi'

const dsDeThi = JSON.parse(localStorage.getItem(DS_DE_THI)) || []
console.log(dsDeThi)

function renderExamList() {
    let html = ''
    dsDeThi.map(item => {
        html += `
            <tr>
                <td>${item.id + 1}</td>
                <td>${item.name}</td>
                <td><a href="./html/lam-bai.html?id=${item.id}">Làm bài</a></td>
            </tr>
        `
    })
    document.querySelector('tbody').innerHTML = html
}
renderExamList()
