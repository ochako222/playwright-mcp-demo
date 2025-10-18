import { AppPage } from "src/pages/abstractClasses.js";

export class HomePage extends AppPage {
  private readonly navbarTitle = this.page.locator(
    ".navbar__inner .navbar__title"
  );

  async expectLoaded() {
    console.log(
      "[PLAYWRIGHT-TEST]>>>> Expecting Translation Page to be loaded"
    );

    // await expect.soft(this.getTitle).toBeVisible();
  }

  async navigate() {
    await this.goto("https://playwright.dev/");
  }

  getNavbarTitle() {
    return this.navbarTitle;
  }
}
