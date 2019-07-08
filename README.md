# Spotify-list (Proper name to come)

## Redux

The redux side of this application is organised a la [Ducks](<https://github.com/erikras/ducks-modular-redux>), with a slight difference taken from [here](<https://gist.github.com/datchley/4e0d05c526d532d1b05bf9b48b174faf#redux-organization--feature_first_ducks>).

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
  components/
    ComponentName/
      index.js
      styles.js // will only contain styled components
      component.js
      componet.test.js
  pages/
    urlName/
      UrlNamePage.js
      index.js
  redux/
    modules/
      actions.js // exports named actions
      index.js // default exports the reducer
      stateName.test.js
      selectors.js // exports named selectors
      types.js // exports named action types
  App.js
  api.js // contains the code that interacts with the server
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

## TODO

Write snapshot tests for (some) components

Write integration tests that test everything FE together (enzyme)

Write end-to-end tests that test EVERYTHING (cypress)

Move to rxjs
Change tests to rxjs

Figure out how to handle unsaved changes properly
  Save unsaved changes to session storage? - show indication that changes have been made in playlist list?

Add a loading modal (with a custom message), show it when you load the playlists or save the comments
Check if changes in comments before changing url
connect to spotify
connect to a DB
landing page
Application Structure
Testing
  Components

put save all button somewhere reasonable
