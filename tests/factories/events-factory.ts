import dayjs from "dayjs";
import faker from "@faker-js/faker";
import { redis } from "@/config";
interface Event {
  id: number;
  title: string;
  logoImageUrl: string;
  backgroundImageUrl: string;
  startsAt: string | Date | any;
  endsAt: string | Date | any;
}

export async function createEvent(params: Partial<Event> = {}): Promise<Event> {
  const event = {
    id: 1,
    title: params.title || faker.lorem.sentence(),
    backgroundImageUrl: params.backgroundImageUrl || faker.image.imageUrl(),
    logoImageUrl: params.logoImageUrl || faker.image.imageUrl(),
    startsAt: params.startsAt || dayjs().toDate(),
    endsAt: params.endsAt || dayjs().add(21, "days").toDate(),
  };

  await redis.set("event", JSON.stringify(event));

  return JSON.parse(await redis.get("event"));
}
