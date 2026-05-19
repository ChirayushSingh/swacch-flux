import { Router } from 'express';
import { DpiController } from './dpiController';

const router = Router();

// Public open access routes for National Benchmarks & Transparency Portals
router.get('/benchmarks', DpiController.getNationalBenchmarks);
router.get('/transparency', DpiController.getTransparencyData);

// Secured government integrations (rate-limited via gateway)
router.post('/identity/validate', DpiController.validateFederatedIdentity);
router.post('/assistant/ask', DpiController.askNationalAssistant);

export default router;
