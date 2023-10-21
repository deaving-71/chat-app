import Prisma from "../src/lib/prisma";
import { faker } from "@faker-js/faker";
import { open, appendFile } from "fs/promises";
import { genSaltSync, hashSync } from "bcryptjs";
import os from "os";

async function main() {
  const seedFile = "seeded-data.txt";
  const file = await open(seedFile, "a");
  for (let index = 0; index < 5; index++) {
    const password = faker.internet.password();
    const salt = genSaltSync(10);
    const hashedPassword = hashSync(password, salt);
    const data = {
      name: faker.internet.displayName(),
      username: faker.internet.userName(),
      email: faker.internet.exampleEmail(),
      avatar: faker.internet.avatar(),
      password: hashedPassword,
    };

    await appendFile(file, JSON.stringify({ ...data, password }) + os.EOL);
    await Prisma.user.create({
      data,
    });
  }
}

main()
  .catch(async (e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await Prisma.$disconnect();
  });
