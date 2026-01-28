import type { ApiResponse } from '../../types/api';
import type { IRepository, IHttpClient } from '../interfaces/IRepository';

export abstract class BaseRepository<T extends { id: string }> implements IRepository<T> {
  protected abstract endpoint: string;

  constructor(protected httpClient: IHttpClient) {}

  async getAll(filters?: Record<string, any>): Promise<ApiResponse<T[]>> {
    return this.httpClient.get<T[]>(this.endpoint, filters);
  }

  async getById(id: string): Promise<ApiResponse<T>> {
    return this.httpClient.get<T>(`${this.endpoint}/${id}`);
  }

  async create(data: Omit<T, 'id' | 'createdAt'>): Promise<ApiResponse<T>> {
    return this.httpClient.post<T>(this.endpoint, data);
  }

  async update(id: string, data: Partial<T>): Promise<ApiResponse<T>> {
    return this.httpClient.patch<T>(`${this.endpoint}/${id}`, data);
  }

  async delete(id: string): Promise<ApiResponse<void>> {
    return this.httpClient.delete<void>(`${this.endpoint}/${id}`);
  }
}