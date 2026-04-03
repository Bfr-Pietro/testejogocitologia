'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import type { Phase } from '@/lib/minigame-types'
import { 
  ChevronRight, 
  Play,
  Star,
  BookOpen,
  Gamepad2
} from 'lucide-react'
import { Button } from '@/components/ui/button'

interface PhaseScreenProps {
  phase: Phase
  onStart: () => void
  onBack: () => void
}

export function PhaseScreen({ phase, onStart, onBack }: PhaseScreenProps) {
  const [showEducation, setShowEducation] = useState(true)

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-50 via-white to-emerald-50">
      {/* Header */}
      <div className={cn("p-6 bg-gradient-to-br text-white", phase.color)}>
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-white/80 hover:text-white mb-4 transition-colors"
        >
          <ChevronRight className="h-4 w-4 rotate-180" />
          <span>Voltar</span>
        </button>
        
        <div>
          <p className="text-white/70 text-sm mb-1">{phase.blockName}</p>
          <h1 className="text-2xl font-bold">{phase.title}</h1>
          <p className="text-white/80 mt-1">{phase.description}</p>
        </div>

        {/* Info dos minigames */}
        <div className="mt-4 flex items-center gap-3">
          <Gamepad2 className="w-5 h-5" />
          <span className="text-white/90">{phase.minigames?.length || 3} minigames para completar</span>
        </div>
      </div>

      {/* Conteudo educativo */}
      {showEducation && phase.educationalContent && (
        <div className="p-4">
          <div className="bg-white rounded-2xl p-5 shadow-lg border border-gray-100">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-emerald-400 flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <h2 className="font-bold text-gray-800 text-lg">{phase.educationalContent.title}</h2>
            </div>
            
            <ul className="space-y-3">
              {phase.educationalContent.facts?.map((fact, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Star className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0 fill-amber-400" />
                  <span className="text-gray-600">{fact}</span>
                </li>
              ))}
            </ul>

            <Button
              onClick={() => setShowEducation(false)}
              variant="outline"
              className="mt-4 w-full border-2 border-cyan-200 text-cyan-600 hover:bg-cyan-50"
            >
              Entendi! Vamos jogar
            </Button>
          </div>
        </div>
      )}

      {/* Lista de minigames preview */}
      {!showEducation && (
        <div className="p-4 space-y-3">
          <h2 className="font-bold text-gray-800 flex items-center gap-2 mb-4">
            <Gamepad2 className="w-5 h-5 text-cyan-500" />
            Minigames desta Fase
          </h2>

          {phase.minigames?.map((minigame, index) => (
            <div
              key={index}
              className="p-4 rounded-xl bg-white border-2 border-gray-100 shadow-sm"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-400 to-emerald-400 flex items-center justify-center font-bold text-white">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-800">{minigame.title}</h3>
                  <p className="text-sm text-gray-500">{minigame.description}</p>
                </div>
              </div>
              
              <div className="flex gap-3 mt-3 text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  {minigame.timeLimit}s
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-cyan-400" />
                  {minigame.targetScore} pts
                </span>
                <span className="flex items-center gap-1">
                  <span className={cn(
                    "w-2 h-2 rounded-full",
                    minigame.difficulty === 1 ? "bg-emerald-400" :
                    minigame.difficulty === 2 ? "bg-amber-400" :
                    "bg-red-400"
                  )} />
                  {minigame.difficulty === 1 ? 'Fácil' : minigame.difficulty === 2 ? 'Médio' : 'Difícil'}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Botao de iniciar */}
      <div className="p-4 pb-8">
        <Button
          onClick={onStart}
          className="w-full h-14 text-lg font-bold bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-600 hover:to-emerald-600 text-white rounded-xl shadow-lg"
        >
          <Play className="w-6 h-6 mr-2" />
          Iniciar Fase
        </Button>
      </div>
    </div>
  )
}
