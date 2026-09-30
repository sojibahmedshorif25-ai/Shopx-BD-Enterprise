import axios from 'axios';

class UpstashRedisClient {
  private url: string;
  private token: string;

  constructor() {
    this.url = process.env.UPSTASH_REDIS_REST_URL || '';
    this.token = process.env.UPSTASH_REDIS_REST_TOKEN || '';
  }

  private isConfigured(): boolean {
    return Boolean(this.url && this.token);
  }

  async get<T>(key: string): Promise<T | null> {
    if (!this.isConfigured()) return null;
    try {
      const res = await axios.get(`${this.url}/get/${encodeURIComponent(key)}`, {
        headers: { Authorization: `Bearer ${this.token}` },
        timeout: 3000,
      });
      if (res.data && res.data.result) {
        try {
          return JSON.parse(res.data.result);
        } catch {
          return res.data.result as T;
        }
      }
      return null;
    } catch (err) {
      console.warn(`[Redis GET Warning]: ${key}`, (err as any).message);
      return null;
    }
  }

  async set(key: string, value: any, expireSeconds: number = 300): Promise<boolean> {
    if (!this.isConfigured()) return false;
    try {
      const payload = typeof value === 'string' ? value : JSON.stringify(value);
      await axios.post(
        `${this.url}/set/${encodeURIComponent(key)}/${encodeURIComponent(payload)}/EX/${expireSeconds}`,
        {},
        {
          headers: { Authorization: `Bearer ${this.token}` },
          timeout: 3000,
        }
      );
      return true;
    } catch (err) {
      console.warn(`[Redis SET Warning]: ${key}`, (err as any).message);
      return false;
    }
  }

  async del(key: string): Promise<boolean> {
    if (!this.isConfigured()) return false;
    try {
      await axios.get(`${this.url}/del/${encodeURIComponent(key)}`, {
        headers: { Authorization: `Bearer ${this.token}` },
        timeout: 3000,
      });
      return true;
    } catch {
      return false;
    }
  }
}

export const redis = new UpstashRedisClient();
