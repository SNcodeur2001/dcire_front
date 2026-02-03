// Point d'entrée unifié pour tous les services API
export { courriersService } from './courriers';
export { usersService } from './users';
export { statsService } from './stats';
export { notificationsService } from './notifications';
export { httpClient } from './httpClient';
export { authService } from './auth/AuthService';

// Ré-export des types pour commodité
export type {
  Courrier,
  User,
  Department,
  Stats,
  Notification,
  Response,
  Log,
  ApiResponse,
  CourrierFilters,
  UserFilters,
  NotificationFilters
} from '../types/api';

// Instance principale pour usage simplifié
import { courriersService } from './courriers';
import { usersService } from './users';
import { statsService } from './stats';
import { notificationsService } from './notifications';

export const api = {
  courriers: courriersService,
  users: usersService,
  stats: statsService,
  notifications: notificationsService,

  // Méthodes shortcuts fréquemment utilisées
  async getPendingCourriers() {
    return courriersService.getPending();
  },

  async getCourriersByDepartment(deptId: string) {
    return courriersService.getByDepartment(deptId);
  },

  async getCourriersByPorteur(porteurId: string) {
    return courriersService.getByPorteur(porteurId);
  },

  async getUserStats(userId: string) {
    return statsService.getByUser(userId);
  },

  async getUserNotifications(userId: string, unreadOnly = false) {
    return notificationsService.getByUser(userId, unreadOnly);
  },

  // Endpoint unifié pour le tableau de bord directeur
  async getDirectorDashboardData() {
    try {
      const [userResult, statsResult, courriersResult, allCourriersResult] = await Promise.all([
        usersService.getById("1"),
        statsService.getByUser("1"),
        courriersService.getPending(),
        courriersService.getAll()
      ]);

      if (userResult.error || statsResult.error || courriersResult.error || allCourriersResult.error) {
        return {
          data: null,
          error: userResult.error || statsResult.error || courriersResult.error || allCourriersResult.error
        };
      }

      // Calcul du nombre journalier
      const today = new Date().toISOString().split('T')[0];
      const dailyCount = (allCourriersResult.data || []).filter(c => c.receptionDate === today).length;

      // Stats mensuelles
      const monthlyStats = statsResult.data?.find((s: any) => s.period === 'monthly');

      return {
        data: {
          user: userResult.data,
          stats: monthlyStats,
          pendingCourriers: courriersResult.data || [],
          dailyCount
        }
      };
    } catch (error) {
      return { data: null, error: 'Erreur lors du chargement des données du tableau de bord' };
    }
  }
};