const { getPacks } = require("./database/db-pg.js")

getPacks()
  .then(packs => {
    console.log("Packs:", packs)
    process.exit(0)
  })
  .catch(error => {
    console.error("Erro:", error)
    process.exit(1)
  })