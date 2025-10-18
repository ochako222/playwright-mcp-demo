import type { BrowserContext, Page } from "@playwright/test";

export abstract class PageHolder {
	constructor(
		protected page: Page,
		protected context: BrowserContext,
	) {}
}

export abstract class Component extends PageHolder {
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

export abstract class AppPage extends Component {
	async goto(url: string): Promise<void> {
		console.info(`Navigating to URL: ${url}`);

		await this.page.goto(url);
	}

	async wait(timeout: number): Promise<void> {
		console.info(`Waiting for timeout: ${timeout}`);

		await this.page.waitForTimeout(timeout);
	}
}
