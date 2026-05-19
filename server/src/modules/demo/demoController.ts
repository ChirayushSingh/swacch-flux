import { Request, Response } from 'express';
import { logger } from '../../config/logger';

export class DemoController {
  private static onboardingLeads: any[] = [
    {
      city: 'Thane Municipal Corporation',
      fleetSize: 420,
      dailyTonnage: 650,
      currentSoftware: 'Legacy Excel / None',
      status: 'DEMO_COMPLETED'
    },
    {
      city: 'Navi Mumbai',
      fleetSize: 310,
      dailyTonnage: 520,
      currentSoftware: 'Standalone GPS tracking',
      status: 'PILOT_ACTIVE'
    }
  ];

  /**
   * Retrieves seeded demo municipalities.
   */
  static async getMunicipalities(req: Request, res: Response): Promise<void> {
    try {
      const municipalities = [
        {
          name: 'Vasai Virar Municipal Corporation',
          code: 'VVMC',
          activeWards: 115,
          activeVehicles: 280,
          workforceCount: 1420,
          dailyTonnage: 480.5,
          diversionRatePercent: 86.4
        },
        {
          name: 'Pune Municipal Corporation',
          code: 'PMC',
          activeWards: 162,
          activeVehicles: 850,
          workforceCount: 4200,
          dailyTonnage: 1250.0,
          diversionRatePercent: 89.2
        },
        {
          name: 'Nashik Municipal Corporation',
          code: 'NMC',
          activeWards: 122,
          activeVehicles: 340,
          workforceCount: 1850,
          dailyTonnage: 550.0,
          diversionRatePercent: 84.8
        },
        {
          name: 'Nagpur Municipal Corporation',
          code: 'NAGMC',
          activeWards: 145,
          activeVehicles: 480,
          workforceCount: 2600,
          dailyTonnage: 780.0,
          diversionRatePercent: 88.0
        }
      ];

      res.status(200).json(municipalities);
    } catch (error) {
      logger.error('Municipalities Fetch Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  /**
   * Retrieves simulated live GPS telemetry.
   */
  static async getGpsSimulation(req: Request, res: Response): Promise<void> {
    try {
      const simulatedVehicles = [
        {
          vehicleNo: 'MH-12-EQ-8840',
          model: 'Tata Ace Compactor',
          speedKmph: 24,
          fuelPercent: 78,
          activeTrip: 'TR-PUNE-04',
          routeCompliancePercent: 98.4,
          driverName: 'R. Kadam',
          currentLocation: 'Kothrud Ward 12'
        },
        {
          vehicleNo: 'MH-04-VV-1020',
          model: 'Mahindra Bolero Dumper',
          speedKmph: 0, // Idle Stop
          fuelPercent: 54,
          activeTrip: 'TR-VVMC-08',
          routeCompliancePercent: 92.0,
          driverName: 'S. Patil',
          currentLocation: 'Virar West Ward 8'
        },
        {
          vehicleNo: 'MH-15-NK-0948',
          model: 'Ashok Leyland Refuse Collector',
          speedKmph: 42,
          fuelPercent: 89,
          activeTrip: 'TR-NMC-11',
          routeCompliancePercent: 96.5,
          driverName: 'M. Shinde',
          currentLocation: 'Panchavati Ward 4'
        }
      ];

      res.status(200).json(simulatedVehicles);
    } catch (error) {
      logger.error('GPS Simulation Fetch Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  /**
   * Retrieves sample billing and penalty lists.
   */
  static async getBillingReports(req: Request, res: Response): Promise<void> {
    try {
      const billingReports = [
        {
          contractorName: 'Perfect Waste Services',
          targetMunicipality: 'Pune Municipal Corporation',
          grossPayout: 1420500,
          deductionsGps: 45000,
          netPayout: 1375500,
          missedGeofences: 8,
          complianceScorePercent: 96.2,
          invoiceNo: 'INV-PMC-2026-004'
        },
        {
          contractorName: 'Maruti Cleaners & Logistics',
          targetMunicipality: 'Vasai Virar Municipal Corp',
          grossPayout: 850000,
          deductionsGps: 12000,
          netPayout: 838000,
          missedGeofences: 2,
          complianceScorePercent: 98.8,
          invoiceNo: 'INV-VVMC-2026-012'
        }
      ];

      res.status(200).json(billingReports);
    } catch (error) {
      logger.error('Billing Reports Fetch Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  /**
   * Submits a municipal onboarding CRM request.
   */
  static async onboardingRequest(req: Request, res: Response): Promise<void> {
    try {
      const { city, fleetSize, dailyTonnage, currentSoftware } = req.body;

      if (!city) {
        res.status(400).json({ error: 'City Name is required.' });
        return;
      }

      const newLead = {
        city,
        fleetSize: fleetSize || 0,
        dailyTonnage: dailyTonnage || 0,
        currentSoftware: currentSoftware || 'None',
        status: 'LEAD_SUBMITTED'
      };

      DemoController.onboardingLeads.unshift(newLead);
      res.status(201).json(DemoController.onboardingLeads);
    } catch (error) {
      logger.error('Onboarding CRM Ingest Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}
