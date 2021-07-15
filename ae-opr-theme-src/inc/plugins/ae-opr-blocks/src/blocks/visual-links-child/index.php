<?php
/**
 * Server-side rendering for the visual link child block
 *
 * @package AEOPR Blocks
 */

/**
 * Renders the visual link child block on server.
 *
 * @param string $att  Pass the block attributes.
 * @return string HTML content for the visual link child.
 */
 
 /// --> Register course block and callback
function vizlink_block_dynamic_render_cb ( $att, $content ) {
	
	/**
	 * Global post object.
	 * Used for excluding the current post from the grid.
	 *
	 * @var WP_Post
	 */
	global $post;
	
	
/// --> process attributes
	$align_class = ($att['align']!=="center" ) ? 'aeopr-visual-links__align-'.$att['align']:null;
	$align_class_mobile = ( $att['alignMobile']!=="" ) ? 'aeopr-visual-links__align-mobile-'.$att['alignMobile']:null;
	$align_class_tablet = ($att['alignTablet']!=="" ) ? 'aeopr-visual-links__align-tablet-'.$att['alignTablet']:null;
	$overlay = ($att['backgroundImageColor']!=="")? 'has-background-overlay has-background-color-'.$att['backgroundImageColor']: null;
	$BgImage = ($att['backgroundImage'])?(
		'<span 
			class="aeopr-background-container aeopr-column__background-position-'.
			$att['backgroundPosition'].' aeopr-column__background-size-'.
			$att['backgroundSize'].' aeopr-column__background-opacity-'.
			$att['backgroundOpacity'].' '.$overlay.'"
			style="background-image:url('.$att['backgroundImage']['url'].');"/>'):'';

	
	$html= '<div class="aeopr-block-'.$att['block_id'].' link-child aeopr-visual-links__wrap aeopr-visual-links__background-'.$att['backgroundType'].' '.
					$align_class.' '.
					$align_class_mobile.' '.
					$align_class_tablet.' '.
					$att['className'].'has-child-hover-color-'.$att['link_text_color_hover'].'"
				>';
	$html.= '<a 
					rel="noopener noreferrer" 
					href="'.$att['link'].'" 
					aria-label="'.$att['link_label'].'"
					tabindex="'.$att['tab_index'].'"
				></a>';
				
	$html.= $content;
	$html.= $BgImage;
	$html.='</div>';


    return $html;
    

}

add_action('init', 'register_vizlink_block_action');


function register_vizlink_block_action ( ) {

    $block_name = 'visual-links-child';

    $block_namespace = 'aeopr/' . $block_name;
	
	/* Check if the register function exists */
	if ( ! function_exists( 'register_block_type' ) ) {
		return;
	}
        
    // Registering the block
    register_block_type(
        $block_namespace,  // Block name with namespace
        [
            'render_callback' => 'vizlink_block_dynamic_render_cb', // The render callback
            'attributes' => [
	            'align' =>[
					'type'=>'string',
					'default'=>'center'
				],
				'alignTablet' =>[
					'type'=>'string',
				],
				'alignMobile' =>[
					'type'=>'string',
				],
				'backgroundType' =>[
					'type'=>'string',
				],
				'backgroundImage' =>[
					'type'=>'object',
				],
				'backgroundPosition' =>[
					'type'=>'string',
					'default'=>'center-center'
				],
				'backgroundSize' =>[
					'type'=>'string',
					'default'=>'cover'
				],
				'backgroundRepeat' =>[
					'type'=>'string',
					'default'=>'no-repeat'
				],
				'backgroundColor' =>[
					'type'=>'string',
				],
				'backgroundColorHover' =>[
					'type'=>'string'
				],
				'backgroundOpacity' =>[
					'type'=>'number'
				],
				'backgroundImageColor' =>[
					'type'=>'string'
				],
				'block_id' =>[
					'type'=>'string'
				],
				'button_class'=>[
					'type'=>'string',
					'default'=>'aeopr-primary-button'
				],
				'button_text'=>[
					'type'=>'string',
					'default'=>'Learn More'
				],
				'icon' =>[
					'type'=>'string',
					'default'=>'far fa-image'
				],
				'image_icon' =>[
					'type'=>'string',
					'default'=>'image'
				], 
				'image' =>[
					'type'=>'object',
				],
				'link' =>[
					'type'=>'string',
					'default'=>''#'
				],
				'link_bg_color' =>[
					'type'=>'string',
					'default'=>'#ccc'
				],
				'link_label'=>[
					'type'=>'string'
				],
				
				'link_text'=>[
					'type'=>'array',
					'source'=>'children',
					'selector'=>'p'
				],
				'link_text_color'=>[
					'type'=>'string',
					'default'=>'perublack'
				],
				'link_text_color_hover'=>[
					'type'=>'string',
					'default'=>'peruwhite'
				],
				'link_title'=>[
					'type'=>'array',
					'source'=>'children',
					'selector'=>'h4'
				],
				'overlayType' =>[
					'type'=>'string',
				],
				'tab_index'=>[
					'type'=>'string',
					'default'=>'-1'
				],
				'target' =>[
					'type'=>'boolean',
					'default'=>'false'
				],
									
			],
            
        ]
    );

}




	