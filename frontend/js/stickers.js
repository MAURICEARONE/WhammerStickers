const params = new URLSearchParams(window.location.search);

const packId = params.get("id");

console.log(packId);

const carregarPack = async()=>{
  try {
    const response = await fetch(`http://localhost:3000/packs/${packId}`)
    if(!response.ok){
      throw new Error("erro ao buscar o pack")
    }
    const pack = await response.json()

    const packName = document.querySelector(".nome")
    packName.innerHTML = pack.name
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
carregarPack()