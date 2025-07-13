import { Mic } from 'lucide-react'
import type { getContentRoomResponse } from '@/http/types/get-content-room-response'
import { Card, CardContent } from './ui/card'

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

      <Card>
        <CardContent>
          <div className="space-y-4">
            {/* Question */}
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <div className="flex size-8 items-center justify-center rounded-full bg-primary/10">
                  <Mic className="size-4 text-primary" />
                </div>
              </div>
              <div className="flex-1">
                <p className="mb-1 font-medium text-muted-foreground">
                  {contentData && contentData.length > 0 ? (
                    contentData?.map((content) => content.transcription)
                  ) : (
                    <p>Esta sala não possui nenhum conteúdo ainda</p>
                  )}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
