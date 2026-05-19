import { Router } from 'express';
import { GovtechController } from './govtechController';

const router = Router();

router.post('/onboard', GovtechController.onboardMunicipal);
router.get('/gps-diagnostic', GovtechController.getGpsDiagnostics);
router.get('/audit-ledger', GovtechController.getAuditLogs);
router.get('/communication-templates', GovtechController.getCommTemplates);

export default router;
