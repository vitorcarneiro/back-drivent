import "reflect-metadata";
import "express-async-errors";
import express, { Express } from "express";
import cors from "cors";
import { redisSeed } from "./redis/seed";

import {
  loadEnv,
  connectDb,
  disconnectDB,
  redis,
  connectRedis,
  disconnectRedis,
} from "@/config";

loadEnv();

import { handleApplicationErrors } from "@/middlewares";
import {
  usersRouter,
  authenticationRouter,
  eventsRouter,
  enrollmentsRouter,
  accommodationRouter,
} from "@/routers";

const app = express();
app
  .use(cors())
  .use(express.json())
  .delete("/", async (req, res) => {
    await redis.del("hotels");

    res.send({ ok: true });
  })
  .get("/health", (_req, res) => res.send("OK!"))
  .use("/users", usersRouter)
  .use("/auth", authenticationRouter)
  .use("/event", eventsRouter)
  .use("/enrollments", enrollmentsRouter)
  .use("/accommodations", accommodationRouter)
  .use(handleApplicationErrors);

export function init(): Promise<Express> {
  connectDb();
  connectRedis();
  redisSeed();
  return Promise.resolve(app);
}

export async function close(): Promise<void> {
  await disconnectDB();
  await disconnectRedis();
}

export default app;
