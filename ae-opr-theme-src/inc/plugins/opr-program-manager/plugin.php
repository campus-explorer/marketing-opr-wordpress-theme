<?php
/**
 * Plugin Name: OPR Program Manager
 * Plugin URI:
 * Description:
 * Version:     0.1.0
 * Author:      Jason Sonderman
 * Text Domain: opr-program-manager
 * Domain Path: /languages
 *
 * @package OPRProgramManager
 */

// Useful global constants.
define( 'OPR_PROGRAM_MANAGER_VERSION', '0.1.0' );
define( 'OPR_PROGRAM_MANAGER_URL', plugin_dir_url( __FILE__ ) );
define( 'OPR_PROGRAM_MANAGER_PATH', plugin_dir_path( __FILE__ ) );
define( 'OPR_PROGRAM_MANAGER_INC', OPR_PROGRAM_MANAGER_PATH . 'includes/' );

// Include files.
//require_once OPR_PROGRAM_MANAGER_INC . 'functions/core.php';

// Activation/Deactivation.
//register_activation_hook( __FILE__, '\OPRProgramManager\Core\activate' );
//register_deactivation_hook( __FILE__, '\OPRProgramManager\Core\deactivate' );

// Bootstrap.
//OPRProgramManager\Core\setup();

// Require Composer autoloader if it exists.
if ( file_exists( OPR_PROGRAM_MANAGER_PATH . '/vendor/autoload.php' ) ) {
	require_once OPR_PROGRAM_MANAGER_PATH . 'vendor/autoload.php';
}




function create_program_posttype() {
	
	 // Add new taxonomy, make it hierarchical like categories
//first do the translations part for GUI
 
  $labels = array(
    'name' => _x( 'Program Types', 'taxonomy general name' ),
    'singular_name' => _x( 'Program Type', 'taxonomy singular name' ),
    'search_items' =>  __( 'Search Types' ),
    'all_items' => __( 'All Types' ),
    'edit_item' => __( 'Edit Type' ), 
    'update_item' => __( 'Update Type' ),
    'add_new_item' => __( 'Add New Type' ),
    'new_item_name' => __( 'New Type Name' ),
    'menu_name' => __( 'Program Types' ),
    'parent_item' => null,
    'parent_item_colon' => null,
  );    
 
// Now register the taxonomy
  register_taxonomy('program_types','program', array(
    'hierarchical' => true,
    'labels' => $labels,
    'show_ui' => true,
    'show_in_rest' => true,
    'show_admin_column' => true,
    'query_var' => true,
    'rewrite' => array( 'slug' => 'program_types' ),
    'update_count_callback' => '_update_post_term_count'
  ));

 
    register_post_type( 'program',
    // CPT Options
        array(
            'labels' => array(
                'name' => __( 'Programs' ),
                'singular_name' => __( 'Program' )
            ),
            'supports'=>array(
	            'title',
	            'custom-fields'
            ),
            'public' => true,
            'has_archive' => true,
            'rewrite' => array('slug' => 'programs'),
            'show_in_rest' => true,
            'show_in_graphql' => true,
            'taxonomies' => array( 'program_types' ),
            'graphql_single_name' => 'program',
            'graphql_plural_name' => 'programs',
            'hierarchical' => true,
            'show_ui' => true,
            'menu_icon' => 'data:image/svg+xml;base64,PHN2ZyBhcmlhLWhpZGRlbj0idHJ1ZSIgZm9jdXNhYmxlPSJmYWxzZSIgZGF0YS1wcmVmaXg9ImZhcyIgZGF0YS1pY29uPSJncmFkdWF0aW9uLWNhcCIgY2xhc3M9InN2Zy1pbmxpbmUtLWZhIGZhLWdyYWR1YXRpb24tY2FwIGZhLXctMjAiIHJvbGU9ImltZyIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgNjQwIDUxMiI+PHBhdGggZmlsbD0iY3VycmVudENvbG9yIiBkPSJNNjIyLjM0IDE1My4yTDM0My40IDY3LjVjLTE1LjItNC42Ny0zMS42LTQuNjctNDYuNzkgMEwxNy42NiAxNTMuMmMtMjMuNTQgNy4yMy0yMy41NCAzOC4zNiAwIDQ1LjU5bDQ4LjYzIDE0Ljk0Yy0xMC42NyAxMy4xOS0xNy4yMyAyOS4yOC0xNy44OCA0Ni45QzM4Ljc4IDI2Ni4xNSAzMiAyNzYuMTEgMzIgMjg4YzAgMTAuNzggNS42OCAxOS44NSAxMy44NiAyNS42NUwyMC4zMyA0MjguNTNDMTguMTEgNDM4LjUyIDI1LjcxIDQ0OCAzNS45NCA0NDhoNTYuMTFjMTAuMjQgMCAxNy44NC05LjQ4IDE1LjYyLTE5LjQ3TDgyLjE0IDMxMy42NUM5MC4zMiAzMDcuODUgOTYgMjk4Ljc4IDk2IDI4OGMwLTExLjU3LTYuNDctMjEuMjUtMTUuNjYtMjYuODcuNzYtMTUuMDIgOC40NC0yOC4zIDIwLjY5LTM2LjcyTDI5Ni42IDI4NC41YzkuMDYgMi43OCAyNi40NCA2LjI1IDQ2Ljc5IDBsMjc4Ljk1LTg1LjdjMjMuNTUtNy4yNCAyMy41NS0zOC4zNiAwLTQ1LjZ6TTM1Mi43OSAzMTUuMDljLTI4LjUzIDguNzYtNTIuODQgMy45Mi02NS41OSAwbC0xNDUuMDItNDQuNTVMMTI4IDM4NGMwIDM1LjM1IDg1Ljk2IDY0IDE5MiA2NHMxOTItMjguNjUgMTkyLTY0bC0xNC4xOC0xMTMuNDctMTQ1LjAzIDQ0LjU2eiI+PC9wYXRoPjwvc3ZnPg=='
 
 
        )
    );
    
    
}
// Hooking up our function to theme setup
add_action( 'init', 'create_program_posttype', 0 );





