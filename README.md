![Node.js](https://img.shields.io/badge/Node.js-22.12.0-339933?logo=node.js&logoColor=white)
![Playwright](https://img.shields.io/badge/Playwright-1.59.1-green?logo=playwright)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-CI-blue?logo=githubactions)
![Docker](https://img.shields.io/badge/Docker-Enabled-blue?logo=docker)
![Allure](https://img.shields.io/badge/Allure-Reporting-orange)
![ESLint](https://img.shields.io/badge/ESLint-10.2.1-brightgreen?logo=eslint&logoColor=white)
![Prettier](https://img.shields.io/badge/Prettier-3.8.3-blue?logo=prettier&logoColor=white)
![Testing](https://img.shields.io/badge/Testing-E2E%20%7C%20API-blue)

# Playwright E2E & API Automation Framework

This project is a production-ready QA Automation framework built with Playwright and TypeScript, designed to demonstrate scalable, maintainable, and real-world testing practices.

It showcases how to design, execute, and integrate automated tests across UI and API layers, following industry standards.

---

## 🎯 Why this project matters

This framework demonstrates my ability to:

- Design scalable test architectures
- Implement E2E and API automation strategies
- Apply best practices (POM, modular design, separation of concerns)
- Integrate testing into CI/CD pipelines
- Deliver actionable test reports for stakeholders

---

## ⭐ Key Features

- End-to-End (E2E) UI testing with Playwright
- API testing (REST)
- Page Object Model (POM) design pattern
- Multienvironment support using `.env`
- Allure reporting with rich test analytics
- CI/CD integration with GitHub Actions
- Dockerized execution (Docker + Docker Compose)
- Automated report publishing to GitHub Pages
- Code quality enforcement (ESLint + Prettier)

---

## 🏭 Architecture

The framework follows a modular and scalable architecture:

| Layer        | Responsibility                    |
| ------------ | --------------------------------- |
| E2E Tests    | UI test scenarios                 |
| API Tests    | Backend validation                |
| Page Objects | UI interaction abstraction        |
| Test Data    | Data management                   |
| Utilities    | Shared reusable logic             |
| Reporting    | Allure results generation         |
| CI/CD        | GitHub Actions pipeline execution |

### Design Principles

- Separation of UI and API testing layers
- Reusable and maintainable components
- Environment-based configuration
- Clean and readable test design

---

## 📋 Requirements

- [Node.js](https://nodejs.org/) (version 22 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [allure-commandline](https://www.npmjs.com/package/allure-commandline)
- [Java JDK 21+](https://adoptium.net/) (for Allure reports)
- [Docker](https://www.docker.com/products/docker-desktop/) (recommended)

---

## ⚙️ Installation

Clone the repository:

```bash
git clone https://github.com/JonanXavi/playwright_automation.git
```

Navigate into the project:

```bash
cd playwright_automation
```

Install dependencies:

```bash
npm install
```

> [!IMPORTANT]
> If this is the first time using Playwright, it is recommended to install the necessary browsers:
>
> ```bash
> npx playwright install
> ```

---

## 🌎 Environment Configuration

Create the corresponding `.env` file in the root directory.

Example of `.env.api`:

```ini
URL=https://restful-booker.herokuapp.com
USER=admin
PASSWORD=password123
```

Example of `.env.dev`:

```ini
URL=https://www.saucedemo.com/
USER=standard_user
PASSWORD=secret_sauce
```

---

## 🧪 Test Coverage

### UI (SauceDemo)

- Login
- Product listing
- Add to cart
- Checkout flow

### API (Restful Booker)

- Authentication
- CRUD operations (booking)

---

## 🚀 Running Tests

> [!CAUTION]
> Before running the tests, it is necessary to set the appropriate environment:
>
> **Windows**
>
> ```bash
> $env:ENVIRONMENT = "dev";
> ```
>
> **macOS/Linux**
>
> ```bash
> ENVIRONMENT=dev
> ```
>
> **Example of execution with the environment set:**
>
> ```bash
> $env:ENVIRONMENT = "dev"; npx playwright test
> ```

### Run UI Tests - Headed

```bash
npm run test:ui-headed
```

### Run UI Tests - Headless

```bash
npm run test:ui
```

### Run API Tests

```bash
npm run test:api
```

---

## 🐳 Docker Execution

Run tests in a fully isolated environment:

### Build Docker Image

```bash
docker build -t playwright-automation .
```

### Run UI tests

```bash
docker compose run --rm tests-ui
```

### Run API tests

```bash
docker compose run --rm tests-api
```

### Generate Allure report

```bash
docker compose run --rm report
```

### Allure server

```bash
docker compose up serve
```

### One Command Execution

```bash
npm run docker:execution
```

> [!NOTE]
> Report open at the URL: http://localhost:5051/

---

## 📊 Reporting (Allure)

### Generate Report

```bash
npm run test:report
```

### View Allure Report

```bash
npm run report:open
```

### Includes:

- Test steps
- Severity levels
- Execution history
- Failure evidence (screenshots/videos)

---

## 🔁 CI/CD (GitHub Actions)

### Pipeline stages:

1. Build Docker environment
2. Execute tests
3. Generate Allure report
4. Publish report to GitHub Pages

---

## 🌍 Live Report

https://jonanxavi.github.io/playwright_automation/

---

## 📂 Project Structure

```bash
📁 playwright_automation
├── 📁 .auth                # Stored session
├── 📁 .github              # CI/CD pipeline configuration
├── 📁 allure-report        # Generated HTML reports
├── 📁 allure-results       # Raw results generated during test execution
├── 📁 data                 # Static test data
├── 📁 fixtures             # Reusable configuration components
├── 📁 pages                # Page Object Model classes
├── 📁 test-results         # Test execution results
├── 📁 tests
│   ├── 📁 api_automation   # API test scenarios
│   ├── 📁 ui_automation    # UI end-to-end test scenarios
│   └── 📋 auth.setup.ts    # Session storage file
├── 📁 utils                # Reusable helper functions
├── 🐳 docker-compose.yml   # Docker Compose orchestration
├── 🐋 Dockerfile           # Docker environment for running tests
├── ⛔ eslint.config.cjs    # ESLint configuration
├── 📦 package.json         # Project dependencies and scripts
├── 📦 package-lock.json    # Dependency lock file
├── 🎭 playwright.config.ts # Playwright global configuration
└── 🔧 tsconfig.json        # Compiler configuration file
```

---

## 🧹 Code Quality & Formatting

### ESLint

Run lint validation:

```bash
npm run pretest
```

### Prettier

Format project:

```bash
npm run format
```

---

## Author

- [@jonanxavi](https://www.github.com/jonanxavi)

---

## 🔗 Links

[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/jonathan-fernandez-/)
