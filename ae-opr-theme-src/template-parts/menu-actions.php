<?php
/**
 * Template part for displaying the action area of a. mobile menu
 *
 * @package    AEOPRTheme
 * @license    http://opensource.org/licenses/gpl-2.0.php GNU Public License
 1 (402) 902-3005
 */


$phone_number = get_option('brand_settings_phone_number');
?>

<li class="nav-main-menu-item menu-actions menu-item">
	
		<a href="/apply-now" class="aeopr-button aeopr-secondary-button aeopr-button-arrow" tabindex="4">Apply Now</a>
		<? echo '<a href="tel:+'.$phone_number.'" class="aeopr-button aeopr-circle-button aeopr-secondary-button aeopr-call-button" aria-label="Call Us"><span class="fas fa-phone"></span></a>';?>
</li>
