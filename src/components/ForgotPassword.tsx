import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import HomeIcon from '../assets/home-icon-login.svg?react'

type Step = 'email' | 'code' | 'password' | 'success'

function ForgotPassword() {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState<Step>('email')
  const [email, setEmail] = useState('')
  const [code, setCode] = useState(['', '', '', '', '', ''])
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    console.log('Sending code to:', email)
    setCurrentStep('code')
  }

  const handleCodeChange = (index: number, value: string) => {
    if (value.length > 1) return
    
    const newCode = [...code]
    newCode[index] = value
    setCode(newCode)
    
    if (value && index < 5) {
      const nextInput = document.getElementById(`code-${index + 1}`)
      nextInput?.focus()
    }
  }

  const handleCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const fullCode = code.join('')
    if (fullCode.length !== 6) {
      setError('Veuillez entrer le code complet')
      return
    }
    setError('')
    console.log('Validating code:', fullCode)
    setCurrentStep('password')
  }

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    if (newPassword.length < 8) {
      setError('Le mot de passe doit contenir au moins 8 caractères')
      return
    }
    
    if (newPassword !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas')
      return
    }
    
    console.log('Password reset successful')
    setCurrentStep('success')
    
    setTimeout(() => {
      navigate('/login')
    }, 2000)
  }

  return (
    <div 
      className="h-screen overflow-hidden flex items-center justify-center px-4"
      style={{ backgroundColor: '#f5f5f5' }}
    >
      <Link
        to="/"
        className="fixed top-6 left-6 md:top-12 md:left-12 hover:scale-110 transition-transform z-10"
        aria-label="Retour à l'accueil"
      >
        <HomeIcon className="w-6 h-6 md:w-8 md:h-8" style={{ color: '#000000' }} />
      </Link>

      <div 
        className="w-full max-w-[600px] px-8 py-8 md:px-12 md:py-12 lg:px-16 lg:py-14 bg-white overflow-y-auto max-h-[95vh]"
        style={{
          borderRadius: '20px',
          boxShadow: '1px 1px 4px 3px rgba(109, 109, 109, 0.25)'
        }}
      >
        <div className="flex justify-center mb-6">
          <img 
            src="/logo-sonatel.png" 
            alt="Sonatel" 
            className="h-9 md:h-11 object-contain"
          />
        </div>

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
          Réinitialisation du mot de passe
        </h1>

        <p 
          className="text-center mb-8 md:mb-10"
          style={{
            color: '#9f9f9f',
            fontSize: 'clamp(14px, 3vw, 16px)',
            fontWeight: '400',
            lineHeight: '1.4',
            fontFamily: 'Roboto, sans-serif'
          }}
        >
          {currentStep === 'email' && 'Entrez votre email pour recevoir un code'}
          {currentStep === 'code' && 'Entrez le code de validation reçu par email'}
          {currentStep === 'password' && 'Créez votre nouveau mot de passe'}
          {currentStep === 'success' && 'Mot de passe réinitialisé avec succès !'}
        </p>

        {error && (
          <div 
            className="mb-4 p-3 rounded-sm text-center text-sm"
            style={{
              backgroundColor: '#fee2e2',
              color: '#dc2626',
              fontFamily: 'Roboto, sans-serif'
            }}
          >
            {error}
          </div>
        )}

        {currentStep === 'email' && (
          <form onSubmit={handleEmailSubmit}>
            <fieldset
              className="mb-6"
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

            <button
              type="submit"
              className="w-full py-4 md:py-5 text-white transition-all duration-300 hover:scale-[1.02]"
              style={{
                backgroundColor: '#ea580c',
                borderRadius: '8px',
                fontSize: 'clamp(20px, 5vw, 28px)',
                fontWeight: '500',
                lineHeight: '1.2',
                fontFamily: 'Roboto, sans-serif'
              }}
            >
              Envoyer le code
            </button>
          </form>
        )}

        {currentStep === 'code' && (
          <form onSubmit={handleCodeSubmit}>
            <div className="mb-6">
              <label 
                className="block text-center mb-4"
                style={{
                  fontSize: 'clamp(14px, 2.5vw, 16px)',
                  fontWeight: '500',
                  color: '#939393',
                  fontFamily: 'Roboto, sans-serif'
                }}
              >
                Code de validation
              </label>
              <div className="flex justify-center gap-2 md:gap-3">
                {code.map((digit, index) => (
                  <input
                    key={index}
                    id={`code-${index}`}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleCodeChange(index, e.target.value)}
                    className="w-10 h-12 md:w-12 md:h-14 text-center text-xl md:text-2xl font-semibold"
                    style={{
                      border: '2px solid #9d9d9d',
                      borderRadius: '8px',
                      outline: 'none',
                      fontFamily: 'Roboto, sans-serif',
                      color: '#000000'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#ea580c'}
                    onBlur={(e) => e.target.style.borderColor = '#9d9d9d'}
                    required
                  />
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 md:py-5 text-white transition-all duration-300 hover:scale-[1.02]"
              style={{
                backgroundColor: '#ea580c',
                borderRadius: '8px',
                fontSize: 'clamp(20px, 5vw, 28px)',
                fontWeight: '500',
                lineHeight: '1.2',
                fontFamily: 'Roboto, sans-serif'
              }}
            >
              Valider le code
            </button>

            <div className="text-center mt-5">
              <button
                type="button"
                onClick={() => setCurrentStep('email')}
                className="hover:underline"
                style={{
                  color: '#ea580c',
                  fontSize: 'clamp(12px, 2vw, 14px)',
                  fontWeight: '400',
                  fontFamily: 'Roboto, sans-serif'
                }}
              >
                Renvoyer le code
              </button>
            </div>
          </form>
        )}

        {currentStep === 'password' && (
          <form onSubmit={handlePasswordSubmit}>
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
                Nouveau mot de passe
              </legend>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                minLength={8}
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

            <fieldset
              className="mb-6"
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
                Confirmer le mot de passe
              </legend>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={8}
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

            <button
              type="submit"
              className="w-full py-4 md:py-5 text-white transition-all duration-300 hover:scale-[1.02]"
              style={{
                backgroundColor: '#ea580c',
                borderRadius: '8px',
                fontSize: 'clamp(20px, 5vw, 28px)',
                fontWeight: '500',
                lineHeight: '1.2',
                fontFamily: 'Roboto, sans-serif'
              }}
            >
              Réinitialiser
            </button>
          </form>
        )}

        {currentStep === 'success' && (
          <div className="text-center py-8">
            <div 
              className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-4 rounded-full flex items-center justify-center"
              style={{ backgroundColor: '#d1fae5' }}
            >
              <svg 
                className="w-8 h-8 md:w-10 md:h-10" 
                fill="none" 
                stroke="#10b981" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={3} 
                  d="M5 13l4 4L19 7" 
                />
              </svg>
            </div>
            <p
              className="mb-4"
              style={{
                color: '#10b981',
                fontSize: 'clamp(16px, 3vw, 20px)',
                fontWeight: '600',
                fontFamily: 'Roboto, sans-serif'
              }}
            >
              Mot de passe réinitialisé avec succès !
            </p>
            <p
              style={{
                color: '#6b7280',
                fontSize: 'clamp(14px, 2.5vw, 16px)',
                fontWeight: '400',
                fontFamily: 'Roboto, sans-serif'
              }}
            >
              Redirection vers la page de connexion...
            </p>
          </div>
        )}

        {currentStep !== 'success' && (
          <div className="text-center mt-5 md:mt-6">
            <Link
              to="/login"
              className="hover:underline"
              style={{
                color: '#6b7280',
                fontSize: 'clamp(12px, 2vw, 14px)',
                fontWeight: '400',
                fontFamily: 'Roboto, sans-serif'
              }}
            >
              Retour à la connexion
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default ForgotPassword