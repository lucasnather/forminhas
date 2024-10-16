// vitest.config.ts
import { defineConfig } from 'vitest/config';
export default defineConfig({
    test: {
        globals: true,
        environmentMatchGlobs: [
            // all tests in tests/dom will run in jsdom
            ['src/controller/*/**', 'prisma']
        ],
        testTimeout: 5000,
    }
});
