import { Router } from 'express';
import { DemoController } from './demoController';

const router = Router();

router.get('/municipalities', DemoController.getMunicipalities);
router.get('/gps-simulation', DemoController.getGpsSimulation);
router.get('/billing-reports', DemoController.getBillingReports);
router.post('/onboarding-request', DemoController.onboardingRequest);

export default router;
