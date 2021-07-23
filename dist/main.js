
    (function(modules) {
      function require(fileName) {
        const fn = modules[fileName];

        const module = { exports : {} };

        fn(require, module, module.exports);

        return module.exports;
      }

      require('E:\my_code\个人项目\zcl-plugins\zcl-pack\src\index.js');
    })({'E:\my_code\个人项目\zcl-plugins\zcl-pack\src\index.js': function(require, module, exports) { "use strict";

var _greeting = require("./greeting.js");

console.log('this is zcl-pack');
document.write((0, _greeting.greeting)('zcl')); },'./greeting.js': function(require, module, exports) { "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.greeting = greeting;

function greeting(name) {
  return 'hello' + name;
} },})
    