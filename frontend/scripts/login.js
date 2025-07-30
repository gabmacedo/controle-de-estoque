const emailLoginInput = document.querySelector('#email')
const passLoginInput = document.querySelector('#password')
const btnLogin = document.querySelector('#btn-login')

const toggleBtn = document.querySelector('#show-password')
const icon = document.querySelector('#icon')

const URL_LOGIN = 'http://localhost:3000/auth/login'

toggleBtn.addEventListener('click', () => {
    if (passLoginInput.type === 'password') {
        passLoginInput.type = 'text'
        icon.classList.remove('fa-eye-slash')
        icon.classList.add('fa-eye')
    } else {
        passLoginInput.type = 'password'
        icon.classList.remove('fa-eye')
        icon.classList.add('fa-eye-slash')
    }
})

btnLogin.addEventListener('click', async () => {
    await loginUser()
})

async function loginUser() {
    loadingButton()
    const userData = {
        email: emailLoginInput.value,
        senha: passLoginInput.value
    }

    const response = await fetch(URL_LOGIN, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(userData)
    })

    if (response.ok) {
        const data = await response.json()
        const token = data.token

        if (token) {
            sessionStorage.setItem('token', token)
            sessionStorage.setItem('name', data.nome)
            setTimeout(() => {
                window.location.href = 'main.html'
            }, 2000)
        } else {
            resetButton()
            console.log('Erro no registro!')
        }

    } 
}

function loadingButton() {
    btnLogin.textContent = ''
    btnLogin.innerHTML = `
    <i class="fa-solid fa-spinner fa-spin-pulse"></i>
    `
    btnLogin.disabled = true
}

function resetButton() {
    const spinnerIcon = btnLogin.querySelector('i')
    if (spinnerIcon) {
        btnLogin.removeChild(spinnerIcon)
    }

    btnLogin.textContent = 'Entrar'
    btnLogin.disabled = false
}
