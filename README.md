# QA Automation Assignment

## Overview

This project contains UI and API automation tests developed using **Playwright with TypeScript**.

The framework follows the **Page Object Model (POM)** and Playwright fixtures to keep the test code clean, reusable, and maintainable.


## Tech Stack

* Playwright
* TypeScript
* Node.js
* Page Object Model (POM)
* Playwright Fixtures
* Allure Reporting
* REST API Automation
* Git


## Application Under Test

### UI Application

**SauceDemo**

URL: https://www.saucedemo.com

### API Application

**Reqres**

URL: https://reqres.in

## Project Structure

my_qa_assignment/
│
├── pages/
│   ├── LoginPage.ts
│   ├── ProductPage.ts
│   ├── CartPages.ts
│   ├── CheckoutInformationPage.ts
│   ├── CheckoutOverviewPage.ts
│   └── CheckoutCompletePage.ts
│
├── fixtures/
│   └── BaseFixture.ts
│
├── tests/
│   ├── ui/
│   │   └── saucedemo.spec.ts
│   │
│   └── api/
│       └── users.spec.ts
│
├── allure-results/
├── allure-report/
├── playwright.config.ts
├── package.json
├── package-lock.json
├── tsconfig.json
└── README.md

## UI Test Scenarios

The following scenarios are automated for the SauceDemo application.

### 1. Standard User Login

* Login using `standard_user`
* Verify successful navigation to the Products page
* Verify the inventory URL

### 2. Locked-Out User Login

* Login using `locked_out_user`
* Verify the locked-out error message
* Verify that the user is not logged in

### 3. Add Products and Sort

* Login as a standard user
* Add two products to the cart
* Verify the cart badge shows `2`
* Sort products by **Price (low to high)**
* Verify the first displayed product has the lowest price

### 4. Complete Checkout

* Login as a standard user
* Add two products
* Open the shopping cart
* Proceed to checkout
* Enter customer information
* Continue to checkout overview
* Finish the order
* Verify the message:

`Thank you for your order!`


## API Test Scenarios

### 1. GET Users

Endpoint:

`GET /api/users?page=2`

Validations:

* Response status is `200`
* `data` is an array
* Each user contains:

  * `id`
  * `email`
  * `first_name`
  * `last_name`

### 2. POST Create User

Endpoint:

`POST /api/users`

Request body:

{
  "name": "morpheus",
  "job": "leader"
}


Validations:

* Response status is `201`
* Response contains the requested `name`
* Response contains the requested `job`
* Response contains `id`
* Response contains `createdAt`


## Test Credentials

### SauceDemo

| User            | Password     |
| --------------- | ------------ |
| standard_user   | secret_sauce |
| locked_out_user | secret_sauce |
| problem_user    | secret_sauce |

## Framework Approach

### Page Object Model

Page-specific locators and actions are maintained inside separate page classes.

This keeps the test cases focused on business flows rather than locator implementation.

### Playwright Fixtures

`BaseFixture.ts` is used to initialize and provide Page Object instances to the tests.

### Semantic Locators

The framework primarily uses Playwright's role-based locators such as:

* `getByRole()`
* `getByText()`

CSS locators are used where required by the application's DOM structure.

### Assertions

Assertions are added at important checkpoints to verify:

* Page navigation
* Login result
* Cart count
* Product sorting
* Checkout progression
* Order completion
* API response status and payload

### Test Steps

Playwright `test.step()` is used to provide readable business-level steps in the Allure report.

Example:

Navigate to SauceDemo
Login with standard user
Verify Products page is displayed
Add two products to cart
Verify cart badge shows 2
Open shopping cart
Click Checkout
Fill checkout information
Click Finish
Verify order completion message

## Allure Reporting

Allure reporting is integrated using `allure-playwright`.

### Run Tests

npx playwright test

### Generate Allure Report

npx allure generate allure-results -o allure-report --clean

### Open Allure Report

npx allure open allure-report

The report provides:

* Test execution status
* Pass/Fail status
* Test duration
* Individual test steps
* Failed-step information

## Installation

Clone the repository and install dependencies:

npm install

Run all tests:

npx playwright test

Run UI tests:

npx playwright test tests/ui

Run API tests:

npx playwright test tests/api

## Test Execution

The framework is configured to run tests using Chromium.

Playwright captures:

* Screenshots for failed tests
* Trace information on the first retry

These settings are configured in `playwright.config.ts`.

## Key Automation Practices

* Page Object Model
* Reusable Playwright fixtures
* Async/await
* Semantic locators
* Focused assertions
* Independent test cases
* API request automation
* Allure reporting
* Clear business-level test steps
* Maintainable TypeScript code

## Result

The automation suite covers the required SauceDemo UI scenarios and Reqres API scenarios with Playwright and TypeScript.

Allure reporting provides visibility into test status, execution duration, and individual test steps.
