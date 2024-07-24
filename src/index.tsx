import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app';
import { HelmetProvider } from 'react-helmet-async';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { Provider } from 'react-redux';
import { store } from './store/store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <HelmetProvider>
        <ToastContainer position="top-left" />
        <App />
      </HelmetProvider>
    </Provider>
  </React.StrictMode>
);
