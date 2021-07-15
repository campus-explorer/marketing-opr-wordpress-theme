<?php
/**
 * The header for our theme
 *
 * This is the template that displays all of the <head> section and everything up until <div class="site-content">
 *
 * @link       https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package    AEOPRTheme
 * @license    http://opensource.org/licenses/gpl-2.0.php GNU Public License
 */


$post = get_post(); 
$hasJumpLinks=null;
if ( has_blocks( $post->post_content ) ) {
    $blocks = parse_blocks( $post->post_content );
	foreach($blocks as $val=>$block){
		if($block['blockName']==='aeopr/content-area' && $block['innerBlocks'][0]['blockName']==='aeopr/jump-links'){
			$hasJumpLinks='has-jump-links';
		}
		
	}
}
?>

<!DOCTYPE html>
<html lang="en-US">
<head>
	
	
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="profile" href="http://gmpg.org/xfn/11">
	<?php wp_head(); ?>
</head>

<body <?php body_class($hasJumpLinks); ?>>


<div class="site-wrapper">

	<header class="site-header">
			<?php get_template_part( 'template-parts/branding' );
			 get_template_part( 'template-parts/main-menu' ); 
			 get_template_part('template-parts/header-actions') ?>
	</header>
	<!-- .site-header -->
