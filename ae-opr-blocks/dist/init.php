<?php
/***
 * Register the blocks for AEOPR Blocks
 ***/
 
defined( 'ABSPATH' ) || exit;


function dd_aeopr_blocks_enqueue_editor_assets(){
		

    wp_enqueue_style(
        'aeopr-blocks-editor',
        plugins_url( 'editor.build.css', __FILE__),
        array(),
        filemtime( plugin_dir_path(__FILE__) . 'editor.build.css' )
    );
}

add_action('enqueue_block_assets', 'aeopr_blocks_enqueue_frontend_assets');

function aeopr_blocks_enqueue_frontend_assets(){

    if( !is_admin() ){
        wp_enqueue_style(
            'aeopr-blocks-style',
            plugins_url( 'style.build.css', __FILE__),
            array(),
            filemtime( plugin_dir_path(__FILE__) . 'style.build.css' )
        );
    }

    
}
/// --> Register Meta
function aeopr_course_register_meta() {
  register_meta('post', 'aeopr_course_info', 
		[
			'type' => 'object',
			'single' => true,
			'show_in_rest' => [
				'schema' => [
					'type'  => 'object',
				],
			],
		]
	);
}
//add_action('init', 'aeopr_course_register_meta');

function aeopr_text_register_meta() {
  register_meta('post', 'aeopr_text_info', 
		[
			'type' => 'integer',
			'single' => true,
			'show_in_rest' => true,
		]
	);
}
add_action('init', 'aeopr_text_register_meta');




