<?php
/**
 * AE OPR Theme functions and definitions
 *
 * @link       https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package    ae-opr-theme
 * @license    http://opensource.org/licenses/gpl-2.0.php GNU Public License
 */

define( 'THEME_VERSION', '1.0.0' );
require_once get_template_directory()."/aria-walker-nav-menu.php";
//require_once get_template_directory()."/inc/plugins/TGM-Plugin-Activation-2.6.1/class-tgm-plugin-activation.php";
require_once get_parent_theme_file_path( '/inc/merlin/vendor/autoload.php' );
require_once get_parent_theme_file_path( '/inc/merlin/class-merlin.php' );
require_once get_parent_theme_file_path( '/inc/merlin/merlin-config.php' );


if ( ! function_exists( 'aeopr_setup' ) ) :
	/**
	 * Sets up theme defaults and registers support for various WordPress features.
	 *
	 * Note that this function is hooked into the after_setup_theme hook, which
	 * runs before the init hook. The init hook is too late for some features, such
	 * as indicating support for post thumbnails.
	 */
	 
	 //add_action( 'tgmpa_register', 'my_theme_register_required_plugins' );
	 
	 /**
	  * Register the required plugins for this theme.
	  *
	  *  <snip />
	  *
	  * This function is hooked into tgmpa_init, which is fired within the
	  * TGM_Plugin_Activation class constructor.
	  */
	function my_theme_register_required_plugins() {
		/*
		 * Array of plugin arrays. Required keys are name and slug.
		 * If the source is NOT from the .org repo, then source is also required.
		 */
		$plugins = array(
		
			// This is an example of how to include a plugin from the WordPress Plugin Repository.
			array( 
				'name'=>'Advanced Custom Fields: Extended', 
				'slug'=>'acf-extended',
				'required'=>true
			),
			array( 
				'name'=>'ACF Medium Editor Field', 
				'slug'=>'acf-medium-editor-field',
				'required'=>true
			),
			array( 
				'name'=>'ACF to REST API', 
				'slug'=>'acf-to-rest-api',
				'required'=>true
			),
			array( 
				'name'=>'Admin Management Xtended', 
				'slug'=>'admin-management-xtended',
				'required'=>true
			),
			array( 
				'name'=>'Admin Menu Editor', 
				'slug'=>'admin-menu-editor',
				'required'=>true
			),
			array( 
				'name'=>'Advanced Custom Fields', 
				'slug'=>'advanced-custom-fields',
				'required'=>true
			),
			array( 
				'name'=>'Duplicate Page', 
				'slug'=>'duplicate-page',
				'required'=>true
			),
			array( 
				'name'=>'FileBird Lite', 
				'slug'=>'filebird',
				'required'=>true
			),
			array( 
				'name'=>'Hummingbird', 
				'slug'=>'hummingbird-performance',
				'required'=>true
			),
			array( 
				'name'=>'Central Color Palette', 
				'slug'=>'kt-tinymce-color-grid',
				'required'=>true
			),
			array( 
				'name'=>'Page-list', 
				'slug'=>'page-list',
				'required'=>true
			),
			array( 
				'name'=>'Permalink Manager Lite', 
				'slug'=>'permalink-manager',
				'required'=>true
			),
			array( 
				'name'=>'Redirection', 
				'slug'=>'redirection',
				'required'=>true
			),
			array( 
				'name'=>'Reusable Blocks Extended', 
				'slug'=>'reusable-blocks-extended',
				'required'=>true
			),
			array( 
				'name'=>'SVG Support', 
				'slug'=>'svg-support',
				'required'=>true
			),
			array( 
				'name'=>'Advanced Editor Tools (previously TinyMCE Advanced)', 
				'slug'=>'tinymce-advanced',
				'required'=>true
			),
			array( 
				'name'=>'User Role Editor', 
				'slug'=>'user-role-editor',
				'required'=>true
			),
			array( 
				'name'=>'Yoast SEO', 
				'slug'=>'wordpress-seo',
				'required'=>true
			),
			array( 
				'name'=>'WP GraphiQL', 
				'slug'=>'wp-graphiql-master',
				'required'=>true
			),
			array( 
				'name'=>'WP GraphQL', 
				'slug'=>'wp-graphql',
				'required'=>true
			),
			array( 
				'name'=>'Nested Pages', 
				'slug'=>'wp-nested-pages',
				'required'=>true
			),
			array( 
				'name'=>'Smush', 
				'slug'=>'wp-smushit',
				'required'=>true
			)


			
			// <snip />
		);
		
		/*
		 * Array of configuration settings. Amend each line as needed.
		 *
		 * TGMPA will start providing localized text strings soon. If you already have translations of our standard
		 * strings available, please help us make TGMPA even better by giving us access to these translations or by
		 * sending in a pull-request with .po file(s) with the translations.
		 *
		 * Only uncomment the strings in the config array if you want to customize the strings.
		 */
		$config = array(
			'id'           => 'tgmpa',                 // Unique ID for hashing notices for multiple instances of TGMPA.
			'default_path' => '',                      // Default absolute path to bundled plugins.
			'menu'         => 'tgmpa-install-plugins', // Menu slug.
			'parent_slug'  => 'themes.php',            // Parent menu slug.
			'capability'   => 'edit_theme_options',    // Capability needed to view plugin install page, should be a capability associated with the parent menu used.
			'has_notices'  => true,                    // Show admin notices or not.
			'dismissable'  => true,                    // If false, a user cannot dismiss the nag message.
			'dismiss_msg'  => '',                      // If 'dismissable' is false, this message will be output at top of nag.
			'is_automatic' => false,                   // Automatically activate plugins after installation or not.
			'message'      => '',                      // Message to output right before the plugins table.
		);
		
		//tgmpa( $plugins, $config );
	
	}
	 //define demo content import
	function merlin_import_files() {
		return array(
			array(
				'import_file_name'           => 'AEOPR Boilerplate',
				'import_file_url'            => get_parent_theme_file_path( 'inc/merlin/content.xml'),
				//'import_widget_file_url'     => 'http://www.your_domain.com/merlin/widgets.json',
				//'import_customizer_file_url' => 'http://www.your_domain.com/merlin/customizer.dat',
				//'import_preview_image_url'   => 'http://www.your_domain.com/merlin/preview_import_image1.jpg',
				'import_notice'              => __( 'A special note for this import.', 'your-textdomain' ),
				//'preview_url'                => 'http://www.your_domain.com/my-demo-1',
			),
		);
	}
	add_filter( 'merlin_import_files', 'merlin_import_files' );
	
	function aeopr_setup() {
		
		// Add default posts and comments RSS feed links to head.
		add_theme_support( 'automatic-feed-links' );
		remove_theme_support( 'core-block-patterns' );
		/*
		 * Let WordPress manage the document title.
		 * By adding theme support, we declare that this theme does not use a
		 * hard-coded <title> tag in the document head, and expect WordPress to
		 * provide it for us.
		 */
		add_theme_support( 'title-tag' );

		/*
		 * Enable support for Post Thumbnails on posts and pages.
		 *
		 * @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
		 */
		add_theme_support( 'post-thumbnails' );

		
		/*
		 * Switch default core markup for search form, comment form, and comments
		 * to output valid HTML5.
		 */
		add_theme_support(
			'html5',
			array(
				'search-form',
				'comment-form',
				'comment-list',
				'gallery',
				'caption',
			)
		);

		// Set up the WordPress core custom background feature.
		add_theme_support(
			'custom-background',
			apply_filters(
				'aeopr_custom_background_args',
				array(
					'default-color' => 'ffffff',
					'default-image' => '',
				)
			)
		);

		// Add theme support for selective refresh for widgets.
		add_theme_support( 'customize-selective-refresh-widgets' );

		// Add image size for blog posts, 600px wide (and unlimited height).
		add_image_size( 'aeopr-blog', 600 );
		// Add image size for full width template, 1040px wide (and unlimited height).
		add_image_size( 'aeopr-full-width', 1040 );

		// Add stylesheet for the WordPress editor.
		add_theme_support( 'editor-styles');
		add_editor_style( '/assets/css/editor-style.css' );
		add_theme_support( 'disable-custom-font-sizes' );
		// Add support for custom logo.
		add_theme_support(
			'custom-logo',
			array(
				'height'      => 100,
				'width'       => 400,
				'flex-height' => true,
				'flex-width'  => true,
				'header-text' => array( 'site-title', 'site-description' ),
			)
		);
					

	}
