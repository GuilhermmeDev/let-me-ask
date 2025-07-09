import { Navigate, useParams } from 'react-router-dom'

type RoomParams = {
  roomId: string
}

export function Room() {
  const params = useParams<RoomParams>()

  if (!params.roomId) {
    return <Navigate replace to="/" />
  }
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <h1 className="font-bold text-2xl">Sala {params.roomId}</h1>
    </div>
  )
}
