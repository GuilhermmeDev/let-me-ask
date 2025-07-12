import { useQuery } from '@tanstack/react-query'
import type { getContentRoomResponse } from './types/get-content-room-response'

export function useContentRoom(roomId: string) {
  return useQuery({
    queryKey: ['get-content-room', roomId],
    queryFn: async () => {
      const response = await fetch(
        `http://localhost:3333/rooms/${roomId}/content`
      )
      const data: getContentRoomResponse = await response.json()
      return data
    },
  })
}
