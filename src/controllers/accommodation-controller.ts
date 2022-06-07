import { AuthenticatedRequest } from "@/middlewares";
import accommodationService from "@/services/accommodation-service";
import { Request, Response } from "express";
import httpStatus from "http-status";

export async function getTotalCapacity(
  req: AuthenticatedRequest,
  res: Response
) {
  const capacityData = await accommodationService.getTotalCapacity();

  res.status(httpStatus.OK).send(capacityData);
}

export async function getHotels(
  req: AuthenticatedRequest,
  res: Response
) {
  const capacityData = await accommodationService.getHotels();

  res.status(httpStatus.OK).send(capacityData);
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
