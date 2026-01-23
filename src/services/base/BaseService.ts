import type { ApiResponse } from '../../types/api';
import type { IRepository } from '../../repositories/interfaces/IRepository';

export abstract class BaseService<T extends { id: string }> {
  protected abstract repository: IRepository<T>;
  protected abstract endpoint: string;

  async getAll(filters?: Record<string, any>): Promise<ApiResponse<T[]>> {
    return this.repository.getAll(filters);
  }

  async getById(id: string): Promise<ApiResponse<T>> {
    return this.repository.getById(id);
  }

  async create(data: Omit<T, 'id' | 'createdAt'>): Promise<ApiResponse<T>> {
    return this.repository.create(data);
  }

  async update(id: string, data: Partial<T>): Promise<ApiResponse<T>> {
    return this.repository.update(id, data);
  }

  async delete(id: string): Promise<ApiResponse<void>> {
    return this.repository.delete(id);
  }
}