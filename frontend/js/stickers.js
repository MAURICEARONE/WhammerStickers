const params = new URLSearchParams(window.location.search);

const packId = params.get("id");

console.log(packId);

let packAtual = null

const carregarPack = async()=>{
  try {
    const response = await fetch(`https://whammerstickers.onrender.com/packs/${packId}`)
    if(!response.ok){
      throw new Error("erro ao buscar o pack")
    }
    const pack = await response.json()

    packAtual = pack

    const packName = document.querySelector(".nome")
    packName.innerHTML = packAtual.name
    const quantidade = document.querySelector(".quantidade")
    quantidade.textContent = `${packAtual.stickers.length} images`
    mostrarSticker(pack.stickers)
  } catch (error) {
    
  }
}

const mostrarSticker = (stickers)=>{
  const conteiner = document.querySelector(".cards")
  stickers.forEach(sticker =>{
    const card = document.createElement("div")
    card.classList.add("card")
    const img = document.createElement("img")
    img.src = sticker.image
    img.alt = sticker.name

    card.appendChild(img)
    conteiner.appendChild(card)
  })
}
const voltar = document.querySelector(".voltar").addEventListener("click",()=>{
  history.back()
})

const pesquisas = document.querySelector(".pesquisas")
pesquisas.addEventListener("input", ()=>{
  const texto = pesquisas.value.toLowerCase()
  const resultado = packAtual.stickers.filter(sticker=>sticker.name.toLowerCase().includes(texto))
  const container = document.querySelector(".cards")
  container.innerHTML = ""
  if(resultado.length === 0){
    container.innerHTML = "<h4>Nenhum Sticker Encontrado!</h4>"
  } else{  
     mostrarSticker(resultado)
  }
})
const search = document.querySelector(".search")
const menu = document.querySelector(".menu")
const modal = document.querySelector(".modal")
const dropDown = document.querySelector(".dropdown")
menu.addEventListener("click", ()=>{
  dropDown.classList.toggle("ativo")
  modal.classList.toggle("ativo")
})
 modal.addEventListener("click",()=>{
   dropDown.classList.remove("ativo")
   search.style.display = "none"
   modal.classList.remove("ativo")
 })
const iconSearch = document.querySelector(".icon").addEventListener("click",()=>{
  search.style.display = "flex"
  modal.classList.toggle("ativo")
})
carregarPack()