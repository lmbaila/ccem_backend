import { PrismaClient, Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding (clean)...');

  await prisma.feedback.deleteMany();
  await prisma.eventTechnician.deleteMany();
  await prisma.eventService.deleteMany();
  await prisma.event.deleteMany();
  await prisma.technician.deleteMany();
  await prisma.team.deleteMany();
  await prisma.service.deleteMany();
  await prisma.dashboard.deleteMany();
  await prisma.user.deleteMany();

  await prisma.dashboard.createMany({
    data: [
      { name: 'Dynatrace', description: 'APM' },
      { name: 'Grafana', description: 'Dashboards' },
      { name: 'SolarWinds', description: 'Network & Servers' },
      { name: 'DCP Eagle', description: 'Critical Services Monitor' },
    ],
  });

  await prisma.service.createMany({
    data: [
      { name: 'OIC Transfer', description: 'Interbank transfers' },
      { name: 'EDM Credelec', description: 'Prepaid energy' },
      { name: 'EMOLA', description: 'Mobile payments' },
      { name: 'Mpesa', description: 'Mobile money' },
      { name: 'RTM', description: 'Real Time Monitor' },
      { name: 'Credit Card Payment', description: 'Card payments' },
    ],
  });

  await prisma.team.createMany({ data: [{ name: 'NOC' }, { name: 'SRE' }, { name: 'Payments' }] });
  const teams = await prisma.team.findMany({ orderBy: { id: 'asc' } });

  await prisma.technician.createMany({
    data: [
      { name: 'Carlos Matavele', code: 'T001', email: 'carlos@sb.co.mz', teamId: teams[0].id },
      { name: 'Ana Tome', code: 'T002', email: 'ana@sb.co.mz', teamId: teams[1].id },
      { name: 'Joao Nunes', code: 'T003', email: 'joao@sb.co.mz', teamId: teams[2].id },
      { name: 'Sandra Muianga', code: 'T004', email: 'sandra@sb.co.mz', teamId: teams[0].id },
    ],
  });

  const salt = await bcrypt.genSalt(10);
  await prisma.user.createMany({
    data: [
      {
        username: 'a830919',
        firstname: 'Lazaro',
        lastname: 'Mbaila',
        email: 'lazaro@sb.co.mz',
        password: await bcrypt.hash('admin123', salt),
        role: Role.ADMIN,
      },
      {
        username: 'c830920',
        firstname: 'Joao',
        lastname: 'Mabote',
        email: 'joao@sb.co.mz',
        password: await bcrypt.hash('cmd123', salt),
        role: Role.COMMANDCENTRE,
      },
      {
        username: 'v830921',
        firstname: 'Maria',
        lastname: 'Silva',
        email: 'maria@sb.co.mz',
        password: await bcrypt.hash('view123', salt),
        role: Role.VIEWER,
      },
    ],
  });

  console.log('✅ Seed done.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => prisma.$disconnect());
