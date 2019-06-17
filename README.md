This is a project where I am playling with react

Most things here wont be particularly good code or structure.


##Redux
The redux side of this application is organised a la Ducks[https://github.com/erikras/ducks-modular-redux].

The actions are following
TODO BLAH_PENDING ETC
SAVE/GET/UPDATE ETC


# Questions you might have

## Why use `reach/router`
Its API is far more useful than `react-router` & v5 of `react-router` will be more similar to `reach/router` than `react-router`

## Why use `redux-saga`?
`redux-saga` provides everything that `redux-thunk` does, in addition to the ability to cancel actions.

## Why have you structured modals in the way you have?
- See this[https://stackoverflow.com/questions/35623656/how-can-i-display-a-modal-dialog-in-redux-that-performs-asynchronous-actions/35641680]
- Also making that redux is serializable (meaning we can't store functions)

# Application Structure
src/
  components/
    ComponentName/
      index.js
      test.js
  redux/
    modules/
      stateName.js
      stateName.test.js
  index.js
  api.js


TODOs
TODO consolidate action naming convention
Write reducer tests
Write tests with redux-thunk
Move to redux-saga (which internally handles cancelling actions)
Change tests to redux-saga
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
  Redux
