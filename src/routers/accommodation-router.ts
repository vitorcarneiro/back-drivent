import { Router } from "express";
import { authenticateToken, validateBody } from "@/middlewares";
import {
  getTotalCapacity,
  postCreateOrUpdateReservation,
  getReservationById,
} from "@/controllers";
import { createBookingSchema } from "@/schemas";

const accommodationRouter = Router();

accommodationRouter
  .all("/*", authenticateToken)
  .get("/", getTotalCapacity)
  .post(
    "/book",
    validateBody(createBookingSchema),
    postCreateOrUpdateReservation
  )
  .get("/reservation", getReservationById);

export { accommodationRouter };
