module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            dist1: {
                src: [
                    "app/*.module.js",
                    "app/*.config.js",
                    "app/**/*.module.js",
                    "app/**/*.config.js",
                    "app/**/*.routes.js",
                    "app/**/*.js",

                    "!app/core/web-api/webApiSetting.constants.js",
                    "!app/settings/appSettings.constants.js"
                ],
                dest: 'build/js/output.js'
            },
            lib: {
                src: [
                    'lib/jquery-3.1.1/jquery-3.1.1.min.js',
                    'lib/angular-1.6.1/angular.min.js',
                    'lib/angular-breadcrumb-0.5.0/angular-breadcrumb.min.js',
                    'lib/angular-messages-1.6.1/angular-messages.min.js',
                    'lib/signalR/jquery.signalR-2.2.0.min.js',
                    'lib/angular-ui-router-1.0.11/angular-ui-router.min.js',
                    'lib/sweetalert/dist/sweetalert.min.js',
                    'lib/ngSweetAlert/SweetAlert.min.js',
                    'lib/angular-bootstrap/ui-bootstrap-tpls-2.2.0.min.js',
                    'lib/angular-bootstrap-show-errors/src/showErrors.min.js',
                    'lib/angular-sanitize-1.6.1/angular-sanitize.min.js',
                    'lib/ng-table/dist/ng-table.min.js',
                    'lib/angular-permission-5.3.2/angular-permission.min.js',
                    'lib/angular-permission-5.3.2/angular-permission-ui.min.js',
                    'lib/lobibox/lobibox.min.js',
                    'lib/lobibox/messageboxes.min.js',
                    'lib/lobibox/notifications.min.js',
                    'lib/lodash/dist/lodash.min.js',
                    'lib/select2/select2.min.js',
                    'lib/nprogress-0.2.0/nprogress-0.2.0.js',
                    'lib/FileSaver.min.js',
                    'lib/d3.min.js',
                    'lib/bootstrap.file-input.js',
                    'lib/hyphenator/Hyphenator.min.js',
                    'lib/daterangepicker-2.1.25/moment.js',
                    'lib/daterangepicker-2.1.25/daterangepicker.js',
                    'lib/jquery-ui-1.12.1/jquery-ui.min.js',
                    'lib/powerbi-client/dist/powerbi.min.js'
                ],
                dest: 'build/js/lib.min.js'
            }
        },
        uglify: {
            options: {
                mangle: false
            },
            my_target: {
                files: {
                    'build/js/output.min.js': ['build/js/output.js']
                }
            }
        },
        cssmin: {
            target: {
                files: [
                    {
                        src: [
                            'css/ivh-treeview.css',
                            'lib/angular-bootstrap/bootstrap.min.css',//only for icons
                            'lib/select2/select2.min.css',
                            'css/bootstrap.min.css',
                            'css/font-awesome.css',
                            'css/style.css',
                            'css/chart.css',
                            'lib/lobibox/lobibox.css',
                            'lib/sweetalert/dist/sweetalert.css',
                            'lib/nprogress-0.2.0/nprogress-0.2.0.css',
                            'lib/daterangepicker-2.1.25/daterangepicker.css',
                            'node_modules/jquery-ui/themes/base/core.css',
                            'node_modules/jquery-ui/themes/base/resizable.css',
                            'node_modules/jquery-ui/themes/base/theme.css'
                            ],
                        dest: 'build/css/output.css'
                    }
                ]
            }
        },
        compress: {
            main: {
                options: {
                    archive: 'app_.zip'
                },
                files: [
                    { src: ['app/**'], dest: '' }
                ]
            }
        },
        copy: {
            main: {
                files: [
                    {
                        cwd: 'app/settings',
                        src: '*',
                        dest: 'build/settings/',
                        expand: true
                    },
                    {
                        cwd: 'app/core/web-api/',
                        src: 'webApiSettings.constants.js',
                        dest: 'build/settings/',
                        expand: true
                    },
                    {
                        cwd: 'img',
                        src: '*',
                        dest: 'build/img/',
                        expand: true
                    },
                    {
                        cwd: 'img',
                        src: '*/*',
                        dest: 'build/img/',
                        expand: true
                    },
                    {
                        cwd: "static",
                        src: '*',
                        dest: 'build/static',
                        expand: true
                    },
                    {
                        cwd: "fonts",
                        src: '*',
                        dest: 'build/fonts',
                        expand: true
                    },
                    {
                        cwd: "lib/angular-bootstrap/fonts",
                        src: '*',
                        dest: 'build/css/fonts',
                        expand: true
                    },
                    {
                        cwd: "node_modules/jquery-ui/themes/base/images",
                        src: '*',
                        dest: 'build/css/images',
                        expand: true
                    },
                    {
                        src: 'index_compile.html',
                        dest: 'build/index.html'
                    }
                ]
            }
        },
        ngtemplates: {
            app: {
                src: ['app/**/*.html'],
                dest: 'app/templates/templates.config.js',
                options: {
                    module: 'app.TemplateCache'
                }

            }
        },
        cacheBust: {
            options: {
                assets: ['js/**', 'css/*.css'],
                baseDir: 'build/',
                deleteOriginals: true
            },
            bust: {
                src: ['build/index.html']
            }
        },
        clean: {
            contents: ['build/*']
        }


    });

    // Load the plugin that provides the "coffee" task.
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-angular-templates');
    grunt.loadNpmTasks('grunt-cache-bust');
    grunt.loadNpmTasks('grunt-contrib-clean');

    // Task list.
    grunt.registerTask('default', ['clean', 'ngtemplates', 'concat:lib', 'concat:dist1', 'uglify', 'cssmin', 'copy:main', 'cacheBust:bust']);

};
