module.exports = function (grunt) {

    'use strict';

    var config = {
        css: 'css',
        less: 'less',
        javascript: 'javascript'
    };

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        config: config,

        connect: {
            prod: {
                options: {
                    hostname: '127.0.0.1',
                    port: 9001,
                    keepalive: true,
                    open: true,
                    base: 'dist',
                }
            },
            dev: {
                options: {
                    hostname: '127.0.0.1',
                    port: 8080,
                    keepalive: true,
                    //livereload: 35729,
                    debug: true
                }
            }
        },

        less: {
            compileCore: {
                options: {
                    strictMath: true,
                    sourceMap: true,
                    outputSourceFiles: true,
                    sourceMapURL: 'app.css.map',
                    sourceMapFilename: '<%= config.css %>/app.css.map'
                },
                files: {
                    '<%= config.css %>/app.css': '<%= config.less %>/main.less',
                }
            }
        },

        csscomb: {
            options: {
                config: 'less/.csscomb.json'
            },
            dist: {
                expand: true,
                cwd: 'css/',
                src: ['*.css'],
                dest: 'css/'
            },
        },

        jscs: {
            options: {
                config: 'javascript/.jscsrc'
            },
            core: {
                src: 'javascript/**/*.js'
            },
            test: {
                src: 'test/**/*.js'
            }
        },

        autoprefixer: {
            options: {
                browsers: [
                    "Android 2.3",
                    "Android >= 4",
                    "Chrome >= 20",
                    "Firefox >= 24",
                    "Explorer >= 8",
                    "iOS >= 6",
                    "Opera >= 12",
                    "Safari >= 6"
                ]
            },
            core: {
                options: {
                    map: true
                },
                src: 'css/app.css'
            }
        },

        cssmin: {
            options: {
                compatibility: 'ie8',
                keepSpecialComments: '*',
                sourceMap: true,
                advanced: false
            },
            minifyCore: {
                src: 'css/app.css',
                dest: 'css/app.css'
            }
        },

        csslint: {
            options: {
                csslintrc: 'less/.csslintrc'
            },
            dist: 'css/app.css'
        },

        jshint: {
            options: {
                jshintrc: 'javascript/.jshintrc'
            },
            core: {
                src: 'javascript/**/*.js'
            },
        },

        watch: {
            less: {
                files: ['<%= config.less %>/**/*.less'],
                tasks: ['less']
            }
        },

        // I would really like something like Philip Walton's
        // html inspector as part of the build, but I can't
        // seem to correctly configure it into the build process.

        requirejs: {
            compile: {
                options: {
                    appDir: "./",
                    baseUrl: "./javascript",
                    removeCombined: true,
                    findNestedDependencies: true,
                    dir: "dist/",
                    optimize: "uglify",
                    skipDirOptimize: false,
                    optimizeCss: 'standard',
                    fileExclusionRegExp: /^node_modules$/,
                    modules: [{
                        name: "main"
                    }],
                    mainConfigFile: 'javascript/require-config.js'
                }
            }
        },

        karma: {
            options: {
                basePath: process.cwd(),
                frameworks: ['mocha', 'sinon-chai'],
                reporters: ['dots', 'coverage'],
                plugins: [
                    'karma-mocha',
                    'karma-phantomjs-launcher',
                    'karma-firefox-launcher',
                    'karma-chrome-launcher',
                    'karma-sinon-chai',
                    'karma-coverage'
                ],
                preprocessors: {
                    'javascript/**/*.js': ['coverage']
                },
                coverageReporter: {
                    type : 'text'
                },
                proxies: {
                  "/public/": "/base/public/"
                },
                files: [
                    'public/vendor/es5-shim/es5-shim.js',
                    'public/vendor/underscore/underscore.js',
                    'public/vendor/sinonjs/sinon.js',
                    'public/vendor/sinon-chai/lib/sinon-chai.js',
                    'public/vendor/requirejs/require.js',
                    'test/runner.js',
                    {
                        pattern: 'javascript/**/*.*',
                        included: false
                    },
                    {
                        pattern: 'css/*',
                        included: false
                    },
                    {
                        pattern: 'public/vendor/**/*.*',
                        included: false
                    },
                    {
                        pattern: 'test/<%= karma.options.frameworks[0] %>/**/*',
                        included: false
                    },
                    {
                        pattern: 'test/assets.js',
                        included: false
                    }
                ]
            },
            integration: {
                options: {
                    singleRun: true,
                    browsers: ['PhantomJS'],
                }
            },
            dev: {
                options: {
                    singleRun: false,
                    browsers: ['Chrome'],
                    captureTimeout: 10000,
                }
            }
        },

    });

    require('load-grunt-tasks')(grunt);

    grunt.registerTask('dist-css', ['less', 'autoprefixer', 'csscomb', 'csslint', 'cssmin']);
    grunt.registerTask('dist', ['dist-css', 'requirejs']);
    grunt.registerTask('tests', ['csscomb', 'csslint', 'jscs', 'jshint', 'karma:integration']);
    grunt.registerTask('runserver:dev', ['connect:dev']);
    grunt.registerTask('runserver', ['connect:prod']);
    grunt.registerTask('default', ['dist']);
};
