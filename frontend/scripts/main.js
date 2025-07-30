const token = sessionStorage.getItem('token')
if (!token) {
  window.location.href = 'index.html'
}

const USERNAME = sessionStorage.getItem('name')

const welcome = document.querySelector('#welcome')
const welcomeUserName = document.createElement('h1')
welcomeUserName.innerHTML = `<h1>Bem-vindo, ${USERNAME}!</h1>`
welcome.appendChild(welcomeUserName)

const welcomeHours = document.createElement('p')

const date = new Date()
const options = {
  dateStyle: 'full',
  timeStyle: 'short'
}

const hours = document.querySelector('#hours')
let nowDate = date.toLocaleString('pt-BR', options)
const fixDate = nowDate.charAt(0).toUpperCase() + nowDate.slice(1)

welcomeHours.innerHTML = `<p id="hours" class="text-xl text-slate-300">${fixDate}</p>`
welcome.appendChild(welcomeHours)
