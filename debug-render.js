import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { store } from './src/store/index.js';
import { StaticRouter } from 'react-router-dom/server';
import App from './src/App.jsx';

try {
  renderToString(
    <Provider store={store}>
      <StaticRouter location="/">
        <App />
      </StaticRouter>
    </Provider>
  );
  console.log("Render successful!");
} catch (e) {
  console.error("Render failed:", e);
}
