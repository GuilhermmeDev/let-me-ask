import { ArrowLeft, Radio } from 'lucide-react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { ContentList } from '@/components/content-list'
import { QuestionForm } from '@/components/question-form'
import { QuestionList } from '@/components/question-list'
import { Button } from '@/components/ui/button'
import { useContentRoom } from '@/http/use-content-room'

type RoomParams = {
  roomId: string
}

export function Room() {
  const params = useParams<RoomParams>()
  const { data: contentData } = useContentRoom(params.roomId ?? '')

  if (!params.roomId) {
    return <Navigate replace to="/" />
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-4xl px-4 py-8">
        <div className="mb-8">
          <div className="mb-4 flex items-center justify-between">
            <Link to="/rooms">
              <Button variant="outline">
                <ArrowLeft className="mr-2 size-4" />
                Voltar ao Início
              </Button>
            </Link>
            <Link to={`/room/${params.roomId}/audio`}>
              <Button className="flex items-center gap-2" variant="secondary">
                <Radio className="size-4" />
                Gravar Áudio
              </Button>
            </Link>
          </div>
          <h1 className="mb-2 font-bold text-3xl text-foreground">
            Sala de Perguntas
          </h1>
          <p className="text-muted-foreground">
            Faça perguntas e receba respostas com IA
          </p>
        </div>
        <div className="mb-8">
          {contentData && contentData.length > 0 && (
            <QuestionForm roomId={params.roomId} />
          )}
        </div>

        <div className="flex flex-col gap-8">
          <QuestionList roomId={params.roomId} />

          <ContentList contentData={contentData ?? []} />
        </div>
      </div>
    </div>
  )
}
