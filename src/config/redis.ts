import { RedisClientType } from '@redis/client';
import { createClient } from "redis";
import dotenv from "dotenv";
dotenv.config();

export let redis: RedisClientType;
export async function connectRedis(): Promise<void> {
  redis = createClient({
    url: process.env.REDIS_URL,
  });

  await redis.connect();
}

export async function disconnectRedis(): Promise<void> {
  await redis?.disconnect();
}