endif;


add_action( 'after_setup_theme', 'aeopr_setup' );



/**
 * Set the content width in pixels, based on the theme's design and stylesheet.
 *
 * Priority 0 to make it available to lower priority callbacks.
 *
 * @global int $content_width
 */
function aeopr_content_width() {
	$GLOBALS['content_width'] = apply_filters( 'aeopr_content_width', 1040 );
}
add_action( 'after_setup_theme', 'aeopr_content_width', 0 );

/**
 * Register widget area.
 *
 * @link https://developer.wordpress.org/themes/functionality/sidebars/#registering-a-sidebar
 */
function aeopr_widgets_init() {
	register_sidebar(
		array(
			'name'          => esc_html__( 'Sidebar', 'aeopr' ),
			'id'            => 'sidebar-1',
			'description'   => esc_html__( 'Add widgets here.', 'aeopr' ),
			'before_widget' => '<section class="widget %2$s">',
			'after_widget'  => '</section>',
			'before_title'  => '<h3 class="widget-title">',
			'after_title'   => '</h3>',
		)
	);
}
add_action( 'widgets_init', 'aeopr_widgets_init' );

/**
 * Enqueue scripts and styles.
 */

function aeopr_scripts() {	
/// --> enqueue fonts. Need to pull this from settings eventually
	wp_enqueue_script('aeopr-fontawesome','https://kit.fontawesome.com/0516165e98.js');
	wp_enqueue_style('aeopr-site-style', get_template_directory_uri().'/assets/css/site.css', array(), THEME_VERSION.'-'.mt_rand() );
/// -->> Slick scrolling javascript for Programs Grid    
    //slick css to the header
	wp_enqueue_style( 'aeopr-slick_css', get_template_directory_uri() . '/assets/css/slick.css', array(), null, false ); 
	wp_enqueue_style( 'aeoprslick_theme_css', get_template_directory_uri() . '/assets/css/slick-theme.css', array(), null, false ); 
	//slick js to the footer
	wp_register_script('aeopr-slick_jquery', ( get_template_directory_uri() . '/assets/js/slick.min.js'), array(), null, true);
	wp_enqueue_script('aeopr-slick_jquery');



	if ( ! is_admin() ) {
		wp_enqueue_script( 'aeopr-frontend-scripts', get_template_directory_uri() . '/assets/js/site.js', array(), THEME_VERSION.'-'.mt_rand(), true );
	}

	
}
add_action( 'wp_enqueue_scripts', 'aeopr_scripts' );


