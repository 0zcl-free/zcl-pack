
const { getAST, getDependencies, transform } = require('./parser')
const path = require('path')
const fs = require('fs')

module.exports = class Compiler {
  constructor(options) {
    console.log('options', options)
    const { entry, output } = options
    this.entry = entry
    this.output = output
    this.modules = []
  }

  run() {
    const entryModule = this.buildModule(this.entry, true)
    this.modules.push(entryModule)
    this.modules.map(_module => {
      _module.dependencies.map(dependency => {
        this.modules.push(this.buildModule(dependency))
      })
    })
    console.log('modules', this.modules)
    this.emitFiles()
  }
  
  buildModule(filename, isEntry) {
    let ast
    if (isEntry) {
      ast = getAST(filename)
    } else {
      console.log(filename, 'is not entry')
      let absolutePath = path.join(process.cwd(), './src', filename)
      ast = getAST(absolutePath)
    }
    
    return {
      filename,
      dependencies: getDependencies(ast),
      transformCode: transform(ast)
    }
  }

  emitFiles() {
    const outputPath = path.join(this.output.path, this.output.filename)
    let modules = ''
    this.modules.map(_module => {
      modules += `'${_module.filename}': function(require, module, exports) { ${ _module.transformCode } },`
    })
    const bundle = `
    (function(modules) {
      function require(fileName) {
        const fn = modules[fileName];

        const module = { exports : {} };

        fn(require, module, module.exports);

        return module.exports;
      }

      require('${this.entry}');
    })({${modules}})
    `
    fs.writeFileSync(outputPath, bundle, 'utf-8')
  }
}
