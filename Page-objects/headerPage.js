import { HelperBase } from './HelperBase';

const { test } = require('@playwright/test');

export class HeaderPage extends HelperBase {

    constructor(page) {
        super(page)
        this.homeMenuItem = page.locator('a.nav-link:has-text("Home")')
    }


    async homePage() {
        await this.homeMenuItem.waitFor();
        await this.homeMenuItem.click();
    }


}