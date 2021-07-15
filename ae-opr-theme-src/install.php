<?php
/// --> set flag that this theme was previously installed
/// --> this is so it doesn't run the setup again
$theme_exists = get_option('aeopr_theme_install');
if(!$theme_exists){
	add_option('aeopr_theme_install', time() , 'yes');
}

/// --> install pages
// Make class
$aof1 = array(
	        'name' => 'areaoffocus-1',
	        'title' => 'Area of Focus 1',
	        'child' => array(
	            array(
	                'name' => 'program1-1',
	                'title' => 'Program 1-1'
	            ),
	            array(
	                'name' => 'program1-2',
	                'title' => 'Program 1-2'
	            )
	        )
	    );
$aof2 = array(
	        'name' => 'areaoffocus-2',
	        'title' => 'Area of Focus 2',
	        'child' => array(
	            array(
	                'name' => 'program2-1',
	                'title' => 'Program 2-1'
	            ),
	            array(
	                'name' => 'program2-2',
	                'title' => 'Program 2-2'
	            )
	        )
	    );
	    
$undergrad =  array(
                'name' => 'undergraduate_programs',
                'title' => 'Undergraduate Programs',
                $aof1,
                $aof2
                
			);
$grad =  array(
                'name' => 'graduate_programs',
                'title' => 'Graduate Programs',
                array(
			        'name' => 'programg-1',
			        'title' => 'Program G-1',
			    ),
	            array(
			        'name' => 'programg-2',
			        'title' => 'Program G-2',
			    )

			);
			
$pages = array(
	array(
		'name' => 'homepage',
		'title'=>'Homepage'
	),
    array(
        'name' => 'onlineprograms',
        'title' => 'Online Programs',
        'child' => array(
	        $undergrad,
	        $grad
        )
    ),
    array(
        'name' => 'getting-started',
        'title' => 'Getting Started',
        'child' => array(
	        array(
			        'name' => 'why-us',
			        'title' => 'Why Us',
			    ),
			array(
			        'name' => 'tuition',
			        'title' => 'Tuition',
			    ),
			array(
			        'name' => 'Admissions',
			        'title' => 'admissions',
			    )
        )
    ),
    array(
        'name' => 'resources',
        'title' => 'Resources',
        'child' => array(
	        array(
		        'name' => 'aboutus',
		        'title' => 'About',
			    ),
			array(
		        'name' => 'financial-aid',
		        'title' => 'Financial Aid',
			    ),
			array(
		        'name' => 'faqs',
		        'title' => 'FAQs',
			    ),
			array(
		        'name' => 'blog',
		        'title' => 'Blogs',
			    )
        )
    )
);

$template = array(
    'post_type' => 'page',
    'post_status' => 'publish',
    'post_author' => 1
);

foreach( $pages as $page ) {
    $exists = get_page_by_title( $page['name'] );

    if( !$exists ) {
        $my_page = array(
            'post_name' => $page['name'],
            'post_title' => $page['title']
        );
        $my_page = array_merge( $my_page, $template );

        $id = wp_insert_post( $my_page );

        //if there is any child page, create them by {$id} as 'post_parent'
        if( isset( $page['child'] ) ) {
            foreach( $page['child'] as $child ) {
                $child_page = array(
                    'post_name' => $child['name'],
                    'post_title' => $child['title'],
                    'post_parent' => $id
                );
                $child_page = array_merge( $child_page, $template );
                $id = wp_insert_post( $child_page );
            }
        }
    }
}

/// --> install menus

$mastermenuname = 'Master Menu';
$mastermenulocation = 'online-programs';
// Does the menu exist already?
$menu_exists = wp_get_nav_menu_object( $mastermenuname );

