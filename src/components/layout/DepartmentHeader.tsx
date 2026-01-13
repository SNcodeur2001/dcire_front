import type { User } from '../../types';

interface DepartmentHeaderProps {
  user: User;
}

export default function DepartmentHeader({ user }: DepartmentHeaderProps) {
  return (
    <header 
      className="bg-white px-3 md:px-4 lg:px-6 py-2 md:py-3 flex items-center justify-between shrink-0"
      style={{ boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)' }}
    >
      {/* Logo and Title */}
      <div className="flex items-center gap-3 md:gap-4 lg:gap-6">
        <img 
          src="/logo-sonatel.png" 
          alt="Sonatel Logo" 
          className="h-8 md:h-9 lg:h-11"
        />
        <div className="hidden sm:block">
          <h1 className="text-[10px] md:text-xs font-normal text-black font-display ml-10">
           <strong>Gestion des Courriers DCIRE</strong> 
          </h1>
          <p className="text-xs font-normal text-black font-display ml-10">
            Espace Departement 
          </p>
        </div>
      </div>

      {/* Right Section - Notifications and User */}
      <div className="flex items-center gap-2 md:gap-3 lg:gap-4">
        {/* Notification Bell */}
        <button 
          className="relative p-1.5 md:p-2 rounded-sm hover:bg-(--color-gray-50) transition-colors"
          aria-label="Notifications"
        >
          <img 
            src="/icons/bell.svg" 
            alt="" 
            className="w-3 h-4 md:w-4 md:h-5"
            style={{ filter: 'invert(29%) sepia(8%) saturate(735%) hue-rotate(181deg) brightness(95%) contrast(86%)' }}
          />
          <span 
            className="absolute top-0.5 right-0.5 md:top-1 md:right-1 w-1.5 h-1.5 md:w-2 md:h-2 rounded-full"
            style={{ backgroundColor: 'var(--color-primary)' }}
          />
        </button>

        {/* User Info */}
        <div className="flex items-center gap-2 md:gap-3">
          <div className="text-right hidden md:block">
            <p 
              className="text-xs md:text-sm font-medium"
              style={{ color: 'var(--color-gray-900)' }}
            >
              {user.name}
            </p>
            <p 
              className="text-[10px] md:text-xs font-normal"
              style={{ color: 'var(--color-gray-500)' }}
            >
              {user.role}
            </p>
          </div>
          <img 
            src={user.avatar} 
            alt={user.name}
            className="w-8 h-8 md:w-12 md:h-12 lg:w-15 lg:h-15 rounded-full object-cover"
          />
        </div>
      </div>
    </header>
  );
}