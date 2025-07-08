# Playwright Test Setup Guide

## 📦 1. Install Dependencies

Ensure you have **Node.js >= 16** installed.

```bash
npm init -y
npm install -D @playwright/test
npx playwright install
```

config playwright

# Create a playwright.config.ts file:

import { defineConfig } from '@playwright/test';

export default defineConfig({
testDir: './tests',
timeout: 30000,
retries: 1,
use: {
headless: true,
baseURL: 'http://localhost:3000',
viewport: { width: 1280, height: 720 },
ignoreHTTPSErrors: true,
},
});

# create .env to contain enviroment variable

npm install dotenv

# create .env file with content

example:

BASE_URL=<url>
APP_USERNAME=<username>
APP_PASSWORD=<password>

# create file ts to load env

import dotenv from "dotenv";
dotenv.config();

export const TestConfig = {
baseURL: process.env.BASE_URL,
app_username: process.env.APP_USERNAME,
app_password: process.env.APP_PASSWORD,
};

# How to run test

npx playwright test

# To run with UI mode (debugging):

npx playwright test --ui

# Useful Scripts - In package.json, add:

"scripts": {
"test": "npx playwright test",
"test:ui": "npx playwright test --ui",
"test:report": "npx playwright show-report"
}

# View HTML Test Report

npx playwright show-report

# Resources

Docs: https://playwright.dev

CLI: https://playwright.dev/docs/test-cli

Locators: https://playwright.dev/docs/locators

# formatter code (vscode extension)

- Code Spell Checker
- Prettier - Code formatter

# create file .vscode/settings.json

{
"editor.formatOnSave": true,
"editor.defaultFormatter": "esbenp.prettier-vscode",
"files.insertFinalNewline": true,
"editor.codeActionsOnSave": {
"source.fixAll.eslint": "explicit"
},
"typescript.preferences.importModuleSpecifier": "non-relative",
"cSpell.ignoreWords": ["reportportal", "genai", "unmark", "woocommerce"],

"cSpell.ignorePaths": [
"**/node_modules/**",
"**/.vscode/**",
"package.json",
"tsconfig.json"
]
}
