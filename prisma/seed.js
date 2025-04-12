import { PrismaClient } from '@prisma/client'
import { faker } from '@faker-js/faker'

const prisma = new PrismaClient()

async function main() {
  const users = []

  for (let i = 0; i < 10; i++) {
    users.push({
      name: faker.person.firstName(),
      age: faker.number.int({ min: 18, max: 80 }),
      password: faker.internet.password(),
    })
  }

  users.push({
    name: 'City7g',
    age: faker.number.int({ min: 18, max: 80 }),
    password: '123',
  })

  await prisma.user.createMany({
    data: users,
  })

  console.log('Database has been seeded. 🌱')
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
