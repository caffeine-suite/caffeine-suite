# generated by Neptune Namespaces v1.x.x
# file: CaffeineMc/index.coffee

module.exports = require './namespace'
.includeInNamespace require './CaffeineMc'
.addModules
  CaffeineMcParser: require './CaffeineMcParser'
  Register:         require './Register'        
require './compilers'