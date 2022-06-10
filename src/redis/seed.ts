import { connectRedis, disconnectRedis, redis } from "../config/redis"
import dayjs from "dayjs";

export async function redisSeed() {
  await connectRedis()
  let cachedEvent = await redis.get("event");
  if (!cachedEvent) {
    const event = {
      id: 1,
      title: "Driven.t",
      logoImageUrl:
        "https://files.driveneducation.com.br/images/logo-rounded.png",
      backgroundImageUrl: "linear-gradient(to right, #FA4098, #FFD77F)",
      startsAt: dayjs().toDate(),
      endsAt: dayjs().add(21, "days").toDate(),
    }
    await redis.set("event", JSON.stringify(event));
  }
}