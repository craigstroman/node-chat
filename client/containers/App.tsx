import React from 'react';
import { createRoot } from 'react-dom/client';
import Main from './main/Main';

const element = document.getElementById('app');
const root = createRoot(element as HTMLElement);

root.render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>,
);
