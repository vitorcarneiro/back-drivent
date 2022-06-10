import { redis } from "@/config";
import { Event } from "../../services/events-service/index";

async function findFirst(): Promise<Event> {
  return JSON.parse(await redis.get("event"));
}

const eventRepository = {
  findFirst,
};

export default eventRepository;
