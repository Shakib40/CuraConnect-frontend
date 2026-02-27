import { readFileSync } from 'fs'
import * as babel from '@babel/core'

const code = readFileSync('src/App.jsx', 'utf-8')
const result = babel.transformSync(code, {
  presets: ['@babel/preset-react'],
  plugins: ['@babel/plugin-transform-modules-commonjs'],
  filename: 'src/App.jsx',
})
