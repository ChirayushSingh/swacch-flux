import { Router } from 'express';
import { CircularController } from './circularController';

const router = Router();

router.get('/exchange', CircularController.getExchange);
router.get('/epr', CircularController.getEpr);
router.post('/simulate', CircularController.simulateCircular);
router.get('/bids', CircularController.getMarketplaceBids);

export default router;
