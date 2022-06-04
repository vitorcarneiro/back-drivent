import { CreateBooking } from "@/services";
import Joi from "joi";

export const createBookingSchema = Joi.object<CreateBooking>({
  roomId: Joi.number(),
  eventId: Joi.number().required(),
});
