import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'

type GetRoomsResponse = Array<{
  id: string
  name: string
}>

export function CreateRoom() {
  const { data, isLoading } = useQuery({
    queryKey: ['get-rooms'],
    queryFn: async () => {
      const response = await fetch('http://localhost:3333/rooms')
      const data: GetRoomsResponse = await response.json()
      return data
    },
  })

  return (
    <div>
      {isLoading && <p>Carregando...</p>}
      <pre>
        {data?.map((room) => {
          return (
            <Link className="flex gap-1" key={room.id} to={`/room/${room.id}`}>
              {room.name}
            </Link>
          )
        })}
      </pre>
      <Link className="text-blue-500 underline hover:text-blue-700" to="/room">
        Acessar sala
      </Link>
    </div>
  )
}
