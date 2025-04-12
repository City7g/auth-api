import * as userService from '../services/userService.js'

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await userService.getAllUsers()
    res.json({ users, count: users.length })
  } catch (error) {
    next(error)
  }
}

export const getUserCount = async (req, res, next) => {
  try {
    const count = await userService.getUserCount()
    res.json({ count })
  } catch (error) {
    next(error)
  }
}

export const getUserById = async (req, res, next) => {
  const { id } = req.params

  try {
    const user = await userService.getUserById(id)
    if (user) {
      res.json(user)
    } else {
      res.status(404).json({ error: 'User not found' })
    }
  } catch (error) {
    next(error)
  }
}
