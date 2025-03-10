# Playwright Automation
This project uses the Playwright framework with TypeScript to perform **end-to-end (E2E)** and **API** testing. The goal is to provide a scalable, efficient, and easily maintainable solution for validating functionalities and services.

## 📋 Requirements
To run the project, the following requirements must be met:
- [Node.js](https://nodejs.org/) (version 18 or higher)
- [npm](https://www.npmjs.com/) o [yarn](https://yarnpkg.com/)
- [allure-npm](https://github.com/allure-framework/allure-npm)

## ⚙️ Installation
To install the project dependencies, run the following command in the root of the repository:
```bash
npm install
```

> [!IMPORTANT]
> If this is the first time using Playwright, it is recommended to install the necessary browsers:
> ```bash
> npx playwright install
> ```

## 🌎 Environment Configuration
The project allows execution in different environments (dev, prod). To define the execution environment, you need to configure `.env` files within the project.

Example of `.env.dev`:
```ini
URL=https://www.saucedemo.com/
USER=standard_user
PASSWORD=secret_sauce
```

Example of `.env.prod`:
```ini
URL=https://www.saucedemo.com/
USER=user_pw_2025
PASSWORD=pw2025
```

## 🚀 Running Tests
> [!CAUTION]
> Before running the tests, it is necessary to set the appropriate environment:
>
> **Windows**
> ```bash
> $env:ENVIRONMENT = "dev";
> ```
>
> **macOS/Linux**
> ```bash
> ENVIRONMENT=dev
> ```
>
> **Example of execution with the environment set:**
> ```bash
> $env:ENVIRONMENT = "dev"; npx playwright test
> ```

### Run UI Tests
```bash
npm run test:ui
```

### Run API Tests
```bash
npm run test:api
```

## 📊 Generating Reports
To generate and view the test report with **Allure**, run:
```bash
npm run test:report
```
This will generate the reports in the `allure-results` folder.

## 📂 Project Structure
```bash
📁 playwright_automation
├── 📁 .auth
├── 📁 allure-report
├── 📁 allure-results
├── 📁 data
├── 📁 pages
├── 📁 test-results
├── 📁 tests
│   ├── 📁 api_automation
│   ├── 📁 ui_automation
│   └── 📋 auth.setup.ts
├── 📁 utils
├── 🔐 .env
├── 🚫 .gitignore
├── 📦 package.json
├── 📦 package-lock.json
├── 🎭 playwright.config.ts
└── 🔧 tsconfig.json
```

## Author
- [@jonanxavi](https://www.github.com/jonanxavi)

## 🔗 Links
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/jonathan-fernandez-/)
