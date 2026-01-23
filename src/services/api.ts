const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export interface ApiResponse<T> {
  data: T | null;
  error?: string;
}

export interface User {
  id: string;
  name: string;
  role: 'director' | 'department' | 'porteur' | 'assistant';
  avatar: string;
  email: string;
  departmentId?: string;
  isActive: boolean;
  createdAt: string;
}

export interface Courrier {
  id: string;
  reference: string;
  sender: string;
  senderPhone: string;
  senderEmail: string;
  subject: string;
  type: 'officiel' | 'administratif' | 'commercial';
  priority: 'priority' | 'normal';
  workflowStatus: 'pending' | 'assigned' | 'in_progress' | 'settled';
  receptionDate: string;
  registrationDate: string;
  assignedDepartmentId?: string;
  assignedPorteurId?: string;
  deadline: string;
  escalationLevel: number;
  tags: string[];
  duration: number;
  createdBy: string;
  settledAt?: string;
  documentUrl: string;
  responses: Response[];
  createdAt: string;
  updatedAt: string;
}

export interface Department {
  id: string;
  name: string;
  code: string;
  managerId: string;
  description: string;
  isActive: boolean;
  createdAt: string;
}

export interface Stats {
  id: string;
  userId: string;
  role: string;
  period: 'monthly' | 'daily';
  date: string;
  metrics: {
    totalReceived?: number;
    totalAssigned?: number;
    totalInProgress?: number;
    totalSettled?: number;
    totalPending?: number;
    totalOverdue?: number;
    averageProcessingTime?: number;
    totalCreated?: number;
    totalPriority?: number;
    totalNormal?: number;
  };
  lastUpdated: string;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'new_courrier' | 'assignment' | 'deadline_warning' | 'courrier_settled';
  title: string;
  message: string;
  courrierId?: string;
  isRead: boolean;
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
}

export interface Response {
  id: string;
  type: 'positive' | 'negative' | 'transfer' | 'information';
  data: Record<string, any>;
  attachments: string[];
  submittedBy: string;
  submittedAt: string;
  status: 'approved' | 'pending' | 'rejected';
}

export interface Log {
  id: string;
  courrierId: string;
  action: string;
  description: string;
  userId: string;
  userRole: string;
  timestamp: string;
  metadata?: Record<string, any>;
}

class ApiService {
  private async request<T>(endpoint: string, options?: RequestInit): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
        },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return { data };
    } catch (error) {
      console.error('API Error:', error);
      return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }

  // ============ COURRIERS ============

  async getCourriers(filters?: Record<string, any>) {
    const queryString = filters ?
      '?' + new URLSearchParams(filters as any).toString() : '';
    return this.request<Courrier[]>(`/courriers${queryString}`);
  }

  async getCourrier(id: string) {
    return this.request<Courrier>(`/courriers/${id}`);
  }

  async createCourrier(courrier: Omit<Courrier, 'id' | 'reference' | 'createdAt' | 'updatedAt'>) {
    return this.request<Courrier>('/courriers', {
      method: 'POST',
      body: JSON.stringify(courrier),
    });
  }

  async updateCourrier(id: string, updates: Partial<Courrier>) {
    return this.request<Courrier>(`/courriers/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  }

  async deleteCourrier(id: string) {
    return this.request<void>(`/courriers/${id}`, {
      method: 'DELETE',
    });
  }

  // ============ USERS ============

  async getUsers(filters?: Record<string, any>) {
    const queryString = filters ?
      '?' + new URLSearchParams(filters as any).toString() : '';
    return this.request<User[]>(`/users${queryString}`);
  }

  async getUser(id: string) {
    return this.request<User>(`/users/${id}`);
  }

  // ============ DEPARTMENTS ============

  async getDepartments() {
    return this.request<Department[]>('/departments');
  }

  async getDepartment(id: string) {
    return this.request<Department>(`/departments/${id}`);
  }

  // ============ STATS ============

  async getStats(userId: string, period: 'monthly' | 'daily' = 'monthly') {
    return this.request<Stats[]>(`/stats?userId=${userId}&period=${period}`);
  }

  async getAllStats() {
    return this.request<Stats[]>('/stats');
  }

  // ============ NOTIFICATIONS ============

  async getNotifications(userId: string, unreadOnly = false) {
    const filters: Record<string, string> = { userId };
    if (unreadOnly) filters.isRead = 'false';
    return this.request<Notification[]>(`/notifications?${new URLSearchParams(filters)}`);
  }

  async markNotificationAsRead(id: string) {
    return this.request<Notification>(`/notifications/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ isRead: true }),
    });
  }

  // ============ LOGS ============

  async getLogs(courrierId?: string) {
    const query = courrierId ? `?courrierId=${courrierId}` : '';
    return this.request<Log[]>(`/logs${query}`);
  }

  // ============ WORKFLOW METHODS ============

  // Pour l'assistante
  async getMyCreatedCourriers(assistantId: string) {
    return this.getCourriers({ createdBy: assistantId });
  }

  // Pour le directeur
  async getPendingCourriers() {
    return this.getCourriers({ workflowStatus: 'pending' });
  }

  async getAssignedCourriers() {
    return this.getCourriers({ workflowStatus: 'assigned' });
  }

  async getSettledCourriers() {
    return this.getCourriers({ workflowStatus: 'settled' });
  }

  // Pour le département
  async getDepartmentCourriers(departmentId: string) {
    return this.getCourriers({ assignedDepartmentId: departmentId });
  }

  async getDepartmentPendingCourriers(departmentId: string) {
    return this.getCourriers({
      assignedDepartmentId: departmentId,
      workflowStatus: 'assigned'
    });
  }

  async getDepartmentInProgressCourriers(departmentId: string) {
    return this.getCourriers({
      assignedDepartmentId: departmentId,
      workflowStatus: 'in_progress'
    });
  }

  // Pour le porteur
  async getPorteurCourriers(porteurId: string) {
    return this.getCourriers({ assignedPorteurId: porteurId });
  }

  async getPorteurToSettleCourriers(porteurId: string) {
    return this.getCourriers({
      assignedPorteurId: porteurId,
      workflowStatus: 'in_progress'
    });
  }

  async getPorteurSettledCourriers(porteurId: string) {
    return this.getCourriers({
      assignedPorteurId: porteurId,
      workflowStatus: 'settled'
    });
  }

  // Actions workflow
  async assignCourrierToDepartment(courrierId: string, departmentId: string, _directorId: string) {
    const updates: Partial<Courrier> = {
      workflowStatus: 'assigned',
      assignedDepartmentId: departmentId,
      updatedAt: new Date().toISOString(),
    };
    return this.updateCourrier(courrierId, updates);
  }

  async assignCourrierToPorteur(courrierId: string, porteurId: string, _departmentId: string) {
    const updates: Partial<Courrier> = {
      assignedPorteurId: porteurId,
      workflowStatus: 'in_progress',
      updatedAt: new Date().toISOString(),
    };
    return this.updateCourrier(courrierId, updates);
  }

  async settleCourrier(courrierId: string, _porteurId: string) {
    const updates: Partial<Courrier> = {
      workflowStatus: 'settled',
      settledAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    return this.updateCourrier(courrierId, updates);
  }
}

export const api = new ApiService();