import { courrierService } from './courriers/CourrierService';
import { userService } from './users/UserService';
import { departmentService } from './departments/DepartmentService';
import { statsService } from './stats/StatsService';
import { notificationService } from './notifications/NotificationService';

export class ServiceRegistry {
  private static instance: ServiceRegistry;
  private services = new Map<string, any>();

  private constructor() {
    // Initialize services
    this.services.set('courrierService', courrierService);
    this.services.set('userService', userService);
    this.services.set('departmentService', departmentService);
    this.services.set('statsService', statsService);
    this.services.set('notificationService', notificationService);
  }

  static getInstance(): ServiceRegistry {
    if (!ServiceRegistry.instance) {
      ServiceRegistry.instance = new ServiceRegistry();
    }
    return ServiceRegistry.instance;
  }

  register<T>(key: string, service: T): void {
    this.services.set(key, service);
  }

  get<T>(key: string): T {
    const service = this.services.get(key);
    if (!service) {
      throw new Error(`Service ${key} not found in registry`);
    }
    return service;
  }

  has(key: string): boolean {
    return this.services.has(key);
  }

  getAll(): Map<string, any> {
    return new Map(this.services);
  }
}

// Export singleton instance
export const serviceRegistry = ServiceRegistry.getInstance();