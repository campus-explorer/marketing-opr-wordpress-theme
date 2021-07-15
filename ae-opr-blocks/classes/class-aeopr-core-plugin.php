<?php
/**
 * AEOPR Core Plugin.
 *
 * @package AEOPR
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * AEOPR_Core_Plugin.
 *
 * @package AEOPR
 */
class AEOPR_Core_Plugin {

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

		$this->includes();
	}

	/**
	 * Includes.
	 *
	 * @since 1.0.0
	 */
	private function includes() {

		//require AEOPR_DIR . 'lib/notices/class-astra-notices.php';
		//require AEOPR_DIR . 'classes/class-aeopr-admin.php';
		//require AEOPR_DIR . 'classes/class-aeopr-init-blocks.php';
	}
}

/**
 *  Prepare if class 'AEOPR_Core_Plugin' exist.
 *  Kicking this off by calling 'get_instance()' method
 */
AEOPR_Core_Plugin::get_instance();
