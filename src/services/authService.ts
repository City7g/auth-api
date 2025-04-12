import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { PrismaClient, User } from '@prisma/client'
import { generateTokens } from '../utils/tokenUtils'

interface RegisterData {
  name: string
  age: number
  password: string
}

interface Tokens {
  accessToken: string
  refreshToken: string
}

interface LoginResponse extends Tokens {
  user: User
}

const prisma = new PrismaClient()

export const registerUser = async ({ name, age, password }: RegisterData): Promise<User> => {
  const hashedPassword = await bcrypt.hash(password, 10)
  return prisma.user.create({
    data: { name, age, password: hashedPassword },
  })
}

export const loginUser = async (name: string, password: string): Promise<LoginResponse> => {
  const user = await prisma.user.findFirst({ where: { name } })

  if (!user || password !== user.password) {
    throw new Error('Invalid credentials')
  }

  const tokens = generateTokens(user.id)

  return { user, ...tokens }
}

export const getUserById = async (id: number): Promise<User> => {
  const user = await prisma.user.findUnique({ where: { id } })
  if (!user) {
    throw new Error('User not found')
  }
  return user
}

export const refreshTokens = async (refreshToken: string): Promise<Tokens> => {
  const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET as string) as { userId: number }
  const newTokens = generateTokens(decoded.userId)

  return { ...newTokens }
}
