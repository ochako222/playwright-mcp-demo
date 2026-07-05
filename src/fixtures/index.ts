/**
 * This file contains the base fixture that is used to set up the test environment.
 */
import type { GlobalVariablesI } from "configs/setup/globalTypes";
import test from "playwright/test";
import { AppPages } from "src/app";

export const baseFixture = test.extend<{
	globalEnv: GlobalVariablesI;
	pages: AppPages;
}>({
	globalEnv: async ({}, use) => {
		const globalEnvStr = process.env.globalEnv;
		if (!globalEnvStr) {
			throw new Error('Global environment variable "globalEnv" is not set');
		}
		const globalEnv = JSON.parse(globalEnvStr) as GlobalVariablesI;
		await use(globalEnv);
	},

	pages: async ({ page, context }, use) => {
		await use(new AppPages(page, context));
	},
});
