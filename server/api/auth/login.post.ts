import bcrypt from 'bcryptjs'
import validator from 'validator'
import jwt from 'jsonwebtoken'
import { prisma } from '@@/server/utils/prisma'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const t = await useTranslation(event)

  try {
    const body = await readBody(event)

    if (!validator.isEmail(body.email)) {
      throw createError({
        statusCode: 401,
        message: t('login.error.401'),
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
        message: t('login.error.password'),
      })
    }

    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    })

    if (!user) {
      throw createError({
        statusCode: 401,
        message: t('login.error.401'),
      })
    }

    const isValid = await bcrypt.compare(body.password, user.password)

    if (!isValid) {
      throw createError({
        statusCode: 400,
        message: t('login.error.400'),
      })
    }

    const token = jwt.sign({ id: user.id }, config.jwtSecret)

    setCookie(event, 'TasksJWT', token)

    return { data: 'success!' }
  } catch (error: any) {
    if (error?.code === 'P2002') {
      throw createError({
        statusCode: 409,
        message: t('login.error.400'),
      })
    }

    throw error
  }
})
