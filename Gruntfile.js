module.exports = function(grunt) { 
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        ts: {
            options: {
                
            },
            dev: {
                // the files to concatenate
                src: [
                'pylearn/dev/game/**/*.ts'
                ],
                // the location of the resulting JS file
                out: 'pylearn/dist/pylearn.ts.js'
            }
        },
        watch: {
            skulpt: {
                files: ['pylearn/dev/skulpt/pylearn.skulpt.js'],
                tasks: ['copy:skulpt'],
                options: {
                    interrupt: true
                }
            },

            ts: {
                files: ['pylearn/dev/game/**/*.ts'],
                tasks: ['ts:dev'],
                options: {
                    interrupt: true
                }
            }
            
        },
        copy: {
            skulpt : {
                files : [
                    {expand:true, src:['pylearn/dev/skulpt/*.js'], dest:'pylearn/dist/', flatten:true}
                ]
            }
        },
        'http-server' : {
            dev : {
                root: './',
                port: 8081
            }
        },
        concurrent : {
            dev : {
                tasks: ['http-server', 'watch:skulpt', 'watch:ts'],
                options: {
                    logConcurrentOutput:true
                }
            }
        }

        
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-http-server');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-ts');

    grunt.registerTask('dev', ['concurrent:dev'])
};