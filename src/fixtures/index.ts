import { test as baseTest, expect } from "@playwright/test";
import { AppPages } from "src/pages/index.js";

const demoTest = baseTest.extend<{
	pages: AppPages;
}>({
	pages: async ({ page, context }, use) => {
		await use(new AppPages(page, context));
	},
});

export { demoTest, expect };
