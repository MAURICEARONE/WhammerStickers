const cards = document.querySelector(".cards")

async function buscarPacks() {
    try {
        const response = await fetch("http://localhost:3000/packs");

        if (!response.ok) {
            throw new Error("Erro ao buscar os packs");
        }

        const packs = await response.json();

        console.log(packs);

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
            alert("Por enquanto nao posso mostrar . estamos em atualizacao")
          })
      })
    } catch (error) {
        console.error(error);
    }
}

document.addEventListener("DOMContentLoaded", buscarPacks);