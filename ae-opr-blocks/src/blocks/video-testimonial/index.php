<?php
/**
 * Server-side rendering for the video testimonial block
 *
 * @package AEOPR Blocks
 */

/**
 * Renders the course item block on server.
 *
 * @param string $att  Pass the block attributes.
 * @return string HTML content for the course item.
 */
 
 /// --> Register course block and callback
function video_block_dynamic_render_cb ( $att ) {
	
	/**
	 * Global post object.
	 * Used for excluding the current post from the grid.
	 *
	 * @var WP_Post
	 */
	global $post;
	$post_id = $att['video'];
	$postMeta = get_post_meta($post_id);
	
/// --> Set YouTube API params and get video data	
	$googleKey = 'AIzaSyBZHDQhDtWTvbk_yW4-EqV9AaIMGVxAC5o';	
				
	$youtubeurl = 'https://www.googleapis.com/youtube/v3/videos?part=snippet&key='.$googleKey."&id=".get_field('url', $post_id);
	
    $videoResponse = wp_remote_get($youtubeurl);
    
	$videoInfo = json_decode( wp_remote_retrieve_body( $videoResponse ), true );
	
	if(count($videoInfo['items'])>0){
		$videoSnippet = $videoInfo['items'][0]['snippet']; 
		
		$videoTitle = get_field('video_title', $post_id) ?: $videoSnippet['title'];
		$videoDescription = get_field('video_excerpt',$post_id)?:'<p>'.$videoSnippet['description'].'</p>';
		$videoThumb = $videoSnippet['thumbnails']['medium']['url'];

	}

	$videoEmbed='https://youtube.com/embed/'.$postMeta['url'][0];


	
/// --> Thumbnail area	*** add thumbnail with link data-mediabox="my-gallery-name" data-title="Sample image" for mediabox	
	$content_image=sprintf(
		'<div class="aeopr-block-video-testimonial-image"><a href="%1$s" data-iframe="true" data-width="853" data-height="480" data-mediabox="Testimonials"><img src="%3$s" alt="Image for Video"/></a></div>',
		$videoEmbed,
		$videoTitle,
		$videoThumb
	);
/// --> Text Block
	$content_text='<div class="aeopr-block-video-testimonial-text">';

/// --> Text Block Header + Title
	$content_text.=sprintf(
					'<header class="aeopr-block-video-testimonial-header"><%1$s class="aeopr-block-video-testimonial-title">%2$s</%1$s></header>',
					$att['postTitleTag'],
					$videoTitle
				);
				
/// --> Description Section				
	$content_text.='<div class="aeopr-block-video-testimonial-description">'.$videoDescription.'</div>';
	
/// --> Display Post Link	
	if ( isset( $att['displayPostLink'] )) {
		$content_text.= sprintf(
			'<p class="aeopr-block-video-testimonial-more-link"><a class="aeopr-text-link" href="%1$s" rel="bookmark">%2$s <span class="screen-reader-text">Video Testimonials</span></a></p>',
			esc_url( $att['readMoreLink'] ),
			esc_html( $att['readMoreText'] )
		);
	}

/// --> Close ContentText Section			
	$content_text.='</div>';
	
/// -->Start the Testimonial Block	
	$testimonial_block = sprintf(
		'<article id="post-%1$s" class="post-%1$s video-item is-aligned-%4$s">%2$s %3$s</article>',
		$att['video'],
		$content_image,
		$content_text,
		$att['align']
	);

	$class = "aeopr-block-video-testimonial";

	if ( isset( $att['className'] ) ) {
		$class .= ' ' . $att['className'];
	}

	if ( isset( $att['displaySectionTitle'] ) && $att['displaySectionTitle'] && ! empty( $att['sectionTitle'] ) ) {
		if ( isset( $att['sectionTitleTag'] ) ) {
			$section_title_tag = $att['sectionTitleTag'];
		} else {
			$section_title_tag = 'h2';
		}

		$section_title = '<' . esc_attr( $section_title_tag ) . ' class="aeopr-block-video-testimonial-section-title">' . esc_html( $att['sectionTitle'] ) . '</' . esc_attr( $section_title_tag ) . '>';
	} else {
			$section_title = null;
	}

	/* Post grid section tag */
	if ( isset( $att['sectionTag'] ) ) {
		$section_tag = $att['sectionTag'];
	} else {
		$section_tag = 'section';
	}

	/* Output the post markup */
	$block_content = sprintf(
		'<%1$s class="%2$s">%3$s %4$s</%1$s>',
		$section_tag,
		esc_attr( $class ),
		$section_title,
		$testimonial_block
	);
	return $block_content;
    

}

add_action('init', 'register_video_block_action');


function register_video_block_action ( ) {

    $block_name = 'video-testimonial';

    $block_namespace = 'aeopr/' . $block_name;
	
	/* Check if the register function exists */
	if ( ! function_exists( 'register_block_type' ) ) {
		return;
	}
        
    // Registering the block
    register_block_type(
        $block_namespace,  // Block name with namespace
        [
            'render_callback' => 'video_block_dynamic_render_cb', // The render callback
            'attributes' => [
				'block_id'=> [
					'type' => 'string'
				],
				'videoLabel'=>[
					'type'=>'string'
				],
				'pageTitle'=>[
					'type'=>'string'
				],
				'title'=>[
					'type'=>'string'
				],
				'align'=>[
					'type'=>'string',
					'default'=>'center'
				],
				'video'=>[
					'type'=>'number'
				],
				'thumbnail'=>[
					'type'=>'string'
				],
				'fetchedThumbnail'=>[
					'type'=>'string'
				],
				'url'=>[
					'type'=>'string'
				],
				'description'=>[
					'type'=>'string'
				],
				'excerptLength'       =>[
					'type'    => 'number',
					'default' => 55,
				],
				'postTitleTag'        => array(
					'type'    => 'string',
					'default' => 'h3',
				),
				'readMoreText'        => array(
					'type'    => 'string',
					'default' => 'See More Videos',
				),
				'readMoreLink'        => array(
					'type'    => 'string',
					'default' => '/resources/testimonials',
				),
				'displayPostExcerpt'  => [
					'type'    => 'boolean',
					'default' => true,
				],
				'displayPostLink'     => array(
					'type'    => 'boolean',
					'default' => true,
				),
				'displaySectionTitle' => [
					'type'    => 'boolean',
					'default' => false,
				],
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

									
			],
            
        ]
    );

}
