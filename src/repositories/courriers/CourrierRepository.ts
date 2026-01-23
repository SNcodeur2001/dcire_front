import type { Courrier } from '../../types/api';
import { BaseRepository } from '../base/BaseRepository';
import { httpClient } from '../../services/httpClient';

export class CourrierRepository extends BaseRepository<Courrier> {
  protected endpoint = '/courriers';

  constructor() {
    super(httpClient);
  }
}