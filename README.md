# Spotify-list (Proper name to come)

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

## Application Structure TODO

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

## Questions you might have

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

## TODO

Set up github repo better

- run tests on merge PR
- run lint on merge PR
- make sure you cannot push directly to master

---

Research naming standard for components (including styled components)

- Not super happy with what I've chosen so far

Write visual regression snapshot testing

- Add some actual tests

Give Swagger a shot

Move to rxjs

- Inspiration: [this]<https://redux-saga.js.org/>

Address Accessability Issues

- [this]<https://www.w3.org/WAI/standards-guidelines/aria/>

Add pact for contract testing

- Make pact test expectations much more in depth

Handle CORS properly

- [this]<https://expressjs.com/en/resources/middleware/cors.html>

Style app better

Connect to spotify (store credentials in front end only)

- Add tests for log-in flow(?)
- Add fixtures for stubbed data returned from spotify

Create responsive UI for different screen sizes

- Desktop
- Mobile

Changelog commits + process for generating changelog

Add helmetjs to only use headers we want

Add badges to readme

Make the application RESTful

- Add more descriptive status codes for when things go wrong in endpoints
- HATEOAS
- See [this]<https://martinfowler.com/articles/richardsonMaturityModel.html>

Write cypress tests that don't suck

- Include tests that are actually end-to-end (rather than using just fetch-mock)
  - do this after actual accounts are featured

Simplify Webpack

- remove all the unnecessary stuff from the create-react-app

Figure out how to handle unsaved changes properly
  Save unsaved changes to session storage? - show indication that changes have been made in playlist list?

Add a loading modal (with a custom message), show it when you load the playlists or save the comments
Check if changes in comments before changing url
connect to a DB
landing page

put save all button somewhere reasonable

Server-side rendering

Create app as an electron app

## Notes

<https://gist.github.com/datchley/4e0d05c526d532d1b05bf9b48b174faf>
