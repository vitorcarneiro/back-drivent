import { Router } from "express";
import { authenticateToken, validateBody } from "@/middlewares";
import {
  getTotalCapacity,
  getHotels,
  postCreateOrUpdateReservation,
  getReservationById,
} from "@/controllers";
import { createBookingSchema } from "@/schemas";

const accommodationRouter = Router();

accommodationRouter
  .all("/*", authenticateToken)
  .get("/", getTotalCapacity)
  .get("/hotels", getHotels)
  .post(
    "/book",
    validateBody(createBookingSchema),
    postCreateOrUpdateReservation
  )
  .get("/reservation", getReservationById);

export { accommodationRouter };
