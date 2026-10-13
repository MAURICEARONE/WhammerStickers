const cards = document.querySelector(".cards")
const packsModal = document.querySelector("#packsStatusModal");
const packsSpinner = document.querySelector("#packsSpinner");
const packsStatusTitle = document.querySelector("#packsStatusTitle");
const packsStatusMessage = document.querySelector("#packsStatusMessage");

const packsRetry = document.querySelector("#packsRetry");
const packsCreate = document.querySelector("#packsCreate");
const packsClose = document.querySelector("#packsClose");

const totalPacks = document.querySelector(".totalPacks")
const adicionarPacks = document.querySelector(".add")

adicionarPacks.addEventListener("click",()=>{
  window.location.href = "../../index.html?criarPack=true"
})

function mostrarEstadoPacks(estado) {
    packsModal.hidden = false;

    packsSpinner.hidden = estado !== "loading";
    packsRetry.hidden = estado !== "error";
    packsCreate.hidden = estado !== "empty";
    packsClose.hidden = estado === "loading";

    if (estado === "loading") {
        packsStatusTitle.textContent = "A carregar packs...";
        packsStatusMessage.textContent = "A contactar o servidor. Aguarda um momento.";
    }

    if (estado === "empty") {
        packsStatusTitle.textContent = "Nenhum pack disponível";
        packsStatusMessage.textContent = "Ainda não existem packs. Podes criar o primeiro.";
    }

    if (estado === "error") {
        packsStatusTitle.textContent = "Ocorreu um erro";
        packsStatusMessage.textContent = "Não foi possível carregar os packs. Verifica a ligação e tenta novamente.";
    }
}

function fecharModalPacks() {
    packsModal.hidden = true;
}


async function buscarPacks() {
    try {
      cards.innerHTML =""
      mostrarEstadoPacks("loading")
        const response = await fetch("https://whammerstickers.onrender.com/packs");

        if (!response.ok) {
            throw new Error("Erro ao buscar os packs");
        }

        const packs = await response.json();

        console.log(packs);
        if(packs.length===0){
          mostrarEstadoPacks("empty")
          return
        }

        totalPacks.textContent = `${packs.length} packs`

        packs.forEach(pack =>{
          const titulo = document.createElement("h5")
          const card = document.createElement("div")
          card.classList.add("card")
          titulo.textContent = pack.name
          const quantidade = document.createElement("p")
          quantidade.textContent = `${pack.quantidade} stickers`
          const primeiraImg = pack.stickers[0]
          if (primeiraImg) {
            const img = document.createElement("img")
            img.src = primeiraImg.image
            card.appendChild(img)
          } else{
            
          }
          card.appendChild(titulo)
          card.appendChild(quantidade)
          cards.appendChild(card)


          card.addEventListener("click",()=>{
            window.location.href = `../docs/stickers.html?id=${pack.id}`
          })
      })
      fecharModalPacks()
    } catch (error) {
        console.error(error);
        mostrarEstadoPacks("error")
    }
}
packsRetry.addEventListener("click", buscarPacks);

packsCreate.addEventListener("click", () => {
    window.location.href = "../../index.html?criarPack=true";
});

packsClose.addEventListener("click", fecharModalPacks);
const back = document.querySelector(".voltar").addEventListener("click",()=>{
  history.back()
})

const search = document.querySelector(".search")
const menu = document.querySelector(".menu")
const modal = document.querySelector(".modal")
const dropdown = document.querySelector(".dropdown")

menu.addEventListener("click", ()=>{
  dropdown.classList.toggle("ativo")
  modal.classList.toggle("ativo")
})
 modal.addEventListener("click",()=>{
   dropdown.classList.remove("ativo")
   search.style.display = "none"
   modal.classList.remove("ativo")
 })
const iconSearch = document.querySelector(".icon").addEventListener("click",()=>{
  search.style.display = "flex"
  modal.classList.toggle("ativo")
})

document.addEventListener("DOMContentLoaded", buscarPacks);