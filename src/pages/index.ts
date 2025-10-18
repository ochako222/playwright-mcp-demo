import { PageHolder } from "src/pages/abstractClasses.js";
import { HomePage } from "src/pages/home.page.js";
import { WikiPage } from "src/pages/wiki.page.js";

export class AppPages extends PageHolder {
  public homePage = new HomePage(this.page, this.context);
  public wikiPage = new WikiPage(this.page, this.context);
}
