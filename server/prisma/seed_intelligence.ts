import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const bmc = await prisma.organization.findUnique({ where: { code: 'BMC' } });
  if (!bmc) {
    console.error('BMC Organization not found. Run main seed first.');
    return;
  }

  const orgId = bmc.id;

  // 1. Create Risk Scores
  await prisma.riskScore.createMany({
    data: [
      { orgId, targetType: 'WARD', targetId: 'Ward 4', score: 88.4, breakdown: JSON.stringify({ complaints: 45, workers: 2 }) },
      { orgId, targetType: 'WARD', targetId: 'Ward 12', score: 42.1, breakdown: JSON.stringify({ complaints: 12, workers: 8 }) }
    ]
  });

  // 2. Create AI Recommendations
  await prisma.aiRecommendation.createMany({
    data: [
      {
        orgId,
        title: 'Immediate Resource Rebalancing Required',
        description: 'Ward 4 shows critical SLA risk (85%+). Recommend shifting 12% of the standby fleet to this zone.',
        priority: 'HIGH',
        category: 'RESOURCE_ALLOCATION',
        suggestedAction: 'REBALANCE_FLEET'
      },
      {
        orgId,
        title: 'Contractor Compliance Audit Needed',
        description: 'High frequency of ghost attendance detected in Night Shift. Potential audit risk for Contractor A.',
        priority: 'HIGH',
        category: 'GOVERNANCE',
        suggestedAction: 'INITIATE_AUDIT'
      }
    ]
  });

  // 3. Create Anomaly Logs
  await prisma.anomalyLog.createMany({
    data: [
      { orgId, type: 'GHOST_ATTENDANCE', severity: 'CRITICAL', details: 'User checked in at 06:00 but no movement detected for 3 hours.', targetId: 'worker-id-1' },
      { orgId, type: 'ROUTE_DEVIATION', severity: 'WARNING', details: 'Vehicle deviated 1.2km from Route 45B for 20 minutes.', targetId: 'vehicle-mh-01-24' }
    ]
  });

  console.log('Intelligence seed data created successfully');
}

main()
  .catch((e) => {
    console.error(e);
    // @ts-ignore
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