// If it doesn't exist, let's create it.
if( !$menu_exists){
    $menu_id = wp_create_nav_menu($menuname);
	//get pages for IDs
	$main_menu_pages_titles = array('Online Programs', 'Getting Started', 'Resources');
	$menu_pages=get_pages();
	$menu_tree = array();
	//post_title
	//post_parent
	//ID
	foreach($menu_pages as $page){
		if($page->post_title === 'homepage') continue;
		$page_target = get_page_by_title($page->post_title);
		$menu_tree[$page->post_title]=$page_target->ID;
	)
	
    // Set up default  links and add them to the menu.
    
    //There are 3 of these, Online Programs, Getting Started, Resources
    $onlineprograms_item = wp_update_nav_menu_item($menu_id, 0, array(
        'menu-item-title' =>  __('Online Programs'),
        'menu-item-object-id' => $menu_tree['Online Programs'],
        'menu-item-object' => 'page',
        'menu-item-url' => home_url( '/online-programs' ),
        'menu-item-classes' => 'nav-main-menu-item', 
        'menu-item-status' => 'publish'));
        
    $gettingstarted_item = wp_update_nav_menu_item($menu_id, 0, array(
        'menu-item-title' =>  __('Getting Started'),
        'menu-item-object-id' => $menu_tree['Getting Started'],
        'menu-item-object' => 'page',
        'menu-item-classes' => 'nav-main-menu-item', 
        'menu-item-url' => home_url( '/getting-started' ), 
        'menu-item-status' => 'publish'));
        
    $resources_item = wp_update_nav_menu_item($menu_id, 0, array(
        'menu-item-title' =>  __('Resources'),
        'menu-item-object-id' => $menu_tree['Resources'],
        'menu-item-object' => 'page',
        'menu-item-classes' => 'nav-main-menu-item',         
        'menu-item-url' => home_url( '/resources' ), 
        'menu-item-status' => 'publish'));
        
 /// --> Online Programs Groups      
    $online_undergrad_item = wp_update_nav_menu_item($menu_id, 0, array(
        'menu-item-title' =>  __('Undergraduate Programs'),
        'menu-item-classes' => 'menu-column-head',
        'menu-item-object-id' => $menu_tree['Undergraduate Programs'],
        'menu-item-object' => 'page',
        'menu-item-parent-id' => $onlineprograms_item,
        'menu-item-url' => home_url( '/undergraduate-programs' ), 
        'menu-item-status' => 'publish'));
        
    $online_grad_item = wp_update_nav_menu_item($menu_id, 0, array(
        'menu-item-title' =>  __('Graduate Programs'),
        'menu-item-classes' => 'menu-column-head',
        'menu-item-object-id' => $menu_tree['Graduate Programs'],
        'menu-item-object' => 'page',
        'menu-item-parent-id' => $onlineprograms_item,
        'menu-item-url' => home_url( '/graduate-programs' ), 
        'menu-item-status' => 'publish'));
        
/// -> Undergraduate Groups
    $aos_item_1_1 = wp_update_nav_menu_item($menu_id, 0, array(
        'menu-item-title' =>  __('Area of Focus 1'),
        'menu-item-classes' => 'menu-group-head menu-no-link',
        'menu-item-object-id' => $menu_tree['Area of Focus 1'],
        'menu-item-object' => 'page',
        'menu-item-parent-id' => $online_undergrad_item,
        'menu-item-url' => home_url( '/area-of-focus-1/' ), 
        'menu-item-status' => 'publish'));
    
    $aos_item_1_2 = wp_update_nav_menu_item($menu_id, 0, array(
        'menu-item-title' =>  __('Area of Focus 2'),
        'menu-item-classes' => 'menu-group-head menu-no-link',
        'menu-item-object-id' => $menu_tree['Area of Focus 2'],
        'menu-item-object' => 'page',
        'menu-item-parent-id' => $online_undergrad_item,
        'menu-item-url' => home_url( '/area-of-focus-2/' ), 
        'menu-item-status' => 'publish'));
 
 /// --> Submenus level 3 program pages       
 
 /// --> Undergraduate Items
	$program_1_1_item = wp_update_nav_menu_item($menu_id, 0, array(
        'menu-item-title' =>  __('Program 1-1'),
        'menu-item-object-id' => $menu_tree['Program 1-1'],
        'menu-item-object' => 'page',
        'menu-item-parent-id' => $aos_item_1_1,
        'menu-item-url' => home_url( '/program-1-1/' ), 
        'menu-item-status' => 'publish'));
    
    $program_1_2_item = wp_update_nav_menu_item($menu_id, 0, array(
        'menu-item-title' =>  __('Program 1-2'),
        'menu-item-object-id' => $menu_tree['Program 1-2'],
        'menu-item-object' => 'page',
        'menu-item-parent-id' => $aos_item_1_1,
        'menu-item-url' => home_url( '/program-1-2/' ), 
        'menu-item-status' => 'publish'));

	$program_2_1_item = wp_update_nav_menu_item($menu_id, 0, array(
        'menu-item-title' =>  __('Program 2-1'),
        'menu-item-object-id' => $menu_tree['Program 2-1'],
        'menu-item-object' => 'page',
        'menu-item-parent-id' => $aos_item_1_2,
        'menu-item-url' => home_url( '/program-2-1/' ), 
        'menu-item-status' => 'publish'));

    $program_2_2_item = wp_update_nav_menu_item($menu_id, 0, array(
        'menu-item-title' =>  __('Program 2-2'),
        'menu-item-object-id' => $menu_tree['Program 2-2'],
        'menu-item-object' => 'page',
        'menu-item-parent-id' => $aos_item_1_2,
        'menu-item-url' => home_url( '/program-2-2/' ), 
        'menu-item-status' => 'publish'));

/// --> Graduate items    
    $program_g_1_item = wp_update_nav_menu_item($menu_id, 0, array(
        'menu-item-title' =>  __('Program G-1'),
        'menu-item-object-id' => $menu_tree['Program G-1'],
        'menu-item-object' => 'page',
        'menu-item-parent-id' => $online_grad_item,
        'menu-item-url' => home_url( '/program-g-1/' ), 
        'menu-item-status' => 'publish'));
    
    $program_g_2_item = wp_update_nav_menu_item($menu_id, 0, array(
        'menu-item-title' =>  __('Program G-2'),
        'menu-item-object-id' => $menu_tree['Program G-2'],
        'menu-item-object' => 'page',
        'menu-item-parent-id' => $online_grad_item,
        'menu-item-url' => home_url( '/program-g-2/' ), 
        'menu-item-status' => 'publish'));

/// -->? Resources Items         
    $about_item = wp_update_nav_menu_item($menu_id, 0, array(
        'menu-item-title' =>  __('About'),
        'menu-item-object-id' => $menu_tree['About'],
        'menu-item-object' => 'page',
        'menu-item-parent-id' => $resources_item,
        'menu-item-url' => home_url( '/about/' ), 
        'menu-item-status' => 'publish'));
    
     $financial_item = wp_update_nav_menu_item($menu_id, 0, array(
        'menu-item-title' =>  __('Financial Aid'),
        'menu-item-object-id' => $menu_tree['Financial Aid'],
        'menu-item-object' => 'page',
        'menu-item-parent-id' => $resources_item,
        'menu-item-url' => home_url( '/financial-aid/' ), 
		'menu-item-status' => 'publish'));

	$faqs_item = wp_update_nav_menu_item($menu_id, 0, array(
        'menu-item-title' =>  __('FAQs'),
        'menu-item-object-id' => $menu_tree['FAQs'],
        'menu-item-object' => 'page',
		'menu-item-parent-id' => $resources_item,
        'menu-item-url' => home_url( '/faqs/' ), 
		'menu-item-status' => 'publish'));
        
	$blogs_item = wp_update_nav_menu_item($menu_id, 0, array(
        'menu-item-title' =>  __('Blogs'),
        'menu-item-object-id' => $menu_tree['Blogs'],
        'menu-item-object' => 'page',
		'menu-item-parent-id' => $resources_item,
        'menu-item-url' => home_url( '/blog/' ), 
        'menu-item-status' => 'publish'));


/// --> Getting Start Items        
	$whyus_item = wp_update_nav_menu_item($menu_id, 0, array(
        'menu-item-title' =>  __('Why Us'),
        'menu-item-object-id' => $menu_tree['Why Us'],
        'menu-item-object' => 'page',
        'menu-item-parent-id' => $gettingstarted_item,
        'menu-item-url' => home_url( '/why-us/' ), 
        'menu-item-status' => 'publish'));
        
	$tuition_item = wp_update_nav_menu_item($menu_id, 0, array(
        'menu-item-title' =>  __('Tuition'),
        'menu-item-object-id' => $menu_tree['Tuition'],
		'menu-item-object' => 'page',
        'menu-item-parent-id' => $gettingstarted_item,
        'menu-item-url' => home_url( '/tuition/' ), 
        'menu-item-status' => 'publish'));
        
	$admissions_item = wp_update_nav_menu_item($menu_id, 0, array(
        'menu-item-title' =>  __('Admissions'),
        'menu-item-object-id' => $menu_tree['Admissions'],
		'menu-item-object' => 'page',
        'menu-item-parent-id' => $gettingstarted_item,
        'menu-item-url' => home_url( '/admissions/' ), 
        'menu-item-status' => 'publish'));

    
// Grab the theme locations and assign our newly-created menu
    // to the BuddyPress menu location.
    if( !has_nav_menu( $mastermenuname) ){
        $locations = get_theme_mod('nav_menu_locations');
        $locations[$bpmenulocation] = $menu_id;
        set_theme_mod( 'nav_menu_locations', $locations );
    }
