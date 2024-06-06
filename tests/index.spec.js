const { test } = require('@playwright/test');
const path = require('path');
import { environmentsURL, userDetails, listGroupDetails, dropdownOptionValues, alertMessages, gridCellDetails } from '../Test-data/dataManagement.js'
import { PageManager } from '../Page-objects/PageManager.js'

test.beforeEach(async ({ page }) => {
  const filePath = path.join(__dirname, environmentsURL.demoURL);
  await page.goto(`${filePath}`);
  const pm = new PageManager(page)
  await pm.navigateTo().homePage()
})


test('Test 1: Verify Login Form Presence and Functionality', async ({ page }) => {
  const pm = new PageManager(page)
  await pm.onHomePage().assertLoginElementsVisible()
  await pm.onHomePage().loginWithCredentials(userDetails)
});

test('Test 2: Validate List Group Items', async ({ page }) => {
  const pm = new PageManager(page)
  await pm.onHomePage().assertListGroupItemCount(3)
  await pm.onHomePage().assertListGroupItemValue(listGroupDetails)
  await pm.onHomePage().assertBadgeValue(listGroupDetails)
});

test('Test 3: Verify Default and Select Option in Dropdown', async ({ page }) => {
  const pm = new PageManager(page)
  await pm.onHomePage().assertDefaultDropdownOption(dropdownOptionValues)
  await pm.onHomePage().selectDropdownOption(dropdownOptionValues)
});

test('Test 4: Check Button States', async ({ page }) => {
  const pm = new PageManager(page)
  await pm.onHomePage().assertFirstButtonIsEnabled()
  await pm.onHomePage().assertSecondButtonIsDisabled()
});

test('Test 5: Validate Button Click and Success Message with Random Delay', async ({ page }) => {
  const pm = new PageManager(page)
  await pm.onHomePage().clickButtonAndWaitForSuccessMessage(alertMessages, 15000)
  await pm.onHomePage().assertButtonDisabledAfterClick()
});

test('Test 6: Retrieve and Verify Grid Cell Value', async ({ page }) => {
  const pm = new PageManager(page)
  await pm.onHomePage().retrieveAndVerifyGridCellValue(gridCellDetails)
});