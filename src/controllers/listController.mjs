import { List, Board } from "../models/index.mjs"

const getAllLists = async (req, res) => {
  try {
    const { boardId } = req.params

    const board = await Board.findOne({
      where: { id: boardId, userId: req.user.id },
    })

    if (!board) {
      return res.status(404).json({ error: "Board not found" })
    }

    const lists = await List.findAll({
      where: { boardId }
    })
  res.status(200).json(lists)
  } catch (error) {
    res.status(500).json({ error: "Internal server error" })
  }
}

const createList = async (req, res) => {
  try {
    const { title, position } = req.body
    const { boardId } = req.params

    const board = await Board.findOne({
      where: { id: boardId, userId: req.user.id },
    })

    if (!board) {
      return res.status(404).json({ error: "Board not found" })
    }

    const list = await List.create({
      title,
      position: position || 0,
      boardId,
    })

    res.status(201).json(list)
  } catch (error) {
    res.status(500).json({ error: "Internal server error" })
  }
}

const updateList = async (req, res) => {
  try {
    const { title, position } = req.body
    const { listId } = req.params

    const list = await List.findOne({
      where: { id: listId },
      include: [{ model: Board, as: "board", where: { userId: req.user.id } }],
    })

    if (!list) {
      return res.status(404).json({ error: "List not found" })
    }

    await list.update({ title, position })
    res.json(list)
  } catch (error) {
    res.status(500).json({ error: "Internal server error" })
  }
}

const deleteList = async (req, res) => {
  try {
    const { listId } = req.params

    const list = await List.findOne({
      where: { id: listId },
      include: [{ model: Board, as: "board", where: { userId: req.user.id } }],
    })

    if (!list) {
      return res.status(404).json({ error: "List not found" })
    }

    await list.destroy()
    res.json({ message: "List deleted" })
  } catch (error) {
    res.status(500).json({ error: "Internal server error" })
  }
}

export { getAllLists, createList, updateList, deleteList }
