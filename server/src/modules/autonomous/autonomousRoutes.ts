import { Router } from 'express';
import { AutonomousController } from './autonomousController';

const router = Router();

router.get('/agents', AutonomousController.getAgents);
router.get('/interventions', AutonomousController.getInterventions);
router.post('/simulate', AutonomousController.simulateScenario);
router.post('/override', AutonomousController.postOverride);

export default router;
