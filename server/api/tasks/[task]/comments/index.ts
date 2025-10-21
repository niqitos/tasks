import prisma from '@@/server/utils/prisma'

export default defineEventHandler(async (event) => {
  const taskId = getRouterParam(event, 'taskId')

  return await prisma.comment.findMany({
    where: {
      taskId,
      parentId: null
    },
    orderBy: {
      createdAt: 'desc'
    },
    include: {
      author: true,
      replies: {
        include: {
          author: true
        },
        orderBy: {
          createdAt: 'desc'
        }
      }
    }
  })
})
