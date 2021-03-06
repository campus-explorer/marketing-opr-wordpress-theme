<?php

// Note that 'block-experiments' gets replaced with 'aecpc-layout-grid' when bundling
add_action( 'init', function() {
	register_block_type( 'aecpc/layout-grid', [
		'editor_script' => 'block-experiments',
		'style' => 'block-experiments',
		'editor_style' => 'block-experiments-editor',
		'render_callback' => function( $attribs, $content ) {
			wp_enqueue_style( 'wpcom-layout-grid-front' );
			return $content;
		},
	] );

	register_block_type( 'aecpc/layout-grid-column', [
		'editor_script' => 'block-experiments',
		'style' => 'block-experiments',
		'editor_style' => 'block-experiments-editor',
		'render_callback' => function( $attribs, $content ) {
			wp_enqueue_style( 'wpcom-layout-grid-front' );
			return $content;
		},
	] );

	wp_set_script_translations( 'block-experiments', 'layout-grid' );
} );

add_action( 'wp_enqueue_scripts', function() {
	wp_register_style(
		'wpcom-layout-grid-front',
		plugins_url( 'front.css', __FILE__ ),
		[], // no dependencies
		filemtime( plugin_dir_path( __FILE__ ) . 'front.css' )
	);
} );
