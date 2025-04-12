import {
  registerUser,
  loginUser,
  getUserById,
  refreshTokens,
} from '../services/authService.js'

export const register = async (req, res, next) => {
  try {
    const user = await registerUser(req.body)
    res.status(201).json(user)
  } catch (error) {
    next(error)
  }
}

export const login = async (req, res, next) => {
  try {
    const { name, password } = req.body
    const data = await loginUser(name, password)
    res.json(data)
  } catch (error) {
    next(error)
  }
}

export const me = async (req, res, next) => {
  try {
    const user = await getUserById(req.user.userId)
    res.json(user)
  } catch (error) {
    next(error)
  }
}

export const logout = async (req, res, next) => {
  try {
    res.status(200).json({ message: 'Logged out successfully' })
  } catch (error) {
    next(error)
  }
}

export const refresh = async (req, res, next) => {
  await new Promise((resolve) => setTimeout(resolve, 3000))

  try {
    const { refreshToken } = req.body
    const tokens = await refreshTokens(refreshToken)
    res.json(tokens)
  } catch (error) {
    next(error)
  }
}
