module.exports = function(grunt) {
   'use strict';

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
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
        options: {
          sourcemap: "none"
        },
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
    },
    concat: {
      options: {
        stripBanners: true
      },
      coffee: {
        files: {
          'public/assets/js/_views.js': ['public/assets/js/views/app.js', 'public/assets/js/views/conditions.js', 'public/assets/js/views/forecast.js', 'public/assets/js/views/home.js', 'public/assets/js/views/loading.js', 'public/assets/js/views/map.js'],
          'public/assets/js/_app.js': ['public/assets/js/init.js','public/assets/js/router.js'],
          'public/assets/js/_models.js': ['public/assets/js/models/app.js', 'public/assets/js/models/conditions.js', 'public/assets/js/models/forecast.js'],
          'public/assets/js/_collections.js': ['public/assets/js/collections/conditions.js', 'public/assets/js/collections/forecast.js'],
        }
      }
    },
    jshint: {
      afterconcat: ['public/assets/js/_app.js', 'public/assets/js/_collections.js', 'public/assets/js/_models.js', 'public/assets/js/_views.js',]
    },
    clean: ["public/assets/js/collections/", "public/assets/js/models", "public/assets/js/views", "public/assets/js/init.js", "public/assets/js/router.js"]
  });

  grunt.registerTask('default', ['coffee', 'rubyHaml', 'sass', 'concat', 'jshint', 'clean']);
  grunt.registerTask('test', ['jshint']);

  grunt.loadNpmTasks('grunt-ruby-haml');
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');
};
