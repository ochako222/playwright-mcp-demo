import { expect } from "@playwright/test";
import { step } from "src/misc/step";
import { AppPage } from "./abstractClasses";

export class ProdigyPage extends AppPage {
	private pageHeading = this.page.getByText("The AI Core of Ciklum").first();

	@step("Verify Prodigy Page is loaded")
	async expectLoaded() {
		await expect.soft(this.pageHeading).toBeVisible({ timeout: 5000 });
	}
}
