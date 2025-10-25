import express from "express"
import { authenticateToken } from "../middleware/auth.mjs"
import { validateRequest } from "../middleware/validation.mjs"
import {
  createCardValidator,
  updateCardValidator,
  moveCardValidator,
  cardIdValidator
} from "../middleware/validators.mjs"
import {
  createCard,
  updateCard,
  moveCard,
  deleteCard
} from "../controllers/cardController.mjs"

const router = express.Router()

router.use(authenticateToken) // Apply authentication to all card routes

router.post("/lists/:listId/cards", // Create new card in a list
  createCardValidator,
  validateRequest,
  createCard
)

router.put("/cards/:cardId", // Update card
  updateCardValidator,
  validateRequest,
  updateCard
)

router.put("/cards/:cardId/move",  // Move card to different list/position
  moveCardValidator,
  validateRequest,
  moveCard
)

router.delete("/cards/:cardId", // Delete card
  cardIdValidator,
  validateRequest,
  deleteCard
)

export default router
