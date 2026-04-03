'use client'

import { useState, useCallback, useEffect } from 'react'
import type { GameProgress } from '@/lib/minigame-types'
import { PHASES } from '@/lib/phases-data'

const STORAGE_KEY = 'detetive-biologico-progress'

const initialProgress: GameProgress = {
  currentPhase: 1,
  currentMinigame: 0,
  completedPhases: [],
  phaseScores: {},
  totalScore: 0,
  lives: 3,
  unlockedBlocks: [1]
}

export function useGameProgress() {
  const [progress, setProgress] = useState<GameProgress>(initialProgress)
  const [isLoaded, setIsLoaded] = useState(false)

  // Carregar do localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const parsed = JSON.parse(saved)
        setProgress({ ...initialProgress, ...parsed })
      }
    } catch (e) {
      console.error('Erro ao carregar progresso:', e)
    }
    setIsLoaded(true)
  }, [])

  // Salvar no localStorage
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
      } catch (e) {
        console.error('Erro ao salvar progresso:', e)
      }
    }
  }, [progress, isLoaded])

  const completeMinigame = useCallback((phaseId: number, minigameIndex: number, score: number) => {
    setProgress(prev => {
      const phaseScore = (prev.phaseScores[phaseId] || 0) + score
      return {
        ...prev,
        phaseScores: { ...prev.phaseScores, [phaseId]: phaseScore },
        totalScore: prev.totalScore + score,
        currentMinigame: minigameIndex + 1
      }
    })
  }, [])

  const completePhase = useCallback((phaseId: number) => {
    setProgress(prev => {
      if (prev.completedPhases.includes(phaseId)) return prev

      const newCompleted = [...prev.completedPhases, phaseId]
      
      // Desbloquear proximo bloco se necessario
      const phase = PHASES.find(p => p.id === phaseId)
      const currentBlock = phase?.blockId || 1
      const blockPhases = PHASES.filter(p => p.blockId === currentBlock)
      const allBlockCompleted = blockPhases.every(p => newCompleted.includes(p.id))
      
      let newUnlocked = prev.unlockedBlocks
      if (allBlockCompleted && !prev.unlockedBlocks.includes(currentBlock + 1)) {
        newUnlocked = [...prev.unlockedBlocks, currentBlock + 1]
      }

      return {
        ...prev,
        completedPhases: newCompleted,
        unlockedBlocks: newUnlocked,
        currentPhase: phaseId + 1,
        currentMinigame: 0
      }
    })
  }, [])

  const setCurrentPhase = useCallback((phaseId: number) => {
    setProgress(prev => ({
      ...prev,
      currentPhase: phaseId,
      currentMinigame: 0
    }))
  }, [])

  const resetProgress = useCallback(() => {
    setProgress(initialProgress)
    localStorage.removeItem(STORAGE_KEY)
  }, [])

  const getPhaseMinigamesCompleted = useCallback((phaseId: number): number[] => {
    const phase = PHASES.find(p => p.id === phaseId)
    if (!phase) return []
    
    // Se a fase ja foi completada, todos os minigames foram completados
    if (progress.completedPhases.includes(phaseId)) {
      return phase.minigames.map((_, i) => i)
    }
    
    // Se e a fase atual, retorna os minigames completados ate o momento
    if (progress.currentPhase === phaseId) {
      return Array.from({ length: progress.currentMinigame }, (_, i) => i)
    }
    
    return []
  }, [progress])

  const addScore = useCallback((score: number) => {
    setProgress(prev => ({
      ...prev,
      totalScore: prev.totalScore + score
    }))
  }, [])

  const loseLife = useCallback(() => {
    setProgress(prev => ({
      ...prev,
      lives: Math.max(0, prev.lives - 1)
    }))
  }, [])

  const setInitialLives = useCallback((lives: number) => {
    setProgress(prev => ({
      ...prev,
      lives
    }))
  }, [])

  return {
    progress,
    isLoaded,
    // Propriedades diretas para acesso facil
    completedPhases: progress.completedPhases,
    totalScore: progress.totalScore,
    lives: progress.lives,
    currentPhase: progress.currentPhase,
    // Metodos
    completeMinigame,
    completePhase,
    setCurrentPhase,
    resetProgress,
    getPhaseMinigamesCompleted,
    addScore,
    loseLife,
    setInitialLives
  }
}
