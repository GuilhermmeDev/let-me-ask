import { GoogleGenAI } from '@google/genai'
import { env } from '../env.ts'

const gemini = new GoogleGenAI({
  apiKey: env.GEMINI_KEY,
})

const model = 'gemini-2.5-flash'

export async function transcribeAudio(audioAsBase64: string, mimeType: string) {
  const response = await gemini.models.generateContent({
    model,
    contents: [
      {
        text: 'Transcreva o aúdio para português do Brasil. Seja preciso, natural e literal na transcrição. Mantenha a pontuação adequada e divida o texto em parágrafos quando for apropriado.',
      },
      {
        inlineData: {
          mimeType,
          data: audioAsBase64,
        },
      },
    ],
  })

  if (!response.text) {
    throw new Error('Não foi possível transcrever o aúdio.')
  }

  return response.text
}

export async function generateEmbeddings(text: string) {
  const response = await gemini.models.embedContent({
    model: 'text-embedding-004',
    contents: [{ text }],
    config: {
      taskType: 'RETRIEVAL_DOCUMENT',
    },
  })

  if (!response.embeddings?.[0].values) {
    throw new Error('Não foi possível gerar os embeddings.')
  }

  return response.embeddings[0].values
}

export async function generateAnswer(
  question: string,
  transcriptions: string[]
) {
  const context = transcriptions.join('\n\n')

  const prompt =
    `Com base no texto fornecido abaixo como contexto, responda a pergunta de forma clara e objetiva em português do Brasil.
    CONTEXTO:
    ${context}

    PERGUNTA:
    ${question}

    INSTRUÇÕES:
    Use apenas informações contidas no contexto enviado;
    Se a informação não for encontrada no contexto enviado, apenas responda que não possui informações suficientes para responder;
    Mantenha o tom educativo, claro e profissional;
    Cite trechos relevantes do contexto, se adequado;
    Se for citado o contexto, utilize o termo Conteúdo da aula;
    `.trim()

  const response = await gemini.models.generateContent({
    model,
    contents: [
      {
        text: prompt,
      },
    ],
  })

  if (!response.text) {
    throw new Error('Falha ao gerar resposta pelo Gemini.')
  }

  return response.text
}
