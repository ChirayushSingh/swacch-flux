import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class GisService {
  static async getComplaintClusters(orgId: string, zoom: number) {
    // In a real production app with PostGIS, we would use raw queries
    // e.g., prisma.$queryRaw`SELECT ST_AsGeoJSON(ST_Centroid(ST_Collect(location))) ...`
    
    // For now, returning mock clustering data for the War Room
    return {
      clusters: [
        { lat: 19.0760, lng: 72.8777, count: 45, severity: 'HIGH' },
        { lat: 19.0820, lng: 72.8820, count: 12, severity: 'MEDIUM' }
      ]
    };
  }

  static async findNearestWorkers(lat: number, lng: number, orgId: string, radiusKm: number = 5) {
    // PostGIS query placeholder
    // SELECT * FROM "User" WHERE ST_DWithin(location, ST_MakePoint(${lng}, ${lat}), ${radiusKm * 1000})
    
    return prisma.user.findMany({
      where: {
        orgId,
        role: { name: 'WORKER' },
        isActive: true
      }
    });
  }
}
