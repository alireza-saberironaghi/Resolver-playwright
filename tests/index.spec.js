const { test } = require('@playwright/test');
import { userDetails } from '../Test-data/userDetails.js'
import { PageManager } from '../Page-objects/PageManager.js'

test.beforeEach(async ({ page }) => {
  await page.goto('file:///C:/Users/Alireza/Desktop/QE-index.html')
  const pm = new PageManager(page)
  await pm.navigateTo().homePage()
})


test('Test 1: Verify Login Form Presence and Functionality', async ({ page }) => {
  const pm = new PageManager(page)
  await pm.onHomePage().loginWithCredentialsAndAssertElements(userDetails)
});

test('Test 2: Validate List Group Items', async ({ page }) => {
  const pm = new PageManager(page)
  await pm.onHomePage().validateListGroupItems(2,'List Item 2',2,6)
});

test('Test 3: Verify Default and Select Option in Dropdown', async ({ page }) => {
  const pm = new PageManager(page)
  await pm.onHomePage().verifyDefaultAndSelectOptionInDropdown()
});

test('Test 4: Check Button States', async ({ page }) => {
  const pm = new PageManager(page)
  await pm.onHomePage().checkButtonStates()
});

test('Test 5: Validate Button Click and Success Message with Random Delay', async ({ page }) => {
  const pm = new PageManager(page)
  await pm.onHomePage().validateButtonClickAndSuccessMessageWithRandomDelay()
});

test('Test 6: Retrieve and Verify Grid Cell Value', async ({ page }) => {
  const pm = new PageManager(page)
  await pm.onHomePage().retrieveAndVerifyGridCellValue(2, 2, "Ventosanzap")
});