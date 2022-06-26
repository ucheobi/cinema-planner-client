import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

export interface DBContext {
    prisma: PrismaClient;
}

export const context: DBContext = {
    prisma,
}