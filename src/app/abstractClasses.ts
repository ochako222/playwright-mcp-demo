import type { BrowserContext, Page } from "playwright";
import { step } from "src/misc/step";

export abstract class PageHolder {
	constructor(
		protected page: Page,
		protected context: BrowserContext,
	) {}
}

export abstract class BasePage extends PageHolder {
	abstract expectLoaded(): Promise<void>;

	async isLoaded(): Promise<boolean> {
		try {
			await this.expectLoaded();
			return true;
		} catch {
			return false;
		}
	}
}

export abstract class AppComponent extends PageHolder {}

export abstract class AppPage extends PageHolder {
	@step("Navigate to URL: {url}")
	async goto(url: string) {
		console.info(`Navigate to URL: {url}`);
		await this.page.goto(url);
	}

	@step("Wait for timeout: {timeout}ms")
	async waitForTimeout(timeout: number) {
		console.info(`Navigate to URL: {url}`);
		await this.page.waitForTimeout(timeout);
	}
}
