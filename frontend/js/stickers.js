const params = new URLSearchParams(window.location.search);

const packId = params.get("id");

console.log(packId);

const addStiker = document.querySelector(".add").addEventListener("click",()=>{
  window.location.href = `../../index.html?criarSticker=true&pack=${packId}`
})

const imageViewer = document.querySelector(".imageViews");
const imagemViewer = document.querySelector(".imagemViews");
const fecharViewer = document.querySelector(".fecharViews");

let packAtual = null

const carregarPack = async()=>{
  try {
    const response = await fetch(`https://whammerstickers.onrender.com/packs/${packId}`)
    if(!response.ok){
      throw new Error("erro ao buscar o pack")
    }
    const pack = await response.json()

    console.log(pack)

    packAtual = pack

    const packName = document.querySelector(".nome")
    packName.innerHTML = packAtual.name
    const quantidade = document.querySelector(".quantidade")
    quantidade.textContent = `${packAtual.stickers.length} images`
    mostrarSticker(pack.stickers)
  } catch (error) {
    
  }
}

const abrirImage = (sticker)=>{
   imagemViewer.src = sticker.image
   imagemViewer.alt = sticker.name

   imageViewer.classList.add("ativo")
}

const mostrarSticker = (stickers)=>{
  const conteiner = document.querySelector(".cards")
  stickers.forEach(sticker =>{
    const card = document.createElement("div")
    card.classList.add("card")
    const img = document.createElement("img")
    img.src = sticker.image
    img.alt = sticker.name

    img.addEventListener("click",()=>{
      // abrir image em tela cheia.
      abrirImage(sticker)
    })

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
const fecharImage = ()=>{
  imageViewer.classList.remove("ativo")
  imagemViewer.src = "";
}
fecharViewer.addEventListener("click",()=>{
      fecharImage()
    })
imageViewer.addEventListener("click", (event)=>{
  if(event.target === imageViewer){
    fecharImage();
  }
});
carregarPack()