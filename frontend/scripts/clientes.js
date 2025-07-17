const URL = "http://localhost:3000/clientes";

const clientsList = document.querySelector("#clients-list");

async function getClients() {
  const response = await fetch(URL);
  const data = await response.json();

  if (clientsList) {
    clientsList.innerHTML = "";
  }

  data.forEach((cliente) => {
    const li = document.createElement("li");
    li.className = "border border-zinc-700 bg-zinc-800 rounded forSearch";
    li.dataset.id = cliente.id;

    li.innerHTML = `<div class="p-3 grid grid-cols-4 items-center cursor-pointer hover:bg-zinc-700 transition toggle-details">
                        <span>${cliente.nome}</span>
                        <span>${cliente.email}</span>
                        <span>${cliente.cpf}</span>
                        <button class="text-red-500 hover:text-red-400 justify-self-end delete-btn">
                            <i class="fa-solid fa-trash"></i>
                        </button>
                        </div>
                        <div class="hidden p-3 border-t border-zinc-700 bg-zinc-900 text-sm details ">
                        <div class="grid grid-cols-4">
                            <p><strong>RG:</strong> ${cliente.rg}</p>
                            <p><strong>Telefone:</strong> ${cliente.telefone}</p>
                            <p><strong>Endereço:</strong> ${cliente.endereco}</p>
                        </div>
                    </div>
                </li>
                        `;

    clientsList.appendChild(li);

    const toggleButton = document.querySelectorAll(".toggle-details");

    toggleButton.forEach((button) => {
      button.addEventListener("click", () => {
        // pega o proximo elemento HTML, ou seja o accordion
        const currentDetail = button.nextElementSibling;
        // verifica se esta escondido, se tem a classe 'Hidden' do tailwind
        // se tiver escondido é true, se nao é false
        const isHidden = currentDetail.classList.contains("hidden");

        // deixa todos os accordions escondidos
        const details = document.querySelectorAll(".details");
        details.forEach((detail) => {
          detail.classList.add("hidden");
        });

        // se tiver escondido, mostra
        if (isHidden) currentDetail.classList.remove("hidden");
      });
    });
  });

  const deleteBtn = document.querySelectorAll(".delete-btn");
  deleteBtn.forEach((buttonDelete) => {
    buttonDelete.addEventListener("dblick", async () => {
      const div = buttonDelete.parentElement;
      const li = div.parentElement;
      await deleteClient(li.dataset.id);
    });
  });
}

function searchMaterial() {
  const searchInput = document.querySelector("#search-input");

  if (searchInput) {
    // evento de teclar
    searchInput.addEventListener("keyup", () => {
      // pega o valor do input e transforma em minusculo
      const searchTerm = searchInput.value.toLowerCase();
      // pega todos os itens
      const items = document.querySelectorAll(".forSearch");

      // para cada item
      items.forEach((item) => {
        // pegue o conteudo e deixe em minusculo
        const itemText = item.textContent.toLowerCase();
        // se algum item tiver incluso o que for teclado na barra de pesquisa
        if (itemText.includes(searchTerm)) {
          // mostra
          item.classList.remove("hidden");
        } else {
          // se nao esconde
          item.classList.add("hidden");
        }
      });
    });
  }
}

async function deleteClient(id) {
  const response = await fetch(`${URL}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
  
  if (response.ok) {
    console.log('Material deletado com sucesso!')
  }
  ;
}

const totalClients = document.querySelector('#total')
async function getTotalClient() {
  const response = await fetch(URL)
  const data = await response.json()
  totalClients.textContent = data.length
}

getTotalClient()
searchMaterial();
getClients();
