import jwt from 'jsonwebtoken'
import { JwtPayload } from 'jsonwebtoken'
import { prisma } from '@@/server/utils/prisma'

export default defineEventHandler(async (event) : Promise<any> => {
  const config = useRuntimeConfig()
  const t = await useTranslation(event)

  try {
    const body = await readBody(event)
    const itemId = await getRouterParam(event, 'item') as string

    const cookies = parseCookies(event)
    const token = cookies.TasksJWT

    if (!token) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Not authorized to update',
      })
    }

    const decodedToken = await jwt.verify(token, config.jwtSecret) as JwtPayload

    const inboxItemTryingToUpdate = await prisma.inboxItem.findUnique({
      where: {
        id: itemId
      }
    })

    if (!inboxItemTryingToUpdate) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Inbox Item does not exist',
      })
    }

    if (inboxItemTryingToUpdate.creatorId !== decodedToken.id) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Does not have permission to update Inbox Item'
      })
    }

    const inboxItem = await prisma.inboxItem.update({
      where: {
        id: itemId
      },
      data: body
    })

    const now = new Date()

    await prisma.activityLog.create({
      data: {
        logName: 'default',
        description: 'Inbox Item updated',
        subjectId: inboxItem.id,
        subjectType: 'InboxItem',
        event: 'updated',
        causedById:  decodedToken.id,
        properties: getUpdatedFields(inboxItemTryingToUpdate, inboxItem)
      }
    })
  } catch (err) {
    throw err
    // throw createError({
    //   statusCode: 500,
    //   statusMessage: 'Could not verify jwt',
    // })
  }
})
