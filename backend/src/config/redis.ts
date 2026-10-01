import axios from 'axios';

class UpstashRedisClient {
  private url: string;
  private token: string;
  private localCache: Map<string, { data: any; expiresAt: number }>;

  constructor() {
    this.url = (process.env.UPSTASH_REDIS_REST_URL || '').replace(/\/+$/, '');
    this.token = process.env.UPSTASH_REDIS_REST_TOKEN || '';
    this.localCache = new Map();
  }

  private isConfigured(): boolean {
    return Boolean(this.url && this.token);
  }

  async get<T>(key: string): Promise<T | null> {
    // 1. Check ultra-fast local memory cache first
    const cached = this.localCache.get(key);
    if (cached) {
      if (cached.expiresAt > Date.now()) {
        return cached.data as T;
      }
      this.localCache.delete(key);
    }

    if (!this.isConfigured()) return null;

    // 2. Fetch from Upstash Redis via JSON command body
    try {
      const res = await axios.post(
        this.url,
        ['GET', key],
        {
          headers: {
            Authorization: `Bearer ${this.token}`,
            'Content-Type': 'application/json',
          },
          timeout: 2500,
        }
      );

      if (res.data && res.data.result) {
        try {
          const parsed = JSON.parse(res.data.result);
          this.localCache.set(key, { data: parsed, expiresAt: Date.now() + 120 * 1000 });
          return parsed;
        } catch {
          this.localCache.set(key, { data: res.data.result, expiresAt: Date.now() + 120 * 1000 });
          return res.data.result as T;
        }
      }
      return null;
    } catch {
      return null;
    }
  }

  async set(key: string, value: any, expireSeconds: number = 300): Promise<boolean> {
    // 1. Always store in local memory cache immediately
    this.localCache.set(key, {
      data: value,
      expiresAt: Date.now() + expireSeconds * 1000,
    });

    if (!this.isConfigured()) return true;

    // 2. Persist to Upstash Redis via POST JSON body
    try {
      const payload = typeof value === 'string' ? value : JSON.stringify(value);
      await axios.post(
        this.url,
        ['SET', key, payload, 'EX', expireSeconds],
        {
          headers: {
            Authorization: `Bearer ${this.token}`,
            'Content-Type': 'application/json',
          },
          timeout: 3000,
        }
      );
      return true;
    } catch {
      // Gracefully handled by local cache
      return true;
    }
  }

  async del(key: string): Promise<boolean> {
    this.localCache.delete(key);
    if (!this.isConfigured()) return true;
    try {
      await axios.post(
        this.url,
        ['DEL', key],
        {
          headers: {
            Authorization: `Bearer ${this.token}`,
            'Content-Type': 'application/json',
          },
          timeout: 2500,
        }
      );
      return true;
    } catch {
      return true;
    }
  }
}

export const redis = new UpstashRedisClient();

