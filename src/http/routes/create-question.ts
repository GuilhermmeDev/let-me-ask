import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod'
import { z } from 'zod/v4'
import { db } from '../../db/connection.ts'
import { schema } from '../../db/schemas/index.ts'

export const createQuestionRoute: FastifyPluginCallbackZod = (app) => {
  app.post(
    '/rooms/:roomId/questions',
    {
      schema: {
        params: z.object({
          roomId: z.string(),
        }),
        body: z.object({
          question: z.string().min(1, 'Question value is required'),
        }),
      },
    },
    async (request, reply) => {
      const { roomId } = request.params
      const { question } = request.body

      const result = await db
        .insert(schema.questions)
        .values({
          roomId,
          question,
        })
        .returning()

      const resultedQuestion = result[0]

      if (!resultedQuestion) {
        throw new Error('Failed to create room')
      }

      return reply.status(201).send({ questionId: resultedQuestion.id })
    }
  )
}
