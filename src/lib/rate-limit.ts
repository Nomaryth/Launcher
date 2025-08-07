import { headers } from 'next/headers';

class RateLimiter {
  private cache: Map<string, { count: number; reset: number }>;
  
  constructor() {
    this.cache = new Map();
  }

  private async getKey(): Promise<string> {
    const headersList = await headers();
    return (
      headersList.get('x-forwarded-for') ||
      headersList.get('x-real-ip') ||
      'unknown'
    );
  }

  async check(limit: number, window: string): Promise<{ success: boolean; reset: number }> {
    const key = await this.getKey();
    const now = Date.now();
    const windowMs = this.parseWindow(window);
    
    const current = this.cache.get(key) || { count: 0, reset: now + windowMs };
    
    if (current.reset <= now) {
      current.count = 0;
      current.reset = now + windowMs;
    }

    current.count++;
    this.cache.set(key, current);

    return {
      success: current.count <= limit,
      reset: current.reset
    };
  }

  private parseWindow(window: string): number {
    const [amount, unit] = window.split(' ');
    const multiplier = unit === 'h' ? 3600000 : 
                      unit === 'm' ? 60000 : 
                      unit === 's' ? 1000 : 1000;
    return parseInt(amount) * multiplier;
  }
}

export const rateLimit = new RateLimiter();
