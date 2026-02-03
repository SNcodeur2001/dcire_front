import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface PublicRouteProps {
  children: ReactNode;
}

export function PublicRoute({ children }: PublicRouteProps) {
  const { isAuthenticated, isLoading, user } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Chargement...</p>
      </div>
    );
  }

  // Si connecté, rediriger vers le dashboard approprié
  if (isAuthenticated && user) {
    if (user.role === 'director') {
      return <Navigate to="/directeur/tableau-de-bord" replace />;
    } else if (user.role === 'department') {
      return <Navigate to="/departement/tableau-de-bord" replace />;
    } else if (user.role === 'porteur') {
      return <Navigate to="/porteur/tableau-de-bord" replace />;
    } else if (user.role === 'assistant') {
      return <Navigate to="/dashboard" replace />;
    }
  }

  return children;
}
