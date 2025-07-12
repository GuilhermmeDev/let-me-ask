import { Mic } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { dayjs } from '@/lib/dayjs'

interface Content {
  id: string
  transcription: string
  createdAt: string
}

interface ContentItemProps {
  content: Content
}

export function ContentItem({ content }: ContentItemProps) {
  return (
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
                {content.transcription}
              </p>
            </div>
          </div>

          <div className="flex justify-end">
            <span className="text-muted-foreground text-xs">
              {dayjs(content.createdAt).fromNow()}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
