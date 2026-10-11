

require("dotenv").config()

const {Pool} = require("pg")

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
})

/*pool.query("SELECT NOW()").then(result =>{
  console.log("Conectado ao Supabase:", result.rows[0])
}).catch(error => {
  console.log("erro ao conectar",error)
}) */

const createPack = async(name)=>{
  const result = await pool.query(
    `INSERT INTO packs (name)
     VALUES ($1)
     RETURNING *` ,
    [name]
  )
  return result.rows[0]
}

const getPacks = async()=>{
  const result = await pool.query(
    `SELECT 
     packs.id,
     packs.name,
     COUNT(stickers.id) AS quantidade,
     COALESCE(
       json_agg(
         json_build_object(
           'id', stickers.id,
           'name', stickers.name,
           'image', stickers.image
         )
       ) FILTER (WHERE stickers.id IS NOT NULL),
       '[]'
     ) AS stickers
     FROM packs
     LEFT JOIN stickers
     ON stickers.pack_id = packs.id
     GROUP BY packs.id,packs.name
    `
  )
  return result.rows
}

const createSticker = async(name,pack,image)=>{
  const packResult = await pool.query(
    `SELECT id FROM packs WHERE name=$1`,
    [pack]
  )
  if(packResult.rows.length===0){
    return{error:"pack nao encontrado"}
  }
  const packId = packResult.rows[0].id

  const result = await pool.query(
    `INSERT INTO stickers (name,image,pack_id)
     VALUES($1,$2,$3)
     RETURNING*
    `,
    [name,image,packId]
  )
  return result.rows[0]
}

const getPackById = async(id)=>{
  const result = await pool.query(
    `
    SELECT
     packs.name,
     packs.id,
     COUNT(stickers.id):: int AS quantidade,
     COALESCE(
     json_agg(
     json_build_object(
     'id', stickers.id,
     'name', stickers.name,
     'image', stickers.image
     )
     ) FILTER(WHERE stickers.id IS NOT NULL),
      '[]'::json
    ) AS stickers FROM packs
      LEFT JOIN stickers
      ON stickers.pack_id = packs.id
      WHERE packs.id = $1
      GROUP BY packs.id , packs.name
    `,
    [id]
  )
  return result.rows[0] || null
}
module.exports = {
  createPack,
  getPacks,
  createSticker,
  getPackById
  
}