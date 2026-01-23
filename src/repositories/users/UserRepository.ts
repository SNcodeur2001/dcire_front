import type { User } from '../../types/api';
import { BaseRepository } from '../base/BaseRepository';
import { httpClient } from '../../services/httpClient';

export class UserRepository extends BaseRepository<User> {
  protected endpoint = '/users';

  constructor() {
    super(httpClient);
  }
}