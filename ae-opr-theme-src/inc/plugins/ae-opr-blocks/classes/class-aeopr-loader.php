<?php
/**
 * AEOPR Loader.
 *
 * @package AEOPR
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

if ( ! class_exists( 'AEOPR_Loader' ) ) {

	/**
	 * Class AEOPR_Loader.
	 */
	final class AEOPR_Loader {

		/**
		 * Member Variable
		 *
		 * @var instance
		 */
		private static $instance;

		/**
		 *  Initiator
		 */
		public static function get_instance() {
			if ( ! isset( self::$instance ) ) {
				self::$instance = new self();
			}
			return self::$instance;
		}

		/**
		 * Constructor
		 */
		public function __construct() {

			// Activation hook.
			register_activation_hook( AEOPR_FILE, array( $this, 'activation_reset' ) );

			// deActivation hook.
			register_deactivation_hook( AEOPR_FILE, array( $this, 'deactivation_reset' ) );

			if ( ! $this->is_gutenberg_active() ) {
				/* TO DO */
				add_action( 'admin_notices', array( $this, 'aeopr_fails_to_load' ) );
				return;
			}

			$this->define_constants();

			$this->loader();

			add_action( 'plugins_loaded', array( $this, 'load_plugin' ) );
		}

		/**
		 * Loads Other files.
		 *
		 * @since 1.0.0
		 *
		 * @return void
		 */
		public function loader() {
			require_once AEOPR_DIR . 'classes/class-aeopr-admin-helper.php';
			require_once AEOPR_DIR . 'classes/class-aeopr-helper.php';
			require_once AEOPR_DIR . 'classes/class-aeopr-update.php';
		}

		/**
		 * Defines all constants
		 *
		 * @since 1.0.0
		 */
		public function define_constants() {
			define( 'AEOPR_BASE', plugin_basename( AEOPR_FILE ) );
			define( 'AEOPR_DIR', plugin_dir_path( AEOPR_FILE ) );
			define( 'AEOPR_URL', plugins_url( '/', AEOPR_FILE ) );
			define( 'AEOPR_VER', '1.15.2' );
			define( 'AEOPR_MODULES_DIR', AEOPR_DIR . 'modules/' );
			define( 'AEOPR_MODULES_URL', AEOPR_URL . 'modules/' );
			define( 'AEOPR_SLUG', 'uag' );
			define( 'AEOPR_TABLET_BREAKPOINT', '976' );
			define( 'AEOPR_MOBILE_BREAKPOINT', '767' );
		}

		/**
		 * Loads plugin files.
		 *
		 * @since 1.0.0
		 *
		 * @return void
		 */
		public function load_plugin() {

			$this->load_textdomain();

			require_once AEOPR_DIR . 'classes/class-aeopr-core-plugin.php';
			require_once AEOPR_DIR . 'classes/class-aeopr-rest-api.php';
			//require_once AEOPR_DIR . 'dist/blocks/post/class-aeopr-post.php';
			//require_once AEOPR_DIR . 'dist/blocks/post-timeline/class-aeopr-post-timeline.php';
			//require_once AEOPR_DIR . 'dist/blocks/cf7-styler/class-aeopr-cf7-styler.php';
			//require_once AEOPR_DIR . 'dist/blocks/gf-styler/class-aeopr-gf-styler.php';
		}

		/**
		 * Check if Gutenberg is active
		 *
		 * @since 1.1.0
		 *
		 * @return boolean
		 */
		public function is_gutenberg_active() {
			return function_exists( 'register_block_type' );
		}

		/**
		 * Load Ultimate Gutenberg Text Domain.
		 * This will load the translation textdomain depending on the file priorities.
		 *      1. Global Languages /wp-content/languages/ultimate-addons-for-gutenberg/ folder
		 *      2. Local dorectory /wp-content/plugins/ultimate-addons-for-gutenberg/languages/ folder
		 *
		 * @since  1.0.0
		 * @return void
		 */
		public function load_textdomain() {

			/**
			 * Filters the languages directory path to use for AffiliateWP.
			 *
			 * @param string $lang_dir The languages directory path.
			 */
			$lang_dir = apply_filters( 'aeopr_languages_directory', AEOPR_ROOT . '/languages/' );

			load_plugin_textdomain( 'ultimate-addons-for-gutenberg', false, $lang_dir );
		}

		/**
		 * Fires admin notice when Gutenberg is not installed and activated.
		 *
		 * @since 1.0.0
		 *
		 * @return void
		 */
		public function aeopr_fails_to_load() {

			if ( ! current_user_can( 'install_plugins' ) ) {
				return;
			}

			$class = 'notice notice-error';
			/* translators: %s: html tags */
			$message = sprintf( __( 'The %1$sUltimate Addon for Gutenberg%2$s plugin requires %1$sGutenberg%2$s plugin installed & activated.', 'ultimate-addons-for-gutenberg' ), '<strong>', '</strong>' );

			$action_url   = wp_nonce_url( self_admin_url( 'update.php?action=install-plugin&plugin=gutenberg' ), 'install-plugin_gutenberg' );
			$button_label = __( 'Install Gutenberg', 'ultimate-addons-for-gutenberg' );

			$button = '<p><a href="' . $action_url . '" class="button-primary">' . $button_label . '</a></p><p></p>';

			printf( '<div class="%1$s"><p>%2$s</p>%3$s</div>', esc_attr( $class ), wp_kses_post( $message ), wp_kses_post( $button ) );
		}

		/**
		 * Activation Reset
		 */
		public function activation_reset() {
			update_option( '__aeopr_do_redirect', true );
		}

		/**
		 * Deactivation Reset
		 */
		public function deactivation_reset() {
			update_option( '__aeopr_do_redirect', false );
		}
	}

	/**
	 *  Prepare if class 'AEOPR_Loader' exist.
	 *  Kicking this off by calling 'get_instance()' method
	 */
	AEOPR_Loader::get_instance();
}
