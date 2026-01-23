import type { Department } from '../../types/api';
import { BaseRepository } from '../base/BaseRepository';
import { httpClient } from '../../services/httpClient';

export class DepartmentRepository extends BaseRepository<Department> {
  protected endpoint = '/departments';

  constructor() {
    super(httpClient);
  }
}