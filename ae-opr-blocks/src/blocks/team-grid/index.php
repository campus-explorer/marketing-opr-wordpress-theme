<?php
/**
 * Server-side rendering for the teams grid block
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
 

function aeopr_blocks_render_team_grid( $attributes ) {

	/**
	 * Global post object.
	 * Used for excluding the current post from the grid.
	 *
	 * @var WP_Post
	 */
	global $post;

	
///WP_Query args	
	$args = array(
		'post_status'    => 'publish',
		'orderby'        => 'first_name',
		'order'			 =>	'asc',
		'post_type'      => 'archer_team',
		'custom_per_page' => 400,
		'posts_per_page' => -1

	);
	
	/* Setup the query */
	$grid_query = new WP_Query( $args );
	
	
	$post_grid_markup = [];
	/* Start the loop */
	if ( $grid_query->have_posts() ) {

		while ( $grid_query->have_posts() ) {
			$grid_query->the_post();
			
			/* Setup the post ID */
			$post_id =get_the_ID();
			/* Setup the post classes */
			$post_classes = 'archer-team-grid-item';
			

			
			/* Join classes together */
			$post_classes = join( ' ', get_post_class( $post_classes, $post_id ) );
			
			/* Start the markup for the post */
			$post_item_markup = sprintf(
				'<div id="archer-team-%1$s" class="%2$s" >',
				esc_attr( $post_id ),
				esc_attr( $post_classes )
			);
			$linkedinUrl = get_field('linkedin_url')?
					'<span class="archer-team-member-social-link">
						<a href="'.get_field('linkedin_url').'" target="_blank"><span>View Profile on LinkedIn</span></a>
					</span>':null;	
					
			$photo = (get_field('photo'))?get_field('photo')['url']:'/wp-content/uploads/placeholder.jpg';				
			/* Wrap the text content */
			$post_item_markup .= sprintf(
				'
				<figure class="archer-team-member-photo" >
					<img src="%3$s" alt="%2$s - %1$s"/>
					%4$s
				</figure>
	
				<figcaption>
					<p class="archer-team-member-name">%2$s</p>
					<p class="archer-team-member-title">%1$s</p>
				</figcaption>
				',	
				get_field('position'),
				get_field('first_name').' '.get_field('last_name'),
				$photo,
				$linkedinUrl
				
			);
			

			/* Close the header content */
			$post_item_markup .= sprintf(
				'</div>'
			);
		
			$post_grid_markup[get_field('first_name')].=$post_item_markup;
		}
	
		ksort($post_grid_markup);
		/* Restore original post data */
		wp_reset_postdata();

		/* Build the block classes */
		$class = "archer-team-grid";

		if ( isset( $attributes['className'] ) ) {
			$class .= ' ' . $attributes['className'];
		}

		/* Layout orientation class */
		$grid_class = 'archer-team-grid-items';

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

			$section_title = '<' . esc_attr( $section_title_tag ) . ' class="archer-team-grid-section-title">' . esc_html( $attributes['sectionTitle'] ) . '</' . esc_attr( $section_title_tag ) . '>';
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
			implode('',$post_grid_markup),
		);
		return $block_content;
	}
}

/**
 * Registers the post grid block on server
 */
function aeopr_blocks_register_team_grid() {

	/* Check if the register function exists */
	if ( ! function_exists( 'register_block_type' ) ) {
		return;
	}

	/* Block attributes */
	register_block_type(
		'archer/team-grid',
		array(
			'attributes' => array(
				'className'           => array(
					'type' => 'string',
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
					'default' =>'archer-team'
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
			'render_callback' => 'aeopr_blocks_render_team_grid',
		)
	);
}
add_action( 'init', 'aeopr_blocks_register_team_grid' );



