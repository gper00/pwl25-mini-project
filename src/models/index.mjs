import sequelize from "../config/database.mjs"
import UserModel from "./User.mjs"
import BoardModel from "./Board.mjs"
import ListModel from "./List.mjs"
import CardModel from "./Card.mjs"

const User = UserModel(sequelize)
const Board = BoardModel(sequelize)
const List = ListModel(sequelize)
const Card = CardModel(sequelize)

User.hasMany(Board, { foreignKey: "userId", as: "boards" })
Board.belongsTo(User, { foreignKey: "userId", as: "user" })

Board.hasMany(List, { foreignKey: "boardId", as: "lists" })
List.belongsTo(Board, { foreignKey: "boardId", as: "board" })

List.hasMany(Card, { foreignKey: "listId", as: "cards" })
Card.belongsTo(List, { foreignKey: "listId", as: "list" })

export { sequelize, User, Board, List, Card }
