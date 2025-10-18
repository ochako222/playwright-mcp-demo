import { demoTest } from "src/fixtures/index.js";

demoTest.describe("Test group", () => {
	demoTest("seed", async ({ pages }) => {
		await pages.wikiPage.navigate();
	});
});
