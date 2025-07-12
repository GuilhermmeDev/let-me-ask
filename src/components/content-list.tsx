import type { getContentRoomResponse } from '@/http/types/get-content-room-response'
import { ContentItem } from './content-item'

interface ContentListProps {
  contentData: getContentRoomResponse
}

export function ContentList({ contentData }: ContentListProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-2xl text-foreground">
          Conteúdo da sala
        </h2>
      </div>
      {contentData && contentData.length > 0 ? (
        contentData?.map((content) => {
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
