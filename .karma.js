// Karma configuration
// Generated on Tue Jun 03 2014 12:19:30 GMT-0300 (ART)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: './',

    frameworks: ['jasmine'],

    files: [
      'test/**/*.html',
      'test/test_helper.js',
      'src/**/*.js',
      'test/**/*.js'
    ],

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'coverage'],

    preprocessors: {
      'test/**/*.html': ['html2js'],
      'src/**/*.js': 'coverage'
    },

    coverageReporter: {
      type: "lcov",
      dir: "coverage/"
    },

    plugins: [
      'karma-coverage',
      'karma-jasmine',
      'karma-phantomjs-launcher',
      'karma-html2js-preprocessor'
    ],

    port: 9876,

    colors: true,

    logLevel: config.DEBUGGER,

    autoWatch: true,

    browsers: ['PhantomJS'],

    singleRun: false
  });
};
