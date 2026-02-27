import { createServer } from 'vite'
import React from 'react'
import { renderToString } from 'react-dom/server'

async function debugVite() {
  const vite = await createServer({
    server: { middlewareMode: true },
    appType: 'custom',
  })

  try {
    const AppMod = await vite.ssrLoadModule('/src/pages/Patient/Appointments.jsx')
    const { default: Appointments } = AppMod

    console.log('Rendering Appointments...')

    const html = renderToString(React.createElement(Appointments))
    console.log('Render successful!')
  } catch (e) {
    console.error('Render failed with error:', e)
  } finally {
    vite.close()
  }
}

debugVite()
