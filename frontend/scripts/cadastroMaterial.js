const token = sessionStorage.getItem('token')
if (!token) {
  window.location.href = 'index.html'
}

const productName = document.querySelector('#product-name')
const productQtd = document.querySelector('#product-qtd')
const productPrice = document.querySelector('#product-price')
const productDate = document.querySelector('#product-date')
const productBtn = document.querySelector('#product-btn')

const URL = 'http://localhost:3000/materiais'

productBtn.addEventListener('click', async () => {
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
        alert('Material Cadastrado!')
        console.log('Material criado com sucesso!', data)

        productName.value = ''
        productQtd.value = ''
        productPrice.value = ''
        productDate.value = ''

    } else {
        console.log('Erro na criação do material!')
    }
}