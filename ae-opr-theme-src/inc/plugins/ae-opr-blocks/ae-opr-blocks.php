<?php 
/**
 * Plugin Name: Archer OPR Blocks
 * Description: Custom Blocks for Archer OPR Websites
 * Text Domain: blocks-aeopr
 * Version: 1.0.0
 **/
 
 
/**
 * need to load the dist/init.php instead of this entry point
 **/
 
 
// Prevent direct acccess to this file
defined( 'ABSPATH') || exit;

define( 'AEOPR_FILE', __FILE__ );
define( 'AEOPR_ROOT', dirname( plugin_basename( AEOPR_FILE ) ) );
define( 'AEOPR_PLUGIN_NAME', 'Archer Education OPR Blocks' );
define( 'AEOPR_PLUGIN_SHORT_NAME', 'OPR' );

require_once 'classes/class-aeopr-loader.php';

add_action('plugins_loaded', 'aeopr_blocks_loader');

function aeopr_blocks_loader(){
    require_once plugin_dir_path(__FILE__) . 'dist/init.php';
    
    add_theme_support('align-wide');
    		 
/// --> Color Palette Integration with Central Color Palette
        /*mention ccp keys which you want to integrate with acf*/
    
	$builder_replacement_array=[
		'PeruPrimaryBlue',
		'PeruBrandBlue',
		'PeruMediumBlue',
		'PeruSecondaryBlue',
		'PeruDarkBlue',
		'PeruWhite',
		'PeruShade',
		'PeruLightGray',
		'PeruMediumGray',
		'PeruDarkGray',
		'PeruBlack',
		'PeruDustBlue'
	];
	$gutenburg_global_styles_array = array();
	$gutenburg_compatibility_css='';
	foreach ($builder_replacement_array as $color_variable) {
		$prepared_color_variable = "var(--{$color_variable})";
		$slugify_color_variable = strtolower(str_replace('--','',$color_variable));
		array_push($gutenburg_global_styles_array,array(
		    'name' => $color_variable,
		    'slug' => $slugify_color_variable,
		    'color' => $prepared_color_variable,
		  )
		);
		$color_variable = str_replace('_','-',$color_variable);
		$gutenburg_compatibility_css .= ".has-{$slugify_color_variable}-background-color{background-color:{$prepared_color_variable};}.has-{$slugify_color_variable}-color{color:{$prepared_color_variable};}";
	}
	add_theme_support('editor-color-palette',$gutenburg_global_styles_array);
	custom_inline_enqueue('wp_enqueue_scripts',true,$gutenburg_compatibility_css,'custom-gutenberg-ccp-integration-css');
	custom_inline_enqueue('admin_enqueue_scripts',true,$gutenburg_compatibility_css,'custom-gutenberg-ccp-integration-css');
	
	
	
/**
 * Initialize the blocks
 */

	$aeopr_blocks_includes_dir = plugin_dir_path( __FILE__ ) . 'includes/';
	$aeopr_blocks_src_dir      = plugin_dir_path( __FILE__ ) . 'src/';
	$aeopr_blocks_dist_dir     = plugin_dir_path( __FILE__ ) . 'dist/';

	/**
	 * Load Visual Links Child PHP
	 */
	require_once plugin_dir_path( __FILE__ ) . 'src/blocks/visual-links-child/index.php';
	
	/**
	 * Load Course Item PHP
	 */
	require_once plugin_dir_path( __FILE__ ) . 'src/blocks/dynamic-course-item/index.php';
	
	/**
	 * Load Video Testimonial PHP
	 */
	require_once plugin_dir_path( __FILE__ ) . 'src/blocks/video-testimonial/index.php';
	
	/**
	 * Load Post Grid PHP
	 */
	require_once plugin_dir_path( __FILE__ ) . 'src/blocks/block-post-grid/index.php';

	/**
	 * SVG Icon class and helper functions.
	 */



}

/// --> custom - wp - inline enqueue css or javascript

function custom_inline_enqueue($enqueue_action,$is_css,$css_or_script,$css_or_script_name,$footer = false){
	add_action($enqueue_action,function()use($enqueue_action,$is_css,$css_or_script,$css_or_script_name,$footer){
		if($is_css){
			wp_register_style($css_or_script_name,false);
			wp_enqueue_style($css_or_script_name);
			wp_add_inline_style($css_or_script_name,$css_or_script);	
		}else{
			if($footer){
				wp_register_script($css_or_script_name,false,array(),false,true);
				wp_enqueue_script($css_or_script_name,false,array(),false,true);
			}else{
				wp_register_script($css_or_script_name,false);
				wp_enqueue_script($css_or_script_name);
			}
			wp_add_inline_script($css_or_script_name,$css_or_script);
		}
	});
}


/// --> Set up Block Categories

add_filter( 'block_categories', 'aeopr_plugin_block_categories', 10, 2 );
function aeopr_plugin_block_categories( $categories, $post ) {

    return array_merge(
        $categories,
        array(
            array(
                'slug' => 'aeopr',
                'title' => __( 'OPR Elements', 'aeopr' ),
                'icon'  => '',
            ),
        )
    );
}

add_action('enqueue_block_editor_assets', 'aeopr_blocks_enqueue_editor_assets');

