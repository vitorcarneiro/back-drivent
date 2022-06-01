import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { getHotelsRooms } from '@/controllers';

const accommodationRouter = Router();

accommodationRouter
  .all('/*', authenticateToken)
  .get('/', getHotelsRooms)

export { accommodationRouter };
