import type { Stats } from '../../types/api';
import { BaseRepository } from '../base/BaseRepository';
import { httpClient } from '../../services/httpClient';

export class StatsRepository extends BaseRepository<Stats> {
  protected endpoint = '/stats';

  constructor() {
    super(httpClient);
  }
}