import { AuthenticatedRequest } from "@/middlewares";
import accommodationService from "@/services/accommodation-service";
import { Request, Response } from "express";
import httpStatus from "http-status";

export async function getHotelsStatus(req: Request, res: Response) {
  const hotelsRooms = await accommodationService.getHotelsStatus();

  res.status(httpStatus.OK).send(hotelsRooms);
}

export async function postCreateOrUpdateReservation(
  req: AuthenticatedRequest,
  res: Response
) {
  await accommodationService.createOrUpdateBooking({
    ...req.body,
    userId: req.userId,
  });

  return res.sendStatus(httpStatus.CREATED);
}

export async function getReservationById(
  req: AuthenticatedRequest,
  res: Response
) {
  const reservation = await accommodationService.getReservationById(req.userId);

  res.status(httpStatus.OK).send(reservation);
}
