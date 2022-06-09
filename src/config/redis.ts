import { RedisClientType } from '@redis/client';
import { createClient } from "redis";
import dotenv from "dotenv";
dotenv.config();


let redis: RedisClientType;
export function connectRedis(): void {
  redis = createClient({
    url: process.env.REDIS_URL,
  });
}

export async function disconnectRedis(): Promise<void> {
  await redis?.disconnect();
}

export default redis;
