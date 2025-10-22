// This is the main entry point for our React app
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// This creates the root element and renders our app
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
