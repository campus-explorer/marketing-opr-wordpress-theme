<?php
/**
 * Plugin Name: OPR Landing Page Manager
 * Plugin URI:
 * Description:
 * Version:     0.1.0
 * Author:      Jason Sonderman
 * Text Domain: opr-landing-page-manager
 * Domain Path: /languages
 *
 * @package OPRProgramManager
 */

// Useful global constants.
//define( 'OPR_LANDING_PAGE_MANAGER_VERSION', '0.1.0' );
//define( 'OPR_LANDING_PAGE_MANAGER_URL', plugin_dir_url( __FILE__ ) );
//define( 'OPR_LANDING_PAGE_MANAGER_PATH', plugin_dir_path( __FILE__ ) );


function create_landing_page_posttype() {
 
    register_post_type( 'landingPage',
    // CPT Options
        array(
            'labels' => array(
                'name' =>'Landing Pages',
                'singular_name' => __( 'Landing Page' )
            ),
            'supports'=>array(
	            'title',
	            'custom-fields',
				'editor'
            ),
            'public' => true,
            'has_archive' => true,
            'rewrite' => array('slug' => 'lp'),
            'show_in_rest' => true,
            'show_in_graphql' => true,
            'graphql_single_name' => 'landingPage',
            'graphql_plural_name' => 'landingPages',
            'hierarchical' => true,
            'show_ui' => true,
            'show_in_menu' => true,
            'menu_icon' => 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA4NTAuNCA4NTAuNCI+PHN0eWxlPi5zdDB7ZmlsbDojYTdhYWFkfTwvc3R5bGU+PGcgaWQ9IlRhcmdldCI+PHBhdGggY2xhc3M9InN0MCIgZD0iTTQxOC4xIDQ4NS4xYy03LjMgNy4zLTE2LjkgMTEtMjYuNSAxMS05LjYgMC0xOS4yLTMuNy0yNi41LTExLTE0LjYtMTQuNi0xNC42LTM4LjQgMC01M2w0OS45LTQ5LjljLTEwLjItMy44LTIxLjEtNS45LTMyLjMtNS45LTI0LjMgMC00Ny4yIDkuNS02NC41IDI2LjctMzUuNSAzNS41LTM1LjUgOTMuNCAwIDEyOC45IDE3LjIgMTcuMiA0MC4xIDI2LjcgNjQuNCAyNi43IDI0LjMgMCA0Ny4yLTkuNSA2NC40LTI2LjcgMjYuMS0yNi4xIDMzLTY0LjIgMjAuOC05Ni43bC00OS43IDQ5Ljl6Ii8+PHBhdGggY2xhc3M9InN0MCIgZD0iTTY5Ni4yIDI3Ni4xSDYyN2wtLjcuN0M2NjguOSAzMzEgNjkyIDM5Ny40IDY5MiA0NjcuNWMwIDgyLjYtMzIuMiAxNjAuMy05MC42IDIxOC43LTU4LjQgNTguNC0xMzYuMSA5MC42LTIxOC43IDkwLjZTMjIyLjQgNzQ0LjYgMTY0IDY4Ni4yYy01OC40LTU4LjQtOTAuNi0xMzYuMS05MC42LTIxOC43czMyLjItMTYwLjMgOTAuNi0yMTguN2M1OC40LTU4LjQgMTM2LjEtOTAuNiAyMTguNy05MC42IDcwIDAgMTM2LjUgMjMuMSAxOTAuNyA2NS43bC43LS43VjE1NGMwLTQuMS41LTguMSAxLjMtMTItNTcuNy0zNC4zLTEyMy44LTUyLjYtMTkyLjYtNTIuNi0xMDEgMC0xOTUuOSAzOS4zLTI2Ny4zIDExMC43QzQ0IDI3MS41IDQuNyAzNjYuNCA0LjcgNDY3LjRzMzkuMyAxOTYgMTEwLjcgMjY3LjRjNzEuNCA3MS40IDE2Ni4zIDExMC43IDI2Ny4zIDExMC43UzU3OC42IDgwNi4yIDY1MCA3MzQuOHMxMTAuNy0xNjYuMyAxMTAuNy0yNjcuM2MwLTY4LjktMTguMy0xMzQuOS01Mi42LTE5Mi42LTMuOC44LTcuOCAxLjItMTEuOSAxLjJ6Ii8+PHBhdGggY2xhc3M9InN0MCIgZD0iTTUyMy42IDM3OS42YzE2LjMgMjYuMSAyNS4xIDU2LjMgMjUuMSA4Ny44IDAgNDQuMy0xNy4zIDg2LTQ4LjYgMTE3LjMtMzEuMyAzMS4zLTczIDQ4LjYtMTE3LjMgNDguNnMtODYtMTcuMy0xMTcuMy00OC42Yy0zMS4zLTMxLjMtNDguNi03My00OC42LTExNy4zczE3LjMtODYgNDguNi0xMTcuM2MzMS4zLTMxLjMgNzMtNDguNiAxMTcuMy00OC42IDMxLjUgMCA2MS43IDguNyA4Ny44IDI1LjFsNDkuNS00OS41Yy0zOS43LTI4LjgtODcuMy00NC4zLTEzNy4zLTQ0LjMtNjIuNyAwLTEyMS42IDI0LjQtMTY1LjkgNjguNy00NC4zIDQ0LjMtNjguNyAxMDMuMi02OC43IDE2NS45czI0LjQgMTIxLjYgNjguNyAxNjUuOWM0NC4zIDQ0LjMgMTAzLjIgNjguNyAxNjUuOSA2OC43czEyMS42LTI0LjQgMTY1LjktNjguN2M0NC4zLTQ0LjMgNjguNy0xMDMuMiA2OC43LTE2NS45IDAtNTAtMTUuNS05Ny42LTQ0LjMtMTM3LjNsLTQ5LjUgNDkuNXoiLz48cGF0aCBjbGFzcz0ic3QwIiBkPSJNODQxLjYgMTE5LjdjLTEuMS0yLjYtMy42LTQuMy02LjUtNC4zSDczNC44VjE1LjFjMC0yLjgtMS43LTUuNC00LjMtNi41LTIuNi0xLjEtNS42LS41LTcuNyAxLjVMNjAzLjkgMTI5Yy02LjcgNi43LTEwLjQgMTUuNi0xMC40IDI1djc2LjFMMzc4LjQgNDQ1LjNjLTcuMyA3LjMtNy4zIDE5LjIgMCAyNi41IDMuNyAzLjcgOC41IDUuNSAxMy4zIDUuNSA0LjggMCA5LjYtMS44IDEzLjMtNS41bDIxNS4yLTIxNS4yaDc2LjFjOS40IDAgMTguMy0zLjcgMjUtMTAuNGwxMTguOC0xMTguOGMyLTIgMi42LTUgMS41LTcuN3oiLz48L2c+PC9zdmc+'
 
 
        )
    );
}
// Hooking up our function to theme setup
add_action( 'init', 'create_landing_page_posttype' );


//Expose meta to GraphQL

add_action( 'graphql_register_types', function() {
  register_graphql_field( 'Program', 'programCode', [
     'type' => 'String',
     'description' => __( 'Program Codes', 'wp-graphql' ),
     'resolve' => function( $post ) {
       $programCode = get_post_meta( $post->ID, 'programCode', true );
       return ! empty( $programCode ) ? $programCode : '';
     }
  ] );
} );


