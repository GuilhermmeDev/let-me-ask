import { eq } from 'drizzle-orm'
import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod'
import { z } from 'zod/v4'
import { db } from '../../db/connection.ts'
import { schema } from '../../db/schemas/index.ts'

export const getRoomContent: FastifyPluginCallbackZod = (app) => {
  app.get(
    '/rooms/:roomId/content',
    {
      schema: {
        params: z.object({
          roomId: z.string(),
        }),
      },
    },
    async (request) => {
      const { roomId } = request.params

      const result = await db
        .select({
          id: schema.audioChunks.id,
          transcription: schema.audioChunks.transcription,
          createdAt: schema.audioChunks.createdAt,
        })
        .from(schema.audioChunks)
        .where(eq(schema.audioChunks.roomId, roomId))

      return result
    }
  )
}
