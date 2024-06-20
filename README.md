![Playwright](https://github.com/alireza-saberironaghi/Resolver-playwright/assets/98224391/4194f381-4059-4baa-abc6-7b79a65ed9ff)

# (Playwright with JavaScript)

The repository utilizes Playwright with JavaScript and is organized into several key parts:

- The first part is the test script that is implemented. 
  You can find the test script in the [`index.spec.js`](https://github.com/alireza-saberironaghi/Resolver-playwright/blob/main/tests/index.spec.js) file. This was made using Playwright.
- The next part is the helper base. 
  The helper base file can be found in the [`HelperBase.js`](https://github.com/alireza-saberironaghi/Resolver-playwright/blob/main/Page-objects/HelperBase.js).
- The test data file, where all Enums for the tests are defined, can be found in the [`dataManagement.js`](https://github.com/alireza-saberironaghi/Resolver-playwright/blob/main/Test-data/dataManagement.js) file.
- The homepage object model is implemented in the [`homePage.js`](https://github.com/alireza-saberironaghi/Resolver-playwright/blob/main/Page-objects/homePage.js) file.
- The page manager, which manages different page objects, is defined in the [`PageManager.js`](https://github.com/alireza-saberironaghi/Resolver-playwright/blob/main/Page-objects/PageManager.js).
- The guide file, which contains details on test cases and requirements, can be found in the [`guide.html`](https://alexqa.io/Resolver/guide.html) file.
- The index file, which details the system under test, can be found in the [`index.html`](https://alexqa.io/Resolver/index.html) file.

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
- **Test Data**: User details for testing purposes are in the [`dataManagement.js`](https://github.com/alireza-saberironaghi/Resolver-playwright/blob/main/Test-data/dataManagement.js).
- **Homepage Object Model**: Defined in the [`homePage.js`](https://github.com/alireza-saberironaghi/Resolver-playwright/blob/main/Page-objects/homePage.js) file.
- **Page Manager**: Manages the different page objects and is found in the [`PageManager.js`](https://github.com/alireza-saberironaghi/Resolver-playwright/blob/main/Page-objects/PageManager.js).
- **Guide**: Contains details on test cases and requirements in the [`guide.html`](https://alexqa.io/Resolver/guide.html) file.
- **Index**: Details the system under test in the [`index.html`](https://alexqa.io/Resolver/index.html) file.

## Good Practices

The project adheres to several good practices to ensure maintainability, readability, and efficiency:

- **KISS (Keep It Simple, Stupid)**: The test scripts are kept simple and straightforward, avoiding unnecessary complexity.
- **DRY (Don't Repeat Yourself)**: Common functionalities are abstracted into helper functions to avoid repetition.
- **Readability**: Code is written in a clear and readable manner, with meaningful variable and function names.
- **Maintainability**: The project is organized in a modular way, making it easy to update and maintain.
- **Consistent Naming Conventions**: Consistent naming conventions are used throughout the project to enhance clarity and understanding.
- **Comments and Documentation**: Proper comments and documentation are provided to explain the purpose and functionality of different parts of the code.
- **Scalability**: The test framework is designed to easily accommodate additional test cases and functionalities as the project grows.
- **Performance and Efficiency**: Test scripts are optimized to run efficiently, minimizing execution time while ensuring comprehensive test coverage.
- **Test Data Management**: Test data is managed effectively to ensure tests are independent, repeatable, and consistent.
- **Single Responsibility Principle (SRP)**: Each module or class has a single responsibility, making the codebase easier to understand, maintain, and extend.


## Reporting

After executing the tests, Playwright generates a report that you can access to see the results. By default, Playwright generates an HTML report which can be opened with the following command:
    ```bash
    npx playwright show-report
    ```

This will open a browser window displaying the test results.

![report](https://github.com/alireza-saberironaghi/Resolver-playwright/assets/98224391/428a0682-2983-45c1-b0ee-5c92e038d2f1)

## Conclusion

This project is a demonstration of using Playwright with JavaScript to automate tests for Resolver. The structure follows best practices to ensure maintainability and readability of the test code.
