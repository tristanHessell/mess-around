# Mess Around (Proper name to come) <!-- omit in toc -->

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
TODO add build status badge
TODO add badge for test coverage

This is a project I am using to try out different technologies, concepts and methodologies. You should have no reason to read any further into the codebase.

Have you ever created a playlist for someone and want to explain how and why you chose each song?

This project has come about because I wanted to do exactly that.

---

- [React](#react)
  - [Component Naming Convention](#component-naming-convention)
- [Redux](#redux)
  - [Action Type Naming Convention](#action-type-naming-convention)
  - [Action Creator Naming Convention](#action-creator-naming-convention)
- [Application Structure](#application-structure)
- [FAQ](#faq)
  - [Why use `reach/router`?](#why-use-reachrouter)
  - [Why use `redux-saga`?](#why-use-redux-saga)
  - [Why have you structured modals in the way you have?](#why-have-you-structured-modals-in-the-way-you-have)
  - [Why did you use `loki` for visual regression testing?](#why-did-you-use-loki-for-visual-regression-testing)
  - [Why did you use Cypress for E2E & Integration tests](#why-did-you-use-cypress-for-e2e--integration-tests)
  - [Why are you using Cypress run in headed mode? (with `--headed`) flag](#why-are-you-using-cypress-run-in-headed-mode-with---headed-flag)
  - [Why are you using `fetch-mock` and not `cy.server()` in the Cypress tests?](#why-are-you-using-fetch-mock-and-not-cyserver-in-the-cypress-tests)
  - [`page.js` in the Cypress tests?](#pagejs-in-the-cypress-tests)
  - [Your API isn't actually RESTful](#your-api-isnt-actually-restful)
  - [Releasing seems weird?](#releasing-seems-weird)

---
## Installation

```bash
yarn install
```

## Running and the application

TODO write about and link to immutable webapps

### Environment Variables

| Name | Description | Example |
| ---  | ----------- | ------- |
| API_URL | The fully qualified URL for the endpoint gateway | http://localhost:5000 |
| PUBLIC_URL | The fully qualified URL for the server hosting the assets | http://localhost:4000 |
| HOST | The host used for the webpack dev server in local development | localhost |
| PORT | The port used for the webpack dev server in local development | 9000 |

### Running the application locally

//

### Production Build TODO

//

## React

The `react` component side of the application is organised/named such that redux-connected components are split into display & container components. There are various reasons for this, one of them being that it is easier to test the display side of the component when there is a seperation of concerns between what is shown vs how it is shown.

### Component Naming Convention

|Naming Convention|Description|Example|
|-|-|-|
|*Container|The component connects to redux.|PlaylistsContainer|
|*Wrapper|The component is the overall containing element that encapsulates a component. `Wrapper` is named as such to avoid overloading `Container`.|PlaylistWrapper|
|*Page|The component is the top level component for a given URL.|PlaylistPage|

## Redux

The `redux` side of this application is organised a la [Ducks](<https://github.com/erikras/ducks-modular-redux>), with a slight difference taken from [here](<https://gist.github.com/datchley/4e0d05c526d532d1b05bf9b48b174faf#redux-organization--feature_first_ducks>).

### Action Type Naming Convention

The actions should be structured as follows:

|Action Suffix|Description|Example|
|-|-|-|
|REQUEST| Signifies that the action has started|FETCH_COMMENTS_REQUEST|
|FAILURE| Signifies that the action failed |FETCH_COMMENTS_FAILURE|
|SUCCESS| Signifies that the action worked |FETCH_COMMENTS_SUCCESS|

### Action Creator Naming Convention

|Action Creator Prefix|Description|Example|
|-|-|-|
|fetch| calls an external source to get data |fetchComments|
|save| calls an exernal source to save data |saveComments|

## Application Structure

```javascript
src/
  backend/
    endpoints/
      route/
        index.js // the endpoints for given route
      index.js // amalgamates the routes into a single router
    db/ // an abstraction of an actual DB
    index.js // the actual running webserver
  frontend/
    components/
      ComponentName/
        index.js // should contain AT LEAST the default export of the primary component
        styles.js // will only contain styled components
        ComponentName.js
        ComponentName.container.js // if the component connects to redux
        ComponentName.stories.js // for storybook/visual regression tests
        ComponentName.spec.js
    pages/
      urlName/
        UrlNamePage.js
        index.js
    redux/
      modules/
        actions.js // exports named actions
        index.js // default exports the reducer
        stateName.spec.js
        selectors.js // exports named selectors
        types.js // exports named action types
      index.js //
      reducer.js //
      store.js //
      api/
        index.js // contains the code that interacts with the/other servers
        *.pact.js // a pact consumer test for each kind of interaction with the server
    tests/ // for integration/e2e tests
      cypress/ // holds the cypres e2e tests & config
        test-area/
          test-area.test.js // the actually cypress test
          page.js // the PageObject for the given test-area
      enzyme/ // holds the enzyme FE integration tests
    App.js
    index.js
```

## FAQ

### Why use `reach/router`?

Its API is far more useful than `react-router` & v5 of `react-router` will be more similar to `reach/router` than `react-router`

### Why use `redux-saga`?

`redux-saga` provides everything that `redux-thunk` does, in addition to the ability to cancel actions built-in.

### Why have you structured modals in the way you have?

- See [this](<https://stackoverflow.com/questions/35623656/how-can-i-display-a-modal-dialog-in-redux-that-performs-asynchronous-actions/35641680>)
- Also making that redux is serializable (meaning we can't store functions)

### Why did you use `loki` for visual regression testing?

- Because there are many, many tools and I needed to pick one.
- Its free and plugs into Storybook, a tool that is in use in the project.
- Note: Loki hangs when run in the VSCode terminal, so only run it from the OS terminal
- Link [here](<https://github.com/oblador/loki>)

### Why did you use Cypress for E2E & Integration tests

- Terminology: E2E tests will not mock the server interactions, integration tests will.
- Cypress just works out the box.
- The limitation of only working in Chrome is something I can handle for now.
- I played around with using full mounting & enzyme [this](<https://www.ebayinc.com/stories/blogs/tech/integration-testing-with-react-and-enzyme/>), but I found that there was too many work arounds/hacks to make the tests work.
  - These tests would ideally be the same as Cypress tests, except significantly faster.

### Why are you using Cypress run in headed mode? (with `--headed`) flag

- Tests were passing when running in chrome (via `open` cli command), but failing with the run command.
- I continued to use electron for the `run` tests as it comes baked into cypress.
- See [this](<https://github.com/cypress-io/cypress/issues/1011>)

### Why are you using `fetch-mock` and not `cy.server()` in the Cypress tests?

- `cy.server()` does not deal with fetch - only `XMLHttpRequest`'s.
- Although there are work arounds, using `fetch-mock` seemed the most reasonable.

### `page.js` in the Cypress tests?

- Short for PageObject, this contains abstractions for getting/fiddling with the specifics of the test area at hand.
- This is a common pattern for tests that interact with UI, its basis coming from [this](<https://martinfowler.com/bliki/PageObject.html>).

### Your API isn't actually RESTful

- Agreed. I have purposely not implemented HATEOAS - although I have taken the API to RMM level 2.
- Proper REST (as defined by Roy T. Fielding Phd thesis and spoken about at talks/twitter & his blog), would include HATEOAS.
- One of the driving forces behind HATEOAS is that the server specifies what it can and can't do at a given state, and has the freedom change its interface due to the client being coupled to only what it is told by the server.
  - To clarify, this means that the server specifies what actions the client can take and the client needs no outside knowledge on how to execute those actions
- While I think this is an excellent idea, I am using this project as a means to test different technologies/patterns.
- I will look to implement HATEOAS at a future date.

### Releasing seems weird?

- I am using `@semantic-release` to facilitate CHANGELOG, package versioning and releases.
- Normally this would be done through CI, but that doesn't exist yet.
- This will change one this codebase uses CI.
- This is also an application for me to play around with and releasing is not something I plan on ever doing

## Contributing

Expect reported issues to be responded to within 24 hours. There are clearly no assurances on how long an issue will be fixed (or if it will be fixed at all).

Likewise, pull requests will be responded to within 24 hours. If you are contributing, please read the CONTRIBUTING.md document (TODO add link).

