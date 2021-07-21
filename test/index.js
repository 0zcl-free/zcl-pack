const { getAST, getDependencies, transform } = require('../lib/parser')
const options = require('../zclpack.config')
const { entry } = options

// 测试 文件转ast
const ast = getAST(entry)
console.log(ast)

// 测试收集 文件依赖
const dependencies = getDependencies(ast)
console.log('dependencies', dependencies)

// 测试 源代码转 es5
const code = transform(ast)
console.log('code', code)