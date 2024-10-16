import 'dotenv/config';
import { randomUUID } from 'node:crypto';
import { execSync } from 'node:child_process';
import { prisma } from '../../src/database/prisma.js';
function generateUrlSchema(schema) {
    if (!process.env.DATABASE_URL)
        throw new Error('Banco de dados não existe!!!');
    const url = new URL(process.env.DATABASE_URL);
    url.searchParams.set('schema', schema);
    return url.toString();
}
export default {
    name: 'prisma',
    transformMode: 'ssr',
    async setup() {
        const schema = randomUUID();
        const databaseUrl = generateUrlSchema(schema);
        process.env.DATABASE_URL = databaseUrl;
        execSync('npx prisma migrate deploy');
        return {
            async teardown() {
                await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${schema} CASCADE"`);
                await prisma.$disconnect();
            }
        };
    }
};
