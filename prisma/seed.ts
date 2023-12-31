// prisma/seed.ts

import { PrismaClient } from '@prisma/client';

// initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
  // create two dummy articles
  const user1 = await prisma.user.create({
    data: {
      email: 'test@gmail.com',
      password: 'hello',
    },
  });

  const post1 = await prisma.search_results.create({
    data: {
      adswords_count: 10,
      keyword: 'test',
      link_count: 10,
      total_search_result_for_keyword: '20',
      raw_html: 'asdsad',
      user_id: 1,
    },
  });

  console.log({ post1, user1 });
}

// execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });
