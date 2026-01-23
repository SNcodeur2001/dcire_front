import type { User, ApiResponse } from '../../types/api';
import { BaseService } from '../base/BaseService';
import { UserRepository } from '../../repositories/users/UserRepository';

export class UserService extends BaseService<User> {
  protected repository = new UserRepository();
  protected endpoint = '/users';

  async getByRole(role: User['role']): Promise<ApiResponse<User[]>> {
    return this.getAll({ role });
  }

  async getByDepartment(departmentId: string): Promise<ApiResponse<User[]>> {
    return this.getAll({ departmentId });
  }

  async getActive(): Promise<ApiResponse<User[]>> {
    return this.getAll({ isActive: true });
  }

  // Méthodes métier
  async getDirectors(): Promise<ApiResponse<User[]>> {
    return this.getByRole('director');
  }

  async getDepartmentHeads(): Promise<ApiResponse<User[]>> {
    return this.getByRole('department');
  }

  async getPorteurs(): Promise<ApiResponse<User[]>> {
    return this.getByRole('porteur');
  }

  async getAssistants(): Promise<ApiResponse<User[]>> {
    return this.getByRole('assistant');
  }
}

// Instance singleton pour compatibilité
export const userService = new UserService();