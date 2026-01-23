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

// Types pour les filtres
export interface CourrierFilters {
  workflowStatus?: Courrier['workflowStatus'];
  assignedDepartmentId?: string;
  assignedPorteurId?: string;
  createdBy?: string;
  priority?: Courrier['priority'];
  type?: Courrier['type'];
}

export interface UserFilters {
  role?: User['role'];
  departmentId?: string;
  isActive?: boolean;
}

export interface NotificationFilters {
  userId?: string;
  isRead?: boolean;
  type?: Notification['type'];
}