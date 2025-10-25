import express from "express"
import authRoutes from "./auth.mjs"
import boardRoutes from "./boards.mjs"
import listRoutes from "./lists.mjs"
import cardRoutes from "./cards.mjs"

const router = express.Router()


router.get("/", (req, res) => res.json({ message: "Salamaleykum Dunyaa!!" }))
router.get("/api", (req, res) => res.json({ message: "API is working!" }))
router.use("/api/auth", authRoutes)
router.use("/api/boards", boardRoutes)
router.use("/api", listRoutes)  // mengandung /boards/:boardId/lists dan /lists/:listId
router.use("/api", cardRoutes)  // mengandung /lists/:listId/cards dan /cards/:cardId

export default router
