const React = require('react');
const { renderToString } = require('react-dom/server');
const AppExports = require('./App.bundle.cjs');
const { Provider } = require('react-redux');
const { StaticRouter } = require('react-router-dom/server.js');

try {
  // Mock store
  const store = {
    getState: () => ({ auth: { loading: false, user: null, isAuthenticated: false } }),
    subscribe: () => {},
    dispatch: () => {}
  };
  
  const App = AppExports.default || AppExports;
  renderToString(
    React.createElement(Provider, { store },
      React.createElement(StaticRouter, { location: '/' },
        React.createElement(App)
      )
    )
  );
  console.log("Render passed");
} catch(err) {
  console.error(err.message);
  console.error(err.stack);
}
