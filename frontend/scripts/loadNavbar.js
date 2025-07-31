const USERNAME = sessionStorage.getItem('name')

async function loadNavbar() {
    const container = document.getElementById('navbar-container')
    if (!container) return

    try {
        const response = await fetch('/frontend/components/navbar.html')
        const html = await response.text()
        container.innerHTML = html

        const navBarUserName = document.querySelector('#name')
        navBarUserName.textContent = USERNAME

        const icon = document.querySelector('#icon')
        icon.textContent = USERNAME.charAt(0)

        currentPage()

        const btnLogout = document.querySelector('#btn-logout')
        btnLogout.addEventListener('click', () => {
            logout()
        })

        function logout() {
            sessionStorage.removeItem('token')
            setTimeout(() => {
                window.location.href = 'index.html'
            }, 1500)
        }

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