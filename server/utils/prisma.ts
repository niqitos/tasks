import { PrismaClient } from '@prisma/client'

const prismaClientSingleton = () => {
  const prisma = new PrismaClient()

  const softDeleteModels: string[] = [
    'User',
    'Workspace',
    'WorkspaceMember',
    'Board',
    'Task',
    'TaskAssignee',
    'File',
    'Comment'
  ]

  const extensions: any = {}

  softDeleteModels.forEach((model: string) => {
    extensions[model.charAt(0).toLowerCase() + model.slice(1)] = {
      async delete({ args }: any) {
        const prismaModel = prisma[model.charAt(0).toLowerCase() + model.slice(1) as keyof typeof prisma] as any
        return prismaModel.update({
          ...args,
          data: {
            deletedAt: new Date()
          }
        })
      },
      async deleteMany({ args }: any) {
        const prismaModel = prisma[model.charAt(0).toLowerCase() + model.slice(1) as keyof typeof prisma] as any
        return prismaModel.updateMany({
          ...args,
          data: {
            deletedAt: new Date()
          }
        })
      },
      async findUnique({ args, query }: any) {
        return query({
          ...args,
          where: {
            deletedAt: null,
            ...args.where
          }
        })
      },
      async findUniqueOrThrow({ args, query }: any) {
        return query({
          ...args,
          where: {
            deletedAt: null,
            ...args.where
          }
        })
      },
      async findFirst({ args, query }: any) {
        return query({
          ...args,
          where: {
            deletedAt: null,
            ...args.where
          }
        })
      },
      async findMany({ args, query }: any) {
        return query({
          ...args,
          where: {
            deletedAt: null,
            ...args.where
          }
        })
      },
      async count({ args, query }: any) {
        return query({
          ...args,
          where: {
            deletedAt: null,
            ...args.where
          }
        })
      }
    }
  })

  return prisma.$extends({
    query: extensions
  })
}

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined
}

let prisma = globalForPrisma.prisma ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}
