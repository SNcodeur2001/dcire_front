import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import HomeIcon from '../assets/home-icon-login.svg?react'

function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle login logic here
    console.log('Login attempt:', { email, password })
    // Redirect to dashboard after successful login
    navigate('/dashboard')
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
            className="w-full py-4 md:py-5 text-white transition-all duration-300 hover:scale-[1.02]"
            style={{
              backgroundColor: '#ea580c',
              borderRadius: '8px',
              fontSize: 'clamp(20px, 5vw, 32px)',
              fontWeight: '500',
              lineHeight: '1.2',
              fontFamily: 'Roboto, sans-serif'
            }}
          >
            Se connecter
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