import { PageHolder } from "./abstractClasses";
import { HomePage } from "./home.page";
import { ProdigyPage } from "./prodigy.page";

export class AppPages extends PageHolder {
	public homePage = new HomePage(this.page, this.context);
	public prodigyPage = new ProdigyPage(this.page, this.context);
}
