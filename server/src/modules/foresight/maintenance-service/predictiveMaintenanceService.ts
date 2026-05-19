import { PrismaClient } from '@prisma/client';
import { logger } from '../../../config/logger';

const prisma = new PrismaClient();

export class PredictiveMaintenanceService {
  /**
   * Analyzes vehicle health and predicts breakdown risk.
   * Considers mileage, age of parts, and usage intensity.
   */
  static async updateVehicleHealthScore(vehicleId: string) {
    try {
      const vehicle = await prisma.vehicle.findUnique({
        where: { id: vehicleId },
        include: { maintenance: true, fuelLogs: true }
      });

      if (!vehicle) return;

      // 1. Calculate Intensity (Average KM per day)
      const totalDistance = vehicle.fuelLogs.length * 150; // Mocked distance
      const ageInDays = (new Date().getTime() - vehicle.createdAt.getTime()) / (1000 * 3600 * 24);
      const intensity = totalDistance / (ageInDays || 1);

      // 2. Failure Probability Model (Conceptual)
      // Logic: Higher intensity + fewer recent maintenance = higher risk
      const daysSinceLastService = vehicle.maintenance.length > 0 
        ? (new Date().getTime() - vehicle.maintenance[0].serviceDate.getTime()) / (1000 * 3600 * 24)
        : ageInDays;

      let risk = (intensity * 0.4) + (daysSinceLastService * 0.6);
      risk = Math.min(risk / 100, 1.0); // Normalize to 0-1

      const healthScore = Math.max(100 - (risk * 100), 0);

      // 3. Update Vehicle State
      const updatedVehicle = await prisma.vehicle.update({
        where: { id: vehicleId },
        data: {
          healthScore,
          failureRisk: risk,
          status: risk > 0.8 ? 'MAINTENANCE' : vehicle.status
        }
      });

      // 4. Automated Service Scheduling if risk is high
      if (risk > 0.7) {
        await this._scheduleService(vehicleId, 'PREDICTIVE_REPAIR');
      }

      return updatedVehicle;
    } catch (error) {
      logger.error('Predictive Maintenance Error:', error);
    }
  }

  private static async _scheduleService(vehicleId: string, type: string) {
    const nextWeek = new Date();
    nextWeek.setDate(nextWeek.getDate() + 3);

    return prisma.serviceSchedule.create({
      data: {
        vehicleId,
        serviceType: type,
        nextServiceAt: nextWeek,
        isCompleted: false
      }
    });
  }
}