/// --> defer scripts
function aeopr_defer_scripts( $tag, $handle, $src ) {
  $defer = array( 
    'aeopr-frontend-scripts',
  );
  if ( in_array( $handle, $defer ) ) {
     return '<script src="' . $src . '" defer="defer" type="text/javascript"></script>' . "\n";
  }
    
    return $tag;
} 
add_filter( 'script_loader_tag', 'aeopr_defer_scripts', 10, 3 );


/**
 * Admin enqueue
 */
 
function aeopr_admin_scripts() {


	wp_enqueue_script( 'aeopr-admin-navigation', get_template_directory_uri() . '/assets/js/navigation.js', array(), THEME_VERSION, true );

	if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
		wp_enqueue_script( 'comment-reply' );
	}
	

	
}
add_action( 'admin_enqueue_scripts', 'aeopr_scripts' );


add_action('wp_head', function () {
    //-- Spit out the tag.
    echo "<link rel='preload' href='https://use.typekit.net/qsg0lqq.css' as='style'/>\n";
    echo "<link rel='preload' href='https://kit.fontawesome.com/0516165e98.js' as='script'/>\n";

}, 1);
/**
 * Implement the Custom Header feature.
 */
//require get_template_directory() . '/inc/custom-header.php';

/**
 * Custom template tags for this theme.
 */
require get_template_directory() . '/inc/template-tags.php';

/**
 * Custom functions that act independently of the theme templates.
 */
require get_template_directory() . '/inc/extras.php';

/**
 * Load Jetpack compatibility file.
 */
require get_template_directory() . '/inc/jetpack.php';

/**
 * Customizer additions.
 */
require get_template_directory() . '/inc/customizer/customizer.php';

/**
 * Load Customizer Settings.
 */
require get_template_directory() . '/inc/customizer/customizer-helper-settings.php';

