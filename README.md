# Playwright QA Automation Portfolio

A practical **Playwright + JavaScript** automation project demonstrating UI, API, Page Object Model, test prioritization, reporting and CI concepts.

## What this project demonstrates

- UI automation against Sauce Demo
- API automation against Restful Booker
- Page Object Model (POM)
- Positive and negative test scenarios
- Smoke and regression tags
- Dynamic test data with Faker
- API response validation
- UI + API test separation
- HTML reporting
- CI-ready Playwright configuration
- Clear test-case documentation

## Applications under test

- UI: https://www.saucedemo.com/
- API: https://restful-booker.herokuapp.com/

Sauce Labs provides Sauce Demo as a sample application for automated testing.


## Setup

```bash
npm ci
npx playwright install
```

## Run tests

All tests:

```bash
npm test
```

UI tests:

```bash
npm run test:ui
```

API tests:

```bash
npm run test:api
```

Smoke tests:

```bash
npm run test:smoke
```

Regression tests:

```bash
npm run test:regression
```

## HTML report

After execution:

```bash
npm run report
```

The report is also generated automatically in:

```text
playwright-report/
```

## QA approach

The test suite prioritizes critical user journeys and high-impact API operations first. The documented test matrix includes additional negative, security and regression scenarios that can be added as the suite grows.

## Notes

This is a portfolio/practice project using public demo applications. Credentials used for Sauce Demo are demo credentials provided by the application.
