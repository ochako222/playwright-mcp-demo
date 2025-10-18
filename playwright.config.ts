import { defineConfig } from "@playwright/test";

export default defineConfig({
	testDir: "./src/tests",
	fullyParallel: true,
	retries: process.env.CI ? 1 : 0,
	workers: process.env.CI ? 1 : void 0,
	reporter: "html",
	use: {
		browserName: "chromium",
		channel: "chrome",
		launchOptions: {
			headless: process.env.HEADLESS ? true : false,
			// Change this value for debugging purposes
			slowMo: 0,
		},
		// trace: 'on-first-retry',
		video: "on-first-retry",
		screenshot: "only-on-failure",
		permissions: ["clipboard-read", "clipboard-write"],
		acceptDownloads: true,
	},
});
