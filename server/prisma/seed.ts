import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // 1. Create Roles & Permissions
  const adminRole = await prisma.role.upsert({
    where: { name: 'MUNICIPAL_ADMIN' },
    update: {},
    create: {
      name: 'MUNICIPAL_ADMIN',
      permissions: {
        create: [
          { action: 'complaint:view', subject: 'Complaint' },
          { action: 'complaint:assign', subject: 'Complaint' },
          { action: 'analytics:view', subject: 'Analytics' },
          { action: 'users:manage', subject: 'User' },
          { action: 'complaint:create', subject: 'Complaint' }, // Added for testing
        ]
      }
    }
  });

  const workerRole = await prisma.role.upsert({
    where: { name: 'WORKER' },
    update: {},
    create: {
      name: 'WORKER',
      permissions: {
        create: [
          { action: 'complaint:view', subject: 'Complaint' },
          { action: 'complaint:update', subject: 'Complaint' },
        ]
      }
    }
  });

  const citizenRole = await prisma.role.upsert({
    where: { name: 'CITIZEN' },
    update: {},
    create: {
      name: 'CITIZEN',
      permissions: {
        create: [
          { action: 'complaint:create', subject: 'Complaint' },
          { action: 'complaint:view_own', subject: 'Complaint' },
        ]
      }
    }
  });

  // 2. Create Initial Organizations (Tenants)
  const bmc = await prisma.organization.upsert({
    where: { code: 'BMC' },
    update: {},
    create: {
      name: 'Brihanmumbai Municipal Corporation',
      code: 'BMC',
      type: 'MUNICIPAL_CORP',
    }
  });

  const pmc = await prisma.organization.upsert({
    where: { code: 'PMC' },
    update: {},
    create: {
      name: 'Pune Municipal Corporation',
      code: 'PMC',
      type: 'MUNICIPAL_CORP',
    }
  });

  // 3. Create Ward
  const zone = await prisma.zone.create({
    data: {
      name: 'Zone 1',
      orgId: bmc.id,
    }
  });

  const ward = await prisma.ward.create({
    data: {
      name: 'A-Ward',
      number: '101',
      zoneId: zone.id,
    }
  });

  // 4. Create Admin User
  const hashedPassword = await bcrypt.hash('admin123', 10);
  await prisma.user.upsert({
    where: { email: 'admin@bmc.gov.in' },
    update: {},
    create: {
      name: 'BMC Admin',
      email: 'admin@bmc.gov.in',
      password: hashedPassword,
      roleId: adminRole.id,
      orgId: bmc.id,
    }
  });

  // 5. Create a Mock Citizen
  await prisma.user.upsert({
    where: { email: 'citizen@example.com' },
    update: {},
    create: {
      id: 'citizen-id',
      name: 'John Doe',
      email: 'citizen@example.com',
      roleId: citizenRole.id,
      orgId: bmc.id,
    }
  });

  console.log('Seed data created successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
