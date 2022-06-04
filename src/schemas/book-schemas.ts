import Joi from "joi";

export interface CreateBookingData {
  roomId: number | null;
  hotelPrice: number | null;
  hotelSelected: "Sem Hotel" | "Com Hotel";
  modalityPrice: number;
  modalitySelected: "Presencial" | "Online";
  total: number;
  eventId: number;
}

export const createBookingSchema = Joi.object<CreateBookingData>({
  roomId: Joi.number(),
  hotelPrice: Joi.number(),
  hotelSelected: Joi.string().valid("Sem Hotel", "Com Hotel"),
  modalityPrice: Joi.number().required(),
  modalitySelected: Joi.string().valid("Presencial", "Online").required(),
  total: Joi.number().required(),
  eventId: Joi.number().required(),
});
