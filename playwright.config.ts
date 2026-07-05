import { devices, type PlaywrightTestConfig } from "@playwright/test";
import dotenv from "dotenv";
import path from "path";

const SUITE_TIMEOUT = 30 * 1000;
const EXPECT_TIMEOUT = 5 * 1000;

dotenv.config({ path: path.resolve(__dirname, ".env") });

const config: PlaywrightTestConfig = {
	testDir: "./src/tests",
	globalSetup: require.resolve("./configs/setup/globalSetup"),
	workers: 1,
	fullyParallel: false,
	reporter: "html",
	use: {
		browserName: "chromium",
		channel: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH ? undefined : "chrome",
		launchOptions: {
			executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH,
			headless: !!process.env.CI,
			// Change this value for debugging purposes
			slowMo: 0,
		},
		// trace: 'on-first-retry',
		video: "on-first-retry",
		screenshot: "only-on-failure",
		permissions: ["clipboard-read", "clipboard-write"],
		acceptDownloads: true,
	},
	expect: {
		timeout: EXPECT_TIMEOUT,
	},
	timeout: SUITE_TIMEOUT,
	projects: [
		{
			name: "chromium",
			use: { ...devices["Desktop Chrome"] },
		},
	],
};

export default config;
