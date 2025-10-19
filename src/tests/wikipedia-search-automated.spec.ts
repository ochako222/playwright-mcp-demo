import { demoTest, expect } from "src/fixtures/index.js";

demoTest.describe(
	"Wikipedia Search Execution - Automated",
	{
		annotation: {
			type: "test-suite",
			description: "Automated tests for Wikipedia search functionality based on manual test cases WS-001 and WS-002",
		},
	},
	() => {
		demoTest(
			"Search via Enter Key (WS-001)",
			{
				tag: ["@smoke", "@automated"],
				annotation: {
					type: "test-case",
					description: "Verify that users can successfully search for content on Wikipedia by typing a search query and pressing the Enter key",
				},
			},
			async ({ pages, page }) => {
				// 1. Navigate to Wikipedia homepage
				await pages.wikiPage.navigate();

				// 2-4. Search for "Python" using Enter key
				await pages.wikiPage.search("Python");

				// 5. Verify the URL contains "Python"
				await expect(page).toHaveURL(/Python/);

				// 6. Verify the page title contains "Python"
				await expect(page).toHaveTitle(/Python/);
			},
		);

		demoTest(
			"Search via Search Button (WS-002)",
			{
				tag: ["@smoke", "@automated"],
				annotation: {
					type: "test-case",
					description: "Verify that users can successfully search for content on Wikipedia by typing a search query and clicking the Search button",
				},
			},
			async ({ pages, page }) => {
				// 1. Navigate to Wikipedia homepage
				await pages.wikiPage.navigate();

				// 2-4. Search for "Python" using Search button
				await pages.wikiPage.searchWithButton("Python");

				// 5. Verify the URL contains "Python"
				await expect(page).toHaveURL(/Python/);

				// 6. Verify the page title contains "Python"
				await expect(page).toHaveTitle(/Python/);
			},
		);
	},
);
