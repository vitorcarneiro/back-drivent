import { Router } from "express";
import { authenticateToken, validateBody } from "@/middlewares";
import {
  getHotelsStatus,
  postCreateOrUpdateReservation,
  getReservationById,
} from "@/controllers";
import { createBookingSchema } from "@/schemas";

const accommodationRouter = Router();

accommodationRouter
  .all("/*", authenticateToken)
  .get("/", getHotelsStatus)
  .post(
    "/book",
    validateBody(createBookingSchema),
    postCreateOrUpdateReservation
  )
  .get("/reservation", getReservationById);

export { accommodationRouter };
