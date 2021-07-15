<?php
/**
 * The main template file
 *
 * This is the most generic template file in a WordPress theme
 * and one of the two required files for a theme (the other being style.css).
 * It is used to display a page when nothing more specific matches a query.
 * E.g., it puts together the home page when no home.php file exists.
 *
 * @link       https://codex.wordpress.org/Template_Hierarchy
 *
 * @package    AEOPRTheme
 * @license    http://opensource.org/licenses/gpl-2.0.php GNU Public License
 */
/****
	* check start date, if passed don't show bar
	*  function checkDate() {
   var selectedText = document.getElementById('datepicker').value;
   var selectedDate = new Date(selectedText);
   var now = new Date();
   if (selectedDate < now) {
    alert("Date must be in the future");
   }
 }
 ***/
get_header(); 
echo '<main class="site-content">
	<section class="content-area">';
		if ( have_posts() ) :
	
	
			/* Start the Loop */
			while ( have_posts() ) :
	
				the_post();
	
				/*
				 * Include the Post-Format-specific template for the content.
				 * If you want to override this in a child theme, then include a file
				 * called content-___.php (where ___ is the Post Format name) and that will be used instead.
				 */
				get_template_part( 'template-parts/content', get_post_format() );
	
			endwhile;
	
			aeopr_the_posts_navigation();
	
		else :
	
			get_template_part( 'template-parts/content', 'none' );
	
		endif;
	
echo '</section><!-- .content-area -->
</main>';

get_footer();
