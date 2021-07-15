module.exports = function(grunt){
	grunt.initConfig({
		copy: {
		  main: {
			  files:[
			      {
				     expand: true, 
				      cwd:'build/',
				      src: '*.js',
				      dest: '../../../../../../../Google\ Drive\ FIle\ Stream/My\ Drive/LocalSites/wpe-peru/app/public/wp-content/themes/ae-opr-theme/inc/packages/aeopr-lead-form/build'
				   }
				]
				 
		  }
		},
		watch: {
			copy:  { 
			    files: 'build/*', 
			    tasks: [ 'copy' ], 
			    options:{
			    	spawn: false,
			    	//interrupt: true,
			    	event:['changed']
				}
			}
		}
		

	
	})
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-copy');
	
	// register at least this one task
	grunt.registerTask('default', [ 'watch' ]);
}