import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { PrismaClient } from '@prisma/client'
import { generateTokens } from '../utils/tokenUtils.js'

const prisma = new PrismaClient()

export const registerUser = async ({ name, age, password }) => {
  const hashedPassword = await bcrypt.hash(password, 10)
  return prisma.user.create({
    data: { name, age, password: hashedPassword },
  })
}

export const loginUser = async (name, password) => {
  const user = await prisma.user.findFirst({ where: { name } })

  if (!user || password !== user.password) {
    throw new Error('Invalid credentials')
  }

  const tokens = generateTokens(user.id)

  return { user, ...tokens }
}

export const getUserById = async (id) => {
  const user = await prisma.user.findUnique({ where: { id } })
  if (!user) {
    throw new Error('User not found')
  }
  return user
}

export const refreshTokens = async (refreshToken) => {
  const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)
  const newTokens = generateTokens(decoded.userId)

  return { ...newTokens }
}
