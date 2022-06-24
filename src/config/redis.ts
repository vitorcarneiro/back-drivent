import { RedisClientType } from "@redis/client";
import { createClient } from "redis";
import dotenv from "dotenv";
dotenv.config();

export let redis: RedisClientType;
export async function connectRedis(): Promise<void> {
  const url =
    process.env.NODE_ENV === "development" ||
    process.env.NODE_ENV === "test" ||
    process.env.NODE_ENV === "local"
      ? process.env.REDIS_URL
      : "redis://default:123456@drivent-redis-production:6379";

  redis = createClient({ url });

  await redis.connect();
}

export async function disconnectRedis(): Promise<void> {
  await redis?.disconnect();
}
