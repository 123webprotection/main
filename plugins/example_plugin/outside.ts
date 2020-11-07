import { isBundle } from 'typescript'
import  {getDefaultExport} from './bundle/bundle'
console.log(getDefaultExport())

console.log(require('./bundle/bundle'))

import  * as plugin_code from './src/expose'
console.log(plugin_code.getDefaultExport()) 

