import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { CreateRoom } from './pages/createRoom'
import { Room } from './pages/room'

export function App() {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <BrowserRouter>
        <Routes>
          <Route element={<CreateRoom />} index />
          <Route element={<Room />} path="/room/:roomId" />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}
