<?php
/**
 * Template part for displaying the primary navigation menu.
 *
 * @package    AEOPRTheme
 * @license    http://opensource.org/licenses/gpl-2.0.php GNU Public License
 */

			/*Business Admin group*/
			?>
			<nav id="mega-menu-wrap-online-programs" class="mega-menu-wrap" aria-label="Main Site Navigation">
				<div class="programs-menu-toggle">
					<a href="#">Online Programs</a>
					<? get_template_part('template-parts/social-links');?>
				</div>
				<?
				wp_nav_menu(
					array(
						'theme_location' => 'online-programs',
						'menu'        =>6,
						'menu_id'	=> 'mega-menu-online-programs',
						'menu_class' => 'mega-menu',
						'walker'         => new Aria_Walker_Nav_Menu(),
					)
				);
				
				function aeopr_filter_draft_pages_from_menu ($items, $args) {
				    foreach ($items as $ix => $obj) {
				        if ( 'draft' == get_post_status ($obj->object_id) || 'private' == get_post_status ($obj->object_id)) {
				            unset ($items[$ix]);
				        }
				    }
				    return $items;
				}
				add_filter ('wp_nav_menu_objects', 'aeopr_filter_draft_pages_from_menu', 10, 2);
			?>
			</nav>
			<nav id="mega-menu-wrap-getting-started-resources" class="mega-menu-wrap">
				<a class="toggle-nav" href="#"></a>			
				<?
					get_template_part('template-parts/social-links');
/// --> Mobile Only Menu					
						wp_nav_menu(
						array(
							'theme_location' => 'getting-started-resources',
							'menu'        =>15,
							'menu_id'	=> 'menu-site-pages',
							'container'		=> false,
							'walker'         => new Aria_Walker_Nav_Menu(),
						)
					);
				?>
				
			</nav>

			
<!-- .menu-1 -->
