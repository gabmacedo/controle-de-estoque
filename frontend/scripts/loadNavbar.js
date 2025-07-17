async function loadNavbar() {
    const container = document.getElementById('navbar-container')
    if (!container) return

    try {
        const response = await fetch('/frontend/components/navbar.html')
        const html = await response.text()
        container.innerHTML = html

        currentPage()

    } catch (error) {
        console.log('Erro ao carregar navbar', error)
    }
}

function currentPage() {
    const currentPath = window.location.pathname.split('/').pop()

    const links = document.querySelectorAll('#sidebar a')

    links.forEach((link) => {
        const href = link.getAttribute('href')

        if (href === currentPath) {
            const li = link.closest('li')
            if (li) li.classList.add('ativa')
        }
    })
}

loadNavbar()