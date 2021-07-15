<?php
/**
 * Update Compatibility
 *
 * @package AEOPR
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

if ( ! class_exists( 'AEOPR_Update' ) ) :

	/**
	 * AEOPR Update initial setup
	 *
	 * @since 1.13.4
	 */
	class AEOPR_Update {

		/**
		 * Class instance.
		 *
		 * @access private
		 * @var $instance Class instance.
		 */
		private static $instance;

		/**
		 * Initiator
		 */
		public static function get_instance() {
			if ( ! isset( self::$instance ) ) {
				self::$instance = new self();
			}
			return self::$instance;
		}

		/**
		 *  Constructor
		 */
		public function __construct() {
			add_action( 'admin_init', __CLASS__ . '::init' );
		}

		/**
		 * Init
		 *
		 * @since 1.13.4
		 * @return void
		 */
		public static function init() {

			do_action( 'aeopr_update_before' );

			// Get auto saved version number.
			$saved_version = get_option( 'aeopr-version', false );

			// Update auto saved version number.
			if ( ! $saved_version ) {
				update_option( 'aeopr-version', AEOPR_VER );
				return;
			}

			// If equals then return.
			if ( version_compare( $saved_version, AEOPR_VER, '=' ) ) {
				return;
			}

			AEOPR_Admin_Helper::create_specific_stylesheet();

			// Update auto saved version number.
			update_option( 'aeopr-version', AEOPR_VER );

			do_action( 'aeopr_update_after' );
		}
	}

	/**
	 * Kicking this off by calling 'get_instance()' method
	 */
	AEOPR_Update::get_instance();

endif;
