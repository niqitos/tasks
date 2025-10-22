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
        message: t('register.error.password'),
      })
    }

    const salt = await bcrypt.genSalt(10)
    const passwordHash = await bcrypt.hash(body.password, salt)

    // Sends to database
    const user = await prisma.user.create({
      data: {
        name: body.name,
        lastname: body.lastname,
        email: body.email,
        password: passwordHash,
        salt: salt,
        avatar: 'https://avatar.iran.liara.run/public'
      }
    })

    const token = jwt.sign({ id: user.id }, config.jwtSecret)

    setCookie(event, 'TasksJWT', token)

    await prisma.inbox.create({
      data: {
        name: 'inbox.default',
        preferences: {
          notify: {
            mail: true,
            push: true
          }
        },
        userId: user.id,
        default: true
      }
    })

    return { data: 'success!' }
  } catch (error: any) {
    if (error?.code === 'P2002') {
      throw createError({
        statusCode: 409,
        message: t('register.error.409'),
      })
    }

    throw error
  }
})
