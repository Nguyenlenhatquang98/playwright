# Playwright Test Setup Guide

## 📦 1. Install Dependencies

Ensure you have **Node.js >= 16** installed.

```bash
npx playwright install
```

config playwright

# create .env file with content

example:

BASE_URL=url
APP_USERNAME=username
APP_PASSWORD=password

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
