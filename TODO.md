
# TODO

Set up github repo better

- Add contributing guide
- Add husky for validation against commits
- run tests on merge PR
- run lint on merge PR

---

Make it so prettier doesn't break react build

- prettier rules should warn, but have a command to make warnings error

Add process for generating changelog + add releases

- [this]<https://github.com/semantic-release/semantic-release>

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
