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

const packBtn = document.querySelector(".createPack")
const packName = document.querySelector(".packName")

packBtn.addEventListener("click", async()=>{
  const name = packName.value.trim()
  if(!name){
     alert("degite o nome do pack") 
     return
  }
  try {
    const response = await fetch("http://localhost:3000/packs",{
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      } ,
      body: JSON.stringify({
        name: name
      })
    })
    const data = await response.json()
    if(!response.ok){
      alert(data.error)
      return
    }
    alert("pack criado com sucesso")
    console.log(data)
    packName.value = ""

    packContent.classList.remove("show")
    botoes.classList.remove("hidden")
  } catch (error) {
    console.error(error)
    alert("Erro ao conectar com servidor")
  }
})
const stickName = document.querySelector(".stickName")
const packId = document.querySelector(".packId")
const saveBtn = document.querySelector(".saveBtn")

saveBtn.addEventListener("click", async ()=>{
  const name = stickName.value.trim()
  const pack = packId.value.trim()
  const image = canvas.toDataURL("image/png")

  if(!name || !pack || !image){
    alert("Preencha todos campos")
    return
  }
  try {
    const response = await fetch("http://localhost:3000/stickers",{
      method: "POST",
      headers: {
        "Content-Type":"application/json"
      } ,
      body: JSON.stringify({
        name:name ,
        pack:pack ,
        image:image
      })
    })
    const data = await response.json()
    if(!response.ok){
      alert(data.error)
      return
    }
    alert("Sticker criado com sucesso!")
    console.log(data)
    stickName.value =""
    packId.value = ""
    file.value = ""
    fileName.textContent = "Nenhum ficheiro"
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    canvas.width = 0
    canvas.height = 0
  } catch (error) {
    console.error(error)
    alert("Erro ao conectar com servidor!")
  }
})

//acho é tudo por aqui ..