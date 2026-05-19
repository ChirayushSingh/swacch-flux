import { Router } from 'express';
import { ClimateController } from './climateController';

const router = Router();

router.get('/sensors', ClimateController.getSensors);
router.get('/flood-model', ClimateController.getFloodModel);
router.post('/simulate', ClimateController.simulateClimate);
router.get('/resilience-index', ClimateController.getResilienceIndex);

export default router;