//Disable Blocks
add_filter('use_block_editor_for_post_type', 'program_disable_gutenberg', 10, 2);
function program_disable_gutenberg($current_status, $post_type)
{
    // Use your post type key instead of 'product'
    if ($post_type === 'program') return false;
    return $current_status;
}

/// --> Customize the columns for this post type

add_filter( 'manage_program_posts_columns', 'aeopr_filter_programs_columns' );
function aeopr_filter_programs_columns( $columns ) {
  $columns = array(
  'cb' => $columns['cb'],
  'title' => __('Title'),
  'program_code' => __( 'Program Code', 'aeopr' )
  );
  return $columns;
}

add_action( 'manage_program_posts_custom_column', 'aeopr_program_column', 10, 2);
function aeopr_program_column( $column, $post_id ) {
	global $post;

  if ( 'program_code' === $column ) {
	 
    echo get_field('program_code', $post->ID );
  }
}
add_filter( 'manage_edit-program_sortable_columns', 'aeopr_program_sortable_columns');
function aeopr_program_sortable_columns( $columns ) {
  $columns['program_code'] = 'program_code';
  return $columns;
}


///fill short name with post title if empty

add_action('acf/save_post', 'aeopr_copy_title_to_field', 20);
function aeopr_copy_title_to_field($post_id) {
  $value = get_field('program_shortName', $post_id);
  if (!$value) {
    $value = get_the_title($post_id);
    update_field('program_shortName', $value, $post_id);
  }
}

add_filter('acf/prepare_field/name=program_campus_code', 'aeopr_set_campus_code', 20);
function aeopr_set_campus_code($field) {
  
  if (!$field['value']) {
    $value = get_option('opr_brand_settings_campus_code'); /// pull global campus code as default
	$field['value']= $value;
  }
  return $field;
}




