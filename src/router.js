import { matchPath } from 'react-router-dom';

/**
 * This file abstracts some of the nastiness of react-router, which is getting changed with the router hooks/combine with reach-router/v5
 */

//https://github.com/ReactTraining/react-router/issues/5870
// hacky, very likely to break
export function getParam (history, path) {
  const paramId = path.split(':')[1];

  const match = matchPath(history.location.pathname, {
    path,
    exact: false,
    strict: false,
  });

  return match && match.params && match.params[paramId];
}
