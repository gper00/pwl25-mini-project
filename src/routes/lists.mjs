import express from "express"
import { authenticateToken } from "../middleware/auth.mjs"
import { validateRequest } from "../middleware/validation.mjs"
import { createListValidator, updateListValidator } from "../middleware/validators.mjs"
import { getAllLists, createList, updateList, deleteList } from "../controllers/listController.mjs"

const router = express.Router()

router.use(authenticateToken)

router.get("/boards/:boardId/lists", getAllLists)
router.post("/boards/:boardId/lists", createListValidator, validateRequest, createList)
router.put("/lists/:listId", updateListValidator, validateRequest, updateList)
router.delete("/lists/:listId", deleteList)

export default router
