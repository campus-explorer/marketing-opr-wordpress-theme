<?php
/**
 * Plugin Name: OPR Course Manager
 * Plugin URI:
 * Description:
 * Version:     0.1.5
 * Author:      Jason Sonderman
 * Text Domain: opr-video-manager
 * Domain Path: /languages
 *
 * @package OPRCourseManager
 */

/// --> TODO: Create two types of content: Video and Text based testimonials.  
 
// Useful global constants.
define( 'OPR_VIDEO_GALLERY_VERSION', '1.0' );
define( 'OPR_VIDEO_GALLERY_URL', plugin_dir_url( __FILE__ ) );
define( 'OPR_VIDEO_GALLERY_PATH', get_template_directory_uri().'/inc/plugins/opr-video-gallery' );
define( 'OPR_VIDEO_GALLERY_INC', OPR_VIDEO_GALLERY_PATH . 'includes/' );



// Require Composer autoloader if it exists.
if ( file_exists( OPR_VIDEO_GALLERY_PATH . '/vendor/autoload.php' ) ) {
	require_once OPR_VIDEO_GALLERY_PATH . 'vendor/autoload.php';
}

if ( file_exists( OPR_VIDEO_GALLERY_INC . '/google-api-php-client-2.8/autoload.php' ) ) {
	require_once OPR_VIDEO_GALLERY_INC . '/google-api-php-client-2.8/autoload.php';
}

/**
 * Create custom post type
 *
 */
function create_video_posttype() {
 
    register_post_type( 'video',
        array(
            'labels' => array(
                'name' => __( 'Videos' ),
                'singular_name' => __( 'Video' )
            ),
            'supports'=>array(
	            'title',
	            'custom-fields'
            ),
            'public' => true,
            'has_archive' => true,
            'rewrite' => array('slug' => 'videos'),
            'show_in_rest' => true,
            'show_in_graphql' => true,
            'graphql_single_name' => 'video',
            'graphql_plural_name' => 'videos',
            'hierarchical' => true,
            'show_ui' => true,
            'menu_icon' => 'data:image/svg+xml;base64,PHN2ZyBhcmlhLWhpZGRlbj0idHJ1ZSIgZm9jdXNhYmxlPSJmYWxzZSIgZGF0YS1wcmVmaXg9ImZhcyIgZGF0YS1pY29uPSJmaWxtIiBjbGFzcz0ic3ZnLWlubGluZS0tZmEgZmEtZmlsbSBmYS13LTE2IiByb2xlPSJpbWciIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmlld0JveD0iMCAwIDUxMiA1MTIiPjxwYXRoIGZpbGw9ImN1cnJlbnRDb2xvciIgZD0iTTQ4OCA2NGgtOHYyMGMwIDYuNi01LjQgMTItMTIgMTJoLTQwYy02LjYgMC0xMi01LjQtMTItMTJWNjRIOTZ2MjBjMCA2LjYtNS40IDEyLTEyIDEySDQ0Yy02LjYgMC0xMi01LjQtMTItMTJWNjRoLThDMTAuNyA2NCAwIDc0LjcgMCA4OHYzMzZjMCAxMy4zIDEwLjcgMjQgMjQgMjRoOHYtMjBjMC02LjYgNS40LTEyIDEyLTEyaDQwYzYuNiAwIDEyIDUuNCAxMiAxMnYyMGgzMjB2LTIwYzAtNi42IDUuNC0xMiAxMi0xMmg0MGM2LjYgMCAxMiA1LjQgMTIgMTJ2MjBoOGMxMy4zIDAgMjQtMTAuNyAyNC0yNFY4OGMwLTEzLjMtMTAuNy0yNC0yNC0yNHpNOTYgMzcyYzAgNi42LTUuNCAxMi0xMiAxMkg0NGMtNi42IDAtMTItNS40LTEyLTEydi00MGMwLTYuNiA1LjQtMTIgMTItMTJoNDBjNi42IDAgMTIgNS40IDEyIDEydjQwem0wLTk2YzAgNi42LTUuNCAxMi0xMiAxMkg0NGMtNi42IDAtMTItNS40LTEyLTEydi00MGMwLTYuNiA1LjQtMTIgMTItMTJoNDBjNi42IDAgMTIgNS40IDEyIDEydjQwem0wLTk2YzAgNi42LTUuNCAxMi0xMiAxMkg0NGMtNi42IDAtMTItNS40LTEyLTEydi00MGMwLTYuNiA1LjQtMTIgMTItMTJoNDBjNi42IDAgMTIgNS40IDEyIDEydjQwem0yNzIgMjA4YzAgNi42LTUuNCAxMi0xMiAxMkgxNTZjLTYuNiAwLTEyLTUuNC0xMi0xMnYtOTZjMC02LjYgNS40LTEyIDEyLTEyaDIwMGM2LjYgMCAxMiA1LjQgMTIgMTJ2OTZ6bTAtMTY4YzAgNi42LTUuNCAxMi0xMiAxMkgxNTZjLTYuNiAwLTEyLTUuNC0xMi0xMnYtOTZjMC02LjYgNS40LTEyIDEyLTEyaDIwMGM2LjYgMCAxMiA1LjQgMTIgMTJ2OTZ6bTExMiAxNTJjMCA2LjYtNS40IDEyLTEyIDEyaC00MGMtNi42IDAtMTItNS40LTEyLTEydi00MGMwLTYuNiA1LjQtMTIgMTItMTJoNDBjNi42IDAgMTIgNS40IDEyIDEydjQwem0wLTk2YzAgNi42LTUuNCAxMi0xMiAxMmgtNDBjLTYuNiAwLTEyLTUuNC0xMi0xMnYtNDBjMC02LjYgNS40LTEyIDEyLTEyaDQwYzYuNiAwIDEyIDUuNCAxMiAxMnY0MHptMC05NmMwIDYuNi01LjQgMTItMTIgMTJoLTQwYy02LjYgMC0xMi01LjQtMTItMTJ2LTQwYzAtNi42IDUuNC0xMiAxMi0xMmg0MGM2LjYgMCAxMiA1LjQgMTIgMTJ2NDB6Ij48L3BhdGg+PC9zdmc+'
 
        )
    );
}

