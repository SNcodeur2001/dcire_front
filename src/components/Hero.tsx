import { useNavigate } from 'react-router-dom'
import LoginIcon from '../assets/login-icon.svg?react'

function Hero() {
  const navigate = useNavigate()
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-[110%] object-cover"
      >
        <source src="/WhatsApp Video 2025-12-17 at 4.41.52 PM.mp4" type="video/mp4" />
      </video>
      
      {/* Gradient Overlay */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, rgba(0,0,0,0) 9.53%, rgba(0,0,0,1) 82.62%)'
        }}
      />
      
      {/* Content Card with Glass Effect and Shadow */}
      <div 
        className="relative max-w-6xl mx-auto px-8 py-24 rounded-(--radius-lg)"
        style={{ 
          backgroundColor: 'var(--color-overlay-dark)',
          boxShadow: '0 0 0 1px rgba(255, 255, 255, 0.2), 0 8px 32px 0 rgba(0, 0, 0, 0.6), 0 4px 16px 0 rgba(0, 0, 0, 0.4)'
        }}
      >
        <h1 
          className="text-white text-center mb-12 leading-tight"
          style={{ 
            fontSize: 'var(--font-size-2xl)', 
            fontWeight: 'var(--font-weight-semibold)',
            lineHeight: 'var(--line-height-none)'
          }}
        >
          Plateforme de Gestion des Courriers
        </h1>
        
        <p 
          className="text-white text-center mb-16 max-w-5xl mx-auto"
          style={{ 
            fontSize: 'var(--font-size-lg)', 
            fontWeight: 'var(--font-weight-normal)',
            lineHeight: 'var(--line-height-tight)'
          }}
        >
          Outil interne de la Direction de la Communication Institutionnelle et des Relations Extérieures pour la gestion digitale des courriers entrants.
        </p>
        
        <div className="flex justify-center">
          <button 
            onClick={() => navigate('/login')}
            className="btn-primary flex items-center gap-3"
          >
            <LoginIcon className="w-6 h-6" style={{ color: 'white' }} />
            <span>Accéder à l'application</span>
          </button>
        </div>
      </div>
    </section>
  )
}

export default Hero