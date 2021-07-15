<?php
/**
 * The template for displaying all single pages
 *
 * @link       https://developer.wordpress.org/themes/basics/template-hierarchy/#single-post
 *
 * @package    AEOPRTheme
 * @license    http://opensource.org/licenses/gpl-2.0.php GNU Public License
 */

get_header(); 
	echo '<div class="content-area">';
	echo '<main class="content">';
the_content();
	echo '</main>';
get_sidebar();
get_template_part( 'template-parts/page-footer');

	echo '</div>';
get_footer(); 
