<?php
/**
 * Template part for displaying the logo and site title.
 *
 * @package    AEOPRTheme
 * @license    http://opensource.org/licenses/gpl-2.0.php GNU Public License
 *
 * need to pull label from setting
 * need to put placeholder logo file in place
 * Need to process svg and png files for SEO
 */
if(get_option('brand_settings_logo')){
	$logo = file_get_contents(wp_get_attachment_image_url(get_option('brand_settings_logo')));
	
	echo '<div class="site-branding"><a href="/" tabindex="0" aria-label="School Logo">'.$logo.'</a></div>';
}

