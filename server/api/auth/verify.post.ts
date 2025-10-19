import jwt from 'jsonwebtoken'
import { JwtPayload } from 'jsonwebtoken'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const token = body.token
  const config = useRuntimeConfig()

  if (!token) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Missing token'
    })
  }

  try {
    const decoded = jwt.verify(token, config.jwtSecret) as JwtPayload
    return { valid: true, decoded }
  } catch (err) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Invalid token'
    })
  }
})
