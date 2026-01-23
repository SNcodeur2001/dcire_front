export class CacheService {
  private cache = new Map<string, { data: any; expiry: number }>();
  private defaultTtl = 5 * 60 * 1000; // 5 minutes

  get<T>(key: string): T | null {
    const item = this.cache.get(key);
    if (item && Date.now() < item.expiry) {
      return item.data;
    }
    this.cache.delete(key);
    return null;
  }

  set<T>(key: string, data: T, ttlMs: number = this.defaultTtl): void {
    this.cache.set(key, {
      data,
      expiry: Date.now() + ttlMs
    });
  }

  has(key: string): boolean {
    const item = this.cache.get(key);
    return item ? Date.now() < item.expiry : false;
  }

  delete(key: string): void {
    this.cache.delete(key);
  }

  clear(): void {
    this.cache.clear();
  }

  // Cleanup expired items
  cleanup(): void {
    const now = Date.now();
    for (const [key, item] of this.cache.entries()) {
      if (now >= item.expiry) {
        this.cache.delete(key);
      }
    }
  }

  // Get cache stats
  getStats() {
    this.cleanup();
    return {
      size: this.cache.size,
      keys: Array.from(this.cache.keys())
    };
  }
}

// Singleton instance
export const cacheService = new CacheService();