'use client'

import { useGame } from '@/hooks/use-game'
import { IntroScreen } from '@/components/game/intro-screen'
import { LabMap } from '@/components/game/lab-map'
import { RoomView } from '@/components/game/room-view'
import { CaseNarrative } from '@/components/game/case-narrative'
import { QuestionScreen } from '@/components/game/question-screen'
import { FeedbackScreen } from '@/components/game/feedback-screen'
import { GameComplete } from '@/components/game/game-complete'
import { FlaskConical } from 'lucide-react'

function LoadingScreen() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative bg-grid">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/20 via-background to-background" />
      
      <div className="relative z-10 text-center">
        {/* Animated logo */}
        <div className="relative w-24 h-24 mx-auto mb-6">
          <div className="absolute inset-0 rounded-full bg-primary/20 animate-pulse" />
          <div className="absolute inset-0 flex items-center justify-center">
            <FlaskConical className="w-12 h-12 text-primary animate-float" />
          </div>
          {/* Orbiting dots */}
          <div className="absolute inset-0 animate-spin" style={{ animationDuration: '3s' }}>
            <div className="absolute w-2 h-2 bg-primary rounded-full top-0 left-1/2 -translate-x-1/2" />
          </div>
          <div className="absolute inset-0 animate-spin" style={{ animationDuration: '4s', animationDirection: 'reverse' }}>
            <div className="absolute w-1.5 h-1.5 bg-accent rounded-full bottom-0 left-1/2 -translate-x-1/2" />
          </div>
        </div>
        
        {/* Loading text */}
        <h2 className="text-xl font-bold mb-2 text-glow">Detetive Biologico</h2>
        <p className="text-muted-foreground animate-pulse">Carregando laboratorio...</p>
        
        {/* Progress bar */}
        <div className="w-48 h-1 bg-secondary rounded-full mx-auto mt-6 overflow-hidden">
          <div className="h-full bg-primary rounded-full animate-gradient" 
               style={{ 
                 width: '100%',
                 background: 'linear-gradient(90deg, transparent, var(--primary), transparent)',
                 backgroundSize: '200% 100%'
               }} 
          />
        </div>
      </div>
    </div>
  )
}

function TransitionOverlay({ isVisible }: { isVisible: boolean }) {
  if (!isVisible) return null
  
  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center transition-opacity duration-200">
      <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
    </div>
  )
}

export default function DetetiveBiologico() {
  const {
    progress,
    state,
    isLoaded,
    isTransitioning,
    startGame,
    selectRoom,
    startCase,
    proceedToQuestion,
    checkAnswer,
    nextQuestion,
    backToMap,
    backToRoom,
    resetGame,
    getRoomProgress
  } = useGame()

  if (!isLoaded) {
    return <LoadingScreen />
  }

  const renderPhase = () => {
    switch (state.phase) {
      case 'intro':
        return (
          <IntroScreen 
            onStart={startGame} 
            hasProgress={progress.answeredQuestions.length > 0} 
          />
        )
      
      case 'map':
        return (
          <LabMap 
            progress={progress}
            onSelectRoom={selectRoom}
            onReset={resetGame}
            getRoomProgress={getRoomProgress}
          />
        )
      
      case 'room':
        return (
          <RoomView 
            roomId={state.currentRoom!}
            progress={progress}
            onStartCase={startCase}
            onBack={backToMap}
          />
        )
      
      case 'case':
        return (
          <CaseNarrative 
            question={state.currentQuestion!}
            onProceed={proceedToQuestion}
          />
        )
      
      case 'question':
        return (
          <QuestionScreen 
            question={state.currentQuestion!}
            onSubmit={checkAnswer}
            onBack={backToRoom}
          />
        )
      
      case 'feedback':
        return (
          <FeedbackScreen 
            question={state.currentQuestion!}
            isCorrect={state.lastAnswer!.isCorrect}
            userAnswer={state.lastAnswer!.userAnswer}
            onNext={nextQuestion}
            score={progress.score}
          />
        )
      
      case 'complete':
        return (
          <GameComplete 
            progress={progress}
            onRestart={resetGame}
            onBackToMap={backToMap}
          />
        )
      
      default:
        return null
    }
  }

  return (
    <>
      <TransitionOverlay isVisible={isTransitioning} />
      <main className="min-h-screen">
        {renderPhase()}
      </main>
    </>
  )
}
