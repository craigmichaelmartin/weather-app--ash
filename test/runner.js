(function(window) {
    "use strict";

    var karma = window.__karma__;

    // Put Karma into an asynchronous waiting mode
    // until we have loaded our tests.
    karma.loaded = function() {};

    if (window.QUnit) {
        // Disable auto start (will call start
        // once the async modules have loaded).
        window.QUnit.config.autostart = false;
    } else if (window.chai) {
        // Optionally use chai with Mocha.
        window.expect = window.chai.expect;
    }

    require.config({
        paths: {
            underscore: '../components/underscore/underscore',
            text: '../components/requirejs-text/text'
        },
        baseUrl: "base/javascript",
        waitSeconds: 0
    });

    require([
        "require-config",
        "../test/mocha/helpers",
        "underscore"
    ], function(config, Helpers) {
        window.Helpers = Helpers;
        var specs = _.chain(karma.files)
        // Convert the files object to an array of file paths.
        .map(function(id, file) {
            return file;
        })
        // Tests that end with `.spec.js` and exist in `test` or
        // `javascript` directories are automatically loaded.
        .filter(function(file) {
            return (/(javascript|test)\/.*\.spec\.js$/).test(file);
        })
        .value();

        // Load all specs and start Karma.
        require(specs, karma.start);
    });
})(this);
