const clientName = document.querySelector('#client-name')
const clientEmail = document.querySelector('#client-email')
const clientCpf = document.querySelector('#client-cpf')
const clientRg = document.querySelector('#client-rg')
const clientTel = document.querySelector('#client-tel')
const clientEnd = document.querySelector('#client-addr')
const clientBtn = document.querySelector('#client-btn')
const registerResult = document.querySelector('#register-result')

const URL = 'http://localhost:3000/clientes'


clientBtn.addEventListener('click', async (e) => {
    e.preventDefault()
    await createClient()
})

clientCpf.addEventListener('keypress', () => {
    const cpfLength = clientCpf.value.length
    if (cpfLength === 3 || cpfLength === 7) {
        clientCpf.value += '.'
    } else if (cpfLength === 11) {
        clientCpf.value += '-'
    }
})

clientTel.addEventListener('keypress', () => {
    const telLength = clientTel.value.length
    if (telLength === 0) clientTel.value += '('
    if (telLength === 3) clientTel.value += ')'
})

clientRg.addEventListener('keypress', () => {
    const rgLength = clientRg.value.length
    if (rgLength === 2) clientRg.value += '.'
    if (rgLength === 6) clientRg.value += '.'
    if (rgLength === 10) clientRg.value += '-'
})



async function createClient() {
    const clientNameValue = clientName.value.trim().toLowerCase().replace(/\b\w/g, letra => letra.toUpperCase())
    const clientEmailValue = clientEmail.value.trim()
    const clientCpfValue = clientCpf.value.trim().replace(/\.|-/gm,'')
    const clientRgValue = clientRg.value.trim().replace(/\.|-/gm,'')
    const clientTelValue = clientTel.value.trim().replace(/[()]/gm,'')
    const clientEndValue = clientEnd.value.trim()

    if (!clientNameValue) return alert('O nome deve ser obrigatório!')

    const newClient = {
        nome: clientNameValue,
        email: clientEmailValue,
        cpf: clientCpfValue,
        rg: clientRgValue,
        telefone: clientTelValue,
        endereco: clientEndValue
    }

    const response = await fetch(URL, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(newClient)
    })
    if (response.ok) {
        const data = await response.json()
        console.log(data.message)

        registerResult.textContent = 'Cliente cadastrado com sucesso!'

        clientName.value = ''
        clientEmail.value = ''
        clientCpf.value = ''
        clientRg.value = ''
        clientTel.value = ''
        clientEnd.value = ''
    } else {
        registerResult.textContent = 'Erro! Dados errados ou incompletos!'
    }
}


