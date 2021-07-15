<?php
/**
 * The sidebar containing the main widget area
 *
 * @link       https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package    AEOPRTheme
 * @license    http://opensource.org/licenses/gpl-2.0.php GNU Public License
 * 
 * Creates container for React-based form to fill
 */

$id = $post->ID;
$redirect = get_field('redirect_url',$id);
$redirectUrl = (!empty($redirect))?'data-redirect="'.$redirect.'"':null;
//echo '<aside class="sidebar lead-form" id="leadform-area" '.$redirectUrl.'></aside>';
