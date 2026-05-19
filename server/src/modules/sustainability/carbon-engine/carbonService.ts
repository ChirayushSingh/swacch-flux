import { PrismaClient } from '@prisma/client';
import { logger } from '../../../config/logger';

const prisma = new PrismaClient();

export class CarbonService {
  /**
   * Calculates CO2 emissions for a specific vehicle based on distance covered.
   * Uses BS-VI emission factors for Indian municipal vehicles.
   */
  static async calculateDistanceBasedEmissions(vehicleId: string, distanceKm: number) {
    try {
      const vehicle = await prisma.vehicle.findUnique({ where: { id: vehicleId } });
      if (!vehicle) return;

      // Avg CO2 emission for heavy/medium commercial vehicles (conceptually)
      // Reference: ~2.6 kg CO2 per liter of diesel or ~0.8 kg per km for urban cycles
      const emissionFactor = 0.82; 
      const co2Emitted = distanceKm * emissionFactor;

      return await prisma.carbonLog.create({
        data: {
          vehicleId,
          orgId: vehicle.orgId,
          co2Emitted,
          method: 'DISTANCE_BASED'
        }
      });
    } catch (error) {
      logger.error('Carbon Calculation Error:', error);
    }
  }

  /**
   * Tracks environmental impact of waste diversion.
   */
  static async logWasteImpact(orgId: string, weightTons: number, type: 'RECYCLED' | 'COMPOSTED' | 'LANDFILL') {
    // Methane avoidance factor: ~1.5 ton CO2e per ton of organic waste composted
    const methaneFactor = type === 'COMPOSTED' ? 1500 : type === 'RECYCLED' ? 800 : 0;
    const methaneAvoided = (weightTons * methaneFactor);

    return await prisma.wasteImpact.create({
      data: {
        orgId,
        weight: weightTons,
        type,
        methaneAvoided
      }
    });
  }
}
