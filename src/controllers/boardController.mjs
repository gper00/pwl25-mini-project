import { Board } from "../models/index.mjs"

const getAllBoards = async (req, res, next) => {
  try {
    const boards = await Board.findAll({
      where: { userId: req.user.id }
    })
    res.json(boards)
  } catch (error) {
    next(error)
  }
}

const getBoardById = async (req, res, next) => {
  try {
    const board = await Board.findOne({
      where: { id: req.params.id, userId: req.user.id }
    })
    if (!board) {
      return res.status(404).json({ error: "Board not found" })
    }
    res.json(board)
  } catch (error) {
    next(error)
  }
}

const createBoard = async (req, res, next) => {
  try {
    const boardData = {
      ...req.body,
      userId: req.user.id
    }
    const board = await Board.create(boardData)
    res.status(201).json(board)
  } catch (error) {
    next(error)
  }
}

const updateBoard = async (req, res, next) => {
  try {
    await Board.update(req.body, { where: { id: req.params.id } })
    const board = await Board.findByPk(req.params.id)
    res.json(board)
  } catch (error) {
    next(error)
  }
}

const deleteBoard = async (req, res, next) => {
  try {
    await Board.destroy({ where: { id: req.params.id } })
    res.status(204).send()
  } catch (error) {
    next(error)
  }
}

export { getAllBoards, getBoardById, createBoard, updateBoard, deleteBoard}
