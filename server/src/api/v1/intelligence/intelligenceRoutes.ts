import express from 'express';
import { IntelligenceController } from './intelligenceController';

const router = express.Router();

router.get('/recommendations', IntelligenceController.getStrategicRecommendations);
router.get('/anomalies', IntelligenceController.getAnomalies);
router.get('/risk-scores', IntelligenceController.getRiskScores);
router.post('/assistant/ask', IntelligenceController.askAssistant);
router.post('/report/daily', IntelligenceController.generateDailyReport);

export default router;
