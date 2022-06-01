import accommodationService from '@/services/accommodation-service';
import { Request, Response } from 'express';
import httpStatus from 'http-status';

export async function getHotelsStatus(req: Request, res: Response) {
    const hotelsRooms = await accommodationService.getHotelsStatus();

    res.status(httpStatus.OK).send(hotelsRooms);
}
