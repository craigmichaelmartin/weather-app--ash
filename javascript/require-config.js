define([
    '../components/requirejs-text/text!../javascript/vendor_paths.json',
    '../components/requirejs-text/text!../javascript/vendor_shims.json'
], function (paths, shim) {

    'use strict';

    require.config({
        paths: JSON.parse(paths),
        shim: JSON.parse(shim),
        urlArgs: 'version=0.0.1'
    });

});
