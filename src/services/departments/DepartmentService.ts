import type { Department, ApiResponse } from '../../types/api';
import { BaseService } from '../base/BaseService';
import { DepartmentRepository } from '../../repositories/departments/DepartmentRepository';

export class DepartmentService extends BaseService<Department> {
  protected repository = new DepartmentRepository();
  protected endpoint = '/departments';

  async getActive(): Promise<ApiResponse<Department[]>> {
    return this.getAll({ isActive: true });
  }

  async getByManager(managerId: string): Promise<ApiResponse<Department[]>> {
    return this.getAll({ managerId });
  }
}

// Instance singleton pour compatibilité
export const departmentService = new DepartmentService();