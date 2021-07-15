<?php
/**
 * Template Name: Blog Home Template
 * Template Post Type: page
 *
 * @package    AEOPRTheme
 * @license    http://opensource.org/licenses/gpl-2.0.php GNU Public License
 */

get_header(); 

	echo '<main class="content-area">
				<div class="content">';
					
					// the query
					$wpb_all_query = new WP_Query(array(
						'post_type'=>'post', 
						'post_status'=>'publish', 
						'posts_per_page'=>5,
						'order'=>'DESC',
						'orderby'=>'date')); ?>
					 
					<?php if ( $wpb_all_query->have_posts() ) : ?>
					 
					<ul>
					 
					    <!-- the loop -->
					    <?php while ( $wpb_all_query->have_posts() ) : $wpb_all_query->the_post(); ?>
						<li><a href="<?php the_permalink(); ?>"><?php the_title()?> - <?the_date();?></a>
							<?the_post_thumbnail()?>
						</li>
						<? endwhile; 
							endif;
					 
					echo '</ul>';
					 
					wp_reset_postdata();
		
					echo '</div>
							<aside>';
					wp_list_categories();
					echo '</aside>
						<aside>';
					wp_custom_archive();
					echo '</aside>
		</main>';
get_sidebar();
get_footer();

