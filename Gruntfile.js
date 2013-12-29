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
				dest: 'dist/',
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
					'dist/mk.slideshow.min.js' : [ 'public/components/slideshow/mk.slideshow.js' ]
				}
			}
		},
		
		cssmin: {
			add_banner: {
				options: {
					banner: '/*! <%= pkg.repository.url %> <%= grunt.template.today("dd-mm-yyyy") %> */'
				},
				files: {
					'dist/mk.slideshow.min.css': ['public/components/slideshow/mk.slideshow.css']
				}
			}
		},
		
		jade: {
			compile: {
				options: {
					pretty: true,
					data: {
						debug: false
					}
				},
				files: {
			      "dist/sample1.html": ["views/sample1.jade"]
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