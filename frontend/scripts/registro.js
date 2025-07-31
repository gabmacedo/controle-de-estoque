const usernameRegisterInput = document.querySelector('#username')
const emailRegisterInput = document.querySelector('#email')
const passRegisterInput = document.querySelector('#password')
const btnRegister = document.querySelector('#btn-register')

const toggleBtn = document.querySelector('#show-password')
const icon = document.querySelector('#icon')

const URL_REGISTRO = 'http://localhost:3000/auth/register'

toggleBtn.addEventListener('click', () => {
    if (passRegisterInput.type === 'password') {
        passRegisterInput.type = 'text'
        icon.classList.remove('fa-eye-slash')
        icon.classList.add('fa-eye')
    } else {
        passRegisterInput.type = 'password'
        icon.classList.remove('fa-eye')
        icon.classList.add('fa-eye-slash')
    }
})

btnRegister.addEventListener('click', async (e) => {
    e.preventDefault()
    const valid = verifyInputs()
    if (valid) {
        await registerUser()
    }
})

async function registerUser() {
    loadingButton()
    const userData = {
        nome: usernameRegisterInput.value,
        email: emailRegisterInput.value,
        senha: passRegisterInput.value
    }
    const response = await fetch(URL_REGISTRO, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(userData)
    })

    if (response.ok) {
        const data = await response.json()
        console.log('data:', data)
        
        if (data.done) {
            window.location.href = 'registro-realizado.html'
        }
    } else {
        resetButton()
    }
}

function loadingButton() {
    btnRegister.textContent = ''
    btnRegister.innerHTML = `
    <i class="fa-solid fa-spinner fa-spin-pulse"></i>
    `
    btnRegister.disabled = true
}

function resetButton() {
    const spinnerIcon = btnRegister.querySelector('i')
    if (spinnerIcon) {
        btnRegister.removeChild(spinnerIcon)
    }

    btnRegister.textContent = 'Criar Conta'
    btnRegister.disabled = false
}

function verifyInputs() {
    let isValid = true

    const inputFields = [usernameRegisterInput, emailRegisterInput, passRegisterInput]

    inputFields.forEach((input) => {
        if (!input.value.trim()) {
            isValid = false
            input.classList.remove('border-zinc-800')
            input.classList.add('border-red-500')
        } else {
            input.classList.add('border-zinc-800')
            input.classList.remove('border-red-500')
        }
    })

    return isValid
}
