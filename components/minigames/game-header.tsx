'use client'

import { Timer, Star, Flame, Heart, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface GameHeaderProps {
  title: string
  score: number
  targetScore: number
  timeRemaining: number
  timeLimit: number
  combo: number
  lives?: number
  onClose: () => void
}

export function GameHeader({
  title,
  score,
  targetScore,
  timeRemaining,
  timeLimit,
  combo,
  lives,
  onClose
}: GameHeaderProps) {
  const timeProgress = (timeRemaining / timeLimit) * 100
  const scoreProgress = Math.min(100, (score / targetScore) * 100)
  const isLowTime = timeProgress < 25
  const isVeryLowTime = timeProgress < 10

  return (
    <div className="glass rounded-2xl p-4 mb-4">
      {/* Titulo e fechar */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-bold text-foreground">{title}</h2>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="h-8 w-8 rounded-full hover:bg-destructive/10 hover:text-destructive"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Timer */}
      <div className="mb-3">
        <div className="flex items-center justify-between text-sm mb-1">
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Timer className={cn("h-4 w-4", isVeryLowTime && "text-destructive animate-timer-pulse")} />
            <span>Tempo</span>
          </div>
          <span className={cn(
            "font-mono font-bold",
            isVeryLowTime ? "text-destructive" : isLowTime ? "text-chart-4" : "text-foreground"
          )}>
            {timeRemaining}s
          </span>
        </div>
        <div className="timer-bar">
          <div
            className={cn("timer-bar-fill", isVeryLowTime && "danger", isLowTime && !isVeryLowTime && "warning")}
            style={{ width: `${timeProgress}%` }}
          />
        </div>
      </div>

      {/* Score */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {/* Pontuacao */}
          <div className="flex items-center gap-2">
            <Star className="h-5 w-5 text-chart-3" />
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground">Pontos</span>
              <div className="flex items-center gap-1">
                <span className="font-bold text-foreground">{score}</span>
                <span className="text-xs text-muted-foreground">/ {targetScore}</span>
              </div>
            </div>
          </div>

          {/* Combo */}
          {combo > 0 && (
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-chart-4/20 to-chart-3/20 border border-chart-4/30">
              <Flame className="h-4 w-4 text-chart-4" />
              <span className="font-bold text-chart-4">{combo}x</span>
            </div>
          )}
        </div>

        {/* Vidas (se aplicavel) */}
        {lives !== undefined && (
          <div className="flex items-center gap-1">
            {Array.from({ length: 3 }).map((_, i) => (
              <Heart
                key={i}
                className={cn(
                  "h-5 w-5 transition-all",
                  i < lives ? "text-destructive fill-destructive" : "text-muted-foreground/30"
                )}
              />
            ))}
          </div>
        )}
      </div>

      {/* Barra de progresso do score */}
      <div className="mt-3 h-2 bg-secondary rounded-full overflow-hidden">
        <div
          className={cn(
            "h-full rounded-full transition-all duration-300",
            scoreProgress >= 100
              ? "bg-gradient-to-r from-primary to-accent"
              : "bg-gradient-to-r from-primary/80 to-primary"
          )}
          style={{ width: `${scoreProgress}%` }}
        />
      </div>
    </div>
  )
}
