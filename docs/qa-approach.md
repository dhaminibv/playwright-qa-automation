# QA Approach

## Risk-based prioritization

High-risk flows are tested first when time is limited:

1. Authentication and account access
2. Checkout / transaction flow
3. Core business functionality
4. API data integrity
5. Lower-impact UI behavior

## Defect reporting standard

A useful defect should contain:

- Clear title
- Environment
- Preconditions
- Steps to reproduce
- Expected result
- Actual result
- Severity / priority
- Screenshot, trace or response evidence when useful

## Automation principles

- Prefer stable user-facing locators.
- Keep test intent readable.
- Use page objects for reusable UI actions.
- Keep test data separate from test logic.
- Avoid unnecessary waits.
- Tag smoke/regression scenarios.
- Keep CI execution deterministic.
