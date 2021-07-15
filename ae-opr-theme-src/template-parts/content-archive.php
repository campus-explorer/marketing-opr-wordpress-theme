<?php
/**
 * Template part for displaying page content in page.php
 *
 * @link       https://codex.wordpress.org/Template_Hierarchy
 *
 * @package    AEOPRTheme
 * @license    http://opensource.org/licenses/gpl-2.0.php GNU Public License
 */

?>

			
		<article class="ab-post-grid-item archive-post">
			<div class="ab-block-post-grid-image">
				<?php aeopr_thumbnail( 'aeopr-blog' ); ?>
			</div>
			<div class="ab-block-post-grid-text">
				<header class="ab-block-post-grid-header">
					<?php the_title( '<h3 class="ab-block-post-grid-title"><a href="' . esc_url( get_permalink() ) . '" rel="bookmark">', '</a></h3>' ); ?>
		
					<div class="ab-block-post-grid-byline">
						<?php the_date(); ?>
					</div><!-- .entry-meta -->
				</header>
		
		
				<div class="ab-block-post-grid-excerpt">
					<?php the_excerpt(); ?>
				</div><!-- .entry-content -->
			</div>
		
		</article><!-- #post-## -->
