const { test } = require('@playwright/test');

export class HelperBase {

  constructor(page) {
    this.page = page
  }


  async findCellValue(gridCellDetails) {
    const tableCellSelector = `table.table tbody tr:nth-child(${gridCellDetails.rowNumber + 1}) td:nth-child(${gridCellDetails.columnNumber + 1})`;
    return await this.page.textContent(tableCellSelector);
  }


}