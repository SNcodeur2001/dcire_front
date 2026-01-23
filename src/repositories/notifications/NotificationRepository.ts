import type { Notification } from '../../types/api';
import { BaseRepository } from '../base/BaseRepository';
import { httpClient } from '../../services/httpClient';

export class NotificationRepository extends BaseRepository<Notification> {
  protected endpoint = '/notifications';

  constructor() {
    super(httpClient);
  }
}