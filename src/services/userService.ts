import { User } from '@prisma/client'
import prisma from '../lib/prisma'

export const getAllUsers = async (): Promise<User[]> => {
  return prisma.user.findMany()
}

export const getUserCount = async (): Promise<number> => {
  return prisma.user.count()
}

export const getUserById = async (id: string | number): Promise<User | null> => {
  return prisma.user.findUnique({
    where: { id: Number(id) },
  })
}
