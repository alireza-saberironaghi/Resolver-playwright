import { HelperBase } from './HelperBase.js';

const { test, expect } = require('@playwright/test');

export class HomePage extends HelperBase {

  constructor(page) {
    super(page)

    // Sections
    this.test1Section = page.locator('#test-1-div')
    this.test2Section = page.locator('#test-2-div')
    this.test3Section = page.locator('#test-3-div')
    this.test4Section = page.locator('#test-4-div')
    this.test5Section = page.locator('#test-5-div')
    this.test6Section = page.locator('#test-6-div')

    // Test 1 Section Elements
    this.emailAdressInput = this.test1Section.locator('#inputEmail')
    this.passwordInput = this.test1Section.getByRole('textbox', { name: 'Password' })
    this.signinButton = this.test1Section.getByRole('button', { name: 'Sign in' })

    // Test 2 Section Element
    this.listGroupItems = this.test2Section.getByRole('list').locator(".list-group-item")

    // Test 3 Section Elements
    this.dropdownMenuButton = this.test3Section.locator('#dropdownMenuButton')
    this.dropdownMenuItem = this.test3Section.locator('.dropdown-menu .dropdown-item')

    // Test 4 Section Elements
    this.firstButton = this.test4Section.locator('.btn-primary')
    this.secondButton = this.test4Section.locator('.btn-secondary')

    // Test 5 Section Elements
    this.test5Button = this.test5Section.locator('#test5-button')
    this.successMessage = this.test5Section.locator('#test5-alert');

  }



  // Section 1 methods
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



  // Section 2 methods
  /**
   * This function validates the list group items and badge values on a Test 2 div.
   * @param {*} listItemNumber  - An integer for the child number of the list item to be retrieved.
   * @param {*} expectedListItemValue - A string for the expected value of the list item.
   * @param {*} badgeItemNumber - An integer for the child number of the badge item to be retrieved.
   * @param {*} expectedBadgeValue - An integer for the expected value of the badge item.
   */
  async validateListGroupItems(listGroupDetails) {

    //In the test 2 div, assert that there are three values in the listgroup
    await expect(this.listGroupItems).toHaveCount(3)

    //Assert that the second list item's value is set to "List Item 2"
    const ListItemsValue = await this.page.$eval(`#test-2-div .list-group-item:nth-child(${listGroupDetails.listItemNumber})`, item => item.firstChild.textContent.trim());
    expect(ListItemsValue).toEqual(listGroupDetails.expectedListItemValue)

    //Assert that the second list item's badge value is 6
    const ListItemsBadgeValue = await this.page.$eval(`#test-2-div .list-group-item:nth-child(${listGroupDetails.badgeItemNumber}) .badge`, badge => badge.textContent.trim());
    expect(parseInt(ListItemsBadgeValue, 10)).toEqual(listGroupDetails.expectedBadgeValue)
  }



  // Section 3 methods
  async verifyDefaultAndSelectOptionInDropdown(dropdownOptionValues) {

    //In the test 3 div, assert that "Option 1" is the default selected value
    const dropdownMenuButtonText = await this.dropdownMenuButton.innerText()
    expect(dropdownMenuButtonText.trim()).toEqual(dropdownOptionValues.option1)

    //Select "Option 3" from the select list
    await this.dropdownMenuButton.click()
    await this.dropdownMenuItem.filter({ hasText: dropdownOptionValues.option3 }).click()

  }

  // Section 4 methods
  async checkButtonStates() {

    // In the test 4 div, assert that the first button is enabled and that the second button is disabled
    expect(await this.firstButton.isEnabled()).toBeTruthy();
    expect(await this.secondButton.isEnabled()).toBeFalsy();

  }

  // Section 5 methods
  async validateButtonClickAndSuccessMessageWithRandomDelay(alertMessages) {

    //  In the test 5 div, wait for a button to be displayed (note: the delay is random) and then click it
    await this.test5Button.waitFor({ state: 'visible' });
    await this.test5Button.click()

    // Once you've clicked the button, assert that a success message is displayed
    await this.successMessage.waitFor({ state: 'visible' });
    expect(await this.successMessage.innerText()).toEqual(alertMessages.success);

    // Assert that the button is now disabled
    expect(await this.test5Button.isEnabled()).toBeFalsy();

  }

  // Section 6 methods
/**
 * 
 * @param {*} rowNumber - An integer for the row number of the table
 * @param {*} columnNumber  - An integer for the column number of the table
 * @param {*} expectedTargetCellValue - A string for the expected target cell value of the table
 */
  async retrieveAndVerifyGridCellValue(gridCellDetails) {

    //  Write a method that allows you to find the value of any cell on the grid
    //Since the 'findCellValue' function can be reusable for other page objects I created a HelperBase and extends the class

    // Use the method to find the value of the cell at coordinates 2, 2 (staring at 0 in the top left corner)
    const targetedCellValue = await this.findCellValue(gridCellDetails)

    // Assert that the value of the cell is "Ventosanzap"
    expect(targetedCellValue).toEqual(gridCellDetails.expectedTargetCellValue)

  }

}














