import { useState } from 'react'
import { Link } from 'react-router-dom'
import BackArrowIcon from '../assets/back-arrow.svg?react'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle login logic here
    console.log('Login attempt:', { email, password })
  }

  return (
    <div 
      className="min-h-screen flex items-center justify-center px-4"
      style={{ backgroundColor: 'var(--color-bg-light)' }}
    >
      {/* Back Button */}
      <Link
        to="/"
        className="fixed top-12 left-12 flex items-center gap-2 hover:scale-110 transition-transform"
      >
        <BackArrowIcon className="w-6 h-6" style={{ color: 'var(--color-black)' }} />
        <span style={{ color: 'var(--color-black)', fontSize: 'var(--font-size-md)' }}>Retour</span>
      </Link>

      {/* Login Card */}
      <div 
        className="w-full max-w-[686px] px-16 py-20 bg-white"
        style={{
          borderRadius: 'var(--radius-md)',
          boxShadow: '1px 1px 4px 3px rgba(109, 109, 109, 0.25)'
        }}
      >
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <img 
            src="/sonatel-logo.png" 
            alt="Sonatel" 
            className="h-11 object-contain"
          />
        </div>

        {/* Title */}
        <h1 
          className="text-center mb-4"
          style={{
            color: 'var(--color-black)',
            fontSize: 'var(--font-size-xl)',
            fontWeight: 'var(--font-weight-bold)',
            lineHeight: 'var(--line-height-md)'
          }}
        >
          Gestion Des Courriers
        </h1>

        {/* Subtitle */}
        <p 
          className="text-center mb-16"
          style={{
            color: 'var(--color-gray-medium)',
            fontSize: 'var(--font-size-xl)',
            fontWeight: 'var(--font-weight-bold)',
            lineHeight: 'var(--line-height-md)'
          }}
        >
          DCIRE-SONATEL
        </p>

        {/* Login Form */}
        <form onSubmit={handleSubmit}>
          {/* Email Field */}
          <fieldset
            className="mb-8"
            style={{
              border: '1px solid var(--color-gray-border)',
              borderRadius: 'var(--radius-sm)',
              padding: '0.5rem 1rem'
            }}
          >
            <legend
              style={{
                fontSize: 'var(--font-size-sm)',
                color: 'var(--color-gray-medium)',
                padding: '0 8px'
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
              placeholder="Votre email"
              style={{
                border: 'none',
                outline: 'none',
                width: '100%',
                fontSize: 'var(--font-size-xs)',
                padding: '0.5rem 0'
              }}
            />
          </fieldset>

          {/* Password Field */}
          <fieldset
            className="mb-10"
            style={{
              border: '1px solid var(--color-gray-border)',
              borderRadius: 'var(--radius-sm)',
              padding: '0.5rem 1rem'
            }}
          >
            <legend
              style={{
                fontSize: 'var(--font-size-sm)',
                color: 'var(--color-gray-medium)',
                padding: '0 8px'
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
              placeholder="Votre mot de passe"
              style={{
                border: 'none',
                outline: 'none',
                width: '100%',
                fontSize: 'var(--font-size-xs)',
                padding: '0.5rem 0'
              }}
            />
          </fieldset>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-5 text-white transition-all duration-300 hover:scale-[1.02]"
            style={{
              backgroundColor: 'var(--color-orange-primary)',
              borderRadius: 'var(--radius-sm)',
              fontSize: 'var(--font-size-3xl)',
              fontWeight: 'var(--font-weight-medium)',
              lineHeight: 'var(--line-height-md)'
            }}
          >
            Se connecter
          </button>

          {/* Forgot Password Link */}
          <div className="text-center mt-8">
            <a 
              href="#"
              className="hover:underline"
              style={{
                color: 'var(--color-orange-primary)',
                fontSize: 'var(--font-size-sm)',
                fontWeight: 'var(--font-weight-normal)'
              }}
            >
              Mot de passe oublié ?
            </a>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login