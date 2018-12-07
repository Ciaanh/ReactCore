import 'bootstrap/dist/css/bootstrap.css';

import 'bootstrap/dist/css/bootstrap-theme.css';

import './index.css';

import * as React from 'react';

import * as ReactDOM from 'react-dom';

import { BrowserRouter } from 'react-router-dom';

import App from './App';

import registerServiceWorker from './registerServiceWorker';

import { AuthProvider } from './auth/AuthProvider';

const baseUrl: string = document.getElementsByTagName('base')[0].getAttribute('href') as string;
const rootElement = document.getElementById('root');

ReactDOM.render(
  <AuthProvider>
    <BrowserRouter basename={baseUrl}>
      <App />
    </BrowserRouter>
  </AuthProvider>,
  rootElement);

registerServiceWorker();
