<?php
/**
 * Template part for displaying the action area of a header.
 *
 * @package    AEOPRTheme
 * @license    http://opensource.org/licenses/gpl-2.0.php GNU Public License
 */


$phone_number = get_option('brand_settings_phone_number');

?>

<div class="aeopr-header__actionbar">
	<div class="aeopr-header__buttonarea">
		<a href="/apply-now" class="aeopr-button aeopr-secondary-button aeopr-button-arrow" tabindex="4">Apply Now</a>
		<? echo '<a href="tel:+'.$phone_number.'" class="aeopr-button aeopr-circle-button aeopr-secondary-button aeopr-call-button" aria-label="Call Us"><span class="fas fa-phone"></span></a>';?>
	</div>
	<? get_template_part('template-parts/social-links'); ?>

</div>
