import { describe, it, expect } from 'vitest'
import request from 'supertest'
import app from '../src/app.js'

describe('GET /api/users', () => {
  it('should return a list of users with a count', async () => {
    const response = await request(app).get('/api/users')
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('users')
    expect(response.body).toHaveProperty('count')
    expect(Array.isArray(response.body.users)).toBe(true)
    expect(response.body.users.length).toBe(response.body.count)
  })

  it('should return users with correct structure', async () => {
    const response = await request(app).get('/api/users')

    response.body.users.forEach(user => {
      expect(user).toHaveProperty('id')
      expect(user).toHaveProperty('name')
      expect(user).toHaveProperty('age')
      expect(user).toHaveProperty('password')
    })
  })
})
