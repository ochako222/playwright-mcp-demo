import { demoTest, expect } from "src/fixtures/index.js";

demoTest.describe(
	"Wikipedia tests",
	{
		annotation: {
			type: "task",
			description: "Wikipedia search functionality",
		},
	},
	() => {
		demoTest(
			"search for Lemon on Wikipedia",
			{
				tag: "@smoke",
			},
			async ({ pages, page }) => {
				// Navigate to Wikipedia
				await pages.wikiPage.navigate();

				// Search for "Lemon"
				await pages.wikiPage.search("Lemon");

				// Assert that the page title contains "Lemon"
				await expect(page).toHaveTitle(/Lemon/);

				// Additional assertion: verify we're on the Lemon article page
				await expect(page).toHaveURL("https://en.wikipedia.org/wiki/Lemon");
			},
		);
	},
);
