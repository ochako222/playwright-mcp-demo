import { AppPage } from "src/pages/abstractClasses.js";

export class WikiPage extends AppPage {
	private readonly searchBox = this.page.getByRole("searchbox", {
		name: "Search Wikipedia",
	});

	private readonly searchButton = this.page.getByRole("button", {
		name: "Search",
	});

	async expectLoaded() {
		console.log(
			"[PLAYWRIGHT-TEST]>>>> Expecting Translation Page to be loaded",
		);

		// await expect.soft(this.getTitle).toBeVisible();
	}

	async navigate() {
		await this.goto("https://en.wikipedia.org");
	}

	async search(query: string) {
		await this.searchBox.fill(query);
		await this.searchBox.press("Enter");
		await this.page.waitForLoadState("networkidle");
	}

	async searchWithButton(query: string) {
		await this.searchBox.fill(query);
		await this.searchButton.click();
		await this.page.waitForLoadState("networkidle");
	}

	getSearchBox() {
		return this.searchBox;
	}

	getSearchButton() {
		return this.searchButton;
	}
}
