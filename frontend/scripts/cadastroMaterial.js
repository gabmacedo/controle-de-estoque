const token = sessionStorage.getItem('token')
if (!token) {
  window.location.href = 'index.html'
}

const productName = document.querySelector('#product-name')
const productQtd = document.querySelector('#product-qtd')
const productPrice = document.querySelector('#product-price')
const productDate = document.querySelector('#product-date')
const productBtn = document.querySelector('#product-btn')

const modalContainer = document.querySelector('#modal-container')
const modalButton = document.querySelector('#ok-btn-modal')

const URL = 'https://controle-de-estoque-istokey.up.railway.app/materiais';

productBtn.addEventListener('click', async (e) => {
    e.preventDefault()
    await createMaterial()
    
})

async function createMaterial() {
    const productNameValue = productName.value.trim()
    const productQtdValue = productQtd.value.trim()
    const productPriceValue = productPrice.value.trim()
    const productDataValue = productDate.value.trim()

    if (!productNameValue || !productQtdValue || !productPriceValue || !productDataValue) {
        const inputError = document.querySelectorAll('.forError')
        inputError.forEach(input => {
            input.classList.toggle('inputError')
        })
        return
    }

    const fixProductPriceValue = productPriceValue.replace(',', '.')
    const fixProductNameValue = productNameValue.charAt(0).toUpperCase() + productNameValue.slice(1)

    const newMaterial = {
        nome: fixProductNameValue,
        quantidade: Number(productQtdValue),
        preco_centavos: fixProductPriceValue,
        data: productDataValue
    }

    const response = await fetch(URL, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(newMaterial)
    })
    if (response.ok) {
        const data = await response.json()
        modalContainer.classList.remove('hidden')
        modalContainer.classList.add('flex')

        productName.value = ''
        productQtd.value = ''
        productPrice.value = ''
        productDate.value = ''

    } else {
        console.log('Erro na criação do material!')
    }
}

modalButton.addEventListener('click', () => {
    modalContainer.classList.remove('flex')
    modalContainer.classList.add('hidden')
})
