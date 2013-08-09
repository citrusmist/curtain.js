/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
    // Task configuration.
    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: true
      },
      dist: {
        src: ['src/<%= pkg.name %>.js'],
        dest: 'dist/<%= pkg.name %>.js'
      }
    },
    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      dist: {
        src: '<%= concat.dist.dest %>',
        dest: 'dist/<%= pkg.name %>.min.js'
      }
    },
    jshint: {
      options: {
        curly: false,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        unused: false,
        boss: true,
        eqnull: true,
        browser: true,
        "predef": ["jQuery", "$", "console", "grunt"],
        "globals" : {
          "it"           : false,
          "xit"          : false,
          "describe"     : false,
          "xdescribe"    : false,
          "beforeEach"   : false,
          "afterEach"    : false,
          "expect"       : false,
          "spyOn"        : false,
          "loadFixtures" : false,
          "loadStyleFixtures" : false,
          'jasmine': false
        }
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      lib_test: {
        src: ['src/**/*.js', 'test/**/*.js']
      }
    },
    // qunit: {
    //   files: ['test/**/*.html']
    // },
    jasmine:{
      src: 'src/**/*.js',
      options: {
        specs: 'test/spec/**/*.js',
        vendor: [
          'bower_components/jquery/jquery.min.js',
          'bower_components/imagesloaded/imagesloaded.min.js'
        ],
        helpers: [
          'bower_components/jasmine-jquery/lib/jasmine-jquery.js'
        ],
        styles: [
          'test/fixtures/normalise.css'
        ]
      }
    },
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      lib_test: {
        files: '<%= jshint.lib_test.src %>',
        tasks: ['jshint:lib_test', 'qunit']
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jasmine');

  // Default task.
  grunt.registerTask('default', ['jshint', 'concat', 'uglify']);
  grunt.registerTask('test', ['jshint', 'jasmine']);
  // grunt.registerTask('default', ['jshint', 'concat', 'uglify']);

};
