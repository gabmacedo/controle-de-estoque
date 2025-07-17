const date = new Date()
const options = {
  dateStyle: 'full',
  timeStyle: 'short'
}

const hours = document.querySelector('#hours')
let nowDate = date.toLocaleString('pt-BR', options)
const fixDate = nowDate.charAt(0).toUpperCase() + nowDate.slice(1)

hours.textContent = fixDate

console.log(nowDate)