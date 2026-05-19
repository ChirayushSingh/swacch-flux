import { Router } from 'express';
import { CloudController } from './cloudController';

const router = Router();

router.get('/diagnostics', CloudController.getDiagnostics);
router.get('/redis-cache', CloudController.getRedisCache);
router.get('/upload-url', CloudController.getUploadUrl);
router.get('/postgresql-pool', CloudController.getPostgresPool);

export default router;
