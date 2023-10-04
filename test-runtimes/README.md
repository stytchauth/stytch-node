## Test Runtime Fixtures

The Javascript language has a _LOT_ of runtimes. We try to support them all. If you're having trouble using Stytch due to
a runtime-related reason, please [open an issue](https://github.com/stytchauth/stytch-node/issues/new) and we'll take a look.

This directory contains test fixtures that make it easier to quickly use the `stytch` package in a number of locations.
This directory is a scratch space - expect things to be slightly broken or cumbersome to use. For example, we don't have
any CI/CD set up for these projects, and if you want to contribute you'll need to create your own credentials for use with
various runtime providers.

When adding a new runtime, try to keep the fixture as close to minimal as possible. For example, prefer a `npx create-project...` style command.

Runtime validation is defined as:

- The Stytch client can be successfully imported
- The Stytch client can make a successful network request to the Stytch servers

We can use the following project ID and secret, which are special values that return a pre-canned response from Stytch:

```javascript
const client = new stytch.Client({
  project_id: "project-live-c60c0abe-c25a-4472-a9ed-320c6667d317",
  secret: "secret-live-80JASucyk7z_G8Z-7dVwZVGXL5NT_qGAQ2I=",
});
```

## Runtime Notes

All Runtimes:

- Each runtime maintains its own `package.json` and set of node modules. We'll use real workspaces SomeDay™️
- The `stytch` version in the package might need manual adjusting. It could be a prerelease version of something you'd like to check, or `../..` to use the local copy of `stytch`.
- Local copies don't seem to work with Vercel production builds, only, well, locally

### Cloudflare Workers

- You'll need a Cloudflare account
- `npm run start` for local development
- `npm run deploy` will build and deploy the worker. The CLI should guide you through credential setupneed to publish a package

### Remix

- You'll need a Vercel account
- `npm run dev` for local development
- `npx vercel` to deploy to vercel

## NextJS

- You'll need a Vercel account
- `npm run dev` for local development
- `npx vercel` to deploy to vercel
- `/api/hello` runs a serverless request
- `/api/edge` runs an edge request

## Deno

TODO!

## Bun

TODO!
