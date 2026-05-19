import { Request, Response } from 'express';
import { DecisionIntelligenceService } from '../../../modules/intelligence/decision-service/decisionIntelligenceService';
import { AnomalyDetectionService } from '../../../modules/intelligence/anomaly-engine/anomalyDetectionService';
import { AssistantService } from '../../../modules/chat/operations-assistant/assistantService';
import { OperationalSummaryService } from '../../../modules/reporting/intelligence-summary/operationalSummaryService';
import { logger } from '../../../config/logger';

export class IntelligenceController {
  static async getStrategicRecommendations(req: Request, res: Response) {
    try {
      const orgId = req.query.orgId as string;
      if (!orgId) return res.status(400).json({ message: 'orgId is required' });
      
      const recommendations = await DecisionIntelligenceService.generateStrategicRecommendations(orgId);
      res.json(recommendations);
    } catch (error) {
      logger.error('Controller Error:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  static async getAnomalies(req: Request, res: Response) {
    try {
      const orgId = req.query.orgId as string;
      if (!orgId) return res.status(400).json({ message: 'orgId is required' });
      
      const anomalies = await AnomalyDetectionService.scanForAnomalies(orgId);
      res.json(anomalies);
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  static async getRiskScores(req: Request, res: Response) {
    try {
      const orgId = req.query.orgId as string;
      if (!orgId) return res.status(400).json({ message: 'orgId is required' });
      
      const scores = await DecisionIntelligenceService.getRiskScores(orgId);
      res.json(scores);
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  static async askAssistant(req: Request, res: Response) {
    try {
      const { query, orgId } = req.body;
      const result = await AssistantService.processQuery(query, orgId);
      res.json(result);
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  static async generateDailyReport(req: Request, res: Response) {
    try {
      const { orgId } = req.body;
      const report = await OperationalSummaryService.generateDailySummary(orgId);
      res.json(report);
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}
