
![Playwright](https://github.com/alireza-saberironaghi/Resolver-playwright/assets/98224391/c4452839-61db-4b49-9451-1044de60ed62)


# Resolver Technical Assessment (Playwright with JavaScript)

This repository is created to complete the technical assessment for the QA Engineer position at Resolver.

The repository utilizes Playwright with JavaScript and is organized into several key parts:

- The first part is the test script that is implemented. 
  You can find the test script in the [`index.spec.js`](https://github.com/alireza-saberironaghi/Resolver-playwright/blob/main/tests/index.spec.js) file. This was made using Playwright.
- The next part is the helper base. 
  The helper base file can be found in the [`HelperBase.js`](https://github.com/alireza-saberironaghi/Resolver-playwright/blob/main/Page-objects/HelperBase.js).
- The test data file, where all Enums for the tests are defined, can be found in the [`userDetails.js`](https://github.com/alireza-saberironaghi/Resolver-playwright/blob/main/Test-data/userDetails.js) file.
- The homepage object model is implemented in the [`homePage.js`](https://github.com/alireza-saberironaghi/Resolver-playwright/blob/main/Page-objects/homePage.js) file.
- The page manager, which manages different page objects, is defined in the [`PageManager.js`](https://github.com/alireza-saberironaghi/Resolver-playwright/blob/main/Page-objects/PageManager.js).

## Installation

If you want to run the tests from your local machine, follow the steps below.

1. Clone the repository:
    ```bash
    git clone https://github.com/alireza-saberironaghi/Resolver-playwright.git
    cd Resolver-playwright
    ```

2. Install Node.js (if not already installed). It's recommended to use Node Version Manager (nvm) to install Node.js:
    ```bash
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
    nvm install node
    ```

3. Install the required dependencies:
    ```bash
    npm install
    ```

## Execution

To execute the tests, you can use the following commands.

1. Run tests in headless mode (default):
    ```bash
    npx playwright test
    ```

2. Run tests in headed mode:
    ```bash
    npx playwright test --headed
    ```

## Project Structure

- **Test Script**: Located in the [`index.spec.js`](https://github.com/alireza-saberironaghi/Resolver-playwright/blob/main/tests/index.spec.js) file.
- **Helper Base**: Common helper functions are in the [`HelperBase.js`](https://github.com/alireza-saberironaghi/Resolver-playwright/blob/main/Page-objects/HelperBase.js).
- **Test Data**: User details for testing purposes are in the [`userDetails.js`](https://github.com/alireza-saberironaghi/Resolver-playwright/blob/main/Test-data/userDetails.js).
- **Homepage Object Model**: Defined in the [`homePage.js`](https://github.com/alireza-saberironaghi/Resolver-playwright/blob/main/Page-objects/homePage.js) file.
- **Page Manager**: Manages the different page objects and is found in the [`PageManager.js`](https://github.com/alireza-saberironaghi/Resolver-playwright/blob/main/Page-objects/PageManager.js).

## Reporting

After executing the tests, Playwright generates a report that you can access to see the results. By default, Playwright generates an HTML report which can be opened with the following command:
    ```bash
    npx playwright show-report
    ```

This will open a browser window displaying the test results.

## Conclusion

This project is a demonstration of using Playwright with JavaScript to automate tests for Resolver. The structure follows best practices to ensure maintainability and readability of the test code.
