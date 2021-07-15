<?php

/*
 * Plugin Name: Landing Page Manager
 * Description: Custom Settings page for managing landing pages.
 * Version: 1.0.0
 * Author: Jason Sonderman
 * Text Domain: ae-opr-landing-page-manager
*/

//move to external classes file
class HTML extends DOMDocument{
	function __construct(){
		parent::__construct('1.0','iso-8859-1' );
		$this->formatOutput = true;
	}
	public  function createButton(){
		$temp= $this->createElement('input');
		$temp->setAttribute('type','button');
		return $temp;
	}
	public  function createTitle(type,content){
		$temp= $this->createElement(type,content);
		return $temp;
	}
	public  function saveHTML(){
		return  html_entity_decode(parent::saveHTML());
	}	
}



function landing_page_manager_admin_menu() {
    add_menu_page(
        __( 'Sample page', 'my-textdomain' ),
        __( 'Sample menu', 'my-textdomain' ),
        'manage_options',
        'sample-page',
        'my_admin_page_contents',
        'dashicons-schedule',
        3
    );
}
add_action( 'admin_menu', 'landing_page_manager_admin_menu' );

function landing_page_manager_admin_page_contents() {
	$HTML = new HTML();
$button = $HTML->createButton();
$button->setAttribute('value','Button Thing');
$button->setAttribute('style','width:200px');
$HTML->appendChild($button);

$title = $HTML->createTitle('h1',"Welcome Test");
$HTML->appendChild($title);
echo $HTML->saveHTML();

    ?>
    <h1> <?php esc_html_e( 'Welcome to my custom admin page.', 'my-plugin-textdomain' ); ?> </h1>
    <form method="POST" action="options.php">
    <?php
    settings_fields( 'sample-page' );
    do_settings_sections( 'sample-page' );
    submit_button();
    ?>
    </form>
    <?php
}


add_action( 'admin_init', 'landing_page_manager_settings_init' );

function landing_page_manager_settings_init() {

    add_settings_section(
        'sample_page_setting_section',
        __( 'Custom settings', 'my-textdomain' ),
        'my_setting_section_callback_function',
        'sample-page'
    );

		add_settings_field(
		   'my_setting_field',
		   __( 'My custom setting field', 'my-textdomain' ),
		   'my_setting_markup',
		   'sample-page',
		   'sample_page_setting_section'
		);

		register_setting( 'sample-page', 'landing_page_manager_setting_field' );
}


function landing_page_manager_setting_section_callback_function() {
    echo '<p>Intro text for our settings section</p>';
}


function landing_page_manager_setting_markup() {
    ?>
    <label for="my-input"><?php _e( 'My Input' ); ?></label>
    <input type="text" id="my_setting_field" name="my_setting_field" value="<?php echo get_option( 'my_setting_field' ); ?>">
    <?php
}