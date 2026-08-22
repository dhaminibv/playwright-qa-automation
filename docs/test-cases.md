# Automation Test Cases

## UI - Sauce Demo

| ID | Scenario | Priority | Type | Automated |
|---|---|---:|---|---|
| UI-001 | Login with valid credentials | High | Functional/Smoke | Yes |
| UI-002 | Locked user cannot log in | High | Negative | Yes |
| UI-003 | Add a product to cart | High | Functional | Yes |
| UI-004 | Remove a product from cart | Medium | Functional | Yes |
| UI-005 | Complete checkout | Critical | End-to-End | Yes |
| UI-006 | Sort inventory by price low-to-high | Medium | Functional | Yes |
| UI-007 | Add and Remove Multiple products in cart | Medium | Functional | Yes |
| UI-008 | Verify checkout validation for missing required fields | High | Negative | Planned |
| UI-009 | Verify cart persists after navigating back to inventory | Medium | Regression | Planned |
| UI-010 | Verify logout removes access to authenticated pages | High | Security/Session | Planned |
| UI-011 | Verify product details match the selected product | Medium | Functional | Planned |

## API - Restful Booker

| ID | Scenario | Priority | Type | Automated |
|---|---|---:|---|---|
| API-001 | Create booking with valid payload | Critical | API/Contract | Yes |
| API-002 | Retrieve created booking by ID | Critical | Integration | Yes |
| API-003 | Filter bookings by first and last name | High | Functional | Yes |
| API-004 | Update an existing booking with PUT | High | Functional | Planned |
| API-005 | Partially update a booking with PATCH | High | Functional | Planned |
| API-006 | Reject unauthenticated update request | High | Security | Planned |
| API-007 | Validate required fields and invalid data | High | Negative | Planned |

## Testing approach

- **Smoke:** Critical paths that should pass before deeper regression testing.
- **Regression:** Existing functionality affected by a new change.
- **Negative:** Invalid input, invalid state, and restricted-user scenarios.
- **API:** Status code, response schema/data, integration and business-rule validation.
- **Priority:** Based on business impact and likelihood of failure.
