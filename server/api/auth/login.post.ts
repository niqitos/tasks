import bcrypt from 'bcryptjs'
import validator from 'validator'
import jwt from 'jsonwebtoken'
import prisma from '@@/server/utils/prisma'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  try {
    const body = await readBody(event)

    if (!validator.isEmail(body.email)) {
      throw createError({
        statusCode: 400,
        message: 'Invalid email, please change.',
      })
    }

    if (
      !validator.isStrongPassword(body.password, {
        minLength: 8,
        minLowercase: 0,
        minUppercase: 0,
        minNumbers: 0,
        minSymbols: 0,
      })
    ) {
      throw createError({
        statusCode: 400,
        message: 'Password is not minimum 8 characters, please change.',
      })
    }

    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    })

    const isValid = await bcrypt.compare(body.password, user.password)

    if (!isValid) {
      throw createError({
        statusCode: 400,
        message: 'Username or password is invalid.',
      })
    }

    const token = jwt.sign({ id: user.id }, config.jwtSecret)

    setCookie(event, 'TasksJWT', token)

    return { data: 'success!' }
  } catch (error) {
    if (error.code === 'P2002') {
      throw createError({
        statusCode: 409,
        message: 'An email with this address already exists.',
      })
    }

    throw error
  }
})
