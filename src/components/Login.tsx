import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import HomeIcon from '../assets/home-icon-login.svg?react'
import { useAuth } from '../context/AuthContext'

function Login() {
  const navigate = useNavigate()
  const { isAuthenticated, user, login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  // Rediriger si déjà connecté
  useEffect(() => {
    if (isAuthenticated && user) {
      if (user.role === 'director') {
        navigate('/directeur/tableau-de-bord', { replace: true })
      } else if (user.role === 'department') {
        navigate('/departement/tableau-de-bord', { replace: true })
      } else if (user.role === 'porteur') {
        navigate('/porteur/tableau-de-bord', { replace: true })
      } else if (user.role === 'assistant') {
        navigate('/dashboard', { replace: true })
      }
    }
  }, [isAuthenticated, user, navigate])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    try {
      const result = await login({ email, password })
      
      if (result.error) {
        setError(result.error)
        setIsLoading(false)
        return
      }

      // Le contexte s'est mis à jour automatiquement, donc le useEffect va déclencher la redirection
    } catch (err) {
      setError('Erreur lors de la connexion')
      console.error('Login error:', err)
      setIsLoading(false)
    }
  }

  return (
    <div 
      className="h-screen overflow-hidden flex items-center justify-center px-4"
      style={{ backgroundColor: '#f5f5f5' }}
    >
      {/* Home Button */}
      <Link
        to="/"
        className="fixed top-6 left-6 md:top-12 md:left-12 hover:scale-110 transition-transform z-10"
        aria-label="Retour à l'accueil"
      >
        <HomeIcon className="w-6 h-6 md:w-8 md:h-8" style={{ color: '#000000' }} />
      </Link>

      {/* Login Card */}
      <div 
        className="w-full max-w-[600px] px-8 py-8 md:px-12 md:py-12 lg:px-16 lg:py-14 bg-white overflow-y-auto max-h-[95vh]"
        style={{
          borderRadius: '20px',
          boxShadow: '1px 1px 4px 3px rgba(109, 109, 109, 0.25)'
        }}
      >
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img 
            src="/logo-sonatel.png" 
            alt="Sonatel" 
            className="h-9 md:h-11 object-contain"
          />
        </div>

        {/* Title */}
        <h1 
          className="text-center mb-1.5"
          style={{
            color: '#000000',
            fontSize: 'clamp(18px, 4vw, 24px)',
            fontWeight: '700',
            lineHeight: '1.2',
            fontFamily: 'Roboto, sans-serif'
          }}
        >
          Gestion Des Courriers
        </h1>

        {/* Subtitle */}
        <p 
          className="text-center mb-8 md:mb-10 lg:mb-12"
          style={{
            color: '#9f9f9f',
            fontSize: 'clamp(16px, 3.5vw, 24px)',
            fontWeight: '700',
            lineHeight: '1.2',
            fontFamily: 'Roboto, sans-serif'
          }}
        >
          DCIRE-SONATEL
        </p>

        {/* Login Form */}
        <form onSubmit={handleSubmit}>
          {/* Error Message */}
          {error && (
            <div
              className="mb-5 md:mb-6 p-4 rounded-lg"
              style={{
                backgroundColor: '#fee',
                borderLeft: '4px solid #ea580c'
              }}
            >
              <p
                style={{
                  color: '#c33',
                  fontSize: 'clamp(14px, 2.5vw, 16px)',
                  fontFamily: 'Roboto, sans-serif'
                }}
              >
                {error}
              </p>
            </div>
          )}

          {/* Email Field */}
          <fieldset
            className="mb-5 md:mb-6"
            style={{
              border: '1px solid #9d9d9d',
              borderRadius: '8px',
              padding: '0.75rem 1rem md:1rem md:1.5rem'
            }}
          >
            <legend
              style={{
                fontSize: 'clamp(16px, 3vw, 20px)',
                fontWeight: '500',
                color: '#939393',
                padding: '0 8px',
                fontFamily: 'Roboto, sans-serif',
                lineHeight: '1.2'
              }}
            >
              Email
            </legend>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                border: 'none',
                outline: 'none',
                width: '100%',
                fontSize: 'clamp(14px, 2.5vw, 16px)',
                padding: '0.5rem 0',
                fontFamily: 'Roboto, sans-serif'
              }}
            />
          </fieldset>

          {/* Password Field */}
          <fieldset
            className="mb-6 md:mb-8"
            style={{
              border: '1px solid #9d9d9d',
              borderRadius: '8px',
              padding: '0.75rem 1rem md:1rem md:1.5rem'
            }}
          >
            <legend
              style={{
                fontSize: 'clamp(16px, 3vw, 20px)',
                fontWeight: '500',
                color: '#939393',
                padding: '0 8px',
                fontFamily: 'Roboto, sans-serif',
                lineHeight: '1.2'
              }}
            >
              Mot De Passe
            </legend>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                border: 'none',
                outline: 'none',
                width: '100%',
                fontSize: 'clamp(14px, 2.5vw, 16px)',
                padding: '0.5rem 0',
                fontFamily: 'Roboto, sans-serif'
              }}
            />
          </fieldset>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 md:py-5 text-white transition-all duration-300 hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed"
            style={{
              backgroundColor: '#ea580c',
              borderRadius: '8px',
              fontSize: 'clamp(20px, 5vw, 32px)',
              fontWeight: '500',
              lineHeight: '1.2',
              fontFamily: 'Roboto, sans-serif'
            }}
          >
            {isLoading ? 'Connexion en cours...' : 'Se connecter'}
          </button>

          {/* Forgot Password Link */}
          <div className="text-center mt-5 md:mt-6">
            <Link
              to="/mot-de-passe-oublie"
              className="hover:underline"
              style={{
                color: '#ea580c',
                fontSize: 'clamp(12px, 2vw, 14px)',
                fontWeight: '400',
                fontFamily: 'Roboto, sans-serif'
              }}
            >
              Mot de passe oublié ?
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login