import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app';
import { HelmetProvider } from 'react-helmet-async';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { fetchOffersAction } from './store/thunks/offers';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

store.dispatch(fetchOffersAction());

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <HelmetProvider>
        <App />
        <ToastContainer position="bottom-left" />
      </HelmetProvider>
    </Provider>
  </React.StrictMode>
);
