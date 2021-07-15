<?php
/**
 * Server-side rendering for the programs grid block
 *
 * @since   1.1.7
 * @package AEOPR Blocks
 * Based on Atomic Blocks
 */

/**
 * Renders the programs grid block on server.
 * Programs is a CPT with a custom taxonomy
 * 
 * @param string $attributes  Pass the block attributes.
 * @return string HTML content for the post grid.
 */
 

function aeopr_blocks_render_programs_grid( $attributes ) {

	/**
	 * Global post object.
	 * Used for excluding the current post from the grid.
	 *
	 * @var WP_Post
	 */
	global $post;

	/* Get the post categories 
		look at changing this to taxonomies
	*/
	$categories = isset( $attributes['program_types'] ) ? $attributes['program_types'] : '';

	
	if ( isset( $attributes['postType'] ) ) {
		/* Page query args */
		$args = array(
			'post_status'    => 'publish',
			'orderby'        => 'post__in',
			'post_type'      => $attributes['postType'],
			'posts_per_page' => count( $page_selection ),
///add taxonomy filter here			
		);

	} else {
		/* Post query args */
		$args = array();
	}

	/* Setup the query */
	$grid_query = new WP_Query( $args );

	$post_grid_markup = '';

	/* Start the loop */
	if ( $grid_query->have_posts() ) {

		while ( $grid_query->have_posts() ) {
			$grid_query->the_post();
			
			/* Setup the post ID */
			$post_id =get_the_ID();
			
			/* Setup the post classes */
			$post_classes = 'aeopr-programs-grid-item';

			
			/* Join classes together */
			$post_classes = join( ' ', get_post_class( $post_classes, $post_id ) );

			/* Start the markup for the post */
			$post_grid_markup .= sprintf(
				'<div id="post-%1$s" class="%2$s">',
				esc_attr( $post_id ),
				esc_attr( $post_classes )
			);

				

			/* Wrap the text content */
			$post_grid_markup .= sprintf(
				'<p className="aeopr-programs-grid-item-type">%1$s</p>
				
				<h4 className="aeopr-block-programs-grid-title"><a href="%3$s" rel="bookmark">%2$s</a></h4>',	
				get_field('program_aos'),
				get_the_title( $post_id ),
				esc_url( get_permalink( $post_id ) )
				
			);
			

			/* Close the header content */
			$post_grid_markup .= sprintf(
				'</div>\n'
			);
			

			
		}
	

		/* Restore original post data */
		wp_reset_postdata();

		/* Build the block classes */
		$class = "aeopr-block-programs-grid";

		if ( isset( $attributes['className'] ) ) {
			$class .= ' ' . $attributes['className'];
		}

		/* Layout orientation class */
		$grid_class = 'aeopr-programs-grid-items';

		if ( isset( $attributes['postLayout'] ) && 'list' === $attributes['postLayout'] ) {
			$grid_class .= ' is-list';
		} else {
			$grid_class .= ' is-grid';
		}

		/* Grid columns class */
		if ( isset( $attributes['columns'] ) && 'grid' === $attributes['postLayout'] ) {
			$grid_class .= ' columns-' . $attributes['columns'];
		}

		/* Post grid section title */
		if ( ! empty( $attributes['sectionTitle'] ) ) {
			if ( isset( $attributes['sectionTitleTag'] ) ) {
				$section_title_tag = $attributes['sectionTitleTag'];
			} else {
				$section_title_tag = 'h3';
			}

			$section_title = '<' . esc_attr( $section_title_tag ) . ' class="aeopr-programs-grid-section-title">' . esc_html( $attributes['sectionTitle'] ) . '</' . esc_attr( $section_title_tag ) . '>';
		} else {
			$section_title = null;
		}

		/* Post grid section tag */
		if ( isset( $attributes['sectionTag'] ) ) {
			$section_tag = $attributes['sectionTag'];
		} else {
			$section_tag = 'section';
		}

		/* Output the post markup */
		$block_content = sprintf(
			'<%1$s class="%2$s">%3$s<div class="%4$s">%5$s</div></%1$s>',
			$section_tag,
			esc_attr( $class ),
			$section_title,
			esc_attr( $grid_class ),
			implode('',$post_grid_items_markup)
		);
		return $block_content;
	}
}

/**
 * Registers the post grid block on server
 */
function aeopr_blocks_register_programs_grid() {

	/* Check if the register function exists */
	if ( ! function_exists( 'register_block_type' ) ) {
		return;
	}

	/* Block attributes */
	register_block_type(
		'aeopr/programs-grid',
		array(
			'attributes' => array(
				'program_types' => array(
					'type' => 'string',
					'default'=>''
				),
				'className'           => array(
					'type' => 'string',
				),
				'linkOut' => array(
					'type'    => 'boolean',
					'default' => true,
				),
				'linkOutLink' => array(
					'type'=>'text'
				),
				'postTitleTag'        => array(
					'type'    => 'string',
					'default' => 'h3',
				),
				'postLayout'          => array(
					'type'    => 'string',
					'default' => 'grid',
				),
				'columns'             => array(
					'type'    => 'number',				
				),
				'align'               => array(
					'type'    => 'string',
					'default' => 'center',
				),
				'width'               => array(
					'type'    => 'string',
					'default' => 'wide',
				),
				'order'               => array(
					'type'    => 'string',
					'default' => 'desc',
				),
				'orderBy'             => array(
					'type'    => 'string',
					'default' => 'date',
				),
				
				'postType'            => array(
					'type'    => 'string',
					'default' =>'program'
				),
				
				'sectionTag'          => array(
					'type'    => 'string',
					'default' => 'section',
				),
				'sectionTitle'        => array(
					'type' => 'string',
				),
				'sectionTitleTag'     => array(
					'type'    => 'string',
					'default' => 'h2',
				),
				'id' => array(
					'type' => 'number',
				),
				'itemData'=>array(
					'type'	=> 'object'
				)
			),
			'render_callback' => 'aeopr_blocks_render_programs_grid',
		)
	);
}
add_action( 'init', 'aeopr_blocks_register_programs_grid' );



