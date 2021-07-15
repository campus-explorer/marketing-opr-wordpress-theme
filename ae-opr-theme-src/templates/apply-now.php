<?php
/**
 * Template Name: Apply Now Template
 * Template Post Type: page
 *
 * @package    AEOPRTheme
 * @license    http://opensource.org/licenses/gpl-2.0.php GNU Public License
 */

get_header(); 

	echo '<div class="content-area">
				<main class="content no-sidebar">';
the_content();
	echo '</main>';
			get_template_part( 'template-parts/page-footer');

	echo '</div>';
get_footer();
