/*!
 * circuitbox
 * Copyright(c) 2013 Ranganath Kini <oddjobsman@ranganathkini.com>
 * MIT Licensed
 */

module.exports = function (grunt) {
  'use strict';

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    complexity: {
      generic: {
        src: ['lib/**/*.js'],
        options: {
          errorsOnly: false,
          cyclometric: 6,       // default is 3
          halstead: 16,         // default is 8
          maintainability: 100  // default is 100
        }
      }
    },
    jshint: {
      all: [
        'Gruntfile.js',
        'lib/**/*.js',
        'test/**/*.js'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },
    mochacli: {
      all: ['test/**/*.js'],
      options: {
        reporter: 'spec',
        ui: 'bdd',
        require: ['expect.js']
      }
    },
    sloc: {
      scripts: {
        files: {
          'lib': ['**.js']
        }
      }
    },
    watch: {
      js: {
        files: ['**/*.js', '!node_modules/**/*.js'],
        tasks: ['default'],
        options: {
          nospawn: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-complexity');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-mocha-cli');
  grunt.loadNpmTasks('grunt-sloc');

  grunt.registerTask('test', ['jshint', 'mochacli', 'complexity', 'sloc', 'watch']);
  grunt.registerTask('ci', ['jshint', 'mochacli', 'complexity', 'sloc']);
  grunt.registerTask('default', ['test']);
};
