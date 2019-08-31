# Contributing to BLAH-BLAH-NAME <!-- omit in toc -->

Treat this document as the source of truth with respect to coding practises - there may be aspects of the codebase that do not abide by the rules and standards set out in this document.
Such areas had been put into the codebase before this guide reached its current point, and should be changed when working on the relevant areas.

- [Submitting a Pull Request](#submitting-a-pull-request)
- [Coding Rules](#coding-rules)
  - [Source Code](#source-code)
  - [Documentation](#documentation)
- [Working with the code](#working-with-the-code)
  - [Setup](#setup)
    - [Installation](#installation)
    - [Running the Application](#running-the-application)
  - [Linting](#linting)
  - [Testing](#testing)
  - [Committing](#committing)
  - [Merge Requests](#merge-requests)
- [Working with the documentation](#working-with-the-documentation)

---

## Submitting a Pull Request

Go right ahead! The smaller the PR the better, although a PR will no be refused on ground of being too large. It will just affect the time it takes to get accepted.
Any relevant test/documentation/dependency changes should be included in the PR for the given code changes.

## Coding Rules

### Source Code

All code modifications must have:

- No [linting](<TODO_LINK>) errors
- At least 1 test for the introduced changes (this will become stricter in the future)
- No failing tests
- Documentation for any features

### Documentation

In-code commenting should be [JSDoc](<TODO_LINK>) compliant where reasonable (such as named functions/modules).
Inline commenting that is for assistance to the reader should be line comments that occur on the line above (not at the end of the line in question).

All other documentation should be presented in `Markdown` files, with the `.md` extension.

All markdown files will need to pass `markdownlint` - as defined [here](https://github.com/DavidAnson/markdownlint).

If you are using VsCode, the `davidanson.vscode-markdownlint` extension will come in handy.

## Working with the code

New packages and dependencies should be added sparingly and with consultation of others in the repo.

### Setup

#### Installation

Requirements:

- `yarn` (or `npm`)
- `node`

```javascript
yarn install
```

#### Running the Application

To run the frontend locally:

```javascript
yarn run start
```

To run the backend locally:

```javascript
yarn run start-endpoints
```

### Linting

The whole `NAME OF APP` is linted using `eslint` and formatted using `prettier`.

### Testing

All relevant tests to your code changes will need to pass.

100% code coverage is not needed (yet), although code should be written in a way that is easily testable.

Tests should include commenting in-file explaining exactly what the tests are doing.

There are a variety of different tests (unit, visual & structural regression, contract, integration, e2e tests). Some of which are frontend only, some are backend only, some are both.

I have used a variety of different tools and libraries to get a taste for what is out there - for now, test what you feel is worthwhile.

TODO add a description of how to run the tests

### Committing

All commits *should* be atomic in the changes they represent.
All commits *must* use the message convention as specified by [semantic-release](https://github.com/semantic-release/semantic-release/blob/master/CONTRIBUTING.md#commit-message-guidelines).

This project uses `husky` and `commitizen`, so you shouldn't need to worry about ensuring that your commits are correct as long as you use the tooling correctly.

- To reiterate: A commit does not need to compile or pass all tests/linting in each commit, but a branch ready for merge into master does.
- However, it is prefered that all commits are 100% valid.

### Merge Requests

No invalid commits should be present in the master branch.

- This includes merge commits
- Any branch that does contains invalid commit messages will need to be squashed into master, with the squash commit being a valid commit message.

## Working with the documentation

There is currently no collated documentation for the repository - this will change in the future once a POC is completed.

---

This contributing guide has been inspired from [here](https://github.com/semantic-release/semantic-release/blob/master/CONTRIBUTING.md)
