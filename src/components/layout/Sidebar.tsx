import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

interface NavItem {
  to: string;
  icon: string;
  label: string;
  isActive?: boolean;
}

const navItems: NavItem[] = [
  { to: '/dashboard', icon: '/icons/dashboard.svg', label: 'Tableau de bord', isActive: true },
  { to: '/nouveau-courrier', icon: '/icons/add-circle.svg', label: 'Nouveau courrier' },
  { to: '/tous-courriers', icon: '/icons/mail.svg', label: 'Tous les courriers' },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  return (
    <aside 
      className="w-48 md:w-56 lg:w-64 bg-white flex flex-col justify-between h-full overflow-y-auto"
    >
      {/* Navigation */}
      <nav className="p-2 md:p-3 lg:p-4">
        <ul className="space-y-1 md:space-y-2">
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center gap-2 md:gap-3 px-3 md:px-4 lg:px-5 py-2.5 md:py-3 lg:py-3.5 rounded-sm transition-all text-sm md:text-base ${
                    isActive
                      ? 'bg-(--color-bg-orange)'
                      : 'hover:bg-(--color-gray-50)'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <img 
                      src={item.icon} 
                      alt="" 
                      className="w-4 h-4"
                      style={{
                        filter: isActive
                          ? 'invert(43%) sepia(95%) saturate(2476%) hue-rotate(359deg) brightness(99%) contrast(98%)'
                          : 'invert(29%) sepia(8%) saturate(735%) hue-rotate(181deg) brightness(95%) contrast(86%)',
                      }}
                    />
                    <span 
                      className="text-base font-normal"
                      style={{
                        color: isActive ? 'var(--color-primary)' : 'var(--color-gray-700)',
                      }}
                    >
                      {item.label}
                    </span>
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Logout Button */}
      <div className="p-2 md:p-3 lg:p-4">
        <button
          onClick={() => {
            logout();
            navigate('/login', { replace: true });
          }}
          className="flex items-center gap-2 md:gap-3 w-full px-3 md:px-4 lg:px-5 py-2.5 md:py-3 lg:py-3.5 rounded-sm hover:bg-(--color-gray-50) transition-all text-sm md:text-base"
        >
          <img 
            src="/icons/logout.svg" 
            alt="" 
            className="w-4 h-4"
            style={{ filter: 'invert(29%) sepia(8%) saturate(735%) hue-rotate(181deg) brightness(95%) contrast(86%)' }}
          />
          <span 
            className="text-base font-normal"
            style={{ color: 'var(--color-gray-700)' }}
          >
            Déconnexion
          </span>
        </button>
      </div>
    </aside>
  );
}