import React from 'react';
import ReactDOM from 'react-dom/client';
import { Popup } from './Popup';
import './styles/globals.css';

/**
 * Popup Entry Point
 * Rendered in popup.html when extension icon is clicked
 */

const root = ReactDOM.createRoot(document.getElementById('root')!);

root.render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>
);
