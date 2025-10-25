import { DataTypes } from "sequelize"
import bcrypt from "bcryptjs"

export default (sequelize) => {
  const User = sequelize.define("User", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  })

  User.beforeCreate(async (user) => {
    user.password = await bcrypt.hash(user.password, 12)
  })

  User.prototype.comparePassword = async function(password) {
    return bcrypt.compare(password, this.password)
  }

  return User
}
