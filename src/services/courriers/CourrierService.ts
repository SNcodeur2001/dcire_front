import type { Courrier, ApiResponse, CourrierFilters } from '../../types/api';
import { BaseService } from '../base/BaseService';
import { CourrierRepository } from '../../repositories/courriers/CourrierRepository';

export class CourrierService extends BaseService<Courrier> {
  protected repository = new CourrierRepository();
  protected endpoint = '/courriers';

  // ============ Méthodes métier ============

  // Pour l'assistante
  async getCreatedByUser(userId: string): Promise<ApiResponse<Courrier[]>> {
    return this.getAll({ createdBy: userId });
  }

  // Pour le directeur
  async getPending(): Promise<ApiResponse<Courrier[]>> {
    return this.getAll({ workflowStatus: 'pending' });
  }

  async getAssigned(): Promise<ApiResponse<Courrier[]>> {
    return this.getAll({ workflowStatus: 'assigned' });
  }

  async getSettled(): Promise<ApiResponse<Courrier[]>> {
    return this.getAll({ workflowStatus: 'settled' });
  }

  async assignToDepartment(
    courrierId: string,
    departmentId: string,
    _directorId: string
  ): Promise<ApiResponse<Courrier>> {
    const updates: Partial<Courrier> = {
      workflowStatus: 'assigned',
      assignedDepartmentId: departmentId,
      updatedAt: new Date().toISOString(),
    };
    return this.update(courrierId, updates);
  }

  // Pour le département
  async getByDepartment(departmentId: string): Promise<ApiResponse<Courrier[]>> {
    return this.getAll({ assignedDepartmentId: departmentId });
  }

  async getDepartmentPending(departmentId: string): Promise<ApiResponse<Courrier[]>> {
    return this.getAll({
      assignedDepartmentId: departmentId,
      workflowStatus: 'assigned'
    });
  }

  async getDepartmentInProgress(departmentId: string): Promise<ApiResponse<Courrier[]>> {
    return this.getAll({
      assignedDepartmentId: departmentId,
      workflowStatus: 'in_progress'
    });
  }

  async assignToPorteur(
    courrierId: string,
    porteurId: string,
    _departmentId: string
  ): Promise<ApiResponse<Courrier>> {
    const updates: Partial<Courrier> = {
      assignedPorteurId: porteurId,
      workflowStatus: 'in_progress',
      updatedAt: new Date().toISOString(),
    };
    return this.update(courrierId, updates);
  }

  // Pour le porteur
  async getByPorteur(porteurId: string): Promise<ApiResponse<Courrier[]>> {
    return this.getAll({ assignedPorteurId: porteurId });
  }

  async getPorteurToSettle(porteurId: string): Promise<ApiResponse<Courrier[]>> {
    return this.getAll({
      assignedPorteurId: porteurId,
      workflowStatus: 'in_progress'
    });
  }

  async getPorteurSettled(porteurId: string): Promise<ApiResponse<Courrier[]>> {
    return this.getAll({
      assignedPorteurId: porteurId,
      workflowStatus: 'settled'
    });
  }

  async settle(courrierId: string, _porteurId: string): Promise<ApiResponse<Courrier>> {
    const updates: Partial<Courrier> = {
      workflowStatus: 'settled',
      settledAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    return this.update(courrierId, updates);
  }

  // ============ Recherche avancée ============

  async search(query: {
    subject?: string;
    sender?: string;
    tags?: string[];
    priority?: 'priority' | 'normal';
    type?: 'officiel' | 'administratif' | 'commercial';
    dateFrom?: string;
    dateTo?: string;
  }): Promise<ApiResponse<Courrier[]>> {
    const filters: Record<string, any> = {};

    if (query.subject) filters.subject_like = query.subject;
    if (query.sender) filters.sender_like = query.sender;
    if (query.tags?.length) filters.tags_like = query.tags.join(',');
    if (query.priority) filters.priority = query.priority;
    if (query.type) filters.type = query.type;
    if (query.dateFrom) filters.receptionDate_gte = query.dateFrom;
    if (query.dateTo) filters.receptionDate_lte = query.dateTo;

    return this.getAll(filters as CourrierFilters);
  }

  // ============ Statistiques ============

  async getOverdue(): Promise<ApiResponse<Courrier[]>> {
    // JSON Server ne supporte pas les comparaisons de dates complexes
    // Cette méthode devrait être implémentée côté serveur
    const result = await this.getAll();
    if (result.data) {
      const now = new Date();
      const overdue = result.data.filter(c =>
        c.workflowStatus !== 'settled' &&
        new Date(c.deadline) < now
      );
      return { data: overdue };
    }
    return result;
  }

  async getByPriority(priority: 'priority' | 'normal'): Promise<ApiResponse<Courrier[]>> {
    return this.getAll({ priority });
  }

  async getByType(type: 'officiel' | 'administratif' | 'commercial'): Promise<ApiResponse<Courrier[]>> {
    return this.getAll({ type });
  }
}

// Instance singleton pour compatibilité
export const courrierService = new CourrierService();