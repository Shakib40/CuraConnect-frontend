import { createServer } from 'vite'
import React from 'react'
import { renderToString } from 'react-dom/server'

async function debugVite() {
  const vite = await createServer({
    server: { middlewareMode: true },
    appType: 'custom',
  })

  try {
    const AppMod = await vite.ssrLoadModule('/src/App.jsx')
    const StoreMod = await vite.ssrLoadModule('/src/store/index.js')
    const RouterMod = await vite.ssrLoadModule('react-router')
    const ReduxMod = await vite.ssrLoadModule('react-redux')

    const { default: App } = AppMod
    const { store } = StoreMod
    const { StaticRouter } = RouterMod
    const { Provider } = ReduxMod

    console.log('Rendering App...')

    // Fallback if StaticRouter is undefined (v7 uses different context sometimes)
    const RouterComp = StaticRouter || RouterMod.BrowserRouter

    const html = renderToString(
      React.createElement(
        Provider,
        { store },
        React.createElement(RouterComp, { location: '/' }, React.createElement(App)),
      ),
    )
    console.log('Render successful!')
  } catch (e) {
    console.error('Render failed with error:')
    console.error(e)
  } finally {
    vite.close()
  }
}

debugVite()
