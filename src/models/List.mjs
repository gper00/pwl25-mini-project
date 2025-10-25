import { DataTypes } from "sequelize"

export default (sequelize) => {
  const List = sequelize.define("List", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    position: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    boardId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "board_id",
    },
  })

  return List
}
