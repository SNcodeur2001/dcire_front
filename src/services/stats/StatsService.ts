import type { Stats, ApiResponse } from '../../types/api';
import { BaseService } from '../base/BaseService';
import { StatsRepository } from '../../repositories/stats/StatsRepository';

export class StatsService extends BaseService<Stats> {
  protected repository = new StatsRepository();
  protected endpoint = '/stats';

  async getStats(userId: string, period: 'monthly' | 'daily' = 'monthly'): Promise<ApiResponse<Stats[]>> {
    return this.getAll({ userId, period });
  }

  async getAllStats(): Promise<ApiResponse<Stats[]>> {
    return this.getAll();
  }

  async getByPeriod(period: 'monthly' | 'daily'): Promise<ApiResponse<Stats[]>> {
    return this.getAll({ period });
  }

  async getByUser(userId: string): Promise<ApiResponse<Stats[]>> {
    // Pour le directeur, calculer les stats dynamiquement depuis les courriers
    if (userId === "1") {
      try {
        // Importer courriersService pour calculer les métriques
        const { courriersService } = await import('../courriers');
        const courriersResult = await courriersService.getAll();

        if (courriersResult.error || !courriersResult.data) {
          return { data: null, error: courriersResult.error || 'Erreur lors du calcul des stats' };
        }

        const courriers = courriersResult.data;
        const totalReceived = courriers.length;
        const totalAssigned = courriers.filter(c => c.workflowStatus === 'assigned' || c.workflowStatus === 'in_progress').length;
        const totalPending = courriers.filter(c => c.workflowStatus === 'pending').length;
        const totalSettled = courriers.filter(c => c.workflowStatus === 'settled').length;
        const totalOverdue = courriers.filter(c => c.workflowStatus !== 'settled' && new Date(c.deadline) < new Date()).length;
        const averageProcessingTime = courriers.length > 0
          ? Math.round(courriers.reduce((sum, c) => sum + c.duration, 0) / courriers.length * 10) / 10
          : 0;

        const stats: Stats = {
          id: "1",
          userId: "1",
          role: "director",
          period: "monthly",
          date: new Date().toISOString().slice(0, 7), // YYYY-MM
          metrics: {
            totalReceived,
            totalAssigned,
            totalPending,
            totalSettled,
            totalOverdue,
            averageProcessingTime
          },
          lastUpdated: new Date().toISOString()
        };

        return { data: [stats] };
      } catch (error) {
        return { data: null, error: 'Erreur lors du calcul des statistiques' };
      }
    }

    // Pour les autres utilisateurs, retourner les stats stockées
    return this.getAll({ userId });
  }

  async getByRole(role: string, period: 'monthly' | 'daily' = 'monthly'): Promise<ApiResponse<Stats[]>> {
    return this.getAll({ role, period });
  }

  // Méthodes métier pour compatibilité
  async getDirectorStats(directorId: string): Promise<ApiResponse<Stats[]>> {
    return this.getByUser(directorId);
  }

  async getDepartmentStats(deptHeadId: string): Promise<ApiResponse<Stats[]>> {
    return this.getByUser(deptHeadId);
  }

  async getPorteurStats(porteurId: string): Promise<ApiResponse<Stats[]>> {
    return this.getByUser(porteurId);
  }

  async getAssistantStats(assistantId: string): Promise<ApiResponse<Stats[]>> {
    return this.getByUser(assistantId);
  }

  // Calculs de métriques (côté client pour JSON Server)
  async calculateUserStats(_userId: string, role: string): Promise<Stats['metrics']> {
    // En production, ces calculs seraient faits côté serveur
    // Ici on simule avec des valeurs d'exemple
    const baseMetrics: Record<string, Stats['metrics']> = {
      director: {
        totalReceived: 45,
        totalAssigned: 42,
        totalPending: 3,
        totalSettled: 38,
        totalOverdue: 2,
        averageProcessingTime: 8.5
      },
      department: {
        totalReceived: 12,
        totalInProgress: 3,
        totalSettled: 8,
        totalPending: 1,
        averageProcessingTime: 6.2
      },
      porteur: {
        totalAssigned: 8,
        totalInProgress: 2,
        totalSettled: 6,
        averageProcessingTime: 4.8
      },
      assistant: {
        totalCreated: 47,
        totalPriority: 12,
        totalNormal: 35
      }
    };

    return baseMetrics[role] || {};
  }
}

// Instance singleton pour compatibilité
export const statsService = new StatsService();