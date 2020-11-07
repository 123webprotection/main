var dts = require('dts-bundle');

dts.bundle({
	name: 'bundle',
    main: 'bundle/expose.d.ts',
    externals: true,
    outputAsModuleFolder: true,
    removeSource: true
});