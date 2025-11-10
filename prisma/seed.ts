import { PrismaClient, Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding data...');

  // ----- DASHBOARDS -----
  const dashboards = [
    { name: 'Dynatrace', description: 'APM' },
    { name: 'Grafana', description: 'Dashboards' },
    { name: 'SolarWinds', description: 'Network & Servers' },
    { name: 'DCP Eagle', description: 'Critical Services Monitor' },
  ];

  for (const d of dashboards) {
    await prisma.dashboard.upsert({
      where: { name: d.name },
      update: {},
      create: d,
    });
  }

  // ----- SERVICES -----
  const services = [
    { name: 'OIC Transfer', description: 'Interbank transfers' },
    { name: 'EDM Credelec', description: 'Prepaid energy' },
    { name: 'EMOLA', description: 'Mobile payments' },
    { name: 'Mpesa', description: 'Mobile money' },
    { name: 'RTM', description: 'Real Time Monitor' },
    { name: 'Credit Card Payment', description: 'Card payments' },
  ];

  for (const s of services) {
    await prisma.service.upsert({
      where: { name: s.name },
      update: {},
      create: s,
    });
  }

  // ----- TEAMS -----
  const teams = [{ name: 'NOC' }, { name: 'SRE' }, { name: 'Payments' }];

  for (const t of teams) {
    await prisma.team.upsert({
      where: { name: t.name },
      update: {},
      create: t,
    });
  }

  const allTeams = await prisma.team.findMany();

  // ----- TECHNICIANS -----
  const technicians = [
    { name: 'Carlos Matavele', code: 'T001', email: 'carlos@sb.co.mz', teamName: 'NOC' },
    { name: 'Ana Tome', code: 'T002', email: 'ana@sb.co.mz', teamName: 'SRE' },
    { name: 'Joao Nunes', code: 'T003', email: 'joao@sb.co.mz', teamName: 'Payments' },
    { name: 'Sandra Muianga', code: 'T004', email: 'sandra@sb.co.mz', teamName: 'NOC' },
  ];

  for (const tech of technicians) {
    const team = allTeams.find((t) => t.name === tech.teamName);
    if (!team) continue;

    await prisma.technician.upsert({
      where: { email: tech.email },
      update: {},
      create: {
        name: tech.name,
        code: tech.code,
        email: tech.email,
        teamId: team.id,
      },
    });
  }

  // ----- USERS -----
  const salt = await bcrypt.genSalt(10);

  const users = [
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
  ];

  for (const u of users) {
    await prisma.user.upsert({
      where: { username: u.username },
      update: {},
      create: u,
    });
  }

  console.log('✅ Seed completed successfully.');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