add_action( 'init', 'create_video_posttype' );

/**
 * Add categories for CPT
 *
 * Retrieve in template:
 * 	$taxonomy = 'video_categories';
 	$terms = get_terms($taxonomy); // Get all terms of a taxonomy

 	if ( $terms && !is_wp_error( $terms ) ) :
 		?>
 		<ul>
        	<?php foreach ( $terms as $term ) { ?>
            	<li><a href="<?php echo get_term_link($term->slug, $taxonomy); ?>"><?php echo $term->name; ?></a></li>
				<?php } ?>
		</ul>
	<?php endif;?>
 */

function create_video_taxonomies() {
    $labels = array(
        'name'              => _x( 'Categories', 'taxonomy general name' ),
        'singular_name'     => _x( 'Category', 'taxonomy singular name' ),
        'search_items'      => __( 'Search Categories' ),
        'all_items'         => __( 'All Categories' ),
        'parent_item'       => __( 'Parent Category' ),
        'parent_item_colon' => __( 'Parent Category:' ),
        'edit_item'         => __( 'Edit Category' ),
        'update_item'       => __( 'Update Category' ),
        'add_new_item'      => __( 'Add New Category' ),
        'new_item_name'     => __( 'New Category Name' ),
        'menu_name'         => __( 'Categories' ),
    );

    $args = array(
        'hierarchical'      => true, // Set this to 'false' for non-hierarchical taxonomy (like tags)
        'labels'            => $labels,
        'show_ui'           => true,
        'show_admin_column' => true,
        'query_var'         => true,
        'rewrite'           => array( 'slug' => 'categories' ),
    );

    register_taxonomy( 'video_categories', array( 'video' ), $args );
}
add_action( 'init', 'create_video_taxonomies', 0 );



/**
 * Disable Blocks for CPT Editor/Admin Custom Page
 *
 */

add_filter('use_block_editor_for_post_type', 'video_disable_gutenberg', 10, 2);
function video_disable_gutenberg($current_status, $post_type)
{
    // Use your post type key instead of 'product'
    if ($post_type === 'video') return false;
    return $current_status;
}

/**
 * Limit blocks based on page template
 *
 */
 
add_filter( 'allowed_block_types', 'restrict_block_types', 10, 2 );
function restrict_block_types( $allowed_blocks, $post ) {

    if( get_page_template_slug( $post->ID ) === 'templates/testimonials.php' ) {
        return array( 'aeopr/ab-post-grid',
        				'core/paragraph',
        				'core/heading',
        				'aeopr/content-area',
        				'aeopr/hero-block',
        				'aeopr/content-section' );
    }
}

/**
 * Enqueue scripts and styles
 *
 */
add_action( 'wp_enqueue_scripts', 'aeopr_video_resources' );
function aeopr_video_resources(){
	wp_enqueue_style('aeopr-videos-mediabox-style',OPR_VIDEO_GALLERY_PATH . '/dist/css/wa-mediabox.min.css', false);
	wp_enqueue_style('aeopr-videos-style',OPR_VIDEO_GALLERY_PATH . '/dist/css/style.css', false);
	/*wp_enqueue_script('aeopr-videos-script',OPR_VIDEO_GALLERY_PATH . '/dist/js/site.js');*/
	wp_enqueue_script('aeopr-videos-mediabox-script',OPR_VIDEO_GALLERY_PATH . '/dist/js/wa-mediabox.min.js');

}

/// --> Customize the columns for this post type

add_filter( 'manage_video_posts_columns', 'aeopr_filter_videos_columns' );
function aeopr_filter_videos_columns( $columns ) {
  $columns = array(
  'cb' => $columns['cb'],
  'title' => __('Title'),
  'video_url' => __( 'URL', 'aeopr' )

  );
  return $columns;
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
function videogallery_search_join( $join ) {
    global $wpdb;

    if ( is_search() ) {    
        $join .=' LEFT JOIN '.$wpdb->postmeta. ' ON '. $wpdb->posts . '.ID = ' . $wpdb->postmeta . '.post_id ';
    }

    return $join;
}
add_filter('posts_join', 'videogallery_search_join' );

/**
 * Modify the search query with posts_where
 *
 * http://codex.wordpress.org/Plugin_API/Filter_Reference/posts_where
 */
function videogallery_search_where( $where ) {
    global $pagenow, $wpdb;

    if ( is_search() && 'video' === $_GET['post_type'] ) {
        $where = preg_replace(
            "/\(\s*".$wpdb->posts.".post_title\s+LIKE\s*(\'[^\']+\')\s*\)/",
            "(".$wpdb->posts.".post_title LIKE $1) OR (".$wpdb->postmeta.".meta_value LIKE $1)", $where );
    }

    return $where;
}
add_filter( 'posts_where', 'videogallery_search_where' );

/**
 * Prevent duplicates
 *
 * http://codex.wordpress.org/Plugin_API/Filter_Reference/posts_distinct
 */
function videogallery_search_distinct( $where ) {
    global $wpdb;

    if ( is_search() ) {
        return "DISTINCT";
    }

    return $where;
}
add_filter( 'posts_distinct', 'videogallery_search_distinct' );




