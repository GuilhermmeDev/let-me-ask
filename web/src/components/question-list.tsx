import { useRoomQuestions } from '@/http/use-rooms-questions'
import { QuestionItem } from './question-item'

interface QuestionListProps {
  roomId: string
}

export function QuestionList(props: QuestionListProps) {
  const { data } = useRoomQuestions(props.roomId)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-2xl text-foreground">
          Perguntas & Respostas
        </h2>
      </div>
      {data && data.length > 0 ? (
        data?.map((question) => {
          return <QuestionItem key={question.id} question={question} />
        })
      ) : (
        <p className="text-muted-foreground">Esta sala não possui perguntas.</p>
      )}
    </div>
  )
}
