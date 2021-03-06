<?php
/**
 * AEOPR Blocks Initializer
 *
 * Enqueue CSS/JS of all the blocks.
 *
 * @since   1.0.0
 * @package AEOPR
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * AEOPR_Init_Blocks.
 *
 * @package AEOPR
 */
class AEOPR_Init_Blocks {


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
		// Hook: Frontend assets.
		add_action( 'enqueue_block_assets', array( $this, 'block_assets' ) );

		// Hook: Editor assets.
		add_action( 'enqueue_block_editor_assets', array( $this, 'editor_assets' ) );

		add_filter( 'block_categories', array( $this, 'register_block_category' ), 10, 2 );

		add_action( 'wp_ajax_aeopr_gf_shortcode', array( $this, 'gf_shortcode' ) );
		add_action( 'wp_ajax_nopriv_aeopr_gf_shortcode', array( $this, 'gf_shortcode' ) );

		add_action( 'wp_ajax_aeopr_cf7_shortcode', array( $this, 'cf7_shortcode' ) );
		add_action( 'wp_ajax_nopriv_aeopr_cf7_shortcode', array( $this, 'cf7_shortcode' ) );
	}

	/**
	 * Renders the Gravity Form shortcode.
	 *
	 * @since 1.12.0
	 */
	public function gf_shortcode() {

		check_ajax_referer( 'aeopr_ajax_nonce', 'nonce' );

		$id = intval( $_POST['formId'] );

		if ( $id && 0 !== $id && -1 !== $id ) {
			$data['html'] = do_shortcode( '[gravityforms id="' . $id . '" ajax="true"]' );
		} else {
			$data['html'] = '<p>' . __( 'Please select a valid Gravity Form.', 'ultimate-addons-for-gutenberg' ) . '</p>';
		}
		wp_send_json_success( $data );
	}

	/**
	 * Renders the Contect Form 7 shortcode.
	 *
	 * @since 1.10.0
	 */
	public function cf7_shortcode() {

		check_ajax_referer( 'aeopr_ajax_nonce', 'nonce' );

		$id = intval( $_POST['formId'] );

		if ( $id && 0 !== $id && -1 !== $id ) {
			$data['html'] = do_shortcode( '[contact-form-7 id="' . $id . '" ajax="true"]' );
		} else {
			$data['html'] = '<p>' . __( 'Please select a valid Contact Form 7.', 'ultimate-addons-for-gutenberg' ) . '</p>';
		}
		wp_send_json_success( $data );
	}

	/**
	 * Gutenberg block category for AEOPR.
	 *
	 * @param array  $categories Block categories.
	 * @param object $post Post object.
	 * @since 1.0.0
	 */
	public function register_block_category( $categories, $post ) {
		return array_merge(
			$categories,
			array(
				array(
					'slug'  => 'aeopr',
					'title' => __( 'Ultimate Addons Blocks', 'ultimate-addons-for-gutenberg' ),
				),
			)
		);
	}

	/**
	 * Enqueue Gutenberg block assets for both frontend + backend.
	 *
	 * @since 1.0.0
	 */
	public function block_assets() {

		if ( ! is_admin() ) {

			if ( class_exists( 'WooCommerce' ) ) {

				if ( false === AEOPR_Helper::$uag_flag ) {
					return;
				}
			} else {

				$post = get_post();

				/**
				 * Filters the post to build stylesheet for.
				 *
				 * @param \WP_Post $post The global post.
				 */
				$post = apply_filters( 'aeopr_post_for_stylesheet', $post );

				if ( false === has_blocks( $post ) ) {
					return;
				}

				if ( false === AEOPR_Helper::$uag_flag ) {
					return;
				}
			}
		}

		wp_enqueue_style(
			'aeopr-block-css', // Handle.
			AEOPR_URL . 'dist/blocks.style.css', // Block style CSS.
			array(),
			AEOPR_VER
		);

		$blocks          = AEOPR_Config::get_block_attributes();
		$disabled_blocks = AEOPR_Admin_Helper::get_admin_settings_option( '_aeopr_blocks', array() );
		$block_assets    = AEOPR_Config::get_block_assets();

		foreach ( $blocks as $slug => $value ) {
			$_slug = str_replace( 'aeopr/', '', $slug );

			if ( ! ( isset( $disabled_blocks[ $_slug ] ) && 'disabled' === $disabled_blocks[ $_slug ] ) ) {

				$js_assets = ( isset( $blocks[ $slug ]['js_assets'] ) ) ? $blocks[ $slug ]['js_assets'] : array();

				$css_assets = ( isset( $blocks[ $slug ]['css_assets'] ) ) ? $blocks[ $slug ]['css_assets'] : array();

				if ( 'cf7-styler' === $_slug ) {
					if ( ! wp_script_is( 'contact-form-7', 'enqueued' ) ) {
						wp_enqueue_script( 'contact-form-7' );
					}

					if ( ! wp_script_is( ' wpcf7-admin', 'enqueued' ) ) {
						wp_enqueue_script( ' wpcf7-admin' );
					}
				}

				foreach ( $js_assets as $asset_handle => $val ) {
					// Scripts.
					wp_register_script(
						$val, // Handle.
						$block_assets[ $val ]['src'],
						$block_assets[ $val ]['dep'],
						AEOPR_VER,
						true
					);

					$skip_editor = isset( $block_assets[ $val ]['skipEditor'] ) ? $block_assets[ $val ]['skipEditor'] : false;

					if ( is_admin() && false === $skip_editor ) {
						wp_enqueue_script( $val );
					}
				}

				foreach ( $css_assets as $asset_handle => $val ) {
					// Styles.
					wp_register_style(
						$val, // Handle.
						$block_assets[ $val ]['src'],
						$block_assets[ $val ]['dep'],
						AEOPR_VER
					);

					if ( is_admin() ) {
						wp_enqueue_style( $val );
					}
				}
			}
		}

	} // End function editor_assets().

	/**
	 * Enqueue Gutenberg block assets for backend editor.
	 *
	 * @since 1.0.0
	 */
	public function editor_assets() {

		$aeopr_ajax_nonce = wp_create_nonce( 'aeopr_ajax_nonce' );
		// Scripts.
		wp_enqueue_script(
			'aeopr-block-editor-js', // Handle.
			AEOPR_URL . 'dist/blocks.build.js',
			array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-components', 'wp-editor', 'wp-api-fetch','wp-hooks' ), // Dependencies, defined above.
			AEOPR_VER,
			true // Enqueue the script in the footer.
		);

		// Styles.
		wp_enqueue_style(
			'aeopr-block-editor-css', // Handle.
			AEOPR_URL . 'dist/blocks.editor.build.css', // Block editor CSS.
			array( 'wp-edit-blocks' ), // Dependency to include the CSS after it.
			AEOPR_VER
		);

		// Common Editor style.
		wp_enqueue_style(
			'aeopr-block-common-editor-css', // Handle.
			AEOPR_URL . 'dist/blocks.commoneditorstyle.build.css', // Block editor CSS.
			array( 'wp-edit-blocks' ), // Dependency to include the CSS after it.
			AEOPR_VER
		);

		wp_enqueue_script( 'aeopr-deactivate-block-js', AEOPR_URL . 'dist/blocks-deactivate.js', array( 'wp-blocks' ), AEOPR_VER, true );

		$blocks       = array();
		$saved_blocks = AEOPR_Admin_Helper::get_admin_settings_option( '_aeopr_blocks' );

		if ( is_array( $saved_blocks ) ) {
			foreach ( $saved_blocks as $slug => $data ) {
				$_slug         = 'aeopr/' . $slug;
				$current_block = AEOPR_Config::$block_attributes[ $_slug ];

				if ( isset( $current_block['is_child'] ) && $current_block['is_child'] ) {
					continue;
				}

				if ( isset( $current_block['is_active'] ) && ! $current_block['is_active'] ) {
					continue;
				}

				if ( isset( $saved_blocks[ $slug ] ) ) {
					if ( 'disabled' === $saved_blocks[ $slug ] ) {
						array_push( $blocks, $_slug );
					}
				}
			}
		}

		wp_localize_script(
			'aeopr-deactivate-block-js',
			'aeopr_deactivate_blocks',
			array(
				'deactivated_blocks' => $blocks,
			)
		);

		wp_localize_script(
			'aeopr-block-editor-js',
			'aeopr_blocks_info',
			array(
				'blocks'            => AEOPR_Config::get_block_attributes(),
				'category'          => 'aeopr',
				'ajax_url'          => admin_url( 'admin-ajax.php' ),
				'cf7_forms'         => $this->get_cf7_forms(),
				'gf_forms'          => $this->get_gravity_forms(),
				'tablet_breakpoint' => AEOPR_TABLET_BREAKPOINT,
				'mobile_breakpoint' => AEOPR_MOBILE_BREAKPOINT,
				'image_sizes'       => AEOPR_Helper::get_image_sizes(),
				'post_types'        => AEOPR_Helper::get_post_types(),
				'all_taxonomy'      => AEOPR_Helper::get_related_taxonomy(),
				'aeopr_ajax_nonce'   => $aeopr_ajax_nonce,
			)
		);
	} // End function editor_assets().


	/**
	 * Function to integrate CF7 Forms.
	 *
	 * @since 1.10.0
	 */
	public function get_cf7_forms() {
		$field_options = array();

		if ( class_exists( 'WPCF7_ContactForm' ) ) {
			$args             = array(
				'post_type'      => 'wpcf7_contact_form',
				'posts_per_page' => -1,
			);
			$forms            = get_posts( $args );
			$field_options[0] = array(
				'value' => -1,
				'label' => __( 'Select Form', 'ultimate-addons-for-gutenberg' ),
			);
			if ( $forms ) {
				foreach ( $forms as $form ) {
					$field_options[] = array(
						'value' => $form->ID,
						'label' => $form->post_title,
					);
				}
			}
		}

		if ( empty( $field_options ) ) {
			$field_options = array(
				'-1' => __( 'You have not added any Contact Form 7 yet.', 'ultimate-addons-for-gutenberg' ),
			);
		}
		return $field_options;
	}

	/**
	 * Returns all gravity forms with ids
	 *
	 * @since 1.12.0
	 * @return array Key Value paired array.
	 */
	public function get_gravity_forms() {
		$field_options = array();

		if ( class_exists( 'GFForms' ) ) {
			$forms            = RGFormsModel::get_forms( null, 'title' );
			$field_options[0] = array(
				'value' => -1,
				'label' => __( 'Select Form', 'ultimate-addons-for-gutenberg' ),
			);
			if ( is_array( $forms ) ) {
				foreach ( $forms as $form ) {
					$field_options[] = array(
						'value' => $form->id,
						'label' => $form->title,
					);
				}
			}
		}

		if ( empty( $field_options ) ) {
			$field_options = array(
				'-1' => __( 'You have not added any Gravity Forms yet.', 'ultimate-addons-for-gutenberg' ),
			);
		}

		return $field_options;
	}
}

/**
 *  Prepare if class 'AEOPR_Init_Blocks' exist.
 *  Kicking this off by calling 'get_instance()' method
 */
AEOPR_Init_Blocks::get_instance();
