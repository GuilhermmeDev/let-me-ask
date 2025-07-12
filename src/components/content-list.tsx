import { useContentRoom } from '@/http/use-content-room'
import { ContentItem } from './content-item'

interface ContentListProps {
  roomId: string
}

export function ContentList(props: ContentListProps) {
  const { data } = useContentRoom(props.roomId)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-2xl text-foreground">
          Conteúdo da sala
        </h2>
      </div>
      {data && data.length > 0 ? (
        data?.map((content) => {
          return <ContentItem content={content} key={content.id} />
        })
      ) : (
        <p className="text-muted-foreground">
          Nenhum conteúdo encontrado, comece a gravar áudio para gerar
          transcrições
        </p>
      )}
    </div>
  )
}