/**
* Load Central Color Palette
 */
 //require get_template_directory().'/inc/plugins/kt-tinymce-color-grid/index.php';

/**
 * Load Course Manager Plugin
 **/
//add_filter('coursemanager/settings/path', 'opr_coursemanager_settings_path');

function opr_coursemanager_settings_path( $path ) { 
	// update path 
	$path = get_stylesheet_directory() . '/inc/plugins/opr-course-manager/'; 
	// return 
	return $path; 
}
//add_filter('coursemanager/settings/dir', 'opr_coursemanager_settings_dir'); 
function opr_coursemanager_settings_dir( $dir ) { 
	// update path 
	$dir = get_stylesheet_directory_uri() . '/inc/plugins/opr-course-manager/'; 
	// return 
	return $dir; 
}
require get_template_directory().'/inc/plugins/opr-course-manager/plugin.php' ;

/**
 * Load Program Manager Plugin
 **/
//add_filter('program_manager/settings/path', 'opr_program_manager_settings_path'); 

function opr_program_manager_settings_path( $path ) { 
	// update path 
	$path = get_stylesheet_directory() . '/inc/plugins/opr-program-manager/'; 
	// return 
	return $path; 
}
//add_filter('program_manager/settings/dir', 'opr_program_manager_settings_dir'); 
function opr_program_manager_settings_dir( $dir ) { 
	// update path 
	$dir = get_stylesheet_directory_uri() . '/inc/plugins/opr-program-manager/'; 
	// return 
	return $dir; 
}
require get_template_directory() . '/inc/plugins/opr-program-manager/plugin.php' ;

/**
 * Load Landing Page Manager Plugin
 **/
//add_filter('landing_page_manager/settings/path', 'opr_landing_page_manager_settings_path'); 
function opr_landing_page_manager_settings_path( $path ) { 
	// update path 
	$path = get_stylesheet_directory() . '/inc/plugins/opr-landingpage-manager/'; 
	// return 
	return $path; 
}
//add_filter('landing_page_manager/settings/dir', 'opr_landing_page_manager_settings_dir'); 
function opr_landing_page_manager_settings_dir( $dir ) { 
	// update path 
	$dir = get_stylesheet_directory_uri() . '/inc/plugins/opr-landingpage-manager/'; 
	// return 
	return $dir; 
}
require get_template_directory().'/inc/plugins/opr-landingpage-manager/plugin.php' ;


/**
 * Load Video Gallery Plugin
 **/
require get_template_directory().'/inc/plugins/opr-video-gallery/plugin.php'; 


/** 
 * Add "Brand Colors" pages under Settings menu
 */
require get_template_directory(). '/inc/plugins/opr-brand-settings/index.php';

/***
 * Load AEOPR Blocks
 ***/
 
 //require get_template_directory(). '/inc/plugins/ae-opr-blocks/ae-opr-blocks.php' ;


/***
 * Admin UI cleanup
 ***/
 
 
 
 /**
 * Activates the 'menu_order' filter and then hooks into 'menu_order'
 */
//add_filter('custom_menu_order', function() { return true; });
//add_filter('menu_order', 'aeopr_admin_menu_order');

/**
 * Filters WordPress' default menu order
 *
function aeopr_admin_menu_order( $menu_order ) {
  // define your new desired menu positions here
  // for example, move 'upload.php' to position #9 and built-in pages to position #1
  $new_positions = array(
    'edit.php?post_type=page' => 1,
    '/inc/plugins/course-manager/plugin.php'=>2,
    '/inc/plugins/video-gallery/plugin.php'=>4,
	'upload.php'=>5,  
    'edit.php' => 6,
    'edit-comments.php'=>7,
    'separator2'=>8,
    '/inc/plugins/brand-settings/index.php'=>9

  );
  // helper function to move an element inside an array
  function move_element(&$array, $a, $b) {
    $out = array_splice($array, $a, 1);
    array_splice($array, $b, 0, $out);
  }
  // traverse through the new positions and move 
  // the items if found in the original menu_positions
  foreach( $new_positions as $value => $new_index ) {
    if( $current_index = array_search( $value, $menu_order ) ) {
      move_element($menu_order, $current_index, $new_index);
    }
  }
  return $menu_order;
};*/


