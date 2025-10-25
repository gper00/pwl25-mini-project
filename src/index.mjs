import express from "express"
import dotenv from "dotenv"
import { sequelize } from "./models/index.mjs"
import router from "./routes/index.mjs"
import { logger } from "./middleware/logger.mjs"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
// app.use(express.urlencoded({ extended: true }))
app.use(logger)

app.use(router)

app.use((req, res) => res.status(404).json({ error: "Route Not Found" }))
app.use((err, req, res) => {
  console.error(err.stack)
  res.status(500).json({ error: "Something went wrong!" })
})

const startServer = async () => {
  try {
    await sequelize.authenticate()
    await sequelize.sync({ force: false })

    console.log("Database connected successfully")

    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
  } catch (error) {
    console.error("Unable to start server:", error.message)
  }
}

startServer()
