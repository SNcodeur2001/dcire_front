import type { User, ApiResponse } from '../../types/api';
import { httpClient } from '../httpClient';

export interface AuthResponse {
  user: User;
  token: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export class AuthService {
  private readonly endpoint = '/users';
  private readonly tokenKey = 'authToken';
  private readonly userKey = 'currentUser';

  async login(credentials: LoginCredentials): Promise<ApiResponse<AuthResponse>> {
    try {
      // Récupérer tous les utilisateurs
      const response = await httpClient.get<User[]>(this.endpoint);
      
      if (!response) {
        return {
          data: null,
          error: 'Erreur lors de la connexion au serveur'
        };
      }

      // Chercher l'utilisateur avec l'email et le mot de passe
      const user = response.data?.find(
        (u: User & { password?: string }) => 
          u.email === credentials.email && 
          u.password === credentials.password &&
          u.isActive
      );

      if (!user) {
        return {
          data: null,
          error: 'Email ou mot de passe incorrect'
        };
      }

      // Générer un token simple (en production, utiliser JWT)
      const token = btoa(`${user.id}:${Date.now()}`);
      
      // Sauvegarder le token et l'utilisateur
      this.setToken(token);
      this.setCurrentUser(user);

      return {
        data: {
          user,
          token
        }
      };
    } catch (error) {
      return {
        data: null,
        error: 'Erreur lors de la connexion'
      };
    }
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
  }

  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  setCurrentUser(user: User): void {
    localStorage.setItem(this.userKey, JSON.stringify(user));
  }

  getCurrentUser(): User | null {
    const userStr = localStorage.getItem(this.userKey);
    if (!userStr) return null;
    try {
      return JSON.parse(userStr) as User;
    } catch {
      return null;
    }
  }

  isAuthenticated(): boolean {
    return this.getToken() !== null && this.getCurrentUser() !== null;
  }

  getUserRole(): User['role'] | null {
    const user = this.getCurrentUser();
    return user?.role || null;
  }
}

export const authService = new AuthService();
