const botoes = document.querySelector(".botoes");
const criarPack = document.querySelector(".btnCreatePack");
const criarSticker = document.querySelector(".stickerBtn");
const packContent = document.querySelector(".packContent");
const stickerContent = document.querySelector(".stickerContent");
const cancelPack = document.querySelector(".cancelPack");

const params = new URLSearchParams(window.location.search)
if(params.get("criarPack")==="true"){
  botoes.classList.add("hidden")
  packContent.classList.add("show")
}

const criarStickerUrl = params.get("criarSticker")
const packUrl = params.get("pack")

if (params.get("criarPack") === "true") {
  botoes.classList.add("hidden")
  packContent.classList.add("show")
}

if (criarStickerUrl === "true") {
  botoes.classList.add("hidden")
  stickerContent.classList.add("show")
}

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


const statusModal = document.querySelector("#statusModal");
const statusSpinner = document.querySelector("#statusSpinner");
const statusTitle = document.querySelector("#statusTitle");
const statusMessage = document.querySelector("#statusMessage");
const statusClose = document.querySelector("#statusClose");

function mostrarModal(titulo, mensagem, estado) {
  statusModal.hidden = false;

  statusTitle.textContent = titulo;
  statusMessage.textContent = mensagem;

  statusSpinner.hidden = estado !== "loading";
  statusClose.hidden = estado === "loading";
}

statusClose.addEventListener("click", () => {
  statusModal.hidden = true;
});

  packBtn.addEventListener("click", async () => {
  const name = packName.value.trim();

  if (!name) {
    alert("Digite o nome do pack.");
    return;
  }

  if (packBtn.disabled) return;

  packBtn.disabled = true;

  mostrarModal(
    "A criar pack...",
    "Guardar o seu pack, por favor aguarde.",
    "loading"
  );

  try {
    const response = await fetch(
      "https://whammerstickers.onrender.com/packs",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      mostrarModal(
        "Não foi possível criar o pack",
        data.error || "O servidor recusou a criação do pack.",
        "error"
      );
      return;
    }

    console.log("Pack criado:", data);

    packName.value = "";
    packContent.classList.remove("show");
    botoes.classList.remove("hidden");

    mostrarModal(
      "Pack criado com sucesso!",
      "O pack foi guardado com sucesso.",
      "success"
    );

  } catch (error) {
    console.error("Erro ao criar pack:", error);

    mostrarModal(
      "Erro de conexão",
      "Não foi possível contactar o servidor.",
      "error"
    );

  } finally {
    packBtn.disabled = false;
  }
});

const stickName = document.querySelector(".stickName")
const packId = document.querySelector(".packId")
const saveBtn = document.querySelector(".saveBtn")

async function guardarSticker(){
  const name = stickName.value.trim()
  const pack = packId.value.trim()
  const image = canvas.toDataURL("image/png")

  if(!name || !pack || !image){
    alert("Preencha todos campos")
    return
  }
   if(saveBtn.disabled) return

   saveBtn.disabled = true

   mostrarModal(
     "A criar sticker...",
     "A Guardar seu sticker aguarde...",
     "loading"
   )
  try {
    const response = await fetch("https://whammerstickers.onrender.com/stickers",{
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
      mostrarModal(
        "Nao possivel criar",
        data.error || "O servidor recusou a criação do sticker",
        "error"
      )
      return
    }

    console.log(data)

    mostrarModal(
      "sticker criado...",
      "sticker guardado com sucesso",
      "success"
    )
    stickName.value =""
    packId.value = ""
    file.value = ""
    fileName.textContent = "Nenhum ficheiro"
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    canvas.width = 0
    canvas.height = 0
    stickerContent.classList.remove("show")
    botoes.classList.remove("hidden")
  } catch (error) {
    console.error(error)
    mostrarModal(
      "Erro de conexão",
      "Não foi possível contactar o servidor. Verifica a ligação.",
      "error"
      )
  } finally{
    saveBtn.disabled = false
  }
}

saveBtn.addEventListener("click", guardarSticker)

const acessarConteudo = document.querySelector(".verPacks").addEventListener("click",()=>{
  window.location.assign("./frontend/docs/packs.html")
})
const inputPack = document.querySelector(".packId");
const listaPacks = document.querySelector(".listaPacks");

let packs = [];
let packSelecionado = null;

async function buscarPacks(){

    try{

        const response = await fetch("https://whammerstickers.onrender.com/packs");

        if(!response.ok){
            throw new Error("Erro ao buscar packs");
        }

        packs = await response.json();

        listaPacks.innerHTML = "";

        packs.forEach(pack=>{

            const item = document.createElement("div");

            item.textContent = pack.name;

            item.addEventListener("click",()=>{

                inputPack.value = pack.name;

                packSelecionado = pack.id;

                listaPacks.style.display = "none";

            });

            listaPacks.appendChild(item);

        });

    }catch(error){

        console.error(error);

    }

}

inputPack.addEventListener("click",()=>{

    listaPacks.style.display = "block";

});

document.addEventListener("click",(e)=>{

    if(!e.target.closest(".input-group")){

        listaPacks.style.display = "none";

    }

});

buscarPacks();
//acho é tudo por aqui ..
