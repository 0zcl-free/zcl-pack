const Compiler  = require('./compiler')
const options = require('../zclpack.config')

new Compiler(options).run()