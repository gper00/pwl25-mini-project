import jwt from "jsonwebtoken"
import { User } from "../models/index.mjs"

const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  })
}

const register = async (req, res) => {
  try {
    const { email, password, name } = req.body

    const existingUser = await User.findOne({ where: { email } })
    if (existingUser) {
      return res.status(400).json({ error: "Email already registered" })
    }

    const user = await User.create({ email, password, name })
    const token = generateToken(user.id)

    res.status(201).json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
      token,
    })
  } catch (error) {
    console.error('Register error:', error)
    res.status(500).json({ error: "Internal server error" })
  }
}

const login = async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ where: { email } })
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: "Invalid credentials" })
    }

    const token = generateToken(user.id)

    res.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
      token,
    })
  } catch (error) {
    console.error('Login error:', error)
    res.status(500).json({ error: "Internal server error" })
  }
}

export { register, login, }
