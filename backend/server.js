const express = require("express");
const cors = require("cors");
const db = require("../database/database.js")
const app = express();

app.use(express.json({limit: "10mb"}));
app.use(cors());

app.post("/packs" , (req , res)=>{
  // toda rota de packs ficarao aqui.
  const {name} = req.body || {}
  if(!name){
    return res.status(400).json({error:"Nome do pack obrigatorio."})
  }

  const pack = db.createPack(name);

  res.json(pack)
  console.log(`Pack criado em ${db} pack ${pack}`)
})

app.post("/stickers" , (req , res)=>{
  // rota para stickers.
  const {name , pack , image} = req.body || {}
  if (!name || !pack || !image) {
     return res.status(400).json({ error: "Campos obrigatórios em falta." });
  }

  const sticker = db.createSticker(name,pack,image)

  res.json(sticker)
})

const PORT = 3000
app.listen(PORT , ()=>{
  console.log(`Servidor Rodando em Localhost ${PORT}`)
})