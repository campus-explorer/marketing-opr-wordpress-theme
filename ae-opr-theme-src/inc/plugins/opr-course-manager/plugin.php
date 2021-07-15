<?php
/**
 * Plugin Name: OPR Course Manager
 * Plugin URI:
 * Description:
 * Version:     0.1.0
 * Author:      Jason Sonderman
 * Text Domain: opr-course-manager
 * Domain Path: /languages
 *
 * @package OPRCourseManager
 */

/***TODO: Taxonmies for Courses
 * course_type
 * - core
 * - general studies
 * - add-on
 * course_group
 * - business
 * - criminal Justice
 */
 
 
// Useful global constants.
define( 'OPR_COURSE_MANAGER_VERSION', '0.1.0' );
define( 'OPR_COURSE_MANAGER_URL', plugin_dir_url( __FILE__ ) );
define( 'OPR_COURSE_MANAGER_PATH', plugin_dir_path( __FILE__ ) );
define( 'OPR_COURSE_MANAGER_INC', OPR_COURSE_MANAGER_PATH . 'includes/' );

// Include files.
//require_once OPR_COURSE_MANAGER_INC . 'functions/core.php';

// Activation/Deactivation.
//register_activation_hook( __FILE__, '\OPRCourseManager\Core\activate' );
//register_deactivation_hook( __FILE__, '\OPRCourseManager\Core\deactivate' );

// Bootstrap.
//OPRCourseManager\Core\setup();

// Require Composer autoloader if it exists.
if ( file_exists( OPR_COURSE_MANAGER_PATH . '/vendor/autoload.php' ) ) {
	require_once OPR_COURSE_MANAGER_PATH . 'vendor/autoload.php';
}

function create_course_posttype() {
 
    register_post_type( 'course',
    // CPT Options
        array(
            'labels' => array(
                'name' => __( 'Courses' ),
                'singular_name' => __( 'Course' )
            ),
            'supports'=>array(
	            'title',
	            'custom-fields'
            ),
            'public' => true,
            'has_archive' => true,
            'rewrite' => array('slug' => 'courses'),
            'show_in_rest' => true,
            'show_in_graphql' => true,
            'graphql_single_name' => 'course',
            'graphql_plural_name' => 'courses',
            'hierarchical' => true,
            'show_ui' => true,
            'menu_icon' => 'data:image/svg+xml;base64,PHN2ZyBhcmlhLWhpZGRlbj0idHJ1ZSIgZm9jdXNhYmxlPSJmYWxzZSIgZGF0YS1wcmVmaXg9ImZhcyIgZGF0YS1pY29uPSJib29rIiBjbGFzcz0ic3ZnLWlubGluZS0tZmEgZmEtYm9vayBmYS13LTE0IiByb2xlPSJpbWciIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmlld0JveD0iMCAwIDQ0OCA1MTIiPjxwYXRoIGZpbGw9ImN1cnJlbnRDb2xvciIgZD0iTTQ0OCAzNjBWMjRjMC0xMy4zLTEwLjctMjQtMjQtMjRIOTZDNDMgMCAwIDQzIDAgOTZ2MzIwYzAgNTMgNDMgOTYgOTYgOTZoMzI4YzEzLjMgMCAyNC0xMC43IDI0LTI0di0xNmMwLTcuNS0zLjUtMTQuMy04LjktMTguNy00LjItMTUuNC00LjItNTkuMyAwLTc0LjcgNS40LTQuMyA4LjktMTEuMSA4LjktMTguNnpNMTI4IDEzNGMwLTMuMyAyLjctNiA2LTZoMjEyYzMuMyAwIDYgMi43IDYgNnYyMGMwIDMuMy0yLjcgNi02IDZIMTM0Yy0zLjMgMC02LTIuNy02LTZ2LTIwem0wIDY0YzAtMy4zIDIuNy02IDYtNmgyMTJjMy4zIDAgNiAyLjcgNiA2djIwYzAgMy4zLTIuNyA2LTYgNkgxMzRjLTMuMyAwLTYtMi43LTYtNnYtMjB6bTI1My40IDI1MEg5NmMtMTcuNyAwLTMyLTE0LjMtMzItMzIgMC0xNy42IDE0LjQtMzIgMzItMzJoMjg1LjRjLTEuOSAxNy4xLTEuOSA0Ni45IDAgNjR6Ij48L3BhdGg+PC9zdmc+'
 
        )
    );
}
// Hooking up our function to theme setup
add_action( 'init', 'create_course_posttype' );

//Disable Blocks
add_filter('use_block_editor_for_post_type', 'course_disable_gutenberg', 10, 2);
function course_disable_gutenberg($current_status, $post_type)
{
    // Use your post type key instead of 'product'
    if ($post_type === 'course') return false;
    return $current_status;
}

/// --> Customize the listing of relationship fields
add_filter('acf/fields/relationship/result/name=course_prerequisites', 'aeopr_acf_fields_relationship_result_prereqs', 10, 4);
function aeopr_acf_fields_relationship_result_prereqs( $text, $post, $field, $post_id ) {
    $course_id = get_field( 'course_id', $post->ID );
    if( $course_id ) {
        $text = sprintf( '%s', $course_id ).' - '.$text;
    }
    return $text;
}


/// --> Customize the columns for this post type

add_filter( 'manage_course_posts_columns', 'aeopr_filter_courses_columns' );
function aeopr_filter_courses_columns( $columns ) {
  $columns = array(
  'cb' => $columns['cb'],
  'title' => __('Title'),
  'course_id' => __( 'Course ID', 'aeopr' ),
  'course_credit_hours' => __( 'Credit Hours', 'aeopr' )
  );
  return $columns;
}

add_action( 'manage_course_posts_custom_column', 'aeopr_course_column', 10, 2);
function aeopr_course_column( $column, $post_id ) {
	global $post;
  if ( 'course_id' === $column ) {
    echo get_field('course_id', $post->ID );
  }
  if ( 'course_credit_hours' === $column ) {
    echo get_field( 'course_credit_hours',$post->ID);
  }
}


add_filter( 'manage_edit-course_sortable_columns', 'aeopr_course_sortable_columns');
function aeopr_course_sortable_columns( $columns ) {
  $columns['course_id'] = 'course_id';
  return $columns;
}
add_action( 'pre_get_posts', 'aeopr_course_orderby' );
function aeopr_course_orderby( $query ) {
  if( ! is_admin() || ! $query->is_main_query() ) {
    return;
  }

  if ( 'course_id' === $query->get( 'orderby') ) {
    $query->set( 'orderby', 'meta_value' );
    $query->set( 'meta_key', 'course_id' );
  }
}

/**
 * Extend WordPress search to include custom fields
 *
 * https://adambalee.com
 */

/**
 * Join posts and postmeta tables
 *
 * http://codex.wordpress.org/Plugin_API/Filter_Reference/posts_join
 */
function coursemgr_search_join( $join ) {
    global $wpdb;

    if ( is_search() ) {    
        $join .=' LEFT JOIN '.$wpdb->postmeta. ' ON '. $wpdb->posts . '.ID = ' . $wpdb->postmeta . '.post_id ';
    }

    return $join;
}
add_filter('posts_join', 'coursemgr_search_join' );

/**
 * Modify the search query with posts_where
 *
 * http://codex.wordpress.org/Plugin_API/Filter_Reference/posts_where
 */
function coursemgr_search_where( $where ) {
    global $pagenow, $wpdb;

    if ( is_search() && 'course' === $_GET['post_type'] ) {
        $where = preg_replace(
            "/\(\s*".$wpdb->posts.".post_title\s+LIKE\s*(\'[^\']+\')\s*\)/",
            "(".$wpdb->posts.".post_title LIKE $1) OR (".$wpdb->postmeta.".meta_value LIKE $1)", $where );
    }

    return $where;
}
add_filter( 'posts_where', 'coursemgr_search_where' );

/**
 * Prevent duplicates
 *
 * http://codex.wordpress.org/Plugin_API/Filter_Reference/posts_distinct
 */
function coursemgr_search_distinct( $where ) {
    global $wpdb;

    if ( is_search() ) {
        return "DISTINCT";
    }

    return $where;
}
add_filter( 'posts_distinct', 'coursemgr_search_distinct' );


