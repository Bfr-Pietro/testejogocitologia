'use client'

import { useState, useCallback, useEffect } from 'react'
import { MainMenu } from './main-menu'
import { usePageTransition } from '@/contexts/transition-context'
import { PhaseSelector } from './phase-selector'
import { PhaseScreen } from './phase-screen'
import { MinigameRunner } from './minigame-runner'
import { useGameProgress } from '@/hooks/use-game-progress'
import { PHASES } from '@/lib/phases-data'
import type { Phase } from '@/lib/minigame-types'
import { Trophy, Star, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'

type GameScreen = 'menu' | 'phases' | 'phase-intro' | 'playing' | 'victory' | 'game-over'

interface GameConfig {
  mode: 'historia' | 'pratica'
  difficulty: 'facil' | 'normal' | 'dificil'
  playerName: string
}

export function GameController() {
  const { navigateTo } = usePageTransition()
  const [screen, setScreen] = useState<GameScreen>('menu')
  const [currentPhase, setCurrentPhase] = useState<Phase | null>(null)
  const [currentMinigameIndex, setCurrentMinigameIndex] = useState(0)
  const [gameConfig, setGameConfig] = useState<GameConfig | null>(null)
  const progress = useGameProgress()

  // Carregar configuracoes do jogo
  useEffect(() => {
    const savedConfig = localStorage.getItem('gameConfig')
    if (savedConfig) {
      const config = JSON.parse(savedConfig) as GameConfig
      setGameConfig(config)
      
      // Ajustar vidas baseado na dificuldade
      if (config.difficulty === 'facil') {
        progress.setInitialLives(5)
      } else if (config.difficulty === 'dificil') {
        progress.setInitialLives(2)
      } else {
        progress.setInitialLives(3)
      }
    }
  }, [])

  const handleStartGame = useCallback(() => {
    setScreen('phases')
  }, [])

  const handleSelectPhase = useCallback((phase: Phase) => {
    setCurrentPhase(phase)
    setCurrentMinigameIndex(0)
    setScreen('phase-intro')
  }, [])

  const handleStartPhase = useCallback(() => {
    setScreen('playing')
  }, [])

  const handleMinigameComplete = useCallback((success: boolean, score: number) => {
    if (!currentPhase) return

    if (success) {
      progress.addScore(score)
      
      // Verificar se completou todos os minigames da fase
      if (currentMinigameIndex >= currentPhase.minigames.length - 1) {
        // Fase completa!
        progress.completePhase(currentPhase.id)
        setScreen('victory')
      } else {
        // Proximo minigame
        setCurrentMinigameIndex(prev => prev + 1)
      }
    } else {
      // Game over - perdeu uma vida
      const livesAfterLoss = progress.lives - 1
      progress.loseLife()
      
      if (livesAfterLoss <= 0) {
        setScreen('game-over')
      } else {
        // Tentar novamente - volta para selecao de fase
        setScreen('phase-intro')
      }
    }
  }, [currentPhase, currentMinigameIndex, progress])

  const handleBackToPhases = useCallback(() => {
    setCurrentPhase(null)
    setCurrentMinigameIndex(0)
    setScreen('phases')
  }, [])

  const handleRetry = useCallback(() => {
    setCurrentMinigameIndex(0)
    setScreen('playing')
  }, [])

  const handleBackToMenu = useCallback(() => {
    setCurrentPhase(null)
    setCurrentMinigameIndex(0)
    setScreen('menu')
  }, [])

  const handleBackToHome = useCallback(() => {
    navigateTo('/')
  }, [navigateTo])

  // Renderizar a tela atual
  switch (screen) {
    case 'menu':
      return <MainMenu onStartGame={handleStartGame} progress={progress} playerName={gameConfig?.playerName} onBackToHome={handleBackToHome} />
    
    case 'phases':
      return (
        <PhaseSelector 
          phases={PHASES}
          completedPhases={progress.completedPhases}
          currentPhaseIndex={progress.completedPhases.length}
          onSelectPhase={handleSelectPhase}
          onBack={handleBackToMenu}
        />
      )
    
    case 'phase-intro':
      return currentPhase ? (
        <PhaseScreen 
          phase={currentPhase}
          onStart={handleStartPhase}
          onBack={handleBackToPhases}
        />
      ) : null
    
    case 'playing':
      return currentPhase && currentPhase.minigames[currentMinigameIndex] ? (
        <MinigameRunner
          phase={currentPhase}
          minigame={currentPhase.minigames[currentMinigameIndex]}
          minigameIndex={currentMinigameIndex}
          onComplete={handleMinigameComplete}
          onClose={handleBackToPhases}
        />
      ) : null
    
    case 'victory':
      return (
        <VictoryScreen 
          phase={currentPhase}
          score={progress.totalScore}
          onContinue={handleBackToPhases}
        />
      )
    
    case 'game-over':
      return (
        <GameOverScreen 
          onRetry={handleRetry}
          onBack={handleBackToPhases}
        />
      )
    
    default:
      return null
  }
}

// Tela de Vitoria
function VictoryScreen({ phase, score, onContinue }: { 
  phase: Phase | null
  score: number
  onContinue: () => void 
}) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-cyan-50 to-teal-50 flex items-center justify-center p-4">
      {/* Celulas decorativas */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-gradient-to-br from-emerald-200/30 to-cyan-200/30 animate-float"
            style={{
              width: `${30 + Math.random() * 50}px`,
              height: `${30 + Math.random() * 50}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${4 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border-4 border-emerald-300 max-w-md w-full text-center">
        <div className="absolute -top-12 left-1/2 -translate-x-1/2">
          <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full flex items-center justify-center shadow-lg animate-bounce">
            <Trophy className="w-12 h-12 text-white" />
          </div>
        </div>

        <div className="mt-8">
          <h1 className="text-3xl font-black text-emerald-600 mb-2">
            Fase Completa!
          </h1>
          {phase && (
            <p className="text-lg text-gray-600 mb-4">{phase.title}</p>
          )}
          
          <div className="flex justify-center gap-2 mb-6">
            {[1, 2, 3].map((star) => (
              <Star 
                key={star} 
                className="w-10 h-10 text-yellow-400 fill-yellow-400 animate-pulse"
                style={{ animationDelay: `${star * 0.2}s` }}
              />
            ))}
          </div>

          <div className="bg-gradient-to-r from-emerald-100 to-cyan-100 rounded-2xl p-4 mb-6">
            <p className="text-sm text-gray-500 mb-1">Pontuação Total</p>
            <p className="text-4xl font-black text-emerald-600">{score.toLocaleString()}</p>
          </div>

          <div className="flex items-center justify-center gap-2 text-emerald-600 mb-6">
            <Sparkles className="w-5 h-5" />
            <span className="font-medium">Você aprendeu sobre {phase?.theme}!</span>
            <Sparkles className="w-5 h-5" />
          </div>

          <Button
            onClick={onContinue}
            className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white font-bold py-4 rounded-xl text-lg shadow-lg"
          >
            Continuar Jornada
          </Button>
        </div>
      </div>
    </div>
  )
}

// Tela de Game Over
function GameOverScreen({ onRetry, onBack }: { 
  onRetry: () => void
  onBack: () => void 
}) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 via-pink-50 to-orange-50 flex items-center justify-center p-4">
      <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border-4 border-red-200 max-w-md w-full text-center">
        <div className="w-20 h-20 bg-gradient-to-br from-red-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
          <span className="text-4xl">😵</span>
        </div>

        <h1 className="text-3xl font-black text-red-500 mb-2">
          Fim de Jogo!
        </h1>
        <p className="text-gray-600 mb-6">
          Suas vidas acabaram, mas não desista! A célula precisa de você!
        </p>

        <div className="bg-red-50 rounded-2xl p-4 mb-6">
          <p className="text-sm text-red-400">
            Dica: Preste atenção nas instruções de cada minigame e tente novamente!
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <Button
            onClick={onRetry}
            className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white font-bold py-4 rounded-xl text-lg shadow-lg"
          >
            Tentar Novamente
          </Button>
          <Button
            onClick={onBack}
            variant="outline"
            className="w-full border-2 border-gray-300 text-gray-600 font-bold py-4 rounded-xl text-lg"
          >
            Voltar ao Mapa
          </Button>
        </div>
      </div>
    </div>
  )
}
