<?
/**
 * Plugin Name: OPR Brand Settings Manager
 * Plugin URI:
 * Description:
 * Version:     0.2.0
 * Author:      Jason Sonderman - ARcher Education
 * Text Domain: ae-brand-settings-manager
 * Domain Path: /languages
 *
 * @package OPRBrandManager
 */
 
include_once ( plugin_dir_path( __FILE__ ) . 'classes/FormBuild.php');

function opr_brand_scripts() {
	wp_enqueue_script('opr-brand-settings-scripts', get_template_directory_uri().'/inc/plugins/opr-brand-settings/assets/js/scripts.js', array('jquery'), THEME_VERSION, true);
	wp_enqueue_style('opr-brand-settings-style', get_template_directory_uri().'/inc/plugins/opr-brand-settings/assets/css/opr-brand-settings-style.css');
	/*wp_enqueue_script('opr-brand-settings-huebee-script', get_template_directory_uri().'/inc/plugins/opr-brand-settings/utils/huebee/huebee.pkgd.min.js', array(), THEME_VERSION, true);
	wp_enqueue_style('opr-brand-settings-huebee-style', get_template_directory_uri().'/inc/plugins/opr-brand-settings/utils/huebee/huebee.css');
	if(class_exists('kt_Central_Palette')){
		wp_localize_script('opr-brand-settings-scripts', 
			'brand_settings',
			array('color_presets'=>get_option('brand_settings_color_presets'),
					'central_palette'=>kt_Central_Palette::instance()->get_palette()
					)
		);
	}*/
	
}

if ( is_admin() ){ 
  add_action( 'admin_menu', 'opr_add_branding_settings' );
  add_action( 'admin_init', 'opr_register_brand_style_settings' );
  add_action( 'admin_enqueue_scripts', 'opr_brand_scripts' );
  
}


/****
* Add image selection to Options Page for logo
***/
function opr_image_uploader_field( $name, $value = '') {
	$image = 'Select image';
	$actionType = 'button';
	$image_size = 'full'; // it would be better to use thumbnail size here (150x150 or so)
	$display = 'none'; // display state ot the "Remove image" button
 
	if( $image_attributes = wp_get_attachment_image_src( $value, $image_size ) ) {
 
		// $image_attributes[0] - image URL
		// $image_attributes[1] - image width
		// $image_attributes[2] - image height
 
		$image = '<img src="' . $image_attributes[0] . '" style="max-width:250px;display:block;" />';
		$display = 'inline-block';
		$actionType = "";
 
	} 
 
	return '
	<div>
		<a href="#" class="upload_image_button '.$actionType.'">' . $image . '</a>
		<input type="hidden" name="' . $name . '" id="' . $name . '" value="' . esc_attr( $value ) . '" />
		<a href="#" class="remove_image_button" style="display:inline-block;display:' . $display . '">Remove image</a>
	</div>';
}

function opr_include_myuploadscript() {

	if ( ! did_action( 'wp_enqueue_media' ) ) {
		wp_enqueue_media();
	}
}
 
add_action( 'admin_enqueue_scripts', 'opr_include_myuploadscript' );

add_action('admin_footer', function(){

});

function opr_add_branding_settings() {
	add_menu_page( 
		'Branding & Settings',
		'Branding & Settings',
		'manage_options',
		'brand-settings.php',
		'opr_brand_settings_page_cb',
		'data:image/svg+xml;base64,PHN2ZyBhcmlhLWhpZGRlbj0idHJ1ZSIgZm9jdXNhYmxlPSJmYWxzZSIgZGF0YS1wcmVmaXg9ImZhcyIgZGF0YS1pY29uPSJjb2dzIiBjbGFzcz0ic3ZnLWlubGluZS0tZmEgZmEtY29ncyBmYS13LTIwIiByb2xlPSJpbWciIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmlld0JveD0iMCAwIDY0MCA1MTIiPjxwYXRoIGZpbGw9ImN1cnJlbnRDb2xvciIgZD0iTTUxMi4xIDE5MWwtOC4yIDE0LjNjLTMgNS4zLTkuNCA3LjUtMTUuMSA1LjQtMTEuOC00LjQtMjIuNi0xMC43LTMyLjEtMTguNi00LjYtMy44LTUuOC0xMC41LTIuOC0xNS43bDguMi0xNC4zYy02LjktOC0xMi4zLTE3LjMtMTUuOS0yNy40aC0xNi41Yy02IDAtMTEuMi00LjMtMTIuMi0xMC4zLTItMTItMi4xLTI0LjYgMC0zNy4xIDEtNiA2LjItMTAuNCAxMi4yLTEwLjRoMTYuNWMzLjYtMTAuMSA5LTE5LjQgMTUuOS0yNy40bC04LjItMTQuM2MtMy01LjItMS45LTExLjkgMi44LTE1LjcgOS41LTcuOSAyMC40LTE0LjIgMzIuMS0xOC42IDUuNy0yLjEgMTIuMS4xIDE1LjEgNS40bDguMiAxNC4zYzEwLjUtMS45IDIxLjItMS45IDMxLjcgMEw1NTIgNi4zYzMtNS4zIDkuNC03LjUgMTUuMS01LjQgMTEuOCA0LjQgMjIuNiAxMC43IDMyLjEgMTguNiA0LjYgMy44IDUuOCAxMC41IDIuOCAxNS43bC04LjIgMTQuM2M2LjkgOCAxMi4zIDE3LjMgMTUuOSAyNy40aDE2LjVjNiAwIDExLjIgNC4zIDEyLjIgMTAuMyAyIDEyIDIuMSAyNC42IDAgMzcuMS0xIDYtNi4yIDEwLjQtMTIuMiAxMC40aC0xNi41Yy0zLjYgMTAuMS05IDE5LjQtMTUuOSAyNy40bDguMiAxNC4zYzMgNS4yIDEuOSAxMS45LTIuOCAxNS43LTkuNSA3LjktMjAuNCAxNC4yLTMyLjEgMTguNi01LjcgMi4xLTEyLjEtLjEtMTUuMS01LjRsLTguMi0xNC4zYy0xMC40IDEuOS0yMS4yIDEuOS0zMS43IDB6bS0xMC41LTU4LjhjMzguNSAyOS42IDgyLjQtMTQuMyA1Mi44LTUyLjgtMzguNS0yOS43LTgyLjQgMTQuMy01Mi44IDUyLjh6TTM4Ni4zIDI4Ni4xbDMzLjcgMTYuOGMxMC4xIDUuOCAxNC41IDE4LjEgMTAuNSAyOS4xLTguOSAyNC4yLTI2LjQgNDYuNC00Mi42IDY1LjgtNy40IDguOS0yMC4yIDExLjEtMzAuMyA1LjNsLTI5LjEtMTYuOGMtMTYgMTMuNy0zNC42IDI0LjYtNTQuOSAzMS43djMzLjZjMCAxMS42LTguMyAyMS42LTE5LjcgMjMuNi0yNC42IDQuMi01MC40IDQuNC03NS45IDAtMTEuNS0yLTIwLTExLjktMjAtMjMuNlY0MThjLTIwLjMtNy4yLTM4LjktMTgtNTQuOS0zMS43TDc0IDQwM2MtMTAgNS44LTIyLjkgMy42LTMwLjMtNS4zLTE2LjItMTkuNC0zMy4zLTQxLjYtNDIuMi02NS43LTQtMTAuOS40LTIzLjIgMTAuNS0yOS4xbDMzLjMtMTYuOGMtMy45LTIwLjktMy45LTQyLjQgMC02My40TDEyIDIwNS44Yy0xMC4xLTUuOC0xNC42LTE4LjEtMTAuNS0yOSA4LjktMjQuMiAyNi00Ni40IDQyLjItNjUuOCA3LjQtOC45IDIwLjItMTEuMSAzMC4zLTUuM2wyOS4xIDE2LjhjMTYtMTMuNyAzNC42LTI0LjYgNTQuOS0zMS43VjU3LjFjMC0xMS41IDguMi0yMS41IDE5LjYtMjMuNSAyNC42LTQuMiA1MC41LTQuNCA3Ni0uMSAxMS41IDIgMjAgMTEuOSAyMCAyMy42djMzLjZjMjAuMyA3LjIgMzguOSAxOCA1NC45IDMxLjdsMjkuMS0xNi44YzEwLTUuOCAyMi45LTMuNiAzMC4zIDUuMyAxNi4yIDE5LjQgMzMuMiA0MS42IDQyLjEgNjUuOCA0IDEwLjkuMSAyMy4yLTEwIDI5LjFsLTMzLjcgMTYuOGMzLjkgMjEgMy45IDQyLjUgMCA2My41em0tMTE3LjYgMjEuMWM1OS4yLTc3LTI4LjctMTY0LjktMTA1LjctMTA1LjctNTkuMiA3NyAyOC43IDE2NC45IDEwNS43IDEwNS43em0yNDMuNCAxODIuN2wtOC4yIDE0LjNjLTMgNS4zLTkuNCA3LjUtMTUuMSA1LjQtMTEuOC00LjQtMjIuNi0xMC43LTMyLjEtMTguNi00LjYtMy44LTUuOC0xMC41LTIuOC0xNS43bDguMi0xNC4zYy02LjktOC0xMi4zLTE3LjMtMTUuOS0yNy40aC0xNi41Yy02IDAtMTEuMi00LjMtMTIuMi0xMC4zLTItMTItMi4xLTI0LjYgMC0zNy4xIDEtNiA2LjItMTAuNCAxMi4yLTEwLjRoMTYuNWMzLjYtMTAuMSA5LTE5LjQgMTUuOS0yNy40bC04LjItMTQuM2MtMy01LjItMS45LTExLjkgMi44LTE1LjcgOS41LTcuOSAyMC40LTE0LjIgMzIuMS0xOC42IDUuNy0yLjEgMTIuMS4xIDE1LjEgNS40bDguMiAxNC4zYzEwLjUtMS45IDIxLjItMS45IDMxLjcgMGw4LjItMTQuM2MzLTUuMyA5LjQtNy41IDE1LjEtNS40IDExLjggNC40IDIyLjYgMTAuNyAzMi4xIDE4LjYgNC42IDMuOCA1LjggMTAuNSAyLjggMTUuN2wtOC4yIDE0LjNjNi45IDggMTIuMyAxNy4zIDE1LjkgMjcuNGgxNi41YzYgMCAxMS4yIDQuMyAxMi4yIDEwLjMgMiAxMiAyLjEgMjQuNiAwIDM3LjEtMSA2LTYuMiAxMC40LTEyLjIgMTAuNGgtMTYuNWMtMy42IDEwLjEtOSAxOS40LTE1LjkgMjcuNGw4LjIgMTQuM2MzIDUuMiAxLjkgMTEuOS0yLjggMTUuNy05LjUgNy45LTIwLjQgMTQuMi0zMi4xIDE4LjYtNS43IDIuMS0xMi4xLS4xLTE1LjEtNS40bC04LjItMTQuM2MtMTAuNCAxLjktMjEuMiAxLjktMzEuNyAwek01MDEuNiA0MzFjMzguNSAyOS42IDgyLjQtMTQuMyA1Mi44LTUyLjgtMzguNS0yOS42LTgyLjQgMTQuMy01Mi44IDUyLjh6Ij48L3BhdGg+PC9zdmc+'
	);
}
	
					
function opr_brand_settings_page_cb() {
	//get dates and compare
	$today = time();
	$startDateOption = strtotime(esc_attr( get_option('opr_brand_settings_programs_start_date')));
	$applyDateOption = strtotime(esc_attr( get_option('opr_brand_settings_programs_apply_date')));
	
	//if dates have past, rest to nothing
	$startDate = ($startDateOption >= $today)?:update_option('opr_brand_settings_programs_start_date',null);
	$applyDate = ($applyDateOption >= $today)?:null;
	
	$NewForm = new FormBuild();
	
	$Logos = $NewForm->buildForm($NewForm,
		array(
			'Logo'=>array(
				'val'=>esc_attr( get_option('opr_brand_settings_logo')),
				'type'=>'uploader'
			),
			'Favicon'=>array(
				'val'=>esc_attr( get_option('opr_brand_settings_favicon')),
				'type'=>'text'
			),
			'Icon Library'=>array(
				'val'=>esc_attr(get_option('opr_brand_settings_icon_library')),
				'type'=>'text'
			)
		),
	'Brand Elements');
	
	
	$Info = $NewForm->buildForm($NewForm,
		array(
		'Phone Number'=>esc_attr( get_option('opr_brand_settings_phone_number')),
		'RFI Redirect' => esc_attr( get_option('opr_brand_settings_rfi_redirect')),
		'GTM Id' => esc_attr( get_option('opr_brand_settings_gtm_id')),
		'Programs Start Date'=>array(
			'val'=>$startDate,
			'type'=>'date'
		),
		'Programs Apply Date'=>array(
			'val'=>$applyDate,
			'type'=>'date'
		),
		'Global CTPA'=>array(
			'val'=>esc_attr(get_option('opr_brand_settings_ctpa')),
			'type'=>'textarea'
		)
	),
	'General Info');
	
	?>
	<div class="wrap">
		<form method="post" action="options.php" id="opr_brand_settings_form">
	<?
		settings_fields( 'opr_brand_settings' );
		do_settings_sections( 'opr_brand_settings' );	

		echo $NewForm->saveHTML();    
	    submit_button();
	echo '</form></div>';
}

function opr_register_brand_style_settings() { // whitelist options
	register_setting( 'opr_brand_settings', 'opr_brand_settings_favicon' );
	register_setting( 'opr_brand_settings', 'opr_brand_settings_logo' );
	register_setting( 'opr_brand_settings', 'opr_brand_settings_phone_number' );
	register_setting( 'opr_brand_settings', 'opr_brand_settings_rfi_redirect');
	register_setting('opr_brand_settings', 'opr_brand_settings_gtm_id');
	register_setting( 'opr_brand_settings', 'opr_brand_settings_programs_start_date' );
	register_setting( 'opr_brand_settings', 'opr_brand_settings_programs_apply_date' );
	register_setting( 'opr_brand_settings', 'opr_brand_settings_icon_library');
	register_setting( 'opr_brand_settings', 'opr_brand_settings_global_ctpa');
	
}
