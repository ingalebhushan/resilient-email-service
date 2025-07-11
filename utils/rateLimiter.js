class RateLimiter {
  constructor(limit, intervalMs) {
    this.limit = limit;
    this.intervalMs = intervalMs;
    this.timestamps = [];
  }

  allow() {
    const now = Date.now();
    this.timestamps = this.timestamps.filter(
      (t) => now - t < this.intervalMs
    );
    if (this.timestamps.length < this.limit) {
      this.timestamps.push(now);
      return true;
    }
    return false;
  }
}

module.exports = RateLimiter;