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
				src: ['public/test/*.html'],
			},
		},
		
		copy: {
			main: {
				src: 'public/components/slideshow/*',
				dest: 'dist/',
			},
		},
			
		uglify : {
			options : {
				banner : '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
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
					banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
				},
				files: {
					'dist/mk.slideshow.min.css': ['public/components/slideshow/mk.slideshow.css']
				}
			}
		},
		
		jade: {
			compile: {
				options: {
					data: {
						debug: false
					}
				},
				files: {
			      "dist/sample.html": ["views/index.jade"]
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
	grunt.registerTask('default', [ 'test', 'uglify', 'cssmin', 'jade' ]);
};