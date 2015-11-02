module.exports = function (grunt) {

    'use strict';

    var config = {
        css: 'css',
        less: 'less',
        javascript: 'javascript'
    };

    var vendorPaths = grunt.file.readJSON('javascript/vendor_paths.json');
    var vendorShims = grunt.file.readJSON('javascript/vendor_shims.json');

    var componentPathsToClean = [];
    componentPathsToClean.push('components/**');
    for (var property in vendorPaths) {
        if (vendorPaths.hasOwnProperty(property)) {
            var path = '!' + vendorPaths[property].substring(3) + '.js';
            componentPathsToClean.push(path);
        }
    }
    componentPathsToClean.push('!components/bootstrap/dist/**');
    componentPathsToClean.push('!components/bootstrap/less/**');
    componentPathsToClean.push('!components/sinon-chai/**');
    componentPathsToClean.push('!components/sinonjs/**');

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        config: config,

        clean: {
            componentsJS: {
                src: componentPathsToClean,
                filter: 'isFile'
            }
        },

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
                    //mainConfigFile: 'javascript/require-config.js'
                    paths: vendorPaths,
                    shim: vendorShims
                }
            }
        },

        karma: {
            options: {
                basePath: process.cwd(),
                frameworks: ['mocha', 'sinon-chai'],
                plugins: [
                    'karma-mocha',
                    'karma-phantomjs-launcher',
                    'karma-firefox-launcher',
                    'karma-chrome-launcher',
                    'karma-sinon-chai'
                ],
                files: [
                    'components/es5-shim/es5-shim.js',
                    'components/underscore/underscore.js',
                    'components/sinonjs/sinon.js',
                    'components/sinon-chai/lib/sinon-chai.js',
                    'components/requirejs/require.js',
                    'test/runner.js',
                    {
                        pattern: 'javascript/**/*.*',
                        included: false
                    },
                    {
                        pattern: 'components/**/*.js',
                        included: false
                    },
                    {
                        pattern: 'test/<%= karma.options.frameworks[0] %>/**/*',
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
    grunt.registerTask('dist', ['clean', 'dist-css', 'requirejs']);
    grunt.registerTask('runserver', ['connect:' + grunt.option('target') || 'prod']);
    grunt.registerTask('default', ['dist']);
};
