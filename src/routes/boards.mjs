import express from "express"
import { getAllBoards, getBoardById, createBoard, updateBoard, deleteBoard } from "../controllers/boardController.mjs"
import { authenticateToken } from "../middleware/auth.mjs"
import { validateRequest } from "../middleware/validation.mjs"
import { createBoardValidator, updateBoardValidator } from "../middleware/validators.mjs"

const router = express.Router()

router.get("/", authenticateToken, getAllBoards)
router.get("/:id", authenticateToken, getBoardById)
router.post("/", authenticateToken, createBoardValidator, validateRequest, createBoard)
router.put("/:id", authenticateToken, updateBoardValidator, validateRequest, updateBoard)
router.delete("/:id", authenticateToken, deleteBoard)

export default router
