class TrigCache {
  private sinCache: number[];
  private cosCache: number[];

  constructor() {
    this.sinCache = [];
    this.cosCache = [];
  }

  sin(val: number) {
    // const cacheKey = Math.round(val / 2 * Math.PI * 360) % 360;
    const cacheKey = val;
    if (!this.sinCache[cacheKey]) {
      const rads = val * Math.PI / 180;
      this.sinCache[cacheKey] = Math.sin(rads);
    }

    return this.sinCache[cacheKey];
  }

  cos(val: number) {
    // const cacheKey = Math.round(val * 100);
    const cacheKey = val;
    if (!this.cosCache[cacheKey]) {
      const rads = val * Math.PI / 180;
      this.cosCache[cacheKey] = Math.cos(rads);
    }

    return this.cosCache[cacheKey];
  }
}

export const TrigOptimizer = new TrigCache();
