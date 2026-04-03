'use client'

import Image from 'next/image'
import { Play, BookOpen, Trophy, Settings, Home } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface MainMenuProps {
  onStartGame: () => void
  progress: {
    completedPhases: number[]
    totalScore: number
    lives: number
    isLoaded: boolean
  }
  playerName?: string
  onBackToHome?: () => void
}

export function MainMenu({ onStartGame, progress, playerName, onBackToHome }: MainMenuProps) {
  const completedPhases = progress?.completedPhases || []
  const totalScore = progress?.totalScore || 0
  const hasProgress = completedPhases.length > 0

  return (
    <div className="min-h-screen bg-background bg-cell-pattern flex flex-col">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="cell-bg w-64 h-64 -top-20 -left-20 animate-cell-pulse" />
        <div className="cell-bg w-48 h-48 top-1/3 -right-16 animate-cell-pulse" style={{ animationDelay: '1s' }} />
        <div className="cell-bg w-56 h-56 -bottom-20 left-1/4 animate-cell-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Header */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 relative z-10">
        {/* Logo */}
        <div className="relative mb-8 animate-float">
          <Image
            src="/images/logo.png"
            alt="CitoAprova"
            width={280}
            height={88}
            priority
            className="h-auto w-[240px] md:w-[280px] drop-shadow-lg"
          />
          <div className="absolute inset-0 blur-xl -z-10 animate-pulse-glow bg-gradient-to-r from-primary/30 to-accent/30 rounded-full" />
        </div>

        {playerName && (
          <p className="text-lg text-primary font-medium mb-2">
            Olá, {playerName}!
          </p>
        )}
        <p className="text-muted-foreground text-center mb-8 max-w-xs">
          Explore o mundo das células através de minigames educativos
        </p>

        {/* Stats */}
        {hasProgress && (
          <div className="flex gap-6 mb-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{completedPhases.length}/30</div>
              <div className="text-xs text-muted-foreground">Fases</div>
            </div>
            <div className="w-px bg-border" />
            <div className="text-center">
              <div className="text-2xl font-bold text-accent">{totalScore}</div>
              <div className="text-xs text-muted-foreground">Pontos</div>
            </div>
          </div>
        )}

        {/* Buttons */}
        <div className="w-full max-w-xs space-y-3">
          {hasProgress ? (
            <>
              <Button
                onClick={onStartGame}
                className="w-full h-14 text-lg font-bold bg-gradient-to-r from-primary to-accent hover:opacity-90"
              >
                <Play className="w-5 h-5 mr-2" />
                Continuar
              </Button>
              <Button
                onClick={onStartGame}
                variant="outline"
                className="w-full h-12"
              >
                Selecionar Fase
              </Button>
            </>
          ) : (
            <Button
              onClick={onStartGame}
              className="w-full h-14 text-lg font-bold bg-gradient-to-r from-primary to-accent hover:opacity-90"
            >
              <Play className="w-5 h-5 mr-2" />
              Começar Aventura
            </Button>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="p-6 flex justify-center gap-8">
        {onBackToHome && (
          <button 
            onClick={onBackToHome}
            className="flex flex-col items-center gap-1 text-muted-foreground hover:text-primary transition-colors"
          >
            <Home className="w-6 h-6" />
            <span className="text-xs">Início</span>
          </button>
        )}
        <button className="flex flex-col items-center gap-1 text-muted-foreground hover:text-primary transition-colors">
          <BookOpen className="w-6 h-6" />
          <span className="text-xs">Aprender</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-muted-foreground hover:text-primary transition-colors">
          <Trophy className="w-6 h-6" />
          <span className="text-xs">Conquistas</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-muted-foreground hover:text-primary transition-colors">
          <Settings className="w-6 h-6" />
          <span className="text-xs">Opções</span>
        </button>
      </div>

      {/* Credits */}
      <p className="text-center text-xs text-muted-foreground pb-4">
        Um jogo educativo sobre Biologia Celular
      </p>
    </div>
  )
}
