import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { DragDropContextProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { Router, Route } from 'react-router-dom';
import history from '../history';
import { ToastContainer } from 'react-toastify';
import { store, persistor } from '../store';
import App from './App';
import Setup from './Setup';
import Callback from './Callback';
import Auth from '../auth';

const auth = new Auth();

const handleAuthentication = ({ location }) => {
  if (/access_token|id_token|error/.test(location.hash)) {
    auth.handleAuthentication();
  }
};

const Root = () => (
  <Provider store={store}>
    <ToastContainer
      position="top-center"
      autoClose={5000}
      hideProgressBar
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnVisibilityChange
      draggable
      pauseOnHover
    />
    <PersistGate loading={null} persistor={persistor}>
      <Setup />
      <DragDropContextProvider backend={HTML5Backend}>
        <Router history={history}>
          <App />
          <Route
            path="/callback"
            render={props => {
              handleAuthentication(props);
              return <Callback {...props} />;
            }}
          />
        </Router>
      </DragDropContextProvider>
    </PersistGate>
  </Provider>
);

export default Root;
