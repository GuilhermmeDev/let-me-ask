import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { CreateRoom } from './pages/createRoom'
import LandingPage from './pages/landingPage'
import { RecordRoomAudio } from './pages/record-room-audio'
import { Room } from './pages/room'

export function App() {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <BrowserRouter>
        <Routes>
          <Route element={<LandingPage />} index />
          <Route element={<CreateRoom />} path="/rooms" />
          <Route element={<Room />} path="/room/:roomId" />
          <Route element={<RecordRoomAudio />} path="/room/:roomId/audio" />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}
