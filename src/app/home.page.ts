import { expect } from "@playwright/test";
import { step } from "src/misc/step";
import { AppPage } from "./abstractClasses";
import { DemoComponent } from "./components/demo.component";

export class HomePage extends AppPage {
	private heroHeading = this.page.getByRole("heading", {
		name: "Engineering Precision",
	});
	private navProdigyLink = this.page
		.getByRole("link", { name: "PRODIGY" })
		.first();
	private cookieAcceptButton = this.page.getByRole("button", {
		name: "Accept All",
	});

	public demoComponent = new DemoComponent(this.page, this.context);

	@step("Accept cookie consent banner")
	async acceptCookies() {
		await this.cookieAcceptButton.click();
	}

	@step("Verify Home Page is loaded")
	async expectLoaded() {
		await expect.soft(this.heroHeading).toBeVisible();
	}

	@step("Click PRODIGY navigation link")
	async clickProdigy() {
		await Promise.all([
			this.page.waitForURL("**/prodigy/**"),
			this.navProdigyLink.click(),
		]);
	}
}
