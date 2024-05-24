import { defineConfig, devices } from '@playwright/test';
import 'dotenv/config';
export default defineConfig({
  testDir: './api-test',
  timeout: 200000,
  forbidOnly: !!process.env.CI,
  workers: process.env.WORKERS || 1,
  retries: 1,
  reporter: 'html',
  use: {
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ]
});
