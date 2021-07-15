<?php
/**
 * Server-side rendering for the course item block
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
function course_block_dynamic_render_cb ( $att ) {
	
	/**
	 * Global post object.
	 * Used for excluding the current post from the grid.
	 *
	 * @var WP_Post
	 */
	global $post;
	
	
/// --> need to get post content from $att[course] value
	$courseMeta = get_post_meta($att['course']);
	$course = get_post($att['course']);
	$course_title = ($att['course'])?$course->post_title:'Choose a course...';
	$prereqs = unserialize($courseMeta['course_prerequisites'][0]);
	$reqList = [];
	//prereqs
	if(!empty($prereqs)){
		foreach($prereqs as $prereq){
			$req = get_post($prereq);
			array_push($reqList, $req->post_title);
		}
	}
	$creditHours = ($courseMeta['course_credit_hours'][0])?'<span>('.$courseMeta['course_credit_hours'][0].' Credit Hours)</span>':'';
	$content = '<div class="aeopr-course-item__wrapper aeopr-block-'.$att['block_id'].'">';
	
	$content.='<p class="course-title">'.$att['course']['id'].' '.$courseMeta['course_id'][0].'  '.$course_title.' '.$creditHours.'</p>';
	$content.='<div className="course-abstract">'.$courseMeta['course_abstract'][0].'</div>';
	if(!empty($reqList))$content.='<p><span>Prerequisites: </span>'.implode(', ',$reqList).'</p>';
	$content.='</div>';

    return $content;
    

}

add_action('init', 'register_course_block_action');


function register_course_block_action ( ) {

    $block_name = 'dynamic-course-item';

    $block_namespace = 'aeopr/' . $block_name;
	
	/* Check if the register function exists */
	if ( ! function_exists( 'register_block_type' ) ) {
		return;
	}
        
    // Registering the block
    register_block_type(
        $block_namespace,  // Block name with namespace
        [
            'render_callback' => 'course_block_dynamic_render_cb', // The render callback
            'attributes' => [
				'block_id'=> [
					'type' => 'string'
				],
				'courseLabel'=>[
					'type'=>'string'
				],
				'course'=>[
					'type'=>'number'
				]
									
			],
            
        ]
    );

}
