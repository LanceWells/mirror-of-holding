const optPi = Math.round(Math.PI * 10000) / 10000;

class TrigCache {
  private sinCache: number[];
  private cosCache: number[];

  constructor() {
    this.sinCache = [];
    this.cosCache = [];
  }

  sin(val: number) {
    const cacheKey = Math.round(val) % 180;
    if (!this.sinCache[cacheKey]) {
      const rads = val * optPi / 180;
      this.sinCache[cacheKey] = Math.sin(rads);
    }

    return this.sinCache[cacheKey];
  }

  cos(val: number) {
    const cacheKey = Math.round(val) % 180;
    if (!this.cosCache[cacheKey]) {
      const rads = val * optPi / 180;
      this.cosCache[cacheKey] = Math.cos(rads);
    }

    return this.cosCache[cacheKey];
  }
}

export const TrigOptimizer = new TrigCache();
