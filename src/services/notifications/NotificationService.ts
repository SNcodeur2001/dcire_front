import type { Notification, ApiResponse } from '../../types/api';
import { BaseService } from '../base/BaseService';
import { NotificationRepository } from '../../repositories/notifications/NotificationRepository';

export class NotificationService extends BaseService<Notification> {
  protected repository = new NotificationRepository();
  protected endpoint = '/notifications';

  async getNotifications(userId: string, unreadOnly = false): Promise<ApiResponse<Notification[]>> {
    const filters: Record<string, any> = { userId };
    if (unreadOnly) filters.isRead = false;
    return this.getAll(filters);
  }

  async markAsRead(id: string): Promise<ApiResponse<Notification>> {
    return this.update(id, { isRead: true });
  }

  async getUnread(userId: string): Promise<ApiResponse<Notification[]>> {
    return this.getNotifications(userId, true);
  }

  async getByType(userId: string, type: Notification['type']): Promise<ApiResponse<Notification[]>> {
    return this.getAll({ userId, type });
  }

  async getByPriority(userId: string, priority: Notification['priority']): Promise<ApiResponse<Notification[]>> {
    return this.getAll({ userId, priority });
  }

  // Méthode pour compatibilité
  async getByUser(userId: string, unreadOnly = false): Promise<ApiResponse<Notification[]>> {
    return this.getNotifications(userId, unreadOnly);
  }

  // Méthodes supplémentaires pour compatibilité
  async markAllAsRead(userId: string): Promise<ApiResponse<Notification[]>> {
    // Récupérer toutes les notifications non lues
    const result = await this.getUnread(userId);
    if (result.data) {
      // Marquer chacune comme lue
      const updatePromises = result.data.map(notification =>
        this.markAsRead(notification.id)
      );
      await Promise.all(updatePromises);
    }
    return result;
  }

  async getUnreadCount(userId: string): Promise<number> {
    const result = await this.getUnread(userId);
    return result.data?.length || 0;
  }

  async getRecent(userId: string, limit = 10): Promise<ApiResponse<Notification[]>> {
    const result = await this.getNotifications(userId);
    if (result.data) {
      const sorted = result.data
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, limit);
      return { data: sorted };
    }
    return result;
  }
}

// Instance singleton pour compatibilité
export const notificationService = new NotificationService();