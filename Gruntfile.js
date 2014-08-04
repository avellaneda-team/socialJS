module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      src: ['Gruntfile.js', 'src/**/*.js']
    },

    watch: {
      configFiles: {
        files: ['Gruntfile.js'],
        tasks: ['jshint']
      },
      src: {
        files: ['src/**/*'],
        tasks: ['jshint']
      },
      test: {
        files: ['test/**/*'],
        tasks: ['jshint']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('test', ['watch']);
  grunt.registerTask('default');
};
