import { HelperBase } from './HelperBase.js';

const { test, expect } = require('@playwright/test');

export class HomePage extends HelperBase {

  constructor(page) {
    super(page)

    // Sections
    this.test1Section = page.locator('#test-1-div')
    this.test2Section = page.locator('//div[@id="test-2-div"]')
    this.test3Section = page.locator('.col-sm-4#test-3-div')
    this.test4Section = page.locator('[id="test-4-div"]')
    this.test5Section = page.locator('.jumbotron #test-5-div')
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

  //Assert that both the email address and password inputs are present as well as the login button
  async assertLoginElementsVisible() {
    await this.assertElementVisible(this.emailAdressInput)
    await this.assertElementVisible(this.passwordInput)
    await this.assertElementVisible(this.signinButton)
  }

  /**
 * Logs in with the passed arguments and asserts that the Email, Password inputs and Login button elements are visible.
 * @param {Object} userDetails - The login data containing the email and password.
 * @param {string} userDetails.email - The email address to be used for login.
 * @param {string} userDetails.password - The password to be used for login.
 * @returns {Promise<void>} A promise that resolves when the login process is complete.
 */
  //Enter in an email address and password combination into the respective fields
  async loginWithCredentials(userDetails) {
    await this.fillInput(this.emailAdressInput, userDetails.email)
    await this.fillInput(this.passwordInput, userDetails.password)
    await this.clickOnElement(this.signinButton)
  }


  // Section 2 methods

  //In the test 2 div, assert that there are three values in the listgroup
  async assertListGroupItemCount(expectedCount) {
    await expect(this.listGroupItems).toHaveCount(expectedCount);
  }

  //Assert that the second list item's value is set to "List Item 2"
  async assertListGroupItemValue(listGroupDetails) {
    const listItemValue = await this.page.$eval(`#test-2-div .list-group-item:nth-child(${listGroupDetails.listItemNumber})`, item => item.firstChild.textContent.trim());
    expect(listItemValue).toEqual(listGroupDetails.expectedListItemValue);
  }

  //Assert that the second list item's badge value is 6
  async assertBadgeValue(listGroupDetails) {
    const badgeValue = await this.page.$eval(`#test-2-div .list-group-item:nth-child(${listGroupDetails.badgeItemNumber}) .badge`, badge => badge.textContent.trim());
    expect(parseInt(badgeValue, 10)).toEqual(listGroupDetails.expectedBadgeValue);
  }



  // Section 3 methods

  //In the test 3 div, assert that "Option 1" is the default selected value
  async assertDefaultDropdownOption(dropdownOptionValues) {
    const dropdownMenuButtonText = await this.dropdownMenuButton.innerText();
    expect(dropdownMenuButtonText.trim()).toEqual(dropdownOptionValues.option1);
  }

  //Select "Option 3" from the select list
  async selectDropdownOption(dropdownOptionValues) {
    await this.clickOnElement(this.dropdownMenuButton)
    await this.dropdownMenuItem.filter({ hasText: dropdownOptionValues.option3 }).click();
  }



  // Section 4 methods

  // In the test 4 div, assert that the first button is enabled 
  async assertFirstButtonIsEnabled() {
    await this.assertButtonEnabled(this.firstButton)
  }

  //In the test 4 div, assert that the second button is disabled
  async assertSecondButtonIsDisabled() {
    await this.assertButtonDisabled(this.secondButton)
  }



  // Section 5 methods

  async clickButtonAndWaitForSuccessMessage(alertMessages, timeout) {
    //  In the test 5 div, wait for a button to be displayed (note: the delay is random) and then click it
    await this.assertElementVisible(this.test5Button, timeout)
    await this.clickOnElement(this.test5Button)

    // Once you've clicked the button, assert that a success message is displayed
    await this.assertElementVisible(this.successMessage)
    expect(await this.successMessage.innerText()).toEqual(alertMessages.success);
  }


  // Assert that the button is now disabled
  async assertButtonDisabledAfterClick() {
    await this.assertButtonDisabled(this.test5Button)
  }



  // Section 6 methods

  async retrieveAndVerifyGridCellValue(gridCellDetails) {

    //  Write a method that allows you to find the value of any cell on the grid
    //Since the 'findCellValue' function can be reusable for other page objects I created a HelperBase and extends the class

    // Use the method to find the value of the cell at coordinates 2, 2 (staring at 0 in the top left corner)
    const targetedCellValue = await this.findCellValue(gridCellDetails)

    // Assert that the value of the cell is "Ventosanzap"
    expect(targetedCellValue).toEqual(gridCellDetails.expectedTargetCellValue)

  }

}














