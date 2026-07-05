import { expect } from "@playwright/test";
import { step } from "src/misc/step";
import { AppComponent } from "../abstractClasses";

export class DemoComponent extends AppComponent {
	private nextButton = this.page.locator("button#next");

	@step("Expect something happened")
	async expectLoaded() {
		await expect.soft(this.nextButton).toBeVisible({ timeout: 5000 });
	}
}
