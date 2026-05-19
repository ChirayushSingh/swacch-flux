import { Router } from 'express';
import { WasteInfraController } from './wasteInfraController';

const router = Router();

router.get('/weighbridge', WasteInfraController.getWeighbridgeTickets);
router.get('/mrf', WasteInfraController.getMrfLogs);
router.get('/landfill', WasteInfraController.getLandfillStatus);
router.get('/organic-processing', WasteInfraController.getOrganicProcessing);
router.post('/simulate', WasteInfraController.simulateFlow);

export default router;
