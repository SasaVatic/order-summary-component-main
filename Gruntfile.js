const sass = require('sass');

module.exports = function (grunt) {
  grunt.initConfig({
    copy: {
      main: {
        files: [
          {
            expand: true,
            flatten: true,
            src: ['src/index.html'],
            dest: 'dist',
          },
          {
            expand: true,
            flatten: true,
            src: ['src/assets/images/*'],
            dest: 'dist/assets/images',
          },
          {
            expand: true,
            flatten: true,
            src: ['src/assets/fonts/*'],
            dest: 'dist/assets/fonts',
          },
        ],
      },
      html: {
        expand: true,
        flatten: true,
        src: ['src/index.html'],
        dest: 'dist',
      },
    },
    sass: {
      options: {
        implementation: sass,
        sourceMap: true,
      },
      dist: {
        files: {
          'src/assets/css/style.css': 'src/assets/sass/style.scss',
        },
      },
    },
    cssmin: {
      target: {
        files: [
          {
            expand: true,
            cwd: 'src/assets/css',
            src: ['*.css'],
            dest: 'dist/assets/css',
            ext: '.min.css',
          },
        ],
      },
    },
    watch: {
      options: {
        livereload: true,
      },
      css: {
        files: 'src/assets/sass/**/*.scss',
        tasks: ['sass', 'cssmin'],
      },
      html: {
        files: 'src/index.html',
        tasks: ['copy:html'],
      },
      lintscss: {
        files: 'src/assets/sass/**/*.scss',
        tasks: ['stylelint'],
      },
    },
    connect: {
      server: {
        options: {
          open: true,
          livereload: true,
          port: 9001,
          base: 'dist',
        },
      },
    },
    stylelint: {
      options: {
        configFile: '.stylelintrc',
        formatter: 'string',
        ignoreDisables: false,
        failOnError: true,
        outputFile: '',
        reportNeedlessDisables: false,
        fix: true,
        syntax: '',
      },
      src: ['src/assets/sass/**/*.scss'],
    },
  });

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-stylelint');

  grunt.registerTask('default', [
    'copy',
    'sass',
    'cssmin',
    'stylelint',
    'connect',
    'watch',
  ]);
};
