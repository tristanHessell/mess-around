# TODO

- work on wait-for action

---

- [Immutable Web Apps]<https://immutablewebapps.org/>
  - add CI tasks for build
    - index.html: from webpack
    - assets: from webpack
    - endpoints: nothing for now
  - add CI tasks for deploy
    - index.html: TODO
    - assets: TODO
    - endpoints: do nothing (keep it as localhost for now)
  - script:
    - make sure version is in the files and the index.html
    - move map css js LICENSE files out
    - move .html to somewhere
    - move assets somewhere (url should have the version in the name)
  - set up aws account for hosting (ec2) etc
---

- set up css to listen to OS theme [type]<https://tombrow.com/dark-mode-website-css>

- Make sure unneeded headers are removed/ good ones are used
  - See: [this]<https://www.fastly.com/blog/headers-we-dont-want> and [this]<https://www.fastly.com/blog/headers-we-want>

- Adhere to README maturity model
  - Level One
  - Level Two
  - Level Three
  - Level Four
  - Level Five
  - See: [this]<https://github.com/LappleApple/feedmereadmes/blob/master/README-maturity-model.md>

- Adhere to API security checklist
- See: [this]<https://github.com/shieldfy/API-Security-Checklist>

- change loading to not flash modal

- Set up github repo better

  - make pushes to master "releases"

Style app better

  - find brand colours

  - style:
    - comments
    - titles
    - side bar
    - view song modal
    - buttons

Give Swagger a shot

Move to rxjs

- Inspiration: [this]<https://redux-saga.js.org/>

Address Accessability Issues

- [this]<https://www.w3.org/WAI/standards-guidelines/aria/>

Handle CORS properly

- [this]<https://expressjs.com/en/resources/middleware/cors.html>

Connect to spotify (store credentials in front end only)

- Add tests for log-in flow(?)
- Add fixtures for stubbed data returned from spotify

Create responsive UI for different screen sizes

- Desktop
- Mobile

Make the application RESTful

- Add more descriptive status codes for when things go wrong in endpoints
- HATEOAS
- See [this]<https://martinfowler.com/articles/richardsonMaturityModel.html>

Write cypress tests that don't suck

- Include tests that are actually end-to-end (rather than using just fetch-mock)
  - do this after actual accounts are featured

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

