const js = require('@eslint/js');
const tseslint = require('@typescript-eslint/eslint-plugin');
const tsParser = require('@typescript-eslint/parser');
const playwright = require('eslint-plugin-playwright');
const prettier = require('eslint-plugin-prettier');
const globals = require('globals');

module.exports = [
    js.configs.recommended,

    {
        files: ['**/*.ts'],
        languageOptions: {
            parser: tsParser,
            ecmaVersion: 'latest',
            sourceType: 'module',
            globals: {
                ...globals.node,
            },
        },
        plugins: {
            '@typescript-eslint': tseslint,
        },
        rules: {
            ...tseslint.configs.recommended.rules,

            '@typescript-eslint/no-unused-vars': 'warn',
            'no-empty-pattern': 'warn',
        },
    },

    {
        files: ['tests/**/*.ts'],
        plugins: {
            playwright,
            prettier,
        },
        languageOptions: {
            globals: {
                ...globals.node,
                test: 'readonly',
                expect: 'readonly',
            },
        },
        rules: {
            ...playwright.configs.recommended.rules,

            'playwright/no-focused-test': 'error',
            'playwright/no-wait-for-timeout': 'warn',
            'playwright/no-skipped-test': 'warn',

            'prettier/prettier': 'warn',
        },
    },

    {
        files: ['*.config.ts', 'env.ts'],
        languageOptions: {
            globals: {
                ...globals.node,
            },
        },
    },

    {
        files: ['pages/**/*.ts'],
        rules: {
            '@typescript-eslint/explicit-function-return-type': 'off',
        },
    },

    {
        files: ['utils/**/*.ts'],
        rules: {
            'no-console': 'warn',
        },
    },

    {
        ignores: ['node_modules/', 'playwright-report/', 'test-results/', 'allure-results/', 'allure-report/', 'dist/'],
    },
];
