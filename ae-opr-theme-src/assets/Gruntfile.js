module.exports = function(grunt){
	grunt.initConfig({
		copy: {
		  main: {  
			  files:[
			      {
				     expand: true, 
				      cwd:'css/',
				      src: '*.css',
				      dest: '../../../../../Google\ Drive\ FIle\ Stream/My\ Drive/LocalSites/wpe-peru/app/public/wp-content/themes/ae-opr-theme/assets/css'
				   }
				]
				 
		  }
		},
		sass: {    
			dist: {
				options:{
				  style:'compressed'
			  	},
				files: [{
				        expand: true,
				        cwd: 'css',
				        src: ['*.scss'],
				        dest: './css',
				        ext: '.css'
				      }]		    
				}
		  },
		
		watch: {
			sass:  { 
			    files: 'css/*', 
			    tasks: [ 'sass' ], 
			    options:{
			    	spawn: false,
			    	//interrupt: true,
			    	//event:['changed']
				}
			},
			copy:  { 
			    files: 'css/*.css', 
			    tasks: [ 'copy' ], 
			    options:{
			    	spawn: false,
			    	//interrupt: true,
			    	//event:['changed']
				}
			}
		}
		

	
	})
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-copy');
	
	// register at least this one task
	grunt.registerTask('default', [ 'watch' ]);
}