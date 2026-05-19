const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  // 1. Create Roles
  const adminRole = await prisma.role.upsert({
    where: { name: 'MUNICIPAL_ADMIN' },
    update: {},
    create: {
      name: 'MUNICIPAL_ADMIN',
    }
  });

  const citizenRole = await prisma.role.upsert({
    where: { name: 'CITIZEN' },
    update: {},
    create: {
      name: 'CITIZEN',
    }
  });

  // 2. Create Organization
  const bmc = await prisma.organization.upsert({
    where: { code: 'BMC' },
    update: {},
    create: {
      name: 'Brihanmumbai Municipal Corporation',
      code: 'BMC',
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
      id: 'ward-a-id',
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

  // 5. Create Citizen
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