///Set up new rest route for menus
/*function aeopr_get_undergrad_menu($data) {
    # Change 'menu' to your own navigation slug.
    return wp_get_nav_menu_items($data['id']);
}

add_action( 'rest_api_init', function () {
        register_rest_route( 'wp/v2', '/menu/(?P<id>\d+)', array(
        'methods' => 'GET',
        'callback' => 'aeopr_get_undergrad_menu',
    ) );
} );*/
///Set up graphql reg for Reusable Blocks Extended... wp_block type
add_filter( 'register_post_type_args', function( $args, $post_type ) {

	if ( 'wp_block' === $post_type ) {
		$args['show_in_graphql'] = true;
		$args['graphql_single_name'] = 'reblock';
		$args['graphql_plural_name'] = 'reblocks';
	}

	return $args;

}, 10, 2 );

/// --> expand GraphQL return limits
add_filter( 'graphql_connection_max_query_amount', function( $amount, $source, $args, $context, $info  ) {
    if ( current_user_can( 'manage_options' ) ) {
         $amount = 1000;
    }
    return $amount;
}, 10, 5 );

/**
* Hide Draft Pages from the menu
*/
function filter_draft_pages_from_menu ($items, $args) {
 foreach ($items as $ix => $obj) {
  if (!is_user_logged_in () && 'draft' == get_post_status ($obj->object_id)) {
   unset ($items[$ix]);
  }
 }
 return $items;
}
add_filter ('wp_nav_menu_objects', 'filter_draft_pages_from_menu', 10, 2);

///Store metadata for pages
///made these protected (_) fields as without suth, Gutenberg wouldn't save to database
function aeopr_register_meta() {
  	register_meta('post', '_aeopr_start_date_show', 
	  	array(
			'object_subtype'=>'page',
		    'show_in_rest' => true,
		    'type' => 'boolean',
		    'single' => true,
		    'auth_callback' => function() {
		        return current_user_can( 'edit_posts' );
			},
			 'schema' => array(
			        'default' => true
			    )
		)
	);
	
	
}
add_action('init', 'aeopr_register_meta');


/**
 * Custom Archive listing function
 * year
 *   -month
 *   -month
 * year
 ***/
 
 function wp_custom_archive($args = '') {
    global $wpdb, $wp_locale;

    $defaults = array(
        'limit' => '',
        'format' => 'html', 'before' => '',
        'after' => '', 'show_post_count' => false,
        'echo' => 1
    );

    $r = wp_parse_args( $args, $defaults );
    extract( $r, EXTR_SKIP );

    if ( '' != $limit ) {
        $limit = absint($limit);
        $limit = ' LIMIT '.$limit;
    }

    // over-ride general date format ? 0 = no: use the date format set in Options, 1 = yes: over-ride
    $archive_date_format_over_ride = 0;

    // options for daily archive (only if you over-ride the general date format)
    $archive_day_date_format = 'Y/m/d';

    // options for weekly archive (only if you over-ride the general date format)
    $archive_week_start_date_format = 'Y/m/d';
    $archive_week_end_date_format   = 'Y/m/d';

    if ( !$archive_date_format_over_ride ) {
        $archive_day_date_format = get_option('date_format');
        $archive_week_start_date_format = get_option('date_format');
        $archive_week_end_date_format = get_option('date_format');
    }

    //filters
    $where = apply_filters('customarchives_where', "WHERE post_type = 'post' AND post_status = 'publish'", $r );
    $join = apply_filters('customarchives_join', "", $r);

    $output = '<ul>';

        $query = "SELECT YEAR(post_date) AS `year`, MONTH(post_date) AS `month`, count(ID) as posts FROM $wpdb->posts $join $where GROUP BY YEAR(post_date), MONTH(post_date) ORDER BY post_date DESC $limit";
        $key = md5($query);
        $cache = wp_cache_get( 'wp_custom_archive' , 'general');
        if ( !isset( $cache[ $key ] ) ) {
            $arcresults = $wpdb->get_results($query);
            $cache[ $key ] = $arcresults;
            wp_cache_set( 'wp_custom_archive', $cache, 'general' );
        } else {
            $arcresults = $cache[ $key ];
        }
        if ( $arcresults ) {
            $afterafter = $after;
            foreach ( (array) $arcresults as $arcresult ) {
                $url = get_month_link( $arcresult->year, $arcresult->month );
                $year_url = get_year_link($arcresult->year);
                /* translators: 1: month name, 2: 4-digit year */
                $text = sprintf(__('%s'), $wp_locale->get_month($arcresult->month));
                $year_text = sprintf('%d', $arcresult->year);
                if ( $show_post_count )
                    $after = '&nbsp;('.$arcresult->posts.')' . $afterafter;
                $year_output = get_archives_link($year_url, $year_text, $format, $before, $after);              
                $output .= ( $arcresult->year != $temp_year ) ? $year_output : '';
                $output .= get_archives_link($url, $text, $format, $before, $after);

                $temp_year = $arcresult->year;
            }
        }

    $output .= '</ul>';

    if ( $echo )
        echo $output;
    else
        return $output;
}


