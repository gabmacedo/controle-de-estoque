const toggleBtn = document.querySelector('#show-password')
const passwordInput = document.querySelector('#password')
const icon = document.querySelector('#icon')

toggleBtn.addEventListener('click', () => {
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text'
        icon.classList.remove('fa-eye-slash')
        icon.classList.add('fa-eye')
    } else {
        passwordInput.type = 'password'
        icon.classList.remove('fa-eye')
        icon.classList.add('fa-eye-slash')
    }
})