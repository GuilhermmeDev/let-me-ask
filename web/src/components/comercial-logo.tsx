import { Logo } from './ui/logo'

interface ComercialLogoProps {
  variant?: 'default' | 'logo' | 'text'
}

export function ComercialLogo({ variant }: ComercialLogoProps) {
  if (variant === 'default' || !variant) {
    return (
      <div className="mb-8 flex w-full flex-row items-center justify-center gap-4">
        <Logo className="w-10" />
        <p className="font-medium font-mono text-xl">Let me Ask</p>
      </div>
    )
  }
  if (variant === 'logo') {
    return <Logo className="w-10" />
  }
  if (variant === 'text') {
    return <p className="font-medium font-mono text-xl">Let me Ask</p>
  }
}
