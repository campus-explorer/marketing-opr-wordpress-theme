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
	
	/*target classes for the specific page we are on*/
	
	$post_type = get_post_type($post);
	$parent_post_type = ($post_type==='page')?'aeopr_athens_programs_grid_partnerpage':'aeopr_athens_programs_grid_'.$post_type;
	
///WP_Query args	
	$args = array(
		'post_status'    => 'publish',
		'orderby'        => 'title',
		'order'			 =>	'asc',
		'post_type'      => 'program',
		'posts_per_page' => 100

	);
	
///set taxonomy query if program_types attr exists	
	if($attributes['program_types']){
		$args['tax_query']=array(
							array(
								'taxonomy'=> 'program_types',
								'terms'=>$attributes['program_types']
								)
							);
	}
	/* Setup the query */
	$grid_query = new WP_Query( $args );

	$post_grid_markup = '';
	$post_ext_grid_markup = '';

	/* Start the loop */
	if ( $grid_query->have_posts() ) {

		while ( $grid_query->have_posts() ) {
			$grid_query->the_post();
			
			/* Setup the post ID */
			$post_id =get_the_ID();
			
						
			/* Setup the post classes */
			$post_classes = 'aeopr-programs-grid-item '.$parent_post_type;
			

			
			/* Join classes together */
			$post_classes = join( ' ', get_post_class( $post_classes, $post_id ) );
			
			/* Start the markup for the post */
			$post_item_markup = sprintf(
				'<div id="program-%1$s" class="%2$s" data-program="%3$s" data-program-name="%4$s">',
				esc_attr( $post_id ),
				esc_attr( $post_classes ),
				get_field('program_code'),
				get_the_title( $post_id )
			);
			
			
			$cardLink =($attributes['linkOut']===true)?get_field('program_page'):'#';
			
			if(!empty(get_field('program_external_url'))){
				$cardLink = get_field('program_external_url');
			}		
			/* Wrap the text content */
			$post_item_markup .= sprintf(
				'<a href="%4$s" class="%6$s" rel="bookmark">
				<span class="programs-item-grid-item-image" style="background-image:url(%5$s)"></span>
				<p class="aeopr-programs-grid-item-type">%1$s</p>
				
				<h4 class="aeopr-block-programs-grid-title">%2$s in %3$s</h4>
				</a>',	
				get_field('program_aos'),
				get_field('program_degree_level'),
				get_the_title( $post_id ),
				$cardLink,
				get_field('program_image'),
				$parent_post_type
				
				
			);
			
			if($attributes['linkOut']===false){
				$post_item_markup .= sprintf(
					'<div class="aeopr-programs-grid-program-content">
						<div class="banner">					
							<a href="#" class="panel-close">x</a>					
							<p class="aeopr-programs-grid-item-type">%1$s</p>
							<h4 class="aeopr-block-programs-grid-title"><span>%2$s</span> %3$s</h4>
						</div>
						<div class="aeopr-program-content-area">
							%4$s
							<a href="#" class="aeopr-button %5$s" id="aeopr-panel-button-request">Request Info</a>
						</div>
					</div>',
					get_field('program_aos'),
					get_field('program_degree_level'),
					get_the_title( $post_id ),
					get_field('program_content'),
					$parent_post_type
				);
			}

			/* Close the header content */
			$post_item_markup .= sprintf(
				'</div>'
			);
			
			/* if external links are turned off and this post is an external link, skip*/
			//if($attributes['extPages']===false && 
			
			if(!empty(get_field('program_external_url'))){
				$post_ext_grid_markup .= $post_item_markup;
			}else{
				$post_grid_markup.=$post_item_markup;
			}
		
			
		}
	

		/* Restore original post data */
		wp_reset_postdata();

		/* Build the block classes */
		$class = 'aeopr-block-programs-grid';

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
/// -->> filter in external pages
		if($attributes['extPages']===true){
			$post_grid_markup.=$post_ext_grid_markup;
		} 
		/* Output the post markup */
		$block_content = sprintf(
			'<%1$s class="%2$s program-grid-%7$s">%3$s<div class="%4$s">%5$s</div>%6$s</%1$s>',
			$section_tag,
			esc_attr( $class ),
			$section_title,
			esc_attr( $grid_class ),
			$post_grid_markup,
			$pagination,
			$attributes['program_types']
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
				'extPages' => array(
					'type'    => 'boolean',
					'default' => false,
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