/***
 * Make all images have relative urls
 ***/
 function switch_to_relative_url($html, $id, $caption, $title, $align, $url, $size, $alt)
{
	$imageurl = wp_get_attachment_image_src($id, $size);
	$relativeurl = wp_make_link_relative($imageurl[0]);   
	$html = str_replace($imageurl[0],$relativeurl,$html);
	      
	return $html;
}
add_filter('image_send_to_editor','switch_to_relative_url',10,8);




/// --> add meta to records query
/**
 * Check the orderby param for the particular REST API for hte custom post type. 
 * If it is set to a particular meta_ket, then set the orderby and meta_key query args/
 * @link https://www.timrosswebdevelopment.com/wordpress-rest-api-order-by-meta_value/
 */
function filter_rest_course_query($query_vars, $request) {
    $orderby = $request->get_param('orderby');
    if (isset($orderby) && $orderby === 'course_id') {
	    //print_r($orderby.' filter');
        $query_vars["orderby"] = "meta_value";
        
        $query_vars["meta_key"] = "course_id";
    }
    return $query_vars;
}

// The filter is named rest_{post_type}_query. So you need to hook a new filter for each 
// of the custom post types you need to sort.
add_filter( 'rest_course_query', 'filter_rest_course_query', 10, 2);


function childpages_shortcode_callback( $atts ) {
    $atts = shortcode_atts( array(
        'parent' => false,
    ), $atts, 'childpages' );

    $parent_id = false;
    if ( $atts['parent'] ) {
        $parent = get_page_by_path( $atts['parent'] ); 
        if ( $parent ) {
            $parent_id = $parent->ID;
        }
    } else { // if no parent passed, then show children of current page
        $parent_id = get_the_ID();
    }

    $result = '';
    if ( ! $parent_id ) {  // don't waste time getting pages, if we couldn't get parent page
         return $result;
    }

    $childpages = wp_list_pages( array(
        'sort_column' => 'menu_order',
        'title_li' => '',
        'child_of' => $parent_id,
        'echo' => 0
    ) );

    if ( $childpages ) {
        $result = '<ul>' . $childpages . '</ul>';
    }

    return $result;
}
add_shortcode( 'childpages', 'childpages_shortcode_callback' );

/// --> Shortcode for published date
function shortcode_post_published_date(){
 return get_the_date();
}
add_shortcode( 'post_published', 'shortcode_post_published_date' );

/// --> Nav filters

function change_nav_ul_item_classes( $classes, $args, $depth ) {
    $classes[] = 'sub-menu-lvl-'.$depth;
    return $classes;
}
add_filter( 'nav_menu_submenu_css_class', 'change_nav_ul_item_classes', 10, 3 );


//add_filter('acf/settings/remove_wp_meta_box', '__return_false');


add_filter('acf/prepare_field/name=opr_program_start_date', function($field ) {
    if( empty($field['value'])) {
        $field['value'] = get_option('opr_brand_settings_programs_start_date');
    };
    return $field;
});

add_filter('acf/prepare_field/name=opr_program_apply_date', function( $field ) {
    if( empty($field['value'])) {
        $field['value'] = get_option('opr_brand_settings_programs_apply_date');
    };
    return $field;
});


/// add default image field for acf image

add_action('acf/render_field_settings/type=image', 'add_default_value_to_image_field');
function add_default_value_to_image_field($field) {
	acf_render_field_setting( $field, array(
		'label'			=> 'Default Image',
		'instructions'		=> 'Appears when creating a new post',
		'type'			=> 'image',
		'name'			=> 'default_value',
	));
}






