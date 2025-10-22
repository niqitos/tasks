import jwt from 'jsonwebtoken'
import { JwtPayload } from 'jsonwebtoken'
import { prisma } from '@@/server/utils/prisma'
import { createClient } from '@supabase/supabase-js'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  const supabase = createClient(
    config.public.supabaseUrl,
    config.public.supabaseKey
  )

  try {
    const taskId = await getRouterParam(event, 'task')
    const fileId = await getRouterParam(event, 'file')

    const cookies = parseCookies(event)
    const token = cookies.TasksJWT

    if (!token) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Not authorized to access files',
      })
    }

    const decodedToken = await jwt.verify(token, config.jwtSecret) as JwtPayload

    const task = await prisma.task.findUnique({
      where: {
        id: taskId,
        deletedAt: null
      },
      select: {
        board: {
          select: {
            workspaceId: true
          }
        }
      }
    })

    if (!task) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Task does not exist',
      })
    }

    const workspaceMember = await prisma.workspaceMember.findMany({
      where: {
        workspaceId: task.board.workspaceId,
        userId: decodedToken.id,
        deletedAt: null
      }
    })

    if (!workspaceMember) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Unauthorized',
      })
    }

    const file = await prisma.file.findFirst({
      where: {
        id: fileId
      },
      select: {
        filename: true
      }
    })

    if (!file) {
      throw createError({
        statusCode: 401,
        statusMessage: 'File not found'
      })
    }

    const { data, error } = await supabase.storage
      .from(config.public.supabaseBucket)
      .download(`tasks/${taskId}/${file.filename}`)

    if (error || !data) {
      throw createError({ statusCode: 404, statusMessage: 'File not found' })
    }

    return data

    // const arrayBuffer = await data.arrayBuffer()
    // const buffer = Buffer.from(arrayBuffer)

    // send(event, buffer, {
    //   'Content-Type': data.type || 'application/octet-stream',
    //   'Content-Disposition': `inline; filename="${file.filename}"`
    // })
  } catch (err) {
    console.log(err)
  }
})
