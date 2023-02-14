# Development

Thanks for contributing to Stytch's Node library! If you run into trouble, find us in [Slack].

## Setup

1. Install a supported stable release of [Node](https://nodejs.org/).
   - You may find the currently supported Node version in this repo's `.nvmrc` file.
2. Clone this repo.
3. Run `npm install`.

## Source Files

The source code in this repo is in `lib` and written entirely in TypeScript.

## Generated Files

Run `npm run build` to generate the distributed JavaScript (`dist`) and TypeScript declarations (`types`). Commit these and include them in pull requests.

### Why do we commit generated code?

We only package `dist` and `types` when publishing to NPM. To make sure our published files are version-controlled and tied to the original source, we commit them to the repo.

## Testing

Please include tests for your changes. We don't have a test coverage requirement, but we like our test suite to give us reasonable confidence that everything works as intended.

### Unit Tests

Run `npm test`

### Integration Tests

Export the following environment variables and then run `npm test`:

- `PROJECT_ID='project-test-...'` is your Stytch test project ID
- `SECRET='secret-test-...'` is your Stytch test secret
- `RUN_INTEGRATION_TESTS=1` un-skips integration tests

## Issues and Pull Requests

Please file issues in this repo. We don't have an issue template yet, but for now, say whatever you think is important!

If you have non-trivial changes you'd like us to incorporate, please open an issue first so we can discuss the changes before starting on a pull request. (It's fine to start with the PR for a typo or simple bug.) If we think the changes align with the direction of the project, we'll either ask you to open the PR or assign someone on the Stytch team to make the changes.

When you're ready for someone to look at your issue or PR, assign `@stytchauth/client-libraries` (GitHub should do this automatically). If we don't acknowledge it within one business day, please escalate it by tagging `@stytchauth/engineering` in a comment or letting us know in [Slack].

[slack]: https://join.slack.com/t/stytch/shared_invite/zt-nil4wo92-jApJ9Cl32cJbEd9esKkvyg
