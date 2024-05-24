# Playwright Test Project

## Overview
This repository contains a Playwright test project designed with an extremely maintainable, reusable, and sustainable structure. It includes comprehensive API tests covering POST, PATCH, DELETE, and GET requests, along with validations for each of these methods. The project is set up to be run both locally and in a CI/CD pipeline, with sensitive data securely managed.

## Features
- **Maintainable Structure**: The project follows best practices for code organization and test structure, making it easy to extend and maintain.
- **Reusable Code**: Common functions and utilities are abstracted to promote reuse across tests.
- **API Testing**: Comprehensive tests for API endpoints, including:
  - POST requests
  - PATCH requests
  - DELETE requests
  - GET requests
- **Environment Configuration**: Utilizes a `.env` file for local testing to manage sensitive data like bearer tokens and API base URLs.
- **CI/CD Integration**: Secure handling of sensitive data through GitHub Secrets for CI/CD pipeline execution.

## Included Endpoints
- **Comments**
- **Posts**
- **Todos**
- **Users**

## Prerequisites
- Node.js installed
- Yarn package manager installed

## Installation
1. Clone the repository:
    ```sh
    git clone https://github.com/testpilot1995/quatt-test.git
    cd quatt-test
    ```

2. Install the dependencies:
    ```sh
    yarn install
    ```

3. Install Playwright:
    ```sh
    npx playwright install
    ```

## Running Tests Locally
1. Set up your `.env` file in the root directory of the project with the following variables:
    ```env
    BEARER_TOKEN=your_bearer_token
    API_BASE_URL=your_api_base_url
    WORKERS=number_of_workers
    ```

2. Run the Playwright API tests:
    ```sh
    npm run test:api
    ```

## Environment Variables
- `BEARER_TOKEN`: The bearer token for API authentication.
- `API_BASE_URL`: The base URL for the API endpoints.
- `WORKERS`: Number of workers to be used for running tests.

## Running Tests in CI/CD
When running tests from a CI/CD pipeline, the `BEARER_TOKEN` is securely stored as a GitHub Secret. This means you do not need to configure anything manually for the tests to access the token during the CI/CD execution. However, please note that the CI/CD process may occasionally be flaky due to the domain not being enabled at all times, resulting in too many requests and triggering status code 429 (Too Many Requests).

## Enhancing the Testing Experience
To enhance your testing experience and make it more enjoyable, consider installing the following extensions in Visual Studio Code:
1. **Playwright Test for VSCode**:
    - Open Visual Studio Code.
    - Go to the Extensions view by clicking on the square icon in the sidebar or pressing `Ctrl+Shift+X`.
    - Search for "Playwright Test for VSCode".
    - Click "Install" to add the extension to your VS Code.
2. **Playwright Test Runner**:
    - Open Visual Studio Code.
    - Go to the Extensions view by clicking on the square icon in the sidebar or pressing `Ctrl+Shift+X`.
    - Search for "Playwright Test Runner".
    - Click "Install" to add the extension to your VS Code.

## Test Coverage
The project contains 179 tests, covering both happy and unhappy paths. While there is always room for more tests, this suite provides a solid foundation and should be considered decent and acceptable, especially in the absence of detailed acceptance criteria. Note that all 179 tests are executed when provided with a bearer token. Unfortunately, there are a few issues due to improper input validation.

## Contributing
Contributions are welcome! Please follow these steps to contribute:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Create a new Pull Request.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements
Thanks to the contributors and the community for making this project better.

---

Feel free to customize this README further based on the specifics of your project and organizational requirements.
