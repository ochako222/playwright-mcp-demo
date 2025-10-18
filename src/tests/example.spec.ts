import { demoTest, expect } from "src/fixtures/index.js";

demoTest.describe(
	"Base test",
	{
		annotation: {
			type: "task",
			description: "demo test to show the main functionality",
		},
	},
	() => {
		demoTest(
			"basic test example",
			{
				tag: "@smoke",
			},
			async ({ pages }) => {
				await pages.homePage.navigate();
				const title = pages.homePage.getNavbarTitle();
				await expect(title).toBeVisible();
			},
		);
	},
);
