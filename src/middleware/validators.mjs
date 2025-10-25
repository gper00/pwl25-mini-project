import { body, param } from "express-validator"

// Auth validators
export const registerValidator = [
  body("email").isEmail().withMessage("Valid email required"),
  body("password").isLength({ min: 6 }).withMessage("Password min 6 characters"),
  body("name").notEmpty().withMessage("Name is required")
]

export const loginValidator = [
  body("email").isEmail().withMessage("Valid email required"),
  body("password").notEmpty().withMessage("Password is required")
]

// Board validators
export const createBoardValidator = [
  body("title").notEmpty().withMessage("Title is required")
]

export const updateBoardValidator = [
  body("title").optional().notEmpty().withMessage("Title cannot be empty")
]

// List validators
export const createListValidator = [
  body("title").notEmpty().withMessage("Title is required")
]

export const updateListValidator = [
  body("title").optional().notEmpty().withMessage("Title cannot be empty")
]

// Card validators
export const createCardValidator = [
  param("listId").isInt().withMessage("Valid list ID required"),
  body("title").notEmpty().withMessage("Card title is required"),
  body("description").optional().isString(),
  body("position").optional().isInt({ min: 0 })
]

export const updateCardValidator = [
  param("cardId").isInt().withMessage("Valid card ID required"),
  body("title").optional().notEmpty().withMessage("Card title cannot be empty"),
  body("description").optional().isString(),
  body("position").optional().isInt({ min: 0 })
]

export const moveCardValidator = [
  param("cardId").isInt().withMessage("Valid card ID required"),
  body("listId").isInt().withMessage("Valid list ID required"),
  body("position").isInt({ min: 0 }).withMessage("Valid position required")
]

export const cardIdValidator = [
  param("cardId").isInt().withMessage("Valid card ID required")
]
