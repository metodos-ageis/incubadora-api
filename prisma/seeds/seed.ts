import { PrismaClient } from '@prisma/client';
import { randomUUID } from 'crypto';
const prisma = new PrismaClient();
async function main() {
  const manager = await prisma.users.upsert({
    where: { id: 'randomUUID()' },
    update: {},
    create: {
      id: randomUUID(),
      name: 'Gerente Teste',
      email: 'gerente@gmail.com',
      company_id: '0',
      password: '123456',
      role: 'manager',
      cpf_cnpj: '11111111111',
      phone: '81911111111',
      is_active: true,
    },
  });
  console.log({ manager });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
