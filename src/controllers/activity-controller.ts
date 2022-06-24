import { Request, Response } from "express";
import { AuthenticatedRequest } from "@/middlewares";
import activityService from "@/services/activity-service";

import httpStatus from "http-status";

export async function createOrUpdateBooking(
  req: AuthenticatedRequest,
  res: Response
) {
  const { activityId } = req.params;
  
  const bookType = await activityService.createOrUpdateBooking({
    activityId: Number(activityId),
    userId: req.userId,
  });

  res.status(httpStatus.OK).send(bookType);
}

export async function getAllActivities(
  _req: AuthenticatedRequest,
  res: Response
) {
  const activities = await activityService.getAllActivities();

  res.status(httpStatus.OK).send(activities);
}
