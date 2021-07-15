<?php
/**
 * The template for displaying archive pages
 *
 * @link       https://codex.wordpress.org/Template_Hierarchy
 *
 * @package    scaffold
 * @copyright  Copyright (c) 2020, Danny Cooper
 * @license    http://opensource.org/licenses/gpl-2.0.php GNU Public License
 */

get_header(); ?>

	<div class="content-area">
		<main class="post-grid content">
		<?php 
			if ( have_posts() ) : ?>

				<section class="archive-header">
					<h1 class="archive-title">
						
					<?php
						the_archive_title();
					?>
					</h1>
				</section><!-- .page-header -->
				<div class="aeopr-content__outer-wrap">
					<div class="aeopr-content-section__wrap">
						<p class="crumb-trail"><a href="/resources/articles-blogs/">Back to Articles and Blogs</a></p>
						<article class="ab-block-post-grid featuredpost aligncenter">
							<div class="ab-post-grid-items is-grid columns-2">
						
									<?php
									while ( have_posts() ) :
						
										the_post();
						
										get_template_part( 'template-parts/content', 'archive' );
						
									endwhile;
						
									aeopr_the_posts_navigation();
						
								else :
						
									get_template_part( 'template-parts/content', 'none' );
						
								endif;
									?>
							</div>
						</article>
					</div>
				</div>
						
		</main>
		<?
			get_sidebar();
			get_template_part( 'template-parts/page-footer');
		?>
	</div><!-- .content-area -->

<?php
get_footer();
