class TrigCache {
  private sinCache: number[];
  private cosCache: number[];

  constructor() {
    this.sinCache = [];
    this.cosCache = [];
  }

  sin(val: number) {
    const cacheKey = Math.round(val / 2 * Math.PI * 360) % 360;
    if (!this.sinCache[cacheKey]) {
      this.sinCache[cacheKey] = Math.sin(val);
    }

    return this.sinCache[cacheKey];
  }

  cos(val: number) {
    const cacheKey = Math.round(val * 100)
    if (!this.cosCache[cacheKey]) {
      this.cosCache[cacheKey] = Math.cos(val);
    }

    return this.cosCache[cacheKey];
  }
}

export const TrigOptimizer = new TrigCache();
