import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { getHotelsStatus } from '@/controllers';

const accommodationRouter = Router();

accommodationRouter
  .all('/*', authenticateToken)
  .get('/', getHotelsStatus)

export { accommodationRouter };
