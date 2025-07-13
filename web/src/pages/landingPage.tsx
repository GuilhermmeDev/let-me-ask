import { useNavigate } from 'react-router-dom'
import { ComercialLogo } from '../components/comercial-logo'
import { Button } from '../components/ui/button'

export default function LandingPage() {
  const navigate = useNavigate()

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <ComercialLogo variant="default" />
      <h1 className="mb-4 text-center font-bold text-3xl md:text-4xl">
        Bem-vindo ao Let me Ask
      </h1>
      <p className="mb-8 max-w-md text-center text-muted-foreground">
        Crie salas de perguntas e respostas ao vivo, interaja com sua audiência
        e torne seus eventos mais dinâmicos.
      </p>
      <Button onClick={() => navigate('/rooms')}>Começar</Button>
    </div>
  )
}
