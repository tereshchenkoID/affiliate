interface RateLimitOptions {
  max?: number
  windowMs?: number
}

interface RateLimitResult {
  allowed: boolean
  remaining: number
  resetAt: number
}

interface RateLimitRecord {
  count: number,
  resetAt: number
}

const attempts = new Map<string, RateLimitRecord>()

export function checkRateLimit(
  key: string,
  { max = 5, windowMs = 60_000 }: RateLimitOptions = {}
): RateLimitResult {
  const now = Date.now()
  const record: RateLimitRecord = attempts.get(key) ?? { count: 0, resetAt: now + windowMs }

  if (now > record.resetAt) {
    record.count = 0
    record.resetAt = now + windowMs
  }

  record.count += 1
  attempts.set(key, record)

  return {
    allowed: record.count <= max,
    remaining: Math.max(0, max - record.count),
    resetAt: record.resetAt,
  }
}
