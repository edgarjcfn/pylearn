module.exports = function(grunt) { 
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {
                separator: "\n", //add a new line after each file
            },
            game: {
                // the files to concatenate
                src: [
                'pylearn/dev/game/**/*.js'
                ],
                // the location of the resulting JS file
                dest: 'pylearn/dist/pylearn.js'
            }
        },
        watch: {
            scripts: {
                files: ['pylearn/dev/**/*.js'],
                tasks: ['on-change'],
                options: {
                    interrupt: true
                }
            },

            
        },
        copy: {
            skulpt : {
                files : [
                    {expand:true, src:['pylearn/dev/skulpt/*.js'], dest:'pylearn/dist/', flatten:true}
                ]
            }
        }
        
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('dev', ['watch'])
    grunt.registerTask('on-change', ['concat:game', 'copy:skulpt']);
};