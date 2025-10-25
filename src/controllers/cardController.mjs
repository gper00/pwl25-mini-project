import { Card, List, Board } from "../models/index.mjs"

const createCard = async (req, res) => {
  try {
    const { title, description, position } = req.body
    const { listId } = req.params

    const list = await List.findOne({
      where: { id: listId },
      include: [{ model: Board, as: "board", where: { userId: req.user.id } }],
    })

    if (!list) {
      return res.status(404).json({ error: "List not found" })
    }

    const card = await Card.create({
      title,
      description,
      position: position || 0,
      listId,
    })

    res.status(201).json(card)
  } catch (error) {
    res.status(500).json({ error: "Internal server error" })
  }
}

const updateCard = async (req, res) => {
  try {
    const { title, description } = req.body
    const { cardId } = req.params

    const card = await Card.findOne({
      where: { id: cardId },
      include: [
        {
          model: List,
          as: "list",
          include: [{ model: Board, as: "board", where: { userId: req.user.id } }],
        },
      ],
    })

    if (!card) {
      return res.status(404).json({ error: "Card not found" })
    }

    await card.update({ title, description })
    res.json(card)
  } catch (error) {
    res.status(500).json({ error: "Internal server error" })
  }
}

const moveCard = async (req, res) => {
  try {
    const { listId, position } = req.body
    const { cardId } = req.params

    const card = await Card.findOne({
      where: { id: cardId },
      include: [
        {
          model: List,
          as: "list",
          include: [{ model: Board, as: "board", where: { userId: req.user.id } }],
        },
      ],
    })

    if (!card) {
      return res.status(404).json({ error: "Card not found" })
    }

    const targetList = await List.findOne({
      where: { id: listId },
      include: [{ model: Board, as: "board", where: { userId: req.user.id } }],
    })

    if (!targetList) {
      return res.status(404).json({ error: "Target list not found" })
    }

    await card.update({ listId, position })
    res.json(card)
  } catch (error) {
    res.status(500).json({ error: "Internal server error" })
  }
}

const deleteCard = async (req, res) => {
  try {
    const { cardId } = req.params

    const card = await Card.findOne({
      where: { id: cardId },
      include: [
        {
          model: List,
          as: "list",
          include: [{ model: Board, as: "board", where: { userId: req.user.id } }],
        },
      ],
    })

    if (!card) {
      return res.status(404).json({ error: "Card not found" })
    }

    await card.destroy()
    res.json({ message: "Card deleted" })
  } catch (error) {
    res.status(500).json({ error: "Internal server error" })
  }
}

export { createCard, updateCard, moveCard, deleteCard }
