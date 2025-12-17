import { useNavigate } from 'react-router-dom'

function Header() {
  const navigate = useNavigate()
  
  return (
    <header className="fixed h-[10%] w-full z-50 bg-white shadow-md">
      <div className="flex items-center justify-between px-14 py-5">
        <div className="flex items-center">
          <img 
            src="/logo.png" 
            alt="Sonatel" 
            className="h-11"
          />
        </div>
        
        <button 
          onClick={() => navigate('/login')}
          className="btn-primary text-base"
        >
          Se connecter
        </button>
      </div>
    </header>
  )
}

export default Header