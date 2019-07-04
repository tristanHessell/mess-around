import { applyMiddleware, compose, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk'
import rootReducer from './reducer';

export default function configureStore (preloadedState) {
  const middlewareEnhancers = applyMiddleware(thunkMiddleware);
  // const composedEnhancers = compose(middlewareEnhancers);
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(rootReducer, composeEnhancers(middlewareEnhancers));

  return store;
}
