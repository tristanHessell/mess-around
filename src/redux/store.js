import { applyMiddleware, compose, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk'
import rootReducer from './modules/reducer';

export default function configureStore (preloadedState) {
  const middlewareEnhancers = applyMiddleware(thunkMiddleware);
  const composedEnhancers = compose(middlewareEnhancers);
  const store = createStore(rootReducer, preloadedState, composedEnhancers);

  return store;
}