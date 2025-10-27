import express from "express"
import { register, login } from "../controllers/authController.mjs"
import { validateRequest } from "../middleware/validation.mjs"
import { registerValidator, loginValidator } from "../middleware/validators.mjs"
import { authenticateToken } from "../middleware/auth.mjs"

const router = express.Router()

router.post("/register", registerValidator, validateRequest, register)
router.post("/login", loginValidator, validateRequest, login)

export default router
