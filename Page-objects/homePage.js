import { HelperBase } from './HelperBase.js';

const { test, expect } = require('@playwright/test');

export class HomePage extends HelperBase {

  constructor(page) {
    super(page)

    // Divs
    this.usingTest1Div = page.locator('#test-1-div')
    this.usingTest2Div = page.locator('#test-2-div')
    this.usingTest3Div = page.locator('#test-3-div')
    this.usingTest4Div = page.locator('#test-4-div')
    this.usingTest5Div = page.locator('#test-5-div')
    this.usingTest6Div = page.locator('#test-6-div')

    // Test 1 Div Elements
    this.emailAdressInput = this.usingTest1Div.locator('#inputEmail')
    this.passwordInput = this.usingTest1Div.getByRole('textbox', { name: 'Password' })
    this.signinButton = this.usingTest1Div.getByRole('button', { name: 'Sign in' })

    // Test 2 Div Element
    this.listGroupItems = this.usingTest2Div.getByRole('list').locator(".list-group-item")

    // Test 3 Div Elements
    this.dropdownMenuButton = this.usingTest3Div.locator('#dropdownMenuButton')
    this.dropdownMenuItem = this.usingTest3Div.locator('.dropdown-menu .dropdown-item')

    // Test 4 Div Elements
    this.firstButton = this.usingTest4Div.locator('.btn-primary')
    this.secondButton = this.usingTest4Div.locator('.btn-secondary')

    // Test 5 Div Elements
    this.test5Button = this.usingTest5Div.locator('#test5-button')
    this.successMessage = this.usingTest5Div.locator('#test5-alert');

  }

  /**
   * Logs in with the passed arguments and asserts that the Email, Password inputs and Login button elements are visible.
   * @param {Object} userDetails - The login data containing the email and password.
   * @param {string} userDetails.email - The email address to be used for login.
   * @param {string} userDetails.password - The password to be used for login.
   * @returns {Promise<void>} A promise that resolves when the login process is complete.
   */
  async loginWithCredentialsAndAssertElements(userDetails) {

    //Assert that both the email address and password inputs are present as well as the login button
    await expect(this.emailAdressInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await expect(this.signinButton).toBeVisible();

    //Enter in an email address and password combination into the respective fields
    await this.emailAdressInput.fill(userDetails.email)
    await this.passwordInput.fill(userDetails.password)
    await this.signinButton.click()
  }

  /**
   * This function validates the list group items and badge values on a Test 2 div.
   * @param {*} listItemNumber  - An integer for the child number of the list item to be retrieved.
   * @param {*} expectedListItemValue - A string for the expected value of the list item.
   * @param {*} badgeItemNumber - An integer for the child number of the badge item to be retrieved.
   * @param {*} expectedBadgeValue - An integer for the expected value of the badge item.
   */
  async validateListGroupItems(listItemNumber, expectedListItemValue, badgeItemNumber, expectedBadgeValue) {

    //In the test 2 div, assert that there are three values in the listgroup
    await expect(this.listGroupItems).toHaveCount(3)

    //Assert that the second list item's value is set to "List Item 2"
    const ListItemsValue = await this.page.$eval(`#test-2-div .list-group-item:nth-child(${listItemNumber})`, item => item.firstChild.textContent.trim());
    expect(ListItemsValue).toEqual(expectedListItemValue)

    //Assert that the second list item's badge value is 6
    const ListItemsBadgeValue = await this.page.$eval(`#test-2-div .list-group-item:nth-child(${badgeItemNumber}) .badge`, badge => badge.textContent.trim());
    expect(parseInt(ListItemsBadgeValue, 10)).toEqual(expectedBadgeValue)
  }


  async verifyDefaultAndSelectOptionInDropdown() {

    //In the test 3 div, assert that "Option 1" is the default selected value
    const dropdownMenuButtonText = await this.dropdownMenuButton.innerText()
    expect(dropdownMenuButtonText.trim()).toEqual('Option 1')

    //Select "Option 3" from the select list
    await this.dropdownMenuButton.click()
    await this.dropdownMenuItem.filter({ hasText: "Option 3" }).click()

  }


  async checkButtonStates() {

    // In the test 4 div, assert that the first button is enabled and that the second button is disabled
    expect(await this.firstButton.isEnabled()).toBeTruthy();
    expect(await this.secondButton.isEnabled()).toBeFalsy();

  }

  async validateButtonClickAndSuccessMessageWithRandomDelay() {

    //  In the test 5 div, wait for a button to be displayed (note: the delay is random) and then click it
    await this.test5Button.waitFor({ state: 'visible' });
    await this.test5Button.click()

    // Once you've clicked the button, assert that a success message is displayed
    await this.successMessage.waitFor({ state: 'visible' });
    expect(await this.successMessage.innerText()).toEqual('You clicked a button!');

    // Assert that the button is now disabled
    expect(await this.test5Button.isEnabled()).toBeFalsy();

  }

/**
 * 
 * @param {*} rowNumber - An integer for the row number of the table
 * @param {*} columnNumber  - An integer for the column number of the table
 * @param {*} expectedTargetCellValue - A string for the expected target cell value of the table
 */
  async retrieveAndVerifyGridCellValue(rowNumber, columnNumber, expectedTargetCellValue) {

    //  Write a method that allows you to find the value of any cell on the grid
    //Since the 'findCellValue' function can be reusable for other page objects I created a HelperBase and extends the class

    // Use the method to find the value of the cell at coordinates 2, 2 (staring at 0 in the top left corner)
    const targetedCellValue = await this.findCellValue(rowNumber, columnNumber)

    // Assert that the value of the cell is "Ventosanzap"
    expect(targetedCellValue).toEqual(expectedTargetCellValue)

  }

}














