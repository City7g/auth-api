import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const getAllUsers = async () => {
  return prisma.user.findMany()
}

export const getUserCount = async () => {
  return prisma.user.count()
}

export const getUserById = async (id) => {
  return prisma.user.findUnique({
    where: { id: Number(id) },
  })
}
