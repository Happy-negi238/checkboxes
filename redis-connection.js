import Redis from "ioredis";

function createRedisConnection() {
  return new Redis(process.env.REDIS_URL, {
    maxRetriesPerRequest: null,
  });
}

export const redis = createRedisConnection();
export const publisher = createRedisConnection();
export const subscriber = createRedisConnection();
