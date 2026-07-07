const fs = require("fs")
const dbFile = "../database/database.json"

const loadDb = ()=>{
  return JSON.parse(fs.readFileSync(dbFile, "utf-8"))
}

const saveDb = (data)=>{
  return fs.writeFileSync(dbFile , JSON.stringify(data,null,2))
}

const createPack = (name)=>{
  const db = loadDb()
  const pack = {
    id: Date.now(),
    name,
    stickers:[]
  }
  db.packs.push(pack)
  saveDb(db)

  return pack
}

const createSticker = (name,pack,image)=>{
  const db = loadDb()
  const packSearch = db.packs.find(p=>p.name==pack )
  if(!packSearch) return {error: "Pack nao encontrado"}

  const sticker = {
    id:Date.now(),
    name ,
    image
  }
  packSearch.stickers.push(sticker)
  saveDb(db)
  return sticker
}

module.exports = {
  createPack ,
  createSticker
}