import { test, expect } from '@playwright/test';
import {ENV} from "../../utils/env";

test('has title', async ({ page }) => {
  await page.goto('/');
});