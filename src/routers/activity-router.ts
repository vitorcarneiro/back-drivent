import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { createOrUpdateBooking, getAllActivities } from "@/controllers";

const activityRouter = Router();

activityRouter
  .all("/*", authenticateToken)
  .get("/", getAllActivities)
  .patch("/:activityId", createOrUpdateBooking);

export { activityRouter };
