<?php
/**
 * Template part for displaying the primary navigation menu.
 *
 * @package    AEOPRTheme
 * @license    http://opensource.org/licenses/gpl-2.0.php GNU Public License
 */

?>

<nav id="site-navigation" class="main-menu has-mega-menu">
		<ul id="menu-online-programs" class="menu">
			<li class="menu-title has-mega-menu menu-item menu-item-type-post_type menu-item-object-page menu-item-has-children">
				<a href="javascript:void(0)" aria-haspopup="true" class="menu-link menu-bar-link menu-title" data-ol-has-click-handler="">
					Online Programs</a>
					<ul class="sub-menu mega-menu">
						<li class="mega-menu-column menu-item-link menu-item menu-item-type-post_type menu-item-object-page menu-item-has-children ">
							<a href="/online-programs/undergraduate-programs/" id="menu-undergraduate-programs" aria-haspopup="true" class="menu-category-title menu-link menu-bar-link ">
								Undergraduate Programs
							</a>
								<?php
									/*Business Admin group*/
									wp_nav_menu(
										array(
											'theme_location' => 'online-programs-business',
											'menu'        => 5,
											'menu_id'	=> 'menu-online-programs-undergrad-business',
											'container'		=> false,
										)
									);
									/* CJ Group */
									wp_nav_menu(
										array(
											'theme_location' => 'online-programs-cj',
											'menu'        => 8,
											'menu_id'	=> 'menu-online-programs-undergrad-cj-psych',
											'container'		=> false,
										)
									);
								?>
								<a href="/online-programs/undergraduate-programs/" id="menu-graduate-programs" aria-haspopup="true" class="menu-category-title menu-link menu-bar-link ">
									Graduate Programs
								</a>
								<?
									wp_nav_menu(
										array(
											'theme_location' => 'online-programs-grad',
											'menu'        => 10,
											'menu_id'	=> 'menu-online-programs-grad',
											'container'		=> false,
										)
									);
									?>
						</li>
					</ul>
			</li>
			<li class="aeopr-menu__actions">
				<? get_template_part('template-parts/header-actions'); ?>

			</li>
		</ul>
		<div id="menu-toggle">
			<span class="fas fa-bars"></span>
		</div>
		    

		<div class="aeopr-header__sitemenu">
			<div class="aeopr-header__sitemenu-wrapper">
				<?
							
					wp_nav_menu(
						array(
							'theme_location' => 'getting-started',
							'menu'        => 3,
							'menu_id'	=> 'menu-getting-start',
							'container'		=> false,
						)
			
					);
					wp_nav_menu(
						array(
							'theme_location' => 'resources',
							'menu'        => 6,
							'menu_id'	=> 'menu-resources',
							'container'		=> false,
			
						)
					);
					
					get_template_part('template-parts/header-actions'); ?>
			</div>

		</div>
				
</nav><!-- .menu-1 -->
