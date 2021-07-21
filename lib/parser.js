const babel = require('@babel/core')
const traverse = require('@babel/traverse').default
const fs = require('fs')

module.exports = {
  getAST: (path) => {
    const content = fs.readFileSync(path, 'utf-8')
    return babel.parseSync(content)
  },
  getDependencies: (ast) => {
    const dependencies = []
    traverse(ast, {
      ImportDeclaration: ({ node }) => {
        dependencies.push(node.source.value)
      }
    })
    return dependencies
  },
  transform: (ast) => {
    const { code, map } = babel.transformFromAst(ast, null, {
      'presets': ['@babel/preset-env']
    })
    console.log('code', code)
    console.log('map', map)
    return code
  }
}