// import { PrismaClient } from "@prisma/client";

// const globalForPrisma = global as unknown as { prisma: PrismaClient };

// export const prisma =
//   globalForPrisma.prisma ||
//   new PrismaClient({
//     log: ["query"],
//   });

// if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as { prisma?: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  (() => {
    const newPrisma = new PrismaClient({
      log: ["query"],
    });

    // Log a success message when connected
    newPrisma.$connect().then(() => {
      console.log("Prisma client connected successfully");
    });

    // Save the Prisma instance to the global object in non-production environments
    if (process.env.NODE_ENV !== "production") {
      globalForPrisma.prisma = newPrisma;
    }

    return newPrisma;
  })();

// Handle global disconnect during application shutdown
process.on("beforeExit", async () => {
  if (globalForPrisma.prisma) {
    await globalForPrisma.prisma.$disconnect();
  }
});
