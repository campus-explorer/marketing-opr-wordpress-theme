<?php
/**
 * The template for displaying all single posts
 *
 * @link       https://developer.wordpress.org/themes/basics/template-hierarchy/#single-post
 *
 * @package   AEOPRTheme
 * @license    http://opensource.org/licenses/gpl-2.0.php GNU Public License
 */
get_header();
	echo '<div class="content-area">';
	echo '<main class="content">';
		
		while ( have_posts() ) :

			the_post();

			get_template_part( 'template-parts/content', get_post_format() );

			// If comments are open or we have at least one comment, load up the comment template.
			if ( comments_open() || get_comments_number() ) :
				comments_template();
			endif;

		endwhile;
	echo '</main>';
get_sidebar();
get_template_part( 'template-parts/page-footer');
	echo '</div>';
get_footer(); 
