// Point d'entrée unifié pour tous les services API
export { courriersService } from './courriers';
export { usersService } from './users';
export { statsService } from './stats';
export { notificationsService } from './notifications';
export { httpClient } from './httpClient';

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
  }
};