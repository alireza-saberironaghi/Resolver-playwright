const { test } = require('@playwright/test');

export class HelperBase {

  constructor(page) {
    this.page = page
  }


  async findCellValue(rowNumber, columnNumber) {
    const tableCellSelector = `table.table tbody tr:nth-child(${rowNumber + 1}) td:nth-child(${columnNumber + 1})`;
    return await this.page.textContent(tableCellSelector);
  }


}