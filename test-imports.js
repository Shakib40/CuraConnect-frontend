import fs from 'fs'
import { parse } from '@babel/parser'
import traverse from '@babel/traverse'

const code = fs.readFileSync('src/App.jsx', 'utf-8')
const ast = parse(code, { sourceType: 'module', plugins: ['jsx'] })
const imports = []
traverse.default(ast, {
  ImportDeclaration(path) {
    imports.push(path.node.source.value)
  },
})
console.log(imports)
