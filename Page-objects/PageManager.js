const { test } = require('@playwright/test');
import { HeaderPage } from './HeaderPage.js'
import { HomePage } from './HomePage.js'

export class PageManager {

    constructor(page) {
        this.page = page
        this.headerPage = new HeaderPage(this.page)
        this.homePage = new HomePage(this.page)
    }

    navigateTo() {
        return this.headerPage
    }

    onHomePage() {
        return this.homePage
    }

}