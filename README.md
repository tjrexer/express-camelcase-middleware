# Express Camelcase Middleware

Used to convert api requests to/from camelcase/snakecase depending on your requirements.

## Getting Started
### Prerequisites
* Node >=10.14.2
* npm 6.4.1

### Running Local Development
Since this is a package for middleware, there an express server is not required to be set up.  One is defined and used by supertest in the test file.

```
npm i
npm run test
```

## Contributing

When contributing to this reposity, please first open an issue and discuss intended changes with maintainers.  If there is already an issue open for the feature you are looking to develop, please just coordinate with maintainers before assigning issue to yourself.

### Branches

`master` is the main branch from which we publish packages.  `next` is the branch from which we will publish the next release.  All `issue` branches should be branched from `master`, unless specifically told by the maintainers to use a different branch.  All pull requests should be submitted to merge with `next` in order to make the next release.

### Workflow

- Fork repo
- Create an issue branch
- Commit your changes
- Open a PR against `next`.
- Link the Issue to your PR.

### Pull Request Guidelines

- PRs should be submitted to merge with `next`.
- PRs should be small in scope, work on 1 issue in a single PR.
- Link the Issue you are working to your PR.

You can add as many commits to your PR as you would like.  All commits will be squashed into a single commit when merging PR.

## Built With
- [Express](http://expressjs.com) - Web Framework
- [Jest](https://jestjs.io/) - Testing Framework
- [snakecase-keys](https://www.npmjs.com/package/snakecase-keys) - Snake Case conversion
- [camelcase-keys](https://www.npmjs.com/package/camelcase-keys) - Camel Case conversion