const express = require("express");
const cors = require("cors");
const db = require("./database/db-pg.js")
const app = express();

app.use(express.json({limit: "10mb"}));
app.use(cors());

app.post("/packs" , async (req , res)=>{
  // toda rota de packs ficarao aqui.
  const {name} = req.body || {}
  if(!name){
    return res.status(400).json({error:"Nome do pack obrigatorio."})
  }

  const pack = await db.createPack(name);

  res.json(pack)
  console.log(`Pack criado em ${db} pack ${pack}`)
})

app.post("/stickers" , async(req , res)=>{
  // rota para stickers.
  const {name , pack , image} = req.body || {}
  if (!name || !pack || !image) {
     return res.status(400).json({ error: "Campos obrigatórios em falta." });
  }

  const sticker = await db.createSticker(name,pack,image)

  res.json(sticker)
})

app.get("/packs", async(req , res)=>{
  const packs = await db.getPacks()
  res.json(packs)
})
app.get("/packs/search", async(req, res) => {
  const search = req.query.search || "";

  const packs = await db.searchPacks(search);

  res.json(packs);
});
app.get("/packs/:id", async(req , res)=>{
  const id = req.params.id
  const pack = await db.getPackById(id)
  if(!pack){
    return res.status(404).json({
      error:"pack nao encontrado"
    })
  }
  res.json(pack)
})
const PORT = process.env.PORT || 3000
app.listen(PORT , ()=>{
  console.log(`Servidor Rodando em Localhost ${PORT}`)
})