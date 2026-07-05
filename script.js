const botoes = document.querySelector(".botoes");
const criarPack = document.querySelector(".btnCreatePack");
const criarSticker = document.querySelector(".stickerBtn");
const packContent = document.querySelector(".packContent");
const stickerContent = document.querySelector(".stickerContent");
const cancelPack = document.querySelector(".cancelPack");

// funcoes dos botoes criar packs e stickers
criarPack.addEventListener("click", ()=>{
  botoes.classList.add("hidden")
  packContent.classList.add("show")
}); // criar packs..

cancelPack.addEventListener("click", ()=>{
  botoes.classList.remove("hidden")
  packContent.classList.remove("show")
})
criarSticker.addEventListener("click", ()=>{
  botoes.classList.add("hidden")
  stickerContent.classList.add("show")
}); // criar stickers..

const saveStickerBtn = document.querySelector(".saveBtn")
const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")
const file = document.getElementById("stickerFile")
const fileName = document.getElementById("fileName")
file.addEventListener("change", (event)=>{
  const fileData = event.target.files[0]

  if(!fileData) return;
  fileName.textContent = fileData.name.length > 20 ? fileData.name.slice(0 , 20) +"..." : fileData.name
  const leitor = new FileReader()

  leitor.onload = function() {
    const img = new Image()
    img.onload = ()=>{
      canvas.width = img.width
      canvas.height = img.height
      ctx.drawImage(img,0,0)
    }
    img.src = leitor.result
  }
  leitor.readAsDataURL(fileData)

  saveStickerBtn.style.display ="flex"
})