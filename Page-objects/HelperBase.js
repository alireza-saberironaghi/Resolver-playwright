const { test, expect } = require('@playwright/test');

export class HelperBase {

  constructor(page) {
    this.page = page
  }

  async fillInput(inputElement, value) {
    await inputElement.waitFor({ state: 'visible' });
    await inputElement.fill(value);
  }

  async assertElementVisible(element, timeout = 5000) {
    await expect(element).toBeVisible({ timeout });
}


  async clickOnElement(element) {
    await element.waitFor({ state: 'visible' });
    await element.click();
  }

  async assertButtonEnabled(button) {
    expect(await button.isEnabled()).toBeTruthy();
  }
  async assertButtonDisabled(button) {
    expect(await button.isEnabled()).toBeFalsy();
  }


  //  Write a method that allows you to find the value of any cell on the grid
  async findCellValue(gridCellDetails) {
    const tableCellSelector = `table.table tbody tr:nth-child(${gridCellDetails.rowNumber + 1}) td:nth-child(${gridCellDetails.columnNumber + 1})`;
    return await this.page.textContent(tableCellSelector);
  }




}