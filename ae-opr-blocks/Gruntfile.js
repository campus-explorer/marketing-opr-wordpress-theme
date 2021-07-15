module.exports = function(grunt){
	grunt.initConfig({
		copy: {
		  main: {
			  files:[
			      {
				     expand: true, 
				      cwd:'dist/',
				      src: '**/*',
				      dest: '../../../Google\ Drive\ FIle\ Stream/My\ Drive/LocalSites/wpe-peru/app/public/wp-content/plugins/ae-opr-blocks/dist'
				   },
				    {
				     expand: true, 
				      cwd:'./',
				      src: 'ae-opr-blocks.php',
				      dest: '../../../Google\ Drive\ FIle\ Stream/My\ Drive/LocalSites/wpe-peru/app/public/wp-content/plugins/ae-opr-blocks'
				   },
				   {
				     expand: true, 
				      cwd:'classes/',
				      src: '**/*',
				      dest: '../../..Google\ Drive\ FIle\ Stream/My\ Drive/LocalSites/wpe-peru/app/public/wp-content/plugins/ae-opr-blocks/classes'
				   },
				 ]
				 
		  }
		},
		sass: {    
			dist: {
				files: [{
				        expand: true,
				        cwd: 'src',
				        src: ['*.scss'],
				        dest: './dist',
				        ext: '.build.css'
				      }]		    
				}
		  },
		watch: {
		    copy:  { 
			    files: 'dist/*', 
			    tasks: [ 'copy' ], 
			    options:{
			    	spawn: false,
			    	//interrupt: true,
			    	//event:['changed']
				}
			},
			sass:  { 
			    files: 'src/*', 
			    tasks: [ 'sass' ], 
			    options:{
			    	spawn: false,
			    	//interrupt: true,
			    	//event:['changed']
				}
			}
		}
		

	
	})
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-sass');
	//grunt.loadNpmTasks('grunt-contrib-uglify');
	
	// register at least this one task
	grunt.registerTask('default', [ 'sass','copy' ]);
}