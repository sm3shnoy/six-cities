import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app';
import { TPreviewOffer } from './types/preview-offer';
import { HelmetProvider } from 'react-helmet-async';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const api = async (): Promise<TPreviewOffer[]> => {
  const response = await fetch(
    'https://15.design.htmlacademy.pro/six-cities/offers'
  ).then((res) => res.json() as Promise<TPreviewOffer[]>);

  return response;
};

const offers: TPreviewOffer[] = await api();

root.render(
  <React.StrictMode>
    <HelmetProvider>
      <App offers={offers} />
      <ToastContainer position="bottom-left" />
    </HelmetProvider>
  </React.StrictMode>
);