function aeopr_blocks_enqueue_editor_assets(){
    wp_enqueue_script(
        'aeopr-blocks-editor',
        plugins_url( 'dist/blocks.build.js', __FILE__ ),
        array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-edit-post','wp-plugins','wp-editor', 'wp-api-fetch','wp-server-side-render','wp-components','wp-hooks'),
        AEOPR_VER,
        true
    );
     wp_localize_script(
	     	
		'aeopr-blocks-editor',
		'aeopr_settings',
		array(
			'start_date'		=> get_option('site_settings_start_date'),
			'apply_date'		=> get_option('site_settings_apply_date'),
			'google_api_key'	=> 'AIzaSyBZHDQhDtWTvbk_yW4-EqV9AaIMGVxAC5o',
			
		)
	);
	// Setup default config data for blocks
    $blocks_config_saved = get_option('aeopr_blocks_default_config');
    $blocks_config_saved = $blocks_config_saved !== false ? $blocks_config_saved : array();
    wp_localize_script('wp-blocks', 'aeoprDefaultConfig', $blocks_config_saved);
		
		
	wp_localize_script('wp-blocks', 'aeoprBlocks', array(
        'color' => '#000',
        'pluginUrl' => plugins_url('', AEOPR_FILE),
    ));

    

    wp_enqueue_style(
        'aeopr-blocks-editor',
        plugins_url( 'dist/editor.build.css', __FILE__),
        array(),
        AEOPR_VER
    );
    wp_enqueue_style(
        'aeopr-blocks-styles',
        plugins_url( 'dist/style.build.css', __FILE__),
        array(),
        AEOPR_VER
    );
    
    /***
	 * Override editor fonts with theme specificed fotns
	 * Used to give editor a feel for the typography of the frontend
	 ***/
	 
    ///TODO: pull from the Theme font settings
    $prefix_heading_font = 'hypatia-sans-pro, Arial, sans-serif';//get_theme_mod( 'heading_font', 'Lora' );

	$prefix_body_font = 'myriad-pro,Arial,sans-serif';//get_theme_mod( 'body_font', 'Roboto' );

	$prefix_custom_css = '.edit-post-visual-editor.editor-styles-wrapper { font-family:' . esc_html( $prefix_body_font ) . '!important } 
	
	.editor-styles-wrapper h4 { font-family:' .esc_html( $prefix_heading_font ) . '!important } ';

	wp_add_inline_style( 'aeopr-blocks-editor', $prefix_custom_css );
	
}


/// --> enqueue admin items

add_action('admin_enqueue_scripts', 'enqueue_aeopr_admin_resources');
function enqueue_aeopr_admin_resources(){
        
    wp_enqueue_style( 'font-awesome', plugins_url('ae-opr-blocks'). '/assets/styles/font-awesome.css', array(), '4.7.0' );
    wp_enqueue_style( 'ultimate-icons', plugins_url('ae-opr-blocks') . '/assets/styles/ultimate-icons.css', array(), '4.7.0' );
    wp_enqueue_style('fonticonpicker-base', 'https://unpkg.com/@fonticonpicker/react-fonticonpicker/dist/fonticonpicker.base-theme.react.css');
    wp_enqueue_style('fonticonpicker-material', 'https://unpkg.com/@fonticonpicker/react-fonticonpicker/dist/fonticonpicker.material-theme.react.css');
    wp_enqueue_style('editor-styles', plugins_url('ae-opr-blocks').'/dist/editor.build.css');
    wp_enqueue_style('common-styles', plugins_url('ae-opr-blocks').'/dist/common.build.css');
    
    //add_editor_style(plugins_url('ae-opr-blocks').'/dist/common.css')
    
   /* wp_enqueue_script(
			'aeopr-block-editor-js', // Handle.
			AEOPR_URL . 'dist/blocks.build.js',
			array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-components', 'wp-editor', 'wp-api-fetch', 'wp-hooks' ), // Dependencies, defined above.
			AEOPR_VER,
			true // Enqueue the script in the footer.
		);*/
    wp_localize_script(
			'aeopr-block-editor-js',
			'aeopr_blocks_info',
			array(
				'blocks'            => AEOPR_Config::get_block_attributes(),
				'category'          => 'aeopr',
				//'ajax_url'          => admin_url( 'admin-ajax.php' ),
				//'cf7_forms'         => $this->get_cf7_forms(),
				//'gf_forms'          => $this->get_gravity_forms(),
				'tablet_breakpoint' => AEOPR_TABLET_BREAKPOINT,
				'mobile_breakpoint' => AEOPR_MOBILE_BREAKPOINT,
				'image_sizes'       => AEOPR_Helper::get_image_sizes(),
				'post_types'        => AEOPR_Helper::get_post_types(),
				'all_taxonomy'      => AEOPR_Helper::get_related_taxonomy(),
				//'uagb_ajax_nonce'   => $uagb_ajax_nonce,

			)
		);


}

/// --> Queue frontend resources 
/*** Probably better off to do this in the theme ***/

add_action('wp_enqueue_scripts', 'enqueue_aeopr_frontend_resources');
function enqueue_aeopr_frontend_resources(){
      $cachebust = mt_rand();  
    //wp_enqueue_style( 'font-awesome', plugins_url('ae-opr-blocks'). '/assets/styles/font-awesome.css', array(), '4.7.0' );
    wp_enqueue_style( 'ultimate-icons', plugins_url('ae-opr-blocks') . '/assets/styles/ultimate-icons.css', array(), '4.7.0' );
     wp_enqueue_style(
        'aeopr-blocks-frontend-styles',
        plugins_url( 'dist/style.build.css', __FILE__),
        array(),
        AEOPR_VER.'-'.$cachebust
    );
     wp_enqueue_script(
        'aeopr-blocks-frontend-scripts',
        plugins_url( 'dist/frontend.build.js', __FILE__ ),
        array(),
        AEOPR_VER,
        true
    );

}







