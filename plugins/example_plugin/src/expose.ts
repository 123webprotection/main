import { func1, plugin1 } from './lib';
import { plugin1_info } from './lib2';
import * as wrap from "../node_modules/word-wrap"

// Everything used in this file will be exposed for other 
//      to use.
// the object will be named by the value from "package.json -> name"
const exportObject = {
    plugin1_info,
    plugin1,
    w: ()=>{return plugin1(2)}
};

export function getDefaultExport() {
    return exportObject;
}

export const plugin2 = plugin1

//export const asyncfunc = func1

export const ww = (str:string) => {return wrap(str,{width:10})};

export const rapp = wrap;