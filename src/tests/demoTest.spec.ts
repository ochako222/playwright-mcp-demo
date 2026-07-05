import { demoTest } from "src/fixtures/demoTest";

demoTest.describe("Demo test", { tag: ["@login", "@regression"] }, () => {
	demoTest(
		"Validate that Ciklum page opened successfully",
		async ({ pages, globalEnv }) => {
			await pages.homePage.goto(globalEnv.BASE_URL);
			await pages.homePage.acceptCookies();
			await pages.homePage.expectLoaded();
			await pages.homePage.clickProdigy();
			await pages.prodigyPage.expectLoaded();
		},
	);
});
