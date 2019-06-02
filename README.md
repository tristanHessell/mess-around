This is a project where I am playling with react & hooks.

Most things here wont be particularly good code or structure.

The redux side of this application is organised a la Ducks[https://github.com/erikras/ducks-modular-redux]

# Questions you might have

## Why use `reach/router`
Its API is far more useful than `react-router` & v5 of `react-router` will be more similar to `reach/router` than `react-router`

## Why use `redux-saga`?
`redux-saga` provides everything that `redux-thunk` does, in addition to the ability to cancel actions.

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
Move to redux-saga (which internally handles cancelling actions)

Figure out how to handle unsaved changes properly
  Save unsaved changes to session storage? - show indication that changes have been made in playlist list?

Add a loading modal (with a custom message), show it when you load the playlists or save the comments
Go full redux - to try it out
Check if changes in comments before changing url
connect to spotify
connect to a DB
landing page
Application Structure
Testing
  Components
  Redux
