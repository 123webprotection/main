var browserify = require("browserify");

var tsify = require("tsify");
var fs = require("fs");

var package = JSON.parse(require("fs").readFileSync("package.json"))

// https://www.typescriptlang.org/docs/handbook/integrating-with-build-tools.html#browserify

// Windows: https://github.com/PiotrDabkowski/Js2Py/issues/125

// https://github.com/PiotrDabkowski/Js2Py/blob/master/js2py/node_import.py

browserify({debug: true,standalone: package.name })
    .on('error',console.error.bind(console))
    .add("./src/expose.ts")
    .plugin(tsify)
    .bundle(function (err, data) {
        if (err) {
             console.log(err); throw new Error(err); 
        }

        fs.writeFile("./bundle/bundle.js",
            require('babel-core')
                .transform(data, { 'presets': require('babel-preset-es2015') }).code, () => { });
    })
