import { createStore, applyMiddleware } from 'redux';
// import { createStore, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// import { crashReporter } from './services/sentry';
import thunk from 'redux-thunk';
// import logger from 'redux-logger';
import rootReducer from './reducers';

const persistConfig = {
  key: 'root',
  storage
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const configureStore = () => {
  const store = createStore(
    persistedReducer,
    // compose(applyMiddleware(thunk, logger, crashReporter))
    composeWithDevTools(applyMiddleware(thunk))
  );

  const persistor = persistStore(store);

  return { store, persistor };
};

const { store, persistor } = configureStore();

export { configureStore, store, persistor };
