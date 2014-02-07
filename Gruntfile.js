"use strict";

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    coffee: {
      compile: {
        files: {
          'public/assets/js/init.js': 'app/assets/js/init.coffee',
          'public/assets/js/router.js': 'app/assets/js/router.coffee',
          'public/assets/js/views/app.js': 'app/assets/js/views/app.coffee',
          'public/assets/js/views/conditions.js': 'app/assets/js/views/conditions.coffee',
          'public/assets/js/views/home.js': 'app/assets/js/views/home.coffee',
          'public/assets/js/views/loading.js': 'app/assets/js/views/loading.coffee',
          'public/assets/js/views/map.js': 'app/assets/js/views/map.coffee',
          'public/assets/js/views/forecast.js': 'app/assets/js/views/forecast.coffee',
          'public/assets/js/models/forecast.js': 'app/assets/js/models/forecast.coffee',
          'public/assets/js/models/app.js': 'app/assets/js/models/app.coffee',
          'public/assets/js/models/conditions.js': 'app/assets/js/models/conditions.coffee',
          'public/assets/js/collections/forecast.js': 'app/assets/js/collections/forecast.coffee',
          'public/assets/js/collections/conditions.js': 'app/assets/js/collections/conditions.coffee',
        }
      }
    },
    sass: {
      dist: {
        files: {
          'public/assets/css/fluid.css': 'app/assets/css/style.scss'
        }
      }
    },
    rubyHaml: {
      app: {
        files: {
          'public/index.html': 'app/index.haml',
          'public/assets/tpl/app.html': 'app/assets/tpl/app.haml',
          'public/assets/tpl/conditions.html': 'app/assets/tpl/conditions.haml',
          'public/assets/tpl/forecast.html': 'app/assets/tpl/forecast.haml',
          'public/assets/tpl/forecastDay.html': 'app/assets/tpl/forecastDay.haml',
          'public/assets/tpl/loading.html': 'app/assets/tpl/loading.haml',
          'public/assets/tpl/map.html': 'app/assets/tpl/map.haml',
        }
      }
    }
  });

  grunt.registerTask('default', ['coffee', 'rubyHaml', 'sass']);
  grunt.loadNpmTasks('grunt-ruby-haml');
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-sass');
};