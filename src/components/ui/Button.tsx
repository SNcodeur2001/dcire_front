import type { ReactNode, ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  icon?: string;
  children: ReactNode;
}

export default function Button({ 
  variant = 'primary', 
  icon, 
  children, 
  className = '',
  ...props 
}: ButtonProps) {
  const baseClasses = 'flex items-center gap-2 px-6 py-3 rounded-sm font-medium text-base transition-all';
  
  const variantClasses = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
  };

  return (
    <button 
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {icon && (
        <img 
          src={icon} 
          alt="" 
          className="w-3 h-3"
        />
      )}
      {children}
    </button>
  );
}