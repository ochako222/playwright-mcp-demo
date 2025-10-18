// spec: wikipedia-search-test-plan.md
// seed: src/tests/seed.spec.ts
// Generated with AI

import { demoTest, expect } from "src/fixtures/index.js";

demoTest.describe("Search Execution", () => {
	demoTest("Search via Enter Key", async ({ page }) => {
		// 1. Navigate to https://en.wikipedia.org
		await page.goto("https://en.wikipedia.org");

		// 2. Click on the search input field
		await page.getByRole("searchbox", { name: "Search Wikipedia" }).click();

		// 3. Type "Python"
		await page
			.getByRole("combobox", { name: "Search Wikipedia" })
			.fill("Python");

		// 4. Press the Enter key
		await page
			.getByRole("combobox", { name: "Search Wikipedia" })
			.press("Enter");

		// Expected Results: User is navigated to search results or article page
		await expect(page).toHaveURL(/.*Python/);

		// Expected Results: Page loads successfully without errors
		await expect(page).toHaveTitle(/Python/);
	});

	demoTest("Search via Search Button", async ({ page }) => {
		// 1. Navigate to https://en.wikipedia.org
		await page.goto("https://en.wikipedia.org");

		// 2. Click on the search input field
		await page.getByRole("searchbox", { name: "Search Wikipedia" }).click();

		// 3. Type "Python"
		await page
			.getByRole("combobox", { name: "Search Wikipedia" })
			.fill("Python");

		// 4. Click the "Search" button
		await page.getByRole("button", { name: "Search" }).click();

		// Expected Results: User is navigated to search results or article page
		await expect(page).toHaveURL(/.*Python/);

		// Expected Results: Same behavior as pressing Enter key
		await expect(page).toHaveTitle(/Python/);
	});
});
