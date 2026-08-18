const cards = document.querySelector(".cards")

const totalPacks = document.querySelector(".totalPacks")
const adicionarPacks = document.querySelector(".add")

adicionarPacks.addEventListener("click",()=>{
  window.location.href = "../../index.html?criarPack=true"
})

async function buscarPacks() {
    try {
        const response = await fetch("https://whammerstickers.onrender.com/packs");

        if (!response.ok) {
            throw new Error("Erro ao buscar os packs");
        }

        const packs = await response.json();

        console.log(packs);

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
    } catch (error) {
        console.error(error);
    }
}
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