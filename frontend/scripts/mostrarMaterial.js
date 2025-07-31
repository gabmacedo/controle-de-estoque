const token = sessionStorage.getItem('token')
if (!token) {
  window.location.href = 'index.html'
}


const materialsMore = document.querySelector('#more')
const materialsMinus = document.querySelector('#minus')

const materialsMoreName = document.querySelector('#more-name')
const materialsMinusName = document.querySelector('#minus-name')

const URL = 'http://localhost:3000/materiais'

async function getMateriais() {
    const response = await fetch(URL)
    const data = await response.json()

    const materialsList = document.querySelector('#materials-list')
    if (materialsList) {
        materialsList.innerHTML = ''
    }

    data.forEach(material => {
        const li = document.createElement('li')
        li.className = "border border-zinc-700 bg-zinc-800 rounded forDelete forSearch"
        li.dataset.id = material.id

        const div = document.createElement('div')
        div.className = 'p-3 grid grid-cols-5 items-center'

        const nomeSpan = document.createElement('span')
        nomeSpan.textContent = material.nome

        const quantidadeSpan = document.createElement('span')
        quantidadeSpan.textContent = material.quantidade 

        const fixPreco = (material.preco_centavos / 100).toFixed(2).replace(".", ",") 
        const precoSpan = document.createElement('span')
        precoSpan.textContent = `R$ ${fixPreco}`

        const dataSpan = document.createElement('span')
        dataSpan.textContent = material.data

        const trashButton = document.createElement('button')
        trashButton.className = "text-red-500 hover:text-red-400 justify-self-end cursor-pointer delete-btn"
        trashButton.innerHTML = `<i class="fa-solid fa-trash"></i>`
        
        div.appendChild(nomeSpan)
        div.appendChild(quantidadeSpan)
        div.appendChild(precoSpan)
        div.appendChild(dataSpan)
        div.appendChild(trashButton)

        li.appendChild(div)
        if (materialsList) materialsList.appendChild(li)

    })

    const materialItem =  document.querySelectorAll('.delete-btn')
    if (materialItem) {
        materialItem.forEach(material => {
            material.addEventListener('dblclick', async () => {
                const preLi = material.parentElement
                const li = preLi.parentElement
                await deleteMaterial(li.dataset.id)
            })
        })
    }
}

async function getTotalMaterial() {
    const materialsTotal = document.querySelector('#total')
    const response = await fetch(`${URL}/agrupados`)
    const data = await response.json()
    if (materialsTotal) materialsTotal.textContent = data.length
}

async function getMaiorMaterial() {
    const response = await fetch(`${URL}/agrupados`)
    const data = await response.json()

    if (data.length <= 0) {
        if (materialsMore) {
            materialsMore.textContent = 0
            materialsMoreName.textContent = 'Nenhum material'
        }
        return
    }

    if (materialsMore) {
        materialsMore.textContent = data[0]._sum.quantidade
        materialsMoreName.textContent = data[0].nome
    }
}

async function getMenorMaterial() {
    const response = await fetch(`${URL}/agrupados`)
    const data = await response.json()
    const lastIndex = data.length -1

    if (data.length <= 0) {
        if (materialsMinus) {
            materialsMinus.textContent = 0
            materialsMinusName.textContent = 'Nenhum material'
        }
        return
    }

    if (materialsMinus) {
        materialsMinus.textContent = data[lastIndex]._sum.quantidade
        materialsMinusName.textContent = data[lastIndex].nome
    }
    
}

async function deleteMaterial(id) {
    const response = await fetch(`${URL}/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    if (!response.ok) {
        getMateriais()
        getTotalMaterial()
        getMaiorMaterial()
        getMenorMaterial()
    }
}

function searchMaterial() {
    const searchInput = document.querySelector('#search-input') 

    if (searchInput) {
        searchInput.addEventListener('keyup', () => {
            const searchTerm =  searchInput.value.toLowerCase()
            const items = document.querySelectorAll('.forSearch')
        
            items.forEach(item => {
                const itemText = item.textContent.toLowerCase()
                if (itemText.includes(searchTerm)) {
                    item.classList.remove('hidden')
                } else {
                    item.classList.add('hidden')
                }
            })
        })
    }

}


getMateriais()
getTotalMaterial()
getMaiorMaterial()
getMenorMaterial()
searchMaterial()

export default getMateriais();