'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { 
  ArrowLeft, 
  Microscope, 
  Mail, 
  Lock, 
  User, 
  Eye, 
  EyeOff,
  Sparkles,
  AlertCircle
} from 'lucide-react'

type AuthMode = 'login' | 'register'

export default function AuthPage() {
  const router = useRouter()
  const [mode, setMode] = useState<AuthMode>('login')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    setError('')
  }

  const validateForm = (): boolean => {
    if (mode === 'register') {
      if (!formData.name.trim()) {
        setError('Por favor, digite seu nome')
        return false
      }
      if (formData.name.trim().length < 2) {
        setError('O nome deve ter pelo menos 2 caracteres')
        return false
      }
    }
    
    if (!formData.email.trim()) {
      setError('Por favor, digite seu email')
      return false
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setError('Por favor, digite um email valido')
      return false
    }
    
    if (!formData.password) {
      setError('Por favor, digite sua senha')
      return false
    }
    
    if (formData.password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres')
      return false
    }
    
    if (mode === 'register' && formData.password !== formData.confirmPassword) {
      setError('As senhas nao coincidem')
      return false
    }
    
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setIsLoading(true)
    setError('')
    
    try {
      // Simular autenticacao local (sem backend)
      // Em producao, isso seria uma chamada de API
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Salvar usuario no localStorage
      const userData = {
        id: Date.now().toString(),
        name: mode === 'register' ? formData.name : formData.email.split('@')[0],
        email: formData.email,
        createdAt: new Date().toISOString()
      }
      
      // Verificar se usuario ja existe (apenas para registro)
      const existingUsers = JSON.parse(localStorage.getItem('users') || '[]')
      
      if (mode === 'register') {
        const userExists = existingUsers.find((u: { email: string }) => u.email === formData.email)
        if (userExists) {
          setError('Este email ja esta cadastrado')
          setIsLoading(false)
          return
        }
        // Salvar novo usuario
        existingUsers.push({ ...userData, password: formData.password })
        localStorage.setItem('users', JSON.stringify(existingUsers))
      } else {
        // Login: verificar credenciais
        const user = existingUsers.find(
          (u: { email: string; password: string }) => 
            u.email === formData.email && u.password === formData.password
        )
        if (!user) {
          setError('Email ou senha incorretos')
          setIsLoading(false)
          return
        }
        userData.name = user.name
        userData.id = user.id
      }
      
      // Salvar sessao atual
      localStorage.setItem('currentUser', JSON.stringify(userData))
      
      // Redirecionar para criar jogo
      router.push('/criar')
      
    } catch {
      setError('Ocorreu um erro. Tente novamente.')
    } finally {
      setIsLoading(false)
    }
  }

  const toggleMode = () => {
    setMode(mode === 'login' ? 'register' : 'login')
    setError('')
    setFormData({ name: '', email: '', password: '', confirmPassword: '' })
  }

  return (
    <main className="min-h-screen bg-background relative overflow-hidden flex flex-col">
      {/* Background */}
      <div className="absolute inset-0 bg-cell-pattern" aria-hidden="true" />
      <div className="absolute inset-0 bg-grid-cell opacity-30" aria-hidden="true" />

      {/* Skip Link for Accessibility */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-lg"
      >
        Pular para o conteudo principal
      </a>

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-6 py-4 md:px-12">
        <Link 
          href="/" 
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-lg p-1"
          aria-label="Voltar para a pagina inicial"
        >
          <ArrowLeft className="w-5 h-5" aria-hidden="true" />
          <span className="hidden sm:inline">Voltar</span>
        </Link>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center" aria-hidden="true">
            <Microscope className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-bold text-xl text-foreground">CitoAprova</span>
        </div>
        <div className="w-20" aria-hidden="true" />
      </header>

      {/* Main Content */}
      <div id="main-content" className="relative z-10 flex-1 flex items-center justify-center px-6 py-8">
        <div className="w-full max-w-md">
          {/* Card */}
          <div className="bg-card/95 backdrop-blur-sm border-2 border-border rounded-3xl p-8 shadow-xl">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent mb-4" aria-hidden="true">
                <Sparkles className="w-8 h-8 text-primary-foreground" />
              </div>
              <h1 className="text-2xl md:text-3xl font-black text-foreground mb-2">
                {mode === 'login' ? 'Bem-vindo de volta!' : 'Criar sua conta'}
              </h1>
              <p className="text-muted-foreground">
                {mode === 'login' 
                  ? 'Entre para continuar sua jornada' 
                  : 'Cadastre-se para salvar seu progresso'}
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div 
                role="alert" 
                aria-live="polite"
                className="flex items-center gap-3 p-4 mb-6 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive"
              >
                <AlertCircle className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
                <p className="text-sm font-medium">{error}</p>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              {/* Name Field (only for register) */}
              {mode === 'register' && (
                <div>
                  <label 
                    htmlFor="name" 
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Nome completo
                  </label>
                  <div className="relative">
                    <User 
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" 
                      aria-hidden="true" 
                    />
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Seu nome"
                      autoComplete="name"
                      className="w-full pl-12 pr-4 py-3 rounded-xl bg-secondary border-2 border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-foreground placeholder:text-muted-foreground"
                      aria-describedby={error && !formData.name ? 'name-error' : undefined}
                    />
                  </div>
                </div>
              )}

              {/* Email Field */}
              <div>
                <label 
                  htmlFor="email" 
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Email
                </label>
                <div className="relative">
                  <Mail 
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" 
                    aria-hidden="true" 
                  />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="seu@email.com"
                    autoComplete="email"
                    className="w-full pl-12 pr-4 py-3 rounded-xl bg-secondary border-2 border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-foreground placeholder:text-muted-foreground"
                    aria-describedby={error && !formData.email ? 'email-error' : undefined}
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label 
                  htmlFor="password" 
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Senha
                </label>
                <div className="relative">
                  <Lock 
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" 
                    aria-hidden="true" 
                  />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Minimo 6 caracteres"
                    autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                    className="w-full pl-12 pr-12 py-3 rounded-xl bg-secondary border-2 border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-foreground placeholder:text-muted-foreground"
                    aria-describedby="password-hint"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
                    aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" aria-hidden="true" />
                    ) : (
                      <Eye className="w-5 h-5" aria-hidden="true" />
                    )}
                  </button>
                </div>
                <p id="password-hint" className="sr-only">
                  A senha deve ter pelo menos 6 caracteres
                </p>
              </div>

              {/* Confirm Password (only for register) */}
              {mode === 'register' && (
                <div>
                  <label 
                    htmlFor="confirmPassword" 
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Confirmar senha
                  </label>
                  <div className="relative">
                    <Lock 
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" 
                      aria-hidden="true" 
                    />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      placeholder="Digite a senha novamente"
                      autoComplete="new-password"
                      className="w-full pl-12 pr-4 py-3 rounded-xl bg-secondary border-2 border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-foreground placeholder:text-muted-foreground"
                    />
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 rounded-xl font-bold text-lg bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                aria-busy={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" aria-hidden="true" />
                    <span>Carregando...</span>
                  </span>
                ) : (
                  mode === 'login' ? 'Entrar' : 'Criar conta'
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-4 my-6">
              <div className="flex-1 h-px bg-border" aria-hidden="true" />
              <span className="text-sm text-muted-foreground">ou</span>
              <div className="flex-1 h-px bg-border" aria-hidden="true" />
            </div>

            {/* Toggle Mode */}
            <p className="text-center text-muted-foreground">
              {mode === 'login' ? 'Ainda nao tem uma conta?' : 'Ja tem uma conta?'}
              <button
                type="button"
                onClick={toggleMode}
                className="ml-2 font-semibold text-primary hover:text-primary/80 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:rounded"
              >
                {mode === 'login' ? 'Cadastre-se' : 'Entre aqui'}
              </button>
            </p>

            {/* Guest Option */}
            <div className="mt-6 pt-6 border-t border-border">
              <Link
                href="/criar"
                className="block w-full py-3 rounded-xl font-medium text-center border-2 border-border bg-card hover:border-primary hover:bg-secondary/50 transition-all text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                Continuar sem conta
              </Link>
              <p className="text-xs text-muted-foreground text-center mt-2">
                Seu progresso nao sera salvo na nuvem
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
