module.exports = function(grunt) {

	grunt.initConfig({
		
		pkg : grunt.file.readJSON('package.json'),
		
		jshint : {
			files : [ 'Gruntfile.js', 'public/**/*.js' ],
			options : {
				smarttabs: true,
				globals : {
					angular : true,
					console : true,
				}
			}
		},
		
		mocha: {
			test: {
				src: ['public/test/*.html']
			},
		},
		
		copy: {
			main: {
				src: 'public/components/slideshow/mk.slideshow.*',
				dest: 'dist/<%= pkg.version %>/',
				expand: true,
				flatten: true
			},
		},
			
		uglify : {
			options : {
				banner : '/*! <%= pkg.repository.url %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
			},
			dist : {
				files : {
					'dist/<%= pkg.version %>/mk.slideshow.min.js' : [ 'public/components/slideshow/mk.slideshow.js' ]
				}
			}
		},
		
		cssmin: {
			add_banner: {
				options: {
					banner: '/*! <%= pkg.repository.url %> <%= grunt.template.today("dd-mm-yyyy") %> */'
				},
				files: {
					'dist/<%= pkg.version %>/mk.slideshow.min.css': ['public/components/slideshow/mk.slideshow.css']
				}
			}
		},
		
		jade: {
			compile: {
				options: {
					pretty: true,
					data: {
						debug: false,
						version: '<%= pkg.version %>'
					}
				},
				files: {
					"dist/samples/minimal.html": ["views/samples/minimal.jade"],
					"dist/samples/button.html": ["views/samples/button.jade"],
					"dist/samples/search.html": ["views/samples/search.jade"]
				}
			}
		}		
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-mocha');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-jade');	

	grunt.registerTask('test', [ 'jshint', 'mocha' ]);
	grunt.registerTask('default', [ 'test', 'copy', 'uglify', 'cssmin', 'jade' ]);
};