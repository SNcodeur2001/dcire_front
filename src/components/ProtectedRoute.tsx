import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import type { User } from '../types/api';

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRoles?: User['role'][];
}

export function ProtectedRoute({ children, requiredRoles }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading, user } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Chargement...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Vérifier si l'utilisateur a le rôle requis
  if (requiredRoles && user) {
    if (!requiredRoles.includes(user.role)) {
      // Rediriger vers le dashboard approprié pour le rôle
      if (user.role === 'director') {
        return <Navigate to="/directeur/tableau-de-bord" replace />;
      } else if (user.role === 'department') {
        return <Navigate to="/departement/tableau-de-bord" replace />;
      } else if (user.role === 'porteur') {
        return <Navigate to="/porteur/tableau-de-bord" replace />;
      } else if (user.role === 'assistant') {
        return <Navigate to="/dashboard" replace />;
      }
      return <Navigate to="/login" replace />;
    }
  }

  return children;
}

