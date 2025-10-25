import { DataTypes } from "sequelize"

export default (sequelize) => {
  const Card = sequelize.define("Card", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    position: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    listId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "list_id",
    },
  })

  return Card
}
