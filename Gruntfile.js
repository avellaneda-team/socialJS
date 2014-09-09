module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    paths: {
      src:        'src/**/*.js',
      gruntfile:  'Gruntfile.js',
      test:       'test/**/*.js',
    },

    jshint: {
      src: ['<%= paths.src %>', '<%= paths.gruntfile %>' ]
    },

    watch: {
      configFiles: {
        files: ['<%= paths.gruntfile %>'],
        tasks: ['jshint']
      },
      src: {
        files: ['<%= paths.src %>'],
        tasks: ['jshint']
      },
      test: {
        files: ['<%= paths.test %>', '<%= paths.testTemplates %>'],
        tasks: ['jshint', 'mochaTest']
      }
    },

    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['<%= paths.test %>']
      }
    },

    karma: {
      unit: {
        configFile: '.karma.js',
      }
    },
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-karma-coveralls');

  grunt.registerTask('test', ['jshint', 'karma', 'coveralls']);
  grunt.registerTask('default');
};
