'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { BLOCKS } from '@/lib/phases-data'
import type { Phase, Block } from '@/lib/minigame-types'
import { 
  ChevronRight, 
  Lock, 
  CheckCircle2, 
  Star, 
  Microscope,
  Atom,
  Leaf,
  Zap,
  Factory,
  Truck,
  Shield,
  Brain,
  Skull,
  Play
} from 'lucide-react'
import { Button } from '@/components/ui/button'

interface PhaseSelectorProps {
  phases: Phase[]
  completedPhases: number[]
  currentPhaseIndex: number
  onSelectPhase: (phase: Phase) => void
  onBack: () => void
}

// Helper function to get phases by block
const getPhasesByBlock = (blockId: number, allPhases: Phase[]) => {
  return allPhases.filter(p => p.blockId === blockId)
}

const blockIcons: Record<string, React.ElementType> = {
  microscope: Microscope,
  cells: Atom,
  factory: Factory,
  leaf: Leaf,
  shield: Shield,
  truck: Truck,
  zap: Zap,
  brain: Brain,
  skull: Skull
}

export function PhaseSelector({ phases, completedPhases, currentPhaseIndex, onSelectPhase, onBack }: PhaseSelectorProps) {
  const [selectedBlock, setSelectedBlock] = useState<number | null>(null)

  const getBlockProgress = (block: Block) => {
    const blockPhases = getPhasesByBlock(block.id, phases)
    const completed = blockPhases.filter(p => completedPhases.includes(p.id)).length
    return { completed, total: blockPhases.length }
  }

  const isPhaseUnlocked = (phase: Phase) => {
    if (phase.id === 1) return true
    return completedPhases.includes(phase.id - 1)
  }

  const isBlockUnlocked = (block: Block) => {
    if (block.id === 1) return true
    const prevBlock = BLOCKS.find(b => b.id === block.id - 1)
    if (!prevBlock) return true
    const prevPhases = getPhasesByBlock(prevBlock.id, phases)
    return prevPhases.every(p => completedPhases.includes(p.id))
  }

  if (selectedBlock !== null) {
    const block = BLOCKS.find(b => b.id === selectedBlock)
    if (!block) return null

    const blockPhases = getPhasesByBlock(selectedBlock, phases)
    const BlockIcon = blockIcons[block.icon] || Atom

    return (
      <div className="min-h-screen bg-background bg-cell-pattern">
        {/* Header do bloco */}
        <div className={cn("p-6 bg-gradient-to-br text-white", block.color)}>
          <button
            onClick={() => setSelectedBlock(null)}
            className="flex items-center gap-2 text-white/80 hover:text-white mb-4 transition-colors"
          >
            <ChevronRight className="h-4 w-4 rotate-180" />
            <span>Voltar aos blocos</span>
          </button>
          
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center">
              <BlockIcon className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">{block.name}</h1>
              <p className="text-white/80">{block.description}</p>
            </div>
          </div>
        </div>

        {/* Lista de fases */}
        <div className="p-4 space-y-3">
          {blockPhases.map((phase, index) => {
            const isUnlocked = isPhaseUnlocked(phase)
            const isCompleted = completedPhases.includes(phase.id)
            const isCurrent = index === currentPhaseIndex

            return (
              <button
                key={phase.id}
                onClick={() => isUnlocked && onSelectPhase(phase)}
                disabled={!isUnlocked}
                className={cn(
                  "w-full p-4 rounded-2xl border-2 transition-all text-left",
                  "flex items-center gap-4",
                  isCompleted
                    ? "bg-primary/5 border-primary/30"
                    : isCurrent
                      ? "bg-accent/10 border-accent"
                      : isUnlocked
                        ? "bg-card border-border hover:border-primary hover:shadow-lg"
                        : "bg-muted/50 border-muted cursor-not-allowed opacity-60"
                )}
              >
                {/* Numero/Status */}
                <div className={cn(
                  "w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg",
                  isCompleted
                    ? "bg-primary text-primary-foreground"
                    : isUnlocked
                      ? "bg-gradient-to-br " + phase.color + " text-white"
                      : "bg-muted text-muted-foreground"
                )}>
                  {isCompleted ? (
                    <CheckCircle2 className="w-6 h-6" />
                  ) : isUnlocked ? (
                    index + 1
                  ) : (
                    <Lock className="w-5 h-5" />
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-foreground truncate">{phase.title}</h3>
                  <p className="text-sm text-muted-foreground truncate">{phase.description}</p>
                  
                  {/* Minigames */}
                  <div className="flex gap-1 mt-2">
                    {phase.minigames.map((mg, i) => (
                      <span
                        key={i}
                        className={cn(
                          "text-xs px-2 py-0.5 rounded-full",
                          isCompleted
                            ? "bg-primary/20 text-primary"
                            : "bg-secondary text-secondary-foreground"
                        )}
                      >
                        {mg.title.split(' ')[0]}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Acao */}
                {isUnlocked && !isCompleted && (
                  <div className="flex-shrink-0">
                    <div className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center",
                      "bg-gradient-to-br from-primary to-accent text-white"
                    )}>
                      <Play className="w-5 h-5 ml-0.5" />
                    </div>
                  </div>
                )}
              </button>
            )
          })}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background bg-cell-pattern">
      {/* Header */}
      <div className="p-6 bg-gradient-to-br from-primary to-accent text-white">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-white/80 hover:text-white mb-4 transition-colors"
        >
          <ChevronRight className="h-4 w-4 rotate-180" />
          <span>Menu</span>
        </button>
        
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center">
            <Microscope className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Detetive Biologico</h1>
            <p className="text-white/80">Escolha um bloco para jogar</p>
          </div>
        </div>

        {/* Progresso geral */}
        <div className="mt-4 flex items-center gap-3">
          <Star className="w-5 h-5 text-yellow-300" />
          <div className="flex-1">
            <div className="flex justify-between text-sm mb-1">
              <span>Progresso Total</span>
              <span>{completedPhases.length}/30 fases</span>
            </div>
            <div className="h-2 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-yellow-300 rounded-full transition-all"
                style={{ width: `${(completedPhases.length / 30) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Grid de blocos */}
      <div className="p-4 grid gap-4">
        {BLOCKS.map(block => {
          const BlockIcon = blockIcons[block.icon] || Atom
          const progress = getBlockProgress(block)
          const isUnlocked = isBlockUnlocked(block)
          const isComplete = progress.completed === progress.total

          return (
            <button
              key={block.id}
              onClick={() => isUnlocked && setSelectedBlock(block.id)}
              disabled={!isUnlocked}
              className={cn(
                "p-4 rounded-2xl border-2 transition-all text-left",
                "flex items-center gap-4",
                isComplete
                  ? "bg-primary/5 border-primary/30"
                  : isUnlocked
                    ? "bg-card border-border hover:border-primary hover:shadow-lg"
                    : "bg-muted/50 border-muted cursor-not-allowed opacity-60"
              )}
            >
              {/* Icone */}
              <div className={cn(
                "w-14 h-14 rounded-xl flex items-center justify-center text-white",
                isUnlocked
                  ? "bg-gradient-to-br " + block.color
                  : "bg-muted"
              )}>
                {isUnlocked ? (
                  <BlockIcon className="w-7 h-7" />
                ) : (
                  <Lock className="w-6 h-6 text-muted-foreground" />
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-foreground">{block.name}</h3>
                  {isComplete && (
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                  )}
                </div>
                <p className="text-sm text-muted-foreground truncate">{block.description}</p>
                
                {/* Barra de progresso */}
                {isUnlocked && (
                  <div className="mt-2">
                    <div className="flex justify-between text-xs text-muted-foreground mb-1">
                      <span>{progress.completed}/{progress.total} fases</span>
                      <span>{Math.round((progress.completed / progress.total) * 100)}%</span>
                    </div>
                    <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                      <div
                        className={cn("h-full rounded-full transition-all bg-gradient-to-r", block.color)}
                        style={{ width: `${(progress.completed / progress.total) * 100}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Seta */}
              {isUnlocked && (
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
