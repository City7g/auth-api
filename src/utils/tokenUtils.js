import jwt from 'jsonwebtoken'

export const generateAccessToken = (userId) =>
  jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '3s' })

export const generateRefreshToken = (userId) =>
  jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' })

export const generateTokens = (userId) => {
  const accessToken = generateAccessToken(userId)
  const refreshToken = generateRefreshToken(userId)

  return { accessToken, refreshToken }
}
