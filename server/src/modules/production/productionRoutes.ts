import { Router } from 'express';
import { ProductionController } from './productionController';

const router = Router();

router.get('/telemetry-lag', ProductionController.getTelemetryLag);
router.get('/recovery-queue', ProductionController.getRecoveryQueue);
router.get('/rbac-roles', ProductionController.getRbacRoles);
router.get('/audit-ledger', ProductionController.getAuditLedger);
router.get('/diagnostics', ProductionController.getDiagnostics);

export default router;
