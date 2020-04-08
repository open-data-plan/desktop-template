import { createStore } from 'aerux'
import promiseMiddleware from 'aerux-promise'
import loadingMiddleware from './middleware/loading'
import messageMiddleware from './middleware/message'
import { makeRootReducer } from './reducer'

// middlewares
const middlewares = [loadingMiddleware, promiseMiddleware, messageMiddleware]

// initial state
const initialState = {}

// compose
let composeWithEnhancer

// use redux chrome extension in development
if (process.env.NODE_ENV === 'development') {
  const composeWithDevToolsExtension = (window as any)
    .__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  if (typeof composeWithDevToolsExtension === 'function') {
    composeWithEnhancer = composeWithDevToolsExtension
  } else {
    // eslint-disable-next-line
    const { createLogger } = require('redux-logger')
    middlewares.push(createLogger())
  }
}

const store = createStore({
  middlewares,
  enhancers: [],
  compose: composeWithEnhancer,
  state: initialState,
  reducers: makeRootReducer(),
})

if ((module as any).hot) {
  ;(module as any).hot.accept('./reducer', () => {
    // eslint-disable-next-line
    const { makeRootReducer } = require('./reducer')
    store.hotReplaceReducer(makeRootReducer(store.asyncReducers))
  })
}

export default store
