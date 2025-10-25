import { sequelize, User, Board, List, Card } from "./models/index.mjs"
import bcrypt from "bcryptjs"

const seedData = async () => {
  try {
    await sequelize.sync({ force: true })

    // buat user
    const hashedPassword = await bcrypt.hash("123456", 10)
    const user1 = await User.create({
      name: "umam",
      email: "umam@mail.com",
      password: hashedPassword
    })

    // membuat board
    const board1 = await Board.create({
      title: "My Project",
      userId: user1.id
    })

    // membuat lists
    const list1 = await List.create({
      title: "To Do",
      boardId: board1.id,
      position: 0
    })

    const list2 = await List.create({
      title: "In Progress",
      boardId: board1.id,
      position: 1
    })

    const list3 = await List.create({
      title: "Done",
      boardId: board1.id,
      position: 2
    })

    // membuat cards
    await Card.create({
      title: "Setup project",
      description: "Initialize the project structure",
      listId: list3.id,
      position: 0
    })

    await Card.create({
      title: "Create API endpoints",
      description: "Build REST API for todo management",
      listId: list2.id,
      position: 0
    })

    await Card.create({
      title: "Add authentication",
      description: "Implement JWT authentication",
      listId: list1.id,
      position: 0
    })

    console.log("✅ Database seeded successfully!")
    console.log("📧 Test user: umam@mail.com")
    console.log("🔑 Password: 123456")

  } catch (error) {
    console.error("❌ Seed failed:", error)
  } finally {
    await sequelize.close()
  }
}

seedData()
