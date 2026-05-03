# Use Playwright base image
FROM mcr.microsoft.com/playwright:v1.59.1-noble

# Install Java 21
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    openjdk-21-jre \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy package.json and playwright.config.ts
COPY package*.json ./
COPY playwright.config.ts ./

# Install dependencies
RUN npm ci && npm install -g allure-commandline

# Copy other project files
COPY . .

# Default command to run Playwright UI tests
CMD ["npm", "run", "test:ui"]