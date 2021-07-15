<?php
/**
 * AEOPR Block Helper.
 *
 * @package AEOPR
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

if ( ! class_exists( 'AEOPR_Block_Helper' ) ) {

	/**
	 * Class AEOPR_Block_Helper.
	 */
	class AEOPR_Block_Helper {

		/**
		 * Get How To CSS
		 *
		 * @since 1.15.0
		 * @param array  $attr The block attributes.
		 * @param string $id The selector ID.
		 * @return array The Widget List.
		 */
		public static function get_how_to_css( $attr, $id ) {
			$defaults = AEOPR_Helper::$block_list['aeopr/how-to']['attributes'];

			$attr = array_merge( $defaults, $attr );

			$t_selectors = array();
			$m_selectors = array();

			$selectors = array(
				' .aeopr-how-to-main-wrap' => array(
					'text-align' => $attr['overallAlignment'],
				),

				' .aeopr-how-to-main-wrap p.aeopr-howto-desc-text' => array(
					'margin-bottom' => AEOPR_Helper::get_css_value( $attr['row_gap'], 'px' ),
				),

				' .aeopr-how-to-main-wrap .aeopr-howto__source-wrap' => array(
					'margin-bottom' => AEOPR_Helper::get_css_value( $attr['row_gap'], 'px' ),
				),

				' .aeopr-how-to-main-wrap span.aeopr-howto__time-wrap' => array(
					'margin-bottom' => AEOPR_Helper::get_css_value( $attr['row_gap'], 'px' ),
				),

				' .aeopr-how-to-main-wrap span.aeopr-howto__cost-wrap' => array(
					'margin-bottom' => AEOPR_Helper::get_css_value( $attr['row_gap'], 'px' ),
				),

				' .aeopr-tools__wrap .aeopr-how-to-tools-child__wrapper:last-child' => array(
					'margin-bottom' => '0px',
				),

				' .aeopr-how-to-materials .aeopr-how-to-materials-child__wrapper:last-child' => array(
					'margin-bottom' => AEOPR_Helper::get_css_value( $attr['row_gap'], 'px' ),
				),

				' .aeopr-howto-steps__wrap .wp-block-aeopr-info-box' => array(
					'margin-bottom' => AEOPR_Helper::get_css_value( $attr['step_gap'], 'px' ),
				),

				' .aeopr-howto-steps__wrap .wp-block-aeopr-info-box:last-child' => array(
					'margin-bottom' => '0px',
				),

				' span.aeopr-howto__time-wrap .aeopr-howto-timeNeeded-value' => array(
					'margin-left' => AEOPR_Helper::get_css_value( $attr['timeSpace'], 'px' ),
				),

				' span.aeopr-howto__cost-wrap .aeopr-howto-estcost-value' => array(
					'margin-left' => AEOPR_Helper::get_css_value( $attr['costSpace'], 'px' ),
				),

				' .aeopr-how-to-main-wrap .aeopr-howto-heading-text' => array(
					'color' => $attr['headingColor'],
				),

				' .aeopr-howto-desc-text'  => array(
					'color' => $attr['subHeadingColor'],
				),

				' .aeopr-howto__wrap span.aeopr-howto__time-wrap p' => array(
					'color' => $attr['subHeadingColor'],
				),

				' .aeopr-howto__wrap span.aeopr-howto__cost-wrap p' => array(
					'color' => $attr['subHeadingColor'],
				),

				' .aeopr-howto__wrap span.aeopr-howto__time-wrap h4.aeopr-howto-timeNeeded-text' => array(
					'color' => $attr['showTotaltimecolor'],
				),

				' .aeopr-howto__wrap span.aeopr-howto__cost-wrap h4.aeopr-howto-estcost-text' => array(
					'color' => $attr['showTotaltimecolor'],
				),

				' .aeopr-how-to-tools__wrap .aeopr-howto-req-tools-text' => array(
					'color' => $attr['showTotaltimecolor'],
				),

				'  .aeopr-how-to-materials__wrap .aeopr-howto-req-materials-text' => array(
					'color' => $attr['showTotaltimecolor'],
				),

				' .aeopr-how-to-steps__wrap .aeopr-howto-req-steps-text' => array(
					'color' => $attr['showTotaltimecolor'],
				),
			);

			$selectors[' .aeopr-tools__wrap .aeopr-how-to-tools-child__wrapper'] = array(
				'color' => $attr['subHeadingColor'],
			);

			$selectors[' .aeopr-how-to-materials .aeopr-how-to-materials-child__wrapper'] = array(
				'color' => $attr['subHeadingColor'],
			);

			$combined_selectors = array(
				'desktop' => $selectors,
				'tablet'  => $t_selectors,
				'mobile'  => $m_selectors,
			);

			$combined_selectors = AEOPR_Helper::get_typography_css( $attr, 'subHead', ' p', $combined_selectors );
			$combined_selectors = AEOPR_Helper::get_typography_css( $attr, 'price', ' h4', $combined_selectors );
			$combined_selectors = AEOPR_Helper::get_typography_css( $attr, 'head', ' .aeopr-howto-heading-text', $combined_selectors );
			$combined_selectors = AEOPR_Helper::get_typography_css( $attr, 'subHead', ' .aeopr-tools .aeopr-tools__label', $combined_selectors );
			$combined_selectors = AEOPR_Helper::get_typography_css( $attr, 'subHead', ' .aeopr-materials .aeopr-materials__label', $combined_selectors );

			return AEOPR_Helper::generate_all_css( $combined_selectors, ' .aeopr-block-' . $id );
		}

		/**
		 * Get Section Block CSS
		 *
		 * @since 0.0.1
		 * @param array  $attr The block attributes.
		 * @param string $id The selector ID.
		 * @return array The Widget List.
		 */
		public static function get_section_css( $attr, $id ) {

			global $content_width;

			$defaults = AEOPR_Helper::$block_list['aeopr/section']['attributes'];

			$attr = array_merge( $defaults, $attr );

			$bg_type                 = ( isset( $attr['backgroundType'] ) ) ? $attr['backgroundType'] : 'none';
			$overlay_type            = ( isset( $attr['overlayType'] ) ) ? $attr['overlayType'] : 'color';
			$gradientOverlayPosition = ( isset( $attr['gradientOverlayPosition'] ) ) ? $attr['gradientOverlayPosition'] : 'center center';
			$gradientPosition        = ( isset( $attr['gradientPosition'] ) ) ? $attr['gradientPosition'] : 'center center';

			$boxShadowPositionCSS = $attr['boxShadowPosition'];
			if ( 'outset' === $attr['boxShadowPosition'] ) {
				$boxShadowPositionCSS = '';
			}

			$style = array(
				'padding-top'    => AEOPR_Helper::get_css_value( $attr['topPadding'], $attr['desktopPaddingType'] ),
				'padding-bottom' => AEOPR_Helper::get_css_value( $attr['bottomPadding'], $attr['desktopPaddingType'] ),
				'padding-left'   => AEOPR_Helper::get_css_value( $attr['leftPadding'], $attr['desktopPaddingType'] ),
				'padding-right'  => AEOPR_Helper::get_css_value( $attr['rightPadding'], $attr['desktopPaddingType'] ),
				'border-radius'  => AEOPR_Helper::get_css_value( $attr['borderRadius'], 'px' ),
			);

			$m_selectors = array();
			$t_selectors = array();

			if ( 'right' === $attr['align'] ) {
				$style['margin-right']  = AEOPR_Helper::get_css_value( $attr['rightMargin'], $attr['desktopMarginType'] );
				$style['margin-left']   = 'auto';
				$style['margin-top']    = AEOPR_Helper::get_css_value( $attr['topMargin'], $attr['desktopMarginType'] );
				$style['margin-bottom'] = AEOPR_Helper::get_css_value( $attr['bottomMargin'], $attr['desktopMarginType'] );
			} elseif ( 'left' === $attr['align'] ) {
				$style['margin-right']  = 'auto';
				$style['margin-left']   = AEOPR_Helper::get_css_value( $attr['leftMargin'], $attr['desktopMarginType'] );
				$style['margin-top']    = AEOPR_Helper::get_css_value( $attr['topMargin'], $attr['desktopMarginType'] );
				$style['margin-bottom'] = AEOPR_Helper::get_css_value( $attr['bottomMargin'], $attr['desktopMarginType'] );
			} elseif ( 'center' === $attr['align'] ) {
				$style['margin-right']  = 'auto';
				$style['margin-left']   = 'auto';
				$style['margin-top']    = AEOPR_Helper::get_css_value( $attr['topMargin'], $attr['desktopMarginType'] );
				$style['margin-bottom'] = AEOPR_Helper::get_css_value( $attr['bottomMargin'], $attr['desktopMarginType'] );
			} else {
				$style['margin-top']    = AEOPR_Helper::get_css_value( $attr['topMargin'], $attr['desktopMarginType'] );
				$style['margin-bottom'] = AEOPR_Helper::get_css_value( $attr['bottomMargin'], $attr['desktopMarginType'] );
			}

			if ( 'none' !== $attr['borderStyle'] ) {
				$style['border-style'] = $attr['borderStyle'];
				$style['border-width'] = AEOPR_Helper::get_css_value( $attr['borderWidth'], 'px' );
				$style['border-color'] = $attr['borderColor'];
			}

			$position = str_replace( '-', ' ', $attr['backgroundPosition'] );

			$section_width = '100%';

			if ( isset( $attr['contentWidth'] ) && ( 'boxed' === $attr['contentWidth'] && isset( $attr['width'] ) ) ) {
				$section_width = AEOPR_Helper::get_css_value( $attr['width'], 'px' );
			}

			if ( 'wide' !== $attr['align'] && 'full' !== $attr['align'] ) {
				$style['max-width'] = $section_width;
			}

			if ( 'image' === $bg_type ) {

				$style['background-image']      = ( isset( $attr['backgroundImage'] ) && isset( $attr['backgroundImage']['url'] ) ) ? "url('" . $attr['backgroundImage']['url'] . "' )" : null;
				$style['background-position']   = $position;
				$style['background-attachment'] = $attr['backgroundAttachment'];
				$style['background-repeat']     = $attr['backgroundRepeat'];
				$style['background-size']       = $attr['backgroundSize'];

			}

			$inner_width = '100%';

			if ( isset( $attr['contentWidth'] ) ) {
				if ( 'boxed' !== $attr['contentWidth'] ) {
					if ( isset( $attr['themeWidth'] ) && $attr['themeWidth'] ) {
						$inner_width = AEOPR_Helper::get_css_value( $content_width, 'px' );
					} else {
						if ( isset( $attr['innerWidth'] ) ) {
							$inner_width = AEOPR_Helper::get_css_value( $attr['innerWidth'], $attr['innerWidthType'] );
						}
					}
				}
			}

			$selectors = array(
				'.aeopr-section__wrap'          => $style,
				' > .aeopr-section__video-wrap' => array(
					'opacity' => ( isset( $attr['backgroundVideoOpacity'] ) && '' !== $attr['backgroundVideoOpacity'] ) ? ( ( 100 - $attr['backgroundVideoOpacity'] ) / 100 ) : 0.5,
				),
				' > .aeopr-section__inner-wrap' => array(
					'max-width' => $inner_width,
				),
				'.wp-block-aeopr-section'       => array(
					'box-shadow' => AEOPR_Helper::get_css_value( $attr['boxShadowHOffset'], 'px' ) . ' ' . AEOPR_Helper::get_css_value( $attr['boxShadowVOffset'], 'px' ) . ' ' . AEOPR_Helper::get_css_value( $attr['boxShadowBlur'], 'px' ) . ' ' . AEOPR_Helper::get_css_value( $attr['boxShadowSpread'], 'px' ) . ' ' . $attr['boxShadowColor'] . ' ' . $boxShadowPositionCSS,
				),
			);

			if ( 'video' === $bg_type ) {
				$selectors[' > .aeopr-section__overlay'] = array(
					'opacity'          => 1,
					'background-color' => $attr['backgroundVideoColor'],
				);
			} elseif ( 'image' === $bg_type ) {
				if ( 'color' === $overlay_type ) {
					$selectors[' > .aeopr-section__overlay'] = array(
						'opacity'          => ( isset( $attr['backgroundOpacity'] ) && '' !== $attr['backgroundOpacity'] ) ? $attr['backgroundOpacity'] / 100 : 0,
						'background-color' => $attr['backgroundImageColor'],
					);
				} else {
					$selectors[' > .aeopr-section__overlay']['background-color'] = 'transparent';
					$selectors[' > .aeopr-section__overlay']['opacity']          = ( isset( $attr['backgroundOpacity'] ) && '' !== $attr['backgroundOpacity'] ) ? $attr['backgroundOpacity'] / 100 : '';

					if ( 'linear' === $attr['gradientOverlayType'] ) {

						$selectors[' > .aeopr-section__overlay']['background-image'] = 'linear-gradient(' . $attr['gradientOverlayAngle'] . 'deg, ' . $attr['gradientOverlayColor1'] . ' ' . $attr['gradientOverlayLocation1'] . '%, ' . $attr['gradientOverlayColor2'] . ' ' . $attr['gradientOverlayLocation2'] . '%)';
					} else {

						$selectors[' > .aeopr-section__overlay']['background-image'] = 'radial-gradient( at ' . $gradientOverlayPosition . ', ' . $attr['gradientOverlayColor1'] . ' ' . $attr['gradientOverlayLocation1'] . '%, ' . $attr['gradientOverlayColor2'] . ' ' . $attr['gradientOverlayLocation2'] . '%)';
					}
				}
			} elseif ( 'color' === $bg_type ) {
				$selectors[' > .aeopr-section__overlay'] = array(
					'opacity'          => ( isset( $attr['backgroundOpacity'] ) && '' !== $attr['backgroundOpacity'] ) ? $attr['backgroundOpacity'] / 100 : '',
					'background-color' => $attr['backgroundColor'],
				);
			} elseif ( 'gradient' === $bg_type ) {
				$selectors[' > .aeopr-section__overlay']['background-color'] = 'transparent';
				$selectors[' > .aeopr-section__overlay']['opacity']          = ( isset( $attr['backgroundOpacity'] ) && '' !== $attr['backgroundOpacity'] ) ? $attr['backgroundOpacity'] / 100 : '';

				if ( 'linear' === $attr['gradientType'] ) {

					$selectors[' > .aeopr-section__overlay']['background-image'] = 'linear-gradient(' . $attr['gradientAngle'] . 'deg, ' . $attr['gradientColor1'] . ' ' . $attr['gradientLocation1'] . '%, ' . $attr['gradientColor2'] . ' ' . $attr['gradientLocation2'] . '%)';
				} else {
					$selectors[' > .aeopr-section__overlay']['background-image'] = 'radial-gradient( at ' . $gradientPosition . ', ' . $attr['gradientColor1'] . ' ' . $attr['gradientLocation1'] . '%, ' . $attr['gradientColor2'] . ' ' . $attr['gradientLocation2'] . '%)';
				}
			}

			$selectors[' > .aeopr-section__overlay']['border-radius'] = AEOPR_Helper::get_css_value( $attr['borderRadius'], 'px' );

			$m_selectors = array(
				'.aeopr-section__wrap' => array(
					'padding-top'    => AEOPR_Helper::get_css_value( $attr['topPaddingMobile'], $attr['mobilePaddingType'] ),
					'padding-bottom' => AEOPR_Helper::get_css_value( $attr['bottomPaddingMobile'], $attr['mobilePaddingType'] ),
					'padding-left'   => AEOPR_Helper::get_css_value( $attr['leftPaddingMobile'], $attr['mobilePaddingType'] ),
					'padding-right'  => AEOPR_Helper::get_css_value( $attr['rightPaddingMobile'], $attr['mobilePaddingType'] ),
				),
			);

			$t_selectors = array(
				'.aeopr-section__wrap' => array(
					'padding-top'    => AEOPR_Helper::get_css_value( $attr['topPaddingTablet'], $attr['tabletPaddingType'] ),
					'padding-bottom' => AEOPR_Helper::get_css_value( $attr['bottomPaddingTablet'], $attr['tabletPaddingType'] ),
					'padding-left'   => AEOPR_Helper::get_css_value( $attr['leftPaddingTablet'], $attr['tabletPaddingType'] ),
					'padding-right'  => AEOPR_Helper::get_css_value( $attr['rightPaddingTablet'], $attr['tabletPaddingType'] ),
				),
			);

			if ( 'right' === $attr['align'] ) {
				$t_selectors['.aeopr-section__wrap']['margin-right']  = AEOPR_Helper::get_css_value( $attr['rightMarginTablet'], $attr['tabletMarginType'] );
				$t_selectors['.aeopr-section__wrap']['margin-top']    = AEOPR_Helper::get_css_value( $attr['topMarginTablet'], $attr['tabletMarginType'] );
				$t_selectors['.aeopr-section__wrap']['margin-bottom'] = AEOPR_Helper::get_css_value( $attr['bottomMarginTablet'], $attr['tabletMarginType'] );

				$m_selectors['.aeopr-section__wrap']['margin-right']  = AEOPR_Helper::get_css_value( $attr['rightMarginMobile'], $attr['mobileMarginType'] );
				$m_selectors['.aeopr-section__wrap']['margin-top']    = AEOPR_Helper::get_css_value( $attr['topMarginMobile'], $attr['mobileMarginType'] );
				$m_selectors['.aeopr-section__wrap']['margin-bottom'] = AEOPR_Helper::get_css_value( $attr['bottomMarginMobile'], $attr['mobileMarginType'] );
			} elseif ( 'left' === $attr['align'] ) {
				$t_selectors['.aeopr-section__wrap']['margin-left']   = AEOPR_Helper::get_css_value( $attr['leftMarginTablet'], $attr['tabletMarginType'] );
				$t_selectors['.aeopr-section__wrap']['margin-top']    = AEOPR_Helper::get_css_value( $attr['topMarginTablet'], $attr['tabletMarginType'] );
				$t_selectors['.aeopr-section__wrap']['margin-bottom'] = AEOPR_Helper::get_css_value( $attr['bottomMarginTablet'], $attr['tabletMarginType'] );

				$m_selectors['.aeopr-section__wrap']['margin-left']   = AEOPR_Helper::get_css_value( $attr['leftMarginMobile'], $attr['mobileMarginType'] );
				$m_selectors['.aeopr-section__wrap']['margin-top']    = AEOPR_Helper::get_css_value( $attr['topMarginMobile'], $attr['mobileMarginType'] );
				$m_selectors['.aeopr-section__wrap']['margin-bottom'] = AEOPR_Helper::get_css_value( $attr['bottomMarginMobile'], $attr['mobileMarginType'] );
			} else {
				$t_selectors['.aeopr-section__wrap']['margin-top']    = AEOPR_Helper::get_css_value( $attr['topMarginTablet'], $attr['tabletMarginType'] );
				$t_selectors['.aeopr-section__wrap']['margin-bottom'] = AEOPR_Helper::get_css_value( $attr['bottomMarginTablet'], $attr['tabletMarginType'] );

				$m_selectors['.aeopr-section__wrap']['margin-top']    = AEOPR_Helper::get_css_value( $attr['topMarginMobile'], $attr['mobileMarginType'] );
				$m_selectors['.aeopr-section__wrap']['margin-bottom'] = AEOPR_Helper::get_css_value( $attr['bottomMarginMobile'], $attr['mobileMarginType'] );
			}

			$combined_selectors = array(
				'desktop' => $selectors,
				'tablet'  => $t_selectors,
				'mobile'  => $m_selectors,
			);

			$base_selector = ( $attr['classMigrate'] ) ? '.aeopr-block-' : '#aeopr-section-';

			return AEOPR_Helper::generate_all_css( $combined_selectors, $base_selector . $id );
		}

		/**
		 * Get Columns Block CSS
		 *
		 * @since 1.8.0
		 * @param array  $attr The block attributes.
		 * @param string $id The selector ID.
		 * @return array The Widget List.
		 */
		public static function get_columns_css( $attr, $id ) {

			global $content_width;

			$defaults = AEOPR_Helper::$block_list['aeopr/columns']['attributes'];

			$attr = array_merge( $defaults, $attr );

			$bg_type = ( isset( $attr['backgroundType'] ) ) ? $attr['backgroundType'] : 'none';

			$m_selectors          = array();
			$t_selectors          = array();
			$boxShadowPositionCSS = $attr['boxShadowPosition'];
			if ( 'outset' === $attr['boxShadowPosition'] ) {
				$boxShadowPositionCSS = '';
			}
			$style = array(
				'padding-top'    => AEOPR_Helper::get_css_value( $attr['topPadding'], $attr['desktopPaddingType'] ),
				'padding-bottom' => AEOPR_Helper::get_css_value( $attr['bottomPadding'], $attr['desktopPaddingType'] ),
				'padding-left'   => AEOPR_Helper::get_css_value( $attr['leftPadding'], $attr['desktopPaddingType'] ),
				'padding-right'  => AEOPR_Helper::get_css_value( $attr['rightPadding'], $attr['desktopPaddingType'] ),
				'margin-top'     => AEOPR_Helper::get_css_value( $attr['topMargin'], $attr['desktopMarginType'] ),
				'margin-bottom'  => AEOPR_Helper::get_css_value( $attr['bottomMargin'], $attr['desktopMarginType'] ),
				'border-radius'  => AEOPR_Helper::get_css_value( $attr['borderRadius'], $attr['desktopMarginType'] ),
			);

			if ( 'none' !== $attr['borderStyle'] ) {
				$style['border-style'] = $attr['borderStyle'];
				$style['border-width'] = AEOPR_Helper::get_css_value( $attr['borderWidth'], 'px' );
				$style['border-color'] = $attr['borderColor'];
			}

			$position = str_replace( '-', ' ', $attr['backgroundPosition'] );

			if ( 'image' === $bg_type ) {

				$style['background-image']      = ( isset( $attr['backgroundImage'] ) && isset( $attr['backgroundImage']['url'] ) ) ? "url('" . $attr['backgroundImage']['url'] . "' )" : null;
				$style['background-position']   = $position;
				$style['background-attachment'] = $attr['backgroundAttachment'];
				$style['background-repeat']     = $attr['backgroundRepeat'];
				$style['background-size']       = $attr['backgroundSize'];

			}

			$inner_width = '100%';

			if ( isset( $attr['contentWidth'] ) ) {
				if ( 'theme' === $attr['contentWidth'] ) {
					$inner_width = AEOPR_Helper::get_css_value( $content_width, 'px' );
				} elseif ( 'custom' === $attr['contentWidth'] ) {
					$inner_width = AEOPR_Helper::get_css_value( $attr['width'], $attr['widthType'] );
				}
			}

			$selectors = array(
				'.aeopr-columns__wrap'              => $style,
				' .aeopr-columns__video-wrap'       => array(
					'opacity' => ( isset( $attr['backgroundVideoOpacity'] ) && '' !== $attr['backgroundVideoOpacity'] ) ? ( ( 100 - $attr['backgroundVideoOpacity'] ) / 100 ) : 0.5,
				),
				' > .aeopr-columns__inner-wrap'     => array(
					'max-width' => $inner_width,
				),
				' .aeopr-column__inner-wrap'        => array(
					'padding' => AEOPR_Helper::get_css_value( $attr['columnGap'], 'px' ),
				),
				' .aeopr-columns__shape-top svg'    => array(
					'height' => AEOPR_Helper::get_css_value( $attr['topHeight'], 'px' ),
				),
				' .aeopr-columns__shape-top .aeopr-columns__shape-fill' => array(
					'fill' => AEOPR_Helper::hex2rgba( $attr['topColor'], ( isset( $attr['topDividerOpacity'] ) && '' !== $attr['topDividerOpacity'] ) ? $attr['topDividerOpacity'] : 100 ),
				),
				' .aeopr-columns__shape-bottom svg' => array(
					'height' => AEOPR_Helper::get_css_value( $attr['bottomHeight'], 'px' ),
				),
				' .aeopr-columns__shape-bottom .aeopr-columns__shape-fill' => array(
					'fill' => AEOPR_Helper::hex2rgba( $attr['bottomColor'], ( isset( $attr['bottomDividerOpacity'] ) && '' !== $attr['bottomDividerOpacity'] ) ? $attr['bottomDividerOpacity'] : 100 ),
				),
				'.wp-block-aeopr-columns'           => array(
					'box-shadow' => AEOPR_Helper::get_css_value( $attr['boxShadowHOffset'], 'px' ) . ' ' . AEOPR_Helper::get_css_value( $attr['boxShadowVOffset'], 'px' ) . ' ' . AEOPR_Helper::get_css_value( $attr['boxShadowBlur'], 'px' ) . ' ' . AEOPR_Helper::get_css_value( $attr['boxShadowSpread'], 'px' ) . ' ' . $attr['boxShadowColor'] . ' ' . $boxShadowPositionCSS,
				),
			);

			if ( '' !== $attr['topWidth'] ) {
				$selectors[' .aeopr-columns__shape-top svg']['width'] = 'calc( ' . $attr['topWidth'] . '% + 1.3px )';
			}

			if ( '' !== $attr['bottomWidth'] ) {
				$selectors[' .aeopr-columns__shape-bottom svg']['width'] = 'calc( ' . $attr['bottomWidth'] . '% + 1.3px )';
			}

			if ( 'video' === $bg_type ) {
				$selectors[' > .aeopr-columns__overlay'] = array(
					'opacity'          => 1,
					'background-color' => $attr['backgroundVideoColor'],
				);
			} elseif ( 'image' === $bg_type ) {
				$selectors[' > .aeopr-columns__overlay'] = array(
					'opacity'          => ( isset( $attr['backgroundOpacity'] ) && '' !== $attr['backgroundOpacity'] ) ? $attr['backgroundOpacity'] / 100 : 0,
					'background-color' => $attr['backgroundImageColor'],
				);
			} elseif ( 'color' === $bg_type ) {
				$selectors[' > .aeopr-columns__overlay'] = array(
					'opacity'          => ( isset( $attr['backgroundOpacity'] ) && '' !== $attr['backgroundOpacity'] ) ? $attr['backgroundOpacity'] / 100 : '',
					'background-color' => $attr['backgroundColor'],
				);
			} elseif ( 'gradient' === $bg_type ) {
				$selectors[' > .aeopr-columns__overlay']['background-color'] = 'transparent';
				$selectors[' > .aeopr-columns__overlay']['opacity']          = ( isset( $attr['backgroundOpacity'] ) && '' !== $attr['backgroundOpacity'] ) ? $attr['backgroundOpacity'] / 100 : '';

				if ( 'linear' === $attr['gradientType'] ) {

					$selectors[' > .aeopr-columns__overlay']['background-image'] = 'linear-gradient(' . $attr['gradientAngle'] . 'deg, ' . $attr['gradientColor1'] . ' ' . $attr['gradientLocation1'] . '%, ' . $attr['gradientColor2'] . ' ' . $attr['gradientLocation2'] . '%)';
				} else {

					$selectors[' > .aeopr-columns__overlay']['background-image'] = 'radial-gradient( at center center, ' . $attr['gradientColor1'] . ' ' . $attr['gradientLocation1'] . '%, ' . $attr['gradientColor2'] . ' ' . $attr['gradientLocation2'] . '%)';
				}
			}

			$selectors[' > .aeopr-columns__overlay']['border-radius'] = AEOPR_Helper::get_css_value( $attr['borderRadius'], 'px' );

			$m_selectors = array(
				'.aeopr-columns__wrap'              => array(
					'padding-top'    => AEOPR_Helper::get_css_value( $attr['topPaddingMobile'], $attr['mobilePaddingType'] ),
					'padding-bottom' => AEOPR_Helper::get_css_value( $attr['bottomPaddingMobile'], $attr['mobilePaddingType'] ),
					'padding-left'   => AEOPR_Helper::get_css_value( $attr['leftPaddingMobile'], $attr['mobilePaddingType'] ),
					'padding-right'  => AEOPR_Helper::get_css_value( $attr['rightPaddingMobile'], $attr['mobilePaddingType'] ),
					'margin-top'     => AEOPR_Helper::get_css_value( $attr['topMarginMobile'], $attr['mobileMarginType'] ),
					'margin-bottom'  => AEOPR_Helper::get_css_value( $attr['bottomMarginMobile'], $attr['mobileMarginType'] ),
				),
				' .aeopr-columns__shape-bottom svg' => array(
					'height' => AEOPR_Helper::get_css_value( $attr['bottomHeightMobile'], 'px' ),
				),
				' .aeopr-columns__shape-top svg'    => array(
					'height' => AEOPR_Helper::get_css_value( $attr['topHeightMobile'], 'px' ),
				),
			);

			$t_selectors = array(
				'.aeopr-columns__wrap'              => array(
					'padding-top'    => AEOPR_Helper::get_css_value( $attr['topPaddingTablet'], $attr['tabletPaddingType'] ),
					'padding-bottom' => AEOPR_Helper::get_css_value( $attr['bottomPaddingTablet'], $attr['tabletPaddingType'] ),
					'padding-left'   => AEOPR_Helper::get_css_value( $attr['leftPaddingTablet'], $attr['tabletPaddingType'] ),
					'padding-right'  => AEOPR_Helper::get_css_value( $attr['rightPaddingTablet'], $attr['tabletPaddingType'] ),
					'margin-top'     => AEOPR_Helper::get_css_value( $attr['topMarginTablet'], $attr['tabletMarginType'] ),
					'margin-bottom'  => AEOPR_Helper::get_css_value( $attr['bottomMarginTablet'], $attr['tabletMarginType'] ),
				),
				' .aeopr-columns__shape-bottom svg' => array(
					'height' => AEOPR_Helper::get_css_value( $attr['bottomHeightTablet'], 'px' ),
				),
				' .aeopr-columns__shape-top svg'    => array(
					'height' => AEOPR_Helper::get_css_value( $attr['topHeightTablet'], 'px' ),
				),
			);

			$combined_selectors = array(
				'desktop' => $selectors,
				'tablet'  => $t_selectors,
				'mobile'  => $m_selectors,
			);

			$base_selector = ( $attr['classMigrate'] ) ? '.aeopr-block-' : '#aeopr-columns-';

			return AEOPR_Helper::generate_all_css( $combined_selectors, $base_selector . $id );
		}

		/**
		 * Get Single Column Block CSS
		 *
		 * @since 1.8.0
		 * @param array  $attr The block attributes.
		 * @param string $id The selector ID.
		 * @return array The Widget List.
		 */
		public static function get_column_css( $attr, $id ) {

			global $content_width;

			$defaults = AEOPR_Helper::$block_list['aeopr/column']['attributes'];

			$attr = array_merge( $defaults, $attr );

			$bg_type      = ( isset( $attr['backgroundType'] ) ) ? $attr['backgroundType'] : 'none';
			$overlay_type = ( isset( $attr['overlayType'] ) ) ? $attr['overlayType'] : 'none';

			$style = array(
				'padding-top'    => AEOPR_Helper::get_css_value( $attr['topPadding'], $attr['desktopPaddingType'] ),
				'padding-bottom' => AEOPR_Helper::get_css_value( $attr['bottomPadding'], $attr['desktopPaddingType'] ),
				'padding-left'   => AEOPR_Helper::get_css_value( $attr['leftPadding'], $attr['desktopPaddingType'] ),
				'padding-right'  => AEOPR_Helper::get_css_value( $attr['rightPadding'], $attr['desktopPaddingType'] ),
				'margin-top'     => AEOPR_Helper::get_css_value( $attr['topMargin'], $attr['desktopMarginType'] ),
				'margin-bottom'  => AEOPR_Helper::get_css_value( $attr['bottomMargin'], $attr['desktopMarginType'] ),
				'margin-left'    => AEOPR_Helper::get_css_value( $attr['leftMargin'], $attr['desktopMarginType'] ),
				'margin-right'   => AEOPR_Helper::get_css_value( $attr['rightMargin'], $attr['desktopMarginType'] ),
				'border-radius'  => AEOPR_Helper::get_css_value( $attr['borderRadius'], 'px' ),
			);

			$m_selectors = array();
			$t_selectors = array();

			if ( 'none' !== $attr['borderStyle'] ) {
				$style['border-style'] = $attr['borderStyle'];
				$style['border-width'] = AEOPR_Helper::get_css_value( $attr['borderWidth'], 'px' );
				$style['border-color'] = $attr['borderColor'];
			}

			$position = str_replace( '-', ' ', $attr['backgroundPosition'] );

			if ( 'image' === $bg_type ) {

				$style['background-image']      = ( isset( $attr['backgroundImage'] ) && isset( $attr['backgroundImage']['url'] ) ) ? "url('" . $attr['backgroundImage']['url'] . "' )" : null;
				$style['background-position']   = $position;
				$style['background-attachment'] = $attr['backgroundAttachment'];
				$style['background-repeat']     = $attr['backgroundRepeat'];
				$style['background-size']       = $attr['backgroundSize'];

			}

			$selectors = array(
				'.aeopr-column__wrap' => $style,
			);

			if ( 'image' === $bg_type ) {
				if ( 'color' === $overlay_type ) {
					$selectors[' > .aeopr-column__overlay'] = array(
						'opacity'          => ( isset( $attr['backgroundOpacity'] ) && '' !== $attr['backgroundOpacity'] ) ? $attr['backgroundOpacity'] / 100 : 0,
						'background-color' => $attr['backgroundImageColor'],
					);
				} else {
					$selectors[' > .aeopr-column__overlay']['background-color'] = 'transparent';
					$selectors[' > .aeopr-column__overlay']['opacity']          = ( isset( $attr['backgroundOpacity'] ) && '' !== $attr['backgroundOpacity'] ) ? $attr['backgroundOpacity'] / 100 : '';

					if ( 'linear' === $attr['gradientOverlayType'] ) {

						$selectors[' > .aeopr-column__overlay']['background-image'] = 'linear-gradient(' . $attr['gradientOverlayAngle'] . 'deg, ' . $attr['gradientOverlayColor1'] . ' ' . $attr['gradientOverlayLocation1'] . '%, ' . $attr['gradientOverlayColor2'] . ' ' . $attr['gradientOverlayLocation2'] . '%)';
					} else {

						$selectors[' > .aeopr-column__overlay']['background-image'] = 'radial-gradient( at center center, ' . $attr['gradientOverlayColor1'] . ' ' . $attr['gradientOverlayLocation1'] . '%, ' . $attr['gradientOverlayColor2'] . ' ' . $attr['gradientOverlayLocation2'] . '%)';
					}
				}
			} elseif ( 'color' === $bg_type ) {
				$selectors[' > .aeopr-column__overlay'] = array(
					'opacity'          => ( isset( $attr['backgroundOpacity'] ) && '' !== $attr['backgroundOpacity'] ) ? $attr['backgroundOpacity'] / 100 : '',
					'background-color' => $attr['backgroundColor'],
				);
			} elseif ( 'gradient' === $bg_type ) {
				$selectors[' > .aeopr-column__overlay']['background-color'] = 'transparent';
				$selectors[' > .aeopr-column__overlay']['opacity']          = ( isset( $attr['backgroundOpacity'] ) && '' !== $attr['backgroundOpacity'] ) ? $attr['backgroundOpacity'] / 100 : '';

				if ( 'linear' === $attr['gradientType'] ) {

					$selectors[' > .aeopr-column__overlay']['background-image'] = 'linear-gradient(' . $attr['gradientAngle'] . 'deg, ' . $attr['gradientColor1'] . ' ' . $attr['gradientLocation1'] . '%, ' . $attr['gradientColor2'] . ' ' . $attr['gradientLocation2'] . '%)';
				} else {

					$selectors[' > .aeopr-column__overlay']['background-image'] = 'radial-gradient( at center center, ' . $attr['gradientColor1'] . ' ' . $attr['gradientLocation1'] . '%, ' . $attr['gradientColor2'] . ' ' . $attr['gradientLocation2'] . '%)';
				}
			}

			if ( '' !== $attr['colWidth'] && 0 !== $attr['colWidth'] ) {

				$selectors['.aeopr-column__wrap']['width'] = AEOPR_Helper::get_css_value( $attr['colWidth'], '%' );
			}

			$m_selectors = array(
				'.aeopr-column__wrap' => array(
					'padding-top'    => AEOPR_Helper::get_css_value( $attr['topPaddingMobile'], $attr['mobilePaddingType'] ),
					'padding-bottom' => AEOPR_Helper::get_css_value( $attr['bottomPaddingMobile'], $attr['mobilePaddingType'] ),
					'padding-left'   => AEOPR_Helper::get_css_value( $attr['leftPaddingMobile'], $attr['mobilePaddingType'] ),
					'padding-right'  => AEOPR_Helper::get_css_value( $attr['rightPaddingMobile'], $attr['mobilePaddingType'] ),
					'margin-top'     => AEOPR_Helper::get_css_value( $attr['topMarginMobile'], $attr['mobileMarginType'] ),
					'margin-bottom'  => AEOPR_Helper::get_css_value( $attr['bottomMarginMobile'], $attr['mobileMarginType'] ),
					'margin-left'    => AEOPR_Helper::get_css_value( $attr['leftMarginMobile'], $attr['mobileMarginType'] ),
					'margin-right'   => AEOPR_Helper::get_css_value( $attr['rightMarginMobile'], $attr['mobileMarginType'] ),
				),
			);

			$t_selectors = array(
				'.aeopr-column__wrap' => array(
					'padding-top'    => AEOPR_Helper::get_css_value( $attr['topPaddingTablet'], $attr['tabletPaddingType'] ),
					'padding-bottom' => AEOPR_Helper::get_css_value( $attr['bottomPaddingTablet'], $attr['tabletPaddingType'] ),
					'padding-left'   => AEOPR_Helper::get_css_value( $attr['leftPaddingTablet'], $attr['tabletPaddingType'] ),
					'padding-right'  => AEOPR_Helper::get_css_value( $attr['rightPaddingTablet'], $attr['tabletPaddingType'] ),
					'margin-top'     => AEOPR_Helper::get_css_value( $attr['topMarginTablet'], $attr['tabletMarginType'] ),
					'margin-bottom'  => AEOPR_Helper::get_css_value( $attr['bottomMarginTablet'], $attr['tabletMarginType'] ),
					'margin-left'    => AEOPR_Helper::get_css_value( $attr['leftMarginTablet'], $attr['tabletMarginType'] ),
					'margin-right'   => AEOPR_Helper::get_css_value( $attr['rightMarginTablet'], $attr['tabletMarginType'] ),
				),
			);

			if ( '' !== $attr['colWidthTablet'] && 0 !== $attr['colWidthTablet'] ) {

				$t_selectors['.aeopr-column__wrap']['width'] = AEOPR_Helper::get_css_value( $attr['colWidthTablet'], '%' );
			}

			if ( '' !== $attr['colWidthMobile'] && 0 !== $attr['colWidthMobile'] ) {

				$m_selectors['.aeopr-column__wrap']['width'] = AEOPR_Helper::get_css_value( $attr['colWidthMobile'], '%' );
			}

			$combined_selectors = array(
				'desktop' => $selectors,
				'tablet'  => $t_selectors,
				'mobile'  => $m_selectors,
			);

			$base_selector = ( $attr['classMigrate'] ) ? '.aeopr-block-' : '#aeopr-column-';

			return AEOPR_Helper::generate_all_css( $combined_selectors, $base_selector . $id );
		}

		/**
		 * Get Advanced Heading Block CSS
		 *
		 * @since 0.0.1
		 * @param array  $attr The block attributes.
		 * @param string $id The selector ID.
		 * @return array The Widget List.
		 */
		public static function get_adv_heading_css( $attr, $id ) {

			$defaults = AEOPR_Helper::$block_list['aeopr/advanced-heading']['attributes'];

			$attr = array_merge( $defaults, (array) $attr );

			$m_selectors = array();
			$t_selectors = array();

			$selectors = array(
				' .aeopr-heading-text'   => array(
					'text-align'    => $attr['headingAlign'],
					'color'         => $attr['headingColor'],
					'margin-bottom' => AEOPR_Helper::get_css_value( $attr['headSpace'], 'px' ),
				),
				' .aeopr-separator-wrap' => array(
					'text-align' => $attr['headingAlign'],
				),
				' .aeopr-desc-text'      => array(
					'text-align' => $attr['headingAlign'],
					'color'      => $attr['subHeadingColor'],
				),

			);

			$seperatorStyle = isset( $attr['seperatorStyle'] ) ? $attr['seperatorStyle'] : '';

			if ( 'none' !== $seperatorStyle ) {
				$selectors[' .aeopr-separator'] = array(
					'border-top-style' => $attr['seperatorStyle'],
					'border-top-width' => AEOPR_Helper::get_css_value( $attr['separatorHeight'], 'px' ),
					'width'            => AEOPR_Helper::get_css_value( $attr['separatorWidth'], $attr['separatorWidthType'] ),
					'border-color'     => $attr['separatorColor'],
					'margin-bottom'    => AEOPR_Helper::get_css_value( $attr['separatorSpace'], 'px' ),
				);

			}

			$combined_selectors = array(
				'desktop' => $selectors,
				'tablet'  => $t_selectors,
				'mobile'  => $m_selectors,
			);

			$combined_selectors = AEOPR_Helper::get_typography_css( $attr, 'head', ' .aeopr-heading-text', $combined_selectors );
			$combined_selectors = AEOPR_Helper::get_typography_css( $attr, 'subHead', ' .aeopr-desc-text', $combined_selectors );

			$base_selector = ( $attr['classMigrate'] ) ? '.aeopr-block-' : '#aeopr-adv-heading-';

			return AEOPR_Helper::generate_all_css( $combined_selectors, $base_selector . $id );
		}

		/**
		 * Get Multi Buttons Block CSS
		 *
		 * @since 0.0.1
		 * @param array  $attr The block attributes.
		 * @param string $id The selector ID.
		 * @return array The Widget List.
		 */
		public static function get_buttons_css( $attr, $id ) {

			$defaults = AEOPR_Helper::$block_list['aeopr/buttons']['attributes'];

			$attr = array_merge( $defaults, (array) $attr );

			$m_selectors = array();
			$t_selectors = array();

			$selectors = array(
				' .aeopr-button__wrapper' => array(
					'margin-left'  => AEOPR_Helper::get_css_value( ( $attr['gap'] / 2 ), 'px' ),
					'margin-right' => AEOPR_Helper::get_css_value( ( $attr['gap'] / 2 ), 'px' ),
				),
			);

			if ( 'desktop' === $attr['stack'] ) {

				$selectors[' .aeopr-button__wrapper'] = array(
					'margin-left'   => 0,
					'margin-right'  => 0,
					'margin-bottom' => AEOPR_Helper::get_css_value( $attr['gap'], 'px' ),
				);

				if ( $attr['childMigrate'] ) {
					$selectors[' .aeopr-buttons-layout-wrap'] = array(
						'flex-direction' => 'column',
					);
				} else {
					$selectors[' .aeopr-buttons__wrap'] = array(
						'flex-direction' => 'column',
					);
				}
			} elseif ( 'tablet' === $attr['stack'] ) {

				$t_selectors[' .aeopr-button__wrapper'] = array(
					'margin-left'   => 0,
					'margin-right'  => 0,
					'margin-bottom' => AEOPR_Helper::get_css_value( $attr['gap'], 'px' ),
				);

				if ( $attr['childMigrate'] ) {
					$t_selectors[' .aeopr-buttons-layout-wrap'] = array(
						'flex-direction' => 'column',
					);
				} else {
					$t_selectors[' .aeopr-buttons__wrap'] = array(
						'flex-direction' => 'column',
					);
				}
			} elseif ( 'mobile' === $attr['stack'] ) {

				$m_selectors[' .aeopr-button__wrapper'] = array(
					'margin-left'   => 0,
					'margin-right'  => 0,
					'margin-bottom' => AEOPR_Helper::get_css_value( $attr['gap'], 'px' ),
				);

				if ( $attr['childMigrate'] ) {
					$m_selectors[' .aeopr-buttons-layout-wrap'] = array(
						'flex-direction' => 'column',
					);
				} else {
					$m_selectors[' .aeopr-buttons__wrap'] = array(
						'flex-direction' => 'column',
					);
				}
			}
			$alignment = ( 'left' === $attr['align'] ) ? 'flex-start' : ( ( 'right' === $attr['align'] ) ? 'flex-end' : 'center' );

			if ( 'full' === $attr['align'] ) {
				$selectors[' .aeopr-buttons__wrap']          = array(
					'justify-content' => 'space-between',
				);
				$selectors[' .aeopr-button__link']           = array(
					'text-align' => 'center',
				);
				$selectors[' .wp-block-aeopr-buttons-child'] = array(
					'width' => '100%',
				);
				$selectors[' .aeopr-buttons__outer-wrap:first-child .aeopr-button__wrapper'] = array(
					'margin-left' => 0,
				);
				$selectors[' .aeopr-buttons__outer-wrap:last-child .aeopr-button__wrapper']  = array(
					'margin-right' => 0,
				);
			} else {
				$selectors['.aeopr-buttons__outer-wrap .aeopr-buttons__wrap'] = array(
					'justify-content'   => $alignment,
					'-webkit-box-pack'  => $alignment,
					'-ms-flex-pack'     => $alignment,
					'justify-content'   => $alignment,
					'-webkit-box-align' => $alignment,
					'-ms-flex-align'    => $alignment,
					'align-items'       => $alignment,
				);
				if ( 'left' === $attr['align'] ) {
					$selectors[' .aeopr-buttons__outer-wrap:first-child .aeopr-button__wrapper'] = array(
						'margin-left' => 0,
					);
				}

				if ( 'right' === $attr['align'] ) {
					$selectors[' .aeopr-buttons__outer-wrap:last-child .aeopr-button__wrapper'] = array(
						'margin-right' => 0,
					);
				}
			}
			if ( $attr['childMigrate'] ) {
					$selectors[' .aeopr-buttons-repeater'] = array(
						'font-family' => $attr['fontFamily'],
						'font-weight' => $attr['fontWeight'],
					);
			}

			if ( ! $attr['childMigrate'] ) {

				foreach ( $attr['buttons'] as $key => $button ) {

					if ( $attr['btn_count'] <= $key ) {
						break;
					}

					$wrapper = ( ! $attr['childMigrate'] ) ? ' .aeopr-buttons-repeater-' . $key . '.aeopr-button__wrapper' : ' .aeopr-buttons-repeater';

					$selectors[ $wrapper ] = array(
						'font-family' => $attr['fontFamily'],
						'font-weight' => $attr['fontWeight'],
					);

					$child_selectors = self::get_buttons_child_selectors( $button, $key, $attr['childMigrate'] );
					$selectors       = array_merge( $selectors, (array) $child_selectors['selectors'] );
					$t_selectors     = array_merge( $t_selectors, (array) $child_selectors['t_selectors'] );
					$m_selectors     = array_merge( $m_selectors, (array) $child_selectors['m_selectors'] );
				}
			}

			$combined_selectors = array(
				'desktop' => $selectors,
				'tablet'  => $t_selectors,
				'mobile'  => $m_selectors,
			);

			$base_selector = ( $attr['classMigrate'] ) ? '.aeopr-block-' : '#aeopr-buttons-';

			return AEOPR_Helper::generate_all_css( $combined_selectors, $base_selector . $id );
		}
		/**
		 * Get Multi Buttons - Child Block CSS
		 *
		 * @since 1.14.9
		 * @param array  $attr The block attributes.
		 * @param string $id The selector ID.
		 * @return array The Widget List.
		 */
		public static function get_buttons_child_css( $attr, $id ) {

			$defaults = AEOPR_Helper::$block_list['aeopr/buttons-child']['attributes'];

			$attr               = array_merge( $defaults, (array) $attr );
			$all_selectors      = self::get_buttons_child_selectors( $attr, $id, true );
			$combined_selectors = array(
				'desktop' => $all_selectors['selectors'],
				'tablet'  => $all_selectors['t_selectors'],
				'mobile'  => $all_selectors['m_selectors'],
			);

			return AEOPR_Helper::generate_all_css( $combined_selectors, '.aeopr-block-' . $id );
		}
		/**
		 * Get Buttons Block CSS
		 *
		 * @since 1.14.9
		 * @param array  $attr The block attributes.
		 * @param string $id The key for the Icon List Item.
		 * @param string $child_migrate The child migration flag.
		 * @return array The Widget List.
		 */
		public static function get_buttons_child_selectors( $attr, $id, $child_migrate ) {

			$wrapper = ( ! $child_migrate ) ? ' .aeopr-buttons-repeater-' . $id : ' .aeopr-buttons-repeater';

			$m_selectors = array();
			$t_selectors = array();

			$attr['sizeType']       = isset( $attr['sizeType'] ) ? $attr['sizeType'] : 'px';
			$attr['lineHeightType'] = isset( $attr['lineHeightType'] ) ? $attr['lineHeightType'] : 'em';

			$selectors[ $wrapper ] = array(
				'font-size'     => AEOPR_Helper::get_css_value( $attr['size'], $attr['sizeType'] ),
				'line-height'   => AEOPR_Helper::get_css_value( $attr['lineHeight'], $attr['lineHeightType'] ),
				'border-width'  => AEOPR_Helper::get_css_value( $attr['borderWidth'], 'px' ),
				'border-color'  => $attr['borderColor'],
				'border-style'  => $attr['borderStyle'],
				'border-radius' => AEOPR_Helper::get_css_value( $attr['borderRadius'], 'px' ),
				'background'    => $attr['background'],
			);

			$selectors[ $wrapper . ':hover' ] = array(
				'background'   => $attr['hBackground'],
				'border-width' => AEOPR_Helper::get_css_value( $attr['borderWidth'], 'px' ),
				'border-color' => $attr['borderHColor'],
				'border-style' => $attr['borderStyle'],
			);

			$selectors[ $wrapper . ' a.aeopr-button__link' ] = array(
				'padding' => AEOPR_Helper::get_css_value( $attr['vPadding'], 'px' ) . ' ' . AEOPR_Helper::get_css_value( $attr['hPadding'], 'px' ),
				'color'   => $attr['color'],
			);

			$selectors[ $wrapper . ':hover a.aeopr-button__link' ] = array(
				'color' => $attr['hColor'],
			);

			$m_selectors[ $wrapper ] = array(
				'font-size'   => AEOPR_Helper::get_css_value( $attr['sizeMobile'], $attr['sizeType'] ),
				'line-height' => AEOPR_Helper::get_css_value( $attr['lineHeightMobile'], $attr['lineHeightType'] ),
			);

			$t_selectors[ $wrapper ] = array(
				'font-size'   => AEOPR_Helper::get_css_value( $attr['sizeTablet'], $attr['sizeType'] ),
				'line-height' => AEOPR_Helper::get_css_value( $attr['lineHeightTablet'], $attr['lineHeightType'] ),
			);

			$all_selectors = array(

				'selectors'   => $selectors,
				'm_selectors' => $m_selectors,
				't_selectors' => $t_selectors,
			);

			return $all_selectors;

		}
		/**
		 * Get Info Box CSS
		 *
		 * @since 0.0.1
		 * @param array  $attr The block attributes.
		 * @param string $id The selector ID.
		 * @return array The Widget List.
		 */
		public static function get_info_box_css( $attr, $id ) {

			$defaults = AEOPR_Helper::$block_list['aeopr/info-box']['attributes'];

			$attr = array_merge( $defaults, (array) $attr );

			$m_selectors = array();
			$t_selectors = array();

			$cta_icon_size   = AEOPR_Helper::get_css_value( $attr['ctaFontSize'], $attr['ctaFontSizeType'] );
			$m_cta_icon_size = AEOPR_Helper::get_css_value( $attr['ctaFontSizeMobile'], $attr['ctaFontSizeType'] );
			$t_cta_icon_size = AEOPR_Helper::get_css_value( $attr['ctaFontSizeTablet'], $attr['ctaFontSizeType'] );
			$icon_size       = AEOPR_Helper::get_css_value( $attr['iconSize'], 'px' );

			$selectors = array(
				' .aeopr-ifb-icon'                   => array(
					'height'      => $icon_size,
					'width'       => $icon_size,
					'line-height' => $icon_size,
				),
				' .aeopr-ifb-icon > span'            => array(
					'font-size'   => $icon_size,
					'height'      => $icon_size,
					'width'       => $icon_size,
					'line-height' => $icon_size,
					'color'       => $attr['iconColor'],
				),
				' .aeopr-ifb-icon svg'               => array(
					'fill' => $attr['iconColor'],
				),
				' .aeopr-ifb-icon:hover > span'      => array(
					'color' => $attr['iconHover'],
				),
				' .aeopr-ifb-icon:hover svg'         => array(
					'fill' => $attr['iconHover'],
				),

				' .aeopr-infbox__link-to-all:hover ~ .aeopr-infobox__content-wrap .aeopr-ifb-icon svg' => array(
					'fill' => $attr['iconHover'],
				),

				' .aeopr-infobox__content-wrap .aeopr-ifb-imgicon-wrap' => array(
					'margin-left'   => AEOPR_Helper::get_css_value( $attr['iconLeftMargin'], 'px' ),
					'margin-right'  => AEOPR_Helper::get_css_value( $attr['iconRightMargin'], 'px' ),
					'margin-top'    => AEOPR_Helper::get_css_value( $attr['iconTopMargin'], 'px' ),
					'margin-bottom' => AEOPR_Helper::get_css_value( $attr['iconBottomMargin'], 'px' ),
				),
				' .aeopr-infobox .aeopr-ifb-image-content img' => array(
					'border-radius' => AEOPR_Helper::get_css_value( $attr['iconimgBorderRadius'], 'px' ),
				),
				// CTA style .
				' .aeopr-infobox-cta-link'           => array(
					'color' => $attr['ctaLinkColor'],
				),
				' .aeopr-infobox-cta-link:hover'     => array(
					'color' => $attr['ctaLinkHoverColor'],
				),
				' .aeopr-infobox-cta-link .aeopr-ifb-button-icon' => array(
					'font-size'   => $cta_icon_size,
					'height'      => $cta_icon_size,
					'width'       => $cta_icon_size,
					'line-height' => $cta_icon_size,
				),
				' .aeopr-infobox-cta-link .aeopr-ifb-text-icon' => array(
					'font-size'   => $cta_icon_size,
					'height'      => $cta_icon_size,
					'width'       => $cta_icon_size,
					'line-height' => $cta_icon_size,
				),
				' .aeopr-infobox-cta-link svg'       => array(
					'fill' => $attr['ctaLinkColor'],
				),
				' .aeopr-infobox-cta-link:hover svg' => array(
					'fill' => $attr['ctaLinkHoverColor'],
				),
				' .aeopr-ifb-button-wrapper .aeopr-infobox-cta-link' => array(
					'color'            => $attr['ctaBtnLinkColor'],
					'background-color' => $attr['ctaBgColor'],
					'border-style'     => $attr['ctaBorderStyle'],
					'border-color'     => $attr['ctaBorderColor'],
					'border-radius'    => AEOPR_Helper::get_css_value( $attr['ctaBorderRadius'], 'px' ),
					'border-width'     => AEOPR_Helper::get_css_value( $attr['ctaBorderWidth'], 'px' ),
					'padding-top'      => AEOPR_Helper::get_css_value( $attr['ctaBtnVertPadding'], 'px' ),
					'padding-bottom'   => AEOPR_Helper::get_css_value( $attr['ctaBtnVertPadding'], 'px' ),
					'padding-left'     => AEOPR_Helper::get_css_value( $attr['ctaBtnHrPadding'], 'px' ),
					'padding-right'    => AEOPR_Helper::get_css_value( $attr['ctaBtnHrPadding'], 'px' ),

				),
				' .aeopr-ifb-button-wrapper .aeopr-infobox-cta-link svg' => array(
					'fill' => $attr['ctaBtnLinkColor'],
				),
				' .aeopr-ifb-button-wrapper .aeopr-infobox-cta-link:hover' => array(
					'color'            => $attr['ctaLinkHoverColor'],
					'background-color' => $attr['ctaBgHoverColor'],
					'border-color'     => $attr['ctaBorderhoverColor'],
				),
				' .aeopr-ifb-button-wrapper .aeopr-infobox-cta-link:hover svg' => array(
					'fill' => $attr['ctaLinkHoverColor'],
				),
				// Prefix Style.
				' .aeopr-ifb-title-prefix'           => array(
					'color'         => $attr['prefixColor'],
					'margin-bottom' => AEOPR_Helper::get_css_value( $attr['prefixSpace'], 'px' ),
				),
				// Title Style.
				' .aeopr-ifb-title'                  => array(
					'color'         => $attr['headingColor'],
					'margin-bottom' => $attr['headSpace'] . 'px',
				),
				// Description Style.
				' .aeopr-ifb-desc'                   => array(
					'color'         => $attr['subHeadingColor'],
					'margin-bottom' => AEOPR_Helper::get_css_value( $attr['subHeadSpace'], 'px' ),
				),
				// Seperator.
				' .aeopr-ifb-separator'              => array(
					'width'            => AEOPR_Helper::get_css_value( $attr['seperatorWidth'], $attr['separatorWidthType'] ),
					'border-top-width' => AEOPR_Helper::get_css_value( $attr['seperatorThickness'], 'px' ),
					'border-top-color' => $attr['seperatorColor'],
					'border-top-style' => $attr['seperatorStyle'],
				),
				' .aeopr-ifb-separator-parent'       => array(
					'margin-bottom' => AEOPR_Helper::get_css_value( $attr['seperatorSpace'], 'px' ),
				),
				// CTA icon space.
				' .aeopr-ifb-align-icon-after'       => array(
					'margin-left' => AEOPR_Helper::get_css_value( $attr['ctaIconSpace'], 'px' ),
				),
				' .aeopr-ifb-align-icon-before'      => array(
					'margin-right' => AEOPR_Helper::get_css_value( $attr['ctaIconSpace'], 'px' ),
				),
			);

			if ( $attr['imageWidthType'] ) {
				// Image.
				$selectors[' .aeopr-ifb-image-content > img'] = array(
					'width'     => AEOPR_Helper::get_css_value( $attr['imageWidth'], 'px' ),
					'max-width' => AEOPR_Helper::get_css_value( $attr['imageWidth'], 'px' ),
				);
			}

			if ( 'above-title' === $attr['iconimgPosition'] || 'below-title' === $attr['iconimgPosition'] ) {
				$selectors[' .aeopr-infobox__content-wrap'] = array(
					'text-align' => $attr['headingAlign'],
				);
			}

			$m_selectors = array(
				' .aeopr-infobox-cta-link .aeopr-ifb-button-icon' => array(
					'font-size'   => $m_cta_icon_size,
					'height'      => $m_cta_icon_size,
					'width'       => $m_cta_icon_size,
					'line-height' => $m_cta_icon_size,
				),
				' .aeopr-infobox-cta-link .aeopr-ifb-text-icon' => array(
					'font-size'   => $m_cta_icon_size,
					'height'      => $m_cta_icon_size,
					'width'       => $m_cta_icon_size,
					'line-height' => $m_cta_icon_size,
				),
			);

			$t_selectors = array(
				' .aeopr-infobox-cta-link .aeopr-ifb-button-icon' => array(
					'font-size'   => $t_cta_icon_size,
					'height'      => $t_cta_icon_size,
					'width'       => $t_cta_icon_size,
					'line-height' => $t_cta_icon_size,
				),
				' .aeopr-infobox-cta-link .aeopr-ifb-text-icon' => array(
					'font-size'   => $t_cta_icon_size,
					'height'      => $t_cta_icon_size,
					'width'       => $t_cta_icon_size,
					'line-height' => $t_cta_icon_size,
				),
			);

			$combined_selectors = array(
				'desktop' => $selectors,
				'tablet'  => $t_selectors,
				'mobile'  => $m_selectors,
			);

			$combined_selectors = AEOPR_Helper::get_typography_css( $attr, 'head', ' .aeopr-ifb-title', $combined_selectors );
			$combined_selectors = AEOPR_Helper::get_typography_css( $attr, 'subHead', ' .aeopr-ifb-desc', $combined_selectors );
			$combined_selectors = AEOPR_Helper::get_typography_css( $attr, 'prefix', ' .aeopr-ifb-title-prefix', $combined_selectors );
			$combined_selectors = AEOPR_Helper::get_typography_css( $attr, 'cta', ' .aeopr-infobox-cta-link', $combined_selectors );

			$base_selector = ( $attr['classMigrate'] ) ? '.aeopr-block-' : '#aeopr-infobox-';

			return AEOPR_Helper::generate_all_css( $combined_selectors, $base_selector . $id );

		}

		/**
		 * Get CTA CSS
		 *
		 * @since 1.7.0
		 * @param array  $attr The block attributes.
		 * @param string $id The selector ID.
		 * @return array The Widget List.
		 */
		public static function get_call_to_action_css( $attr, $id ) {

			$defaults = AEOPR_Helper::$block_list['aeopr/call-to-action']['attributes'];

			$attr = array_merge( $defaults, (array) $attr );

			$t_selectors = array();
			$m_selectors = array();

			$svg_size   = AEOPR_Helper::get_css_value( $attr['ctaFontSize'], $attr['ctaFontSizeType'] );
			$m_svg_size = AEOPR_Helper::get_css_value( $attr['ctaFontSizeMobile'], $attr['ctaFontSizeType'] );
			$t_svg_size = AEOPR_Helper::get_css_value( $attr['ctaFontSizeTablet'], $attr['ctaFontSizeType'] );

			$selectors = array(
				' .aeopr-cta__button-wrapper a.aeopr-cta-typeof-text' => array(
					'color' => $attr['ctaBtnLinkColor'],
				),
				' .aeopr-cta__button-wrapper:hover a.aeopr-cta-typeof-text ' => array(
					'color' => $attr['ctaLinkHoverColor'],
				),
				' .aeopr-cta__button-wrapper a.aeopr-cta-typeof-button' => array(
					'color'            => $attr['ctaBtnLinkColor'],
					'background-color' => $attr['ctaBgColor'],
					'border-style'     => $attr['ctaBorderStyle'],
					'border-color'     => $attr['ctaBorderColor'],
					'border-radius'    => AEOPR_Helper::get_css_value( $attr['ctaBorderRadius'], 'px' ),
					'border-width'     => AEOPR_Helper::get_css_value( $attr['ctaBorderWidth'], 'px' ),
					'padding-top'      => AEOPR_Helper::get_css_value( $attr['ctaBtnVertPadding'], 'px' ),
					'padding-bottom'   => AEOPR_Helper::get_css_value( $attr['ctaBtnVertPadding'], 'px' ),
					'padding-left'     => AEOPR_Helper::get_css_value( $attr['ctaBtnHrPadding'], 'px' ),
					'padding-right'    => AEOPR_Helper::get_css_value( $attr['ctaBtnHrPadding'], 'px' ),
				),
				' .aeopr-cta__button-wrapper:hover a.aeopr-cta-typeof-button' => array(
					'color'            => $attr['ctaLinkHoverColor'],
					'background-color' => $attr['ctaBgHoverColor'],
					'border-color'     => $attr['ctaBorderhoverColor'],
				),
				' .aeopr-cta__button-wrapper .aeopr-cta-with-svg' => array(
					'font-size'   => $svg_size,
					'width'       => $svg_size,
					'height'      => $svg_size,
					'line-height' => $svg_size,
				),
				' .aeopr-cta__button-wrapper .aeopr-cta__block-link svg' => array(
					'fill' => $attr['ctaBtnLinkColor'],
				),
				' .aeopr-cta__button-wrapper:hover .aeopr-cta__block-link svg' => array(
					'fill' => $attr['ctaLinkHoverColor'],
				),
				' .aeopr-cta__title'               => array(
					'line-height'   => AEOPR_Helper::get_css_value( $attr['titleLineHeight'], $attr['titleLineHeightType'] ),
					'color'         => $attr['titleColor'],
					'margin-bottom' => $attr['titleSpace'] . 'px',
				),
				' .aeopr-cta__desc'                => array(
					'color'         => $attr['descColor'],
					'margin-bottom' => AEOPR_Helper::get_css_value( $attr['descSpace'], 'px' ),
				),
				' .aeopr-cta__align-button-after'  => array(
					'margin-left' => AEOPR_Helper::get_css_value( $attr['ctaIconSpace'], 'px' ),
				),
				' .aeopr-cta__align-button-before' => array(
					'margin-right' => AEOPR_Helper::get_css_value( $attr['ctaIconSpace'], 'px' ),
				),
			);

			$selectors[' .aeopr-cta__content-wrap'] = array(
				'text-align' => $attr['textAlign'],
			);

			if ( 'left' === $attr['textAlign'] && 'right' === $attr['ctaPosition'] ) {
				$selectors[' .aeopr-cta__left-right-wrap .aeopr-cta__content'] = array(
					'margin-left'  => AEOPR_Helper::get_css_value( $attr['ctaLeftSpace'], 'px' ),
					'margin-right' => '0',
				);
			}

			if ( 'right' === $attr['textAlign'] && 'right' === $attr['ctaPosition'] ) {
				$selectors[' .aeopr-cta__left-right-wrap .aeopr-cta__content'] = array(
					'margin-right' => AEOPR_Helper::get_css_value( $attr['ctaRightSpace'], 'px' ),
					'margin-left'  => '0',
				);
			}

			if ( 'right' === $attr['ctaPosition'] && ( 'text' === $attr['ctaType'] || 'button' === $attr['ctaType'] ) ) {
				$selectors[' .aeopr-cta__content-right .aeopr-cta__left-right-wrap .aeopr-cta__content'] = array(
					'width' => AEOPR_Helper::get_css_value( $attr['contentWidth'], '%' ),
				);

				$selectors[' .aeopr-cta__content-right .aeopr-cta__left-right-wrap .aeopr-cta__link-wrapper'] = array(
					'width' => AEOPR_Helper::get_css_value( ( 100 - $attr['contentWidth'] ), '%' ),
				);
			}

			$t_selectors = array(
				' .aeopr-cta__button-wrapper .aeopr-cta-with-svg'  => array(
					'font-size'   => $t_svg_size,
					'width'       => $t_svg_size,
					'height'      => $t_svg_size,
					'line-height' => $t_svg_size,
				),
			);

			$m_selectors = array(
				' .aeopr-cta__button-wrapper .aeopr-cta-with-svg'  => array(
					'font-size'   => $m_svg_size,
					'width'       => $m_svg_size,
					'height'      => $m_svg_size,
					'line-height' => $m_svg_size,
				),
			);

			$combined_selectors = array(
				'desktop' => $selectors,
				'tablet'  => $t_selectors,
				'mobile'  => $m_selectors,
			);

			$combined_selectors = AEOPR_Helper::get_typography_css( $attr, 'cta', ' .aeopr-cta__button-wrapper a.aeopr-cta-typeof-text', $combined_selectors );
			$combined_selectors = AEOPR_Helper::get_typography_css( $attr, 'cta', ' .aeopr-cta__button-wrapper a.aeopr-cta-typeof-button', $combined_selectors );
			$combined_selectors = AEOPR_Helper::get_typography_css( $attr, 'title', ' .aeopr-cta__title', $combined_selectors );
			$combined_selectors = AEOPR_Helper::get_typography_css( $attr, 'desc', ' .aeopr-cta__desc', $combined_selectors );

			$base_selector = ( $attr['classMigrate'] ) ? '.aeopr-block-' : '#aeopr-cta-block-';

			return AEOPR_Helper::generate_all_css( $combined_selectors, $base_selector . $id );

		}

		/**
		 * Get Testimonial CSS
		 *
		 * @since 0.0.1
		 * @param array  $attr The block attributes.
		 * @param string $id The selector ID.
		 * @return array The Widget List.
		 */
		public static function get_testimonial_css( $attr, $id ) {

			$defaults = AEOPR_Helper::$block_list['aeopr/testimonial']['attributes'];

			$attr = array_merge( $defaults, (array) $attr );

			$img_align = 'center';
			if ( 'left' === $attr['headingAlign'] ) {
				$img_align = 'flex-start';
			} elseif ( 'right' === $attr['headingAlign'] ) {
				$img_align = 'flex-end';
			}

			$position = str_replace( '-', ' ', $attr['backgroundPosition'] );

			$t_selectors = array();
			$m_selectors = array();

			$selectors = array(
				' .aeopr-testimonial__wrap'        => array(
					'padding-left'  => AEOPR_Helper::get_css_value( ( ( $attr['columnGap'] ) / 2 ), 'px' ),
					'padding-right' => AEOPR_Helper::get_css_value( ( ( $attr['columnGap'] ) / 2 ), 'px' ),
					'margin-bottom' => AEOPR_Helper::get_css_value( $attr['rowGap'], 'px' ),
				),
				' .aeopr-testimonial__wrap .aeopr-tm__image-content' => array(
					'padding-left'   => AEOPR_Helper::get_css_value( $attr['imgHrPadding'], 'px' ),
					'padding-right'  => AEOPR_Helper::get_css_value( $attr['imgHrPadding'], 'px' ),
					'padding-top'    => AEOPR_Helper::get_css_value( $attr['imgVrPadding'], 'px' ),
					'padding-bottom' => AEOPR_Helper::get_css_value( $attr['imgVrPadding'], 'px' ),
				),
				' .aeopr-tm__image img'            => array(
					'width'     => AEOPR_Helper::get_css_value( $attr['imageWidth'], 'px' ),
					'max-width' => AEOPR_Helper::get_css_value( $attr['imageWidth'], 'px' ),
				),
				' .aeopr-tm__content'              => array(
					'text-align' => $attr['headingAlign'],
					'padding'    => AEOPR_Helper::get_css_value( $attr['contentPadding'], 'px' ),
				),
				' .aeopr-tm__author-name'          => array(
					'color'         => $attr['authorColor'],
					'margin-bottom' => $attr['nameSpace'] . 'px',
				),
				' .aeopr-tm__company'              => array(
					'color' => $attr['companyColor'],
				),
				' .aeopr-tm__desc'                 => array(
					'color'         => $attr['descColor'],
					'margin-bottom' => AEOPR_Helper::get_css_value( $attr['descSpace'], 'px' ),
				),
				' .aeopr-testimonial__wrap.aeopr-tm__bg-type-color .aeopr-tm__content' => array(
					'background-color' => $attr['backgroundColor'],
				),
				' .aeopr-testimonial__wrap.aeopr-tm__bg-type-image .aeopr-tm__content' => array(
					'background-image'    => ( isset( $attr['backgroundImage']['url'] ) && '' !== $attr['backgroundImage']['url'] ) ? 'url("' . $attr['backgroundImage']['url'] . '")' : null,
					'background-position' => $position,
					'background-repeat'   => $attr['backgroundRepeat'],
					'background-size'     => $attr['backgroundSize'],
				),
				' .aeopr-testimonial__wrap.aeopr-tm__bg-type-image .aeopr-tm__overlay' => array(
					'background-color' => $attr['backgroundImageColor'],
					'opacity'          => ( isset( $attr['backgroundOpacity'] ) && '' !== $attr['backgroundOpacity'] ) ? ( ( 100 - $attr['backgroundOpacity'] ) / 100 ) : '0.5',
				),
				' .aeopr-testimonial__wrap .aeopr-tm__content' => array(
					'border-color'  => $attr['borderColor'],
					'border-style'  => $attr['borderStyle'],
					'border-width'  => AEOPR_Helper::get_css_value( $attr['borderWidth'], 'px' ),
					'border-radius' => AEOPR_Helper::get_css_value( $attr['borderRadius'], 'px' ),
				),
				' ul.slick-dots li button:before' => array(
					'color' => $attr['arrowColor'],
				),
				' ul.slick-dots li.slick-active button:before' => array(
					'color' => $attr['arrowColor'],
				),
				' .aeopr-tm__image-position-top .aeopr-tm__image-content' => array(
					'justify-content' => $img_align,
				),
			);

			if ( 'dots' === $attr['arrowDots'] ) {
				$selectors['.aeopr-slick-carousel'] = array(
					'padding' => '0 0 35px 0',
				);
			}

			if ( '1' === $attr['test_item_count'] || $attr['test_item_count'] === $attr['columns'] ) {
				$selectors['.aeopr-slick-carousel'] = array(
					'padding' => 0,
				);
			}

			$m_selectors = array(
				' .aeopr-tm__content' => array(
					'text-align' => 'center',
				),
			);

			$combined_selectors = array(
				'desktop' => $selectors,
				'tablet'  => $t_selectors,
				'mobile'  => $m_selectors,
			);

			$combined_selectors = AEOPR_Helper::get_typography_css( $attr, 'name', '  .aeopr-tm__author-name', $combined_selectors );
			$combined_selectors = AEOPR_Helper::get_typography_css( $attr, 'company', ' .aeopr-tm__company', $combined_selectors );
			$combined_selectors = AEOPR_Helper::get_typography_css( $attr, 'desc', ' .aeopr-tm__desc', $combined_selectors );

			$base_selector = ( $attr['classMigrate'] ) ? '.aeopr-block-' : '#aeopr-testimonial-';

			return AEOPR_Helper::generate_all_css( $combined_selectors, $base_selector . $id );
		}

		/**
		 * Get Team Block CSS
		 *
		 * @since 0.0.1
		 * @param array  $attr The block attributes.
		 * @param string $id The selector ID.
		 * @return array The Widget List.
		 */
		public static function get_team_css( $attr, $id ) {

			$defaults = AEOPR_Helper::$block_list['aeopr/team']['attributes'];

			$attr = array_merge( $defaults, (array) $attr );

			$m_selectors = array();
			$t_selectors = array();

			$icon_size   = AEOPR_Helper::get_css_value( $attr['socialFontSize'], $attr['socialFontSizeType'] );
			$m_icon_size = AEOPR_Helper::get_css_value( $attr['socialFontSizeMobile'], $attr['socialFontSizeType'] );
			$t_icon_size = AEOPR_Helper::get_css_value( $attr['socialFontSizeTablet'], $attr['socialFontSizeType'] );

			$selectors = array(
				' p.aeopr-team__desc'                 => array(
					'color'         => $attr['descColor'],
					'margin-bottom' => AEOPR_Helper::get_css_value( $attr['descSpace'], 'px' ),
				),
				' .aeopr-team__prefix'                => array(
					'color' => $attr['prefixColor'],
				),
				' .aeopr-team__desc-wrap'             => array(
					'margin-top' => AEOPR_Helper::get_css_value( $attr['prefixSpace'], 'px' ),
				),
				' .aeopr-team__social-icon a'         => array(
					'color'       => $attr['socialColor'],
					'font-size'   => $icon_size,
					'width'       => $icon_size,
					'height'      => $icon_size,
					'line-height' => $icon_size,
				),
				' .aeopr-team__social-icon svg'       => array(
					'fill'   => $attr['socialColor'],
					'width'  => $icon_size,
					'height' => $icon_size,
				),
				' .aeopr-team__social-icon:hover a'   => array(
					'color' => $attr['socialHoverColor'],
				),
				' .aeopr-team__social-icon:hover svg' => array(
					'fill' => $attr['socialHoverColor'],
				),
				'.aeopr-team__image-position-left .aeopr-team__social-icon' => array(
					'margin-right' => AEOPR_Helper::get_css_value( $attr['socialSpace'], 'px' ),
					'margin-left'  => AEOPR_Helper::get_css_value( 0, 'px' ),
				),
				'.aeopr-team__image-position-right .aeopr-team__social-icon' => array(
					'margin-left'  => AEOPR_Helper::get_css_value( $attr['socialSpace'], 'px' ),
					'margin-right' => AEOPR_Helper::get_css_value( 0, 'px' ),
				),
				'.aeopr-team__image-position-above.aeopr-team__align-center .aeopr-team__social-icon' => array(
					'margin-right' => AEOPR_Helper::get_css_value( ( $attr['socialSpace'] / 2 ), 'px' ),
					'margin-left'  => AEOPR_Helper::get_css_value( ( $attr['socialSpace'] / 2 ), 'px' ),
				),
				'.aeopr-team__image-position-above.aeopr-team__align-left .aeopr-team__social-icon' => array(
					'margin-right' => AEOPR_Helper::get_css_value( $attr['socialSpace'], 'px' ),
					'margin-left'  => AEOPR_Helper::get_css_value( 0, 'px' ),
				),
				'.aeopr-team__image-position-above.aeopr-team__align-right .aeopr-team__social-icon' => array(
					'margin-left'  => AEOPR_Helper::get_css_value( $attr['socialSpace'], 'px' ),
					'margin-right' => AEOPR_Helper::get_css_value( 0, 'px' ),
				),
				' .aeopr-team__image-wrap'            => array(
					'margin-top'    => AEOPR_Helper::get_css_value( $attr['imgTopMargin'], 'px' ),
					'margin-bottom' => AEOPR_Helper::get_css_value( $attr['imgBottomMargin'], 'px' ),
					'margin-left'   => AEOPR_Helper::get_css_value( $attr['imgLeftMargin'], 'px' ),
					'margin-right'  => AEOPR_Helper::get_css_value( $attr['imgRightMargin'], 'px' ),
					'width'         => AEOPR_Helper::get_css_value( $attr['imgWidth'], 'px' ),
				),
			);

			if ( 'above' === $attr['imgPosition'] ) {
				if ( 'center' === $attr['align'] ) {
					$selectors[' .aeopr-team__image-wrap']['margin-left']  = 'auto';
					$selectors[' .aeopr-team__image-wrap']['margin-right'] = 'auto';
				} elseif ( 'left' === $attr['align'] ) {
					$selectors[' .aeopr-team__image-wrap']['margin-right'] = 'auto';
				} elseif ( 'right' === $attr['align'] ) {
					$selectors[' .aeopr-team__image-wrap']['margin-left'] = 'auto';
				}
			}

			if ( 'above' !== $attr['imgPosition'] && 'middle' === $attr['imgAlign'] ) {
				$selectors[' .aeopr-team__image-wrap']['align-self'] = 'center';
			}

			$selectors[ ' ' . $attr['tag'] . '.aeopr-team__title' ] = array(
				'color'         => $attr['titleColor'],
				'margin-bottom' => AEOPR_Helper::get_css_value( $attr['titleSpace'], 'px' ),
			);

			$m_selectors = array(
				' .aeopr-team__social-icon a'   => array(
					'font-size'   => $m_icon_size,
					'width'       => $m_icon_size,
					'height'      => $m_icon_size,
					'line-height' => $m_icon_size,
				),
				' .aeopr-team__social-icon svg' => array(
					'width'  => $m_icon_size,
					'height' => $m_icon_size,
				),
			);

			$t_selectors = array(
				' .aeopr-team__social-icon a'   => array(
					'font-size'   => $t_icon_size,
					'width'       => $t_icon_size,
					'height'      => $t_icon_size,
					'line-height' => $t_icon_size,
				),
				' .aeopr-team__social-icon svg' => array(
					'width'  => $t_icon_size,
					'height' => $t_icon_size,
				),
			);

			$combined_selectors = array(
				'desktop' => $selectors,
				'tablet'  => $t_selectors,
				'mobile'  => $m_selectors,
			);

			$combined_selectors = AEOPR_Helper::get_typography_css( $attr, 'title', ' ' . $attr['tag'] . '.aeopr-team__title', $combined_selectors );
			$combined_selectors = AEOPR_Helper::get_typography_css( $attr, 'prefix', ' .aeopr-team__prefix', $combined_selectors );
			$combined_selectors = AEOPR_Helper::get_typography_css( $attr, 'desc', ' p.aeopr-team__desc', $combined_selectors );

			$base_selector = ( $attr['classMigrate'] ) ? '.aeopr-block-' : '#aeopr-team-';

			return AEOPR_Helper::generate_all_css( $combined_selectors, $base_selector . $id );
		}

		/**
		 * Get Social Share Block CSS
		 *
		 * @since 0.0.1
		 * @param array  $attr The block attributes.
		 * @param string $id The selector ID.
		 * @return array The Widget List.
		 */
		public static function get_social_share_css( $attr, $id ) {

			$defaults = AEOPR_Helper::$block_list['aeopr/social-share']['attributes'];

			$attr = array_merge( $defaults, (array) $attr );

			$alignment = ( 'left' === $attr['align'] ) ? 'flex-start' : ( ( 'right' === $attr['align'] ) ? 'flex-end' : 'center' );

			$m_selectors = array();
			$t_selectors = array();

			$image_size   = AEOPR_Helper::get_css_value( $attr['size'], $attr['sizeType'] );
			$m_image_size = AEOPR_Helper::get_css_value( $attr['sizeMobile'], $attr['sizeType'] );
			$t_image_size = AEOPR_Helper::get_css_value( $attr['sizeTablet'], $attr['sizeType'] );

			$selectors[' .aeopr-social-share__wrap .block-editor-inner-blocks'] = array(
				'text-align' => AEOPR_Helper::get_css_value( $attr['align'] ),
			);

			$selectors['.aeopr-social-share__layout-vertical .aeopr-ss__wrapper'] = array(
				'padding'       => AEOPR_Helper::get_css_value( $attr['bgSize'], 'px' ),
				'margin-left'   => 0,
				'margin-right'  => 0,
				'margin-bottom' => AEOPR_Helper::get_css_value( $attr['gap'], 'px' ),
			);

			$selectors['.aeopr-social-share__layout-horizontal .aeopr-ss__wrapper'] = array(
				'padding'      => AEOPR_Helper::get_css_value( $attr['bgSize'], 'px' ),
				'margin-left'  => AEOPR_Helper::get_css_value( ( $attr['gap'] / 2 ), 'px' ),
				'margin-right' => AEOPR_Helper::get_css_value( ( $attr['gap'] / 2 ), 'px' ),
			);

			$selectors[' .aeopr-ss__wrapper'] = array(
				'border-radius' => AEOPR_Helper::get_css_value( $attr['borderRadius'], 'px' ),
			);

			$selectors[' .aeopr-ss__source-wrap'] = array(
				'width' => $image_size,
			);

			$selectors[' .aeopr-ss__source-wrap svg'] = array(
				'width'  => $image_size,
				'height' => $image_size,
			);

			$selectors[' .aeopr-ss__source-image'] = array(
				'width' => $image_size,
			);

			$selectors[' .aeopr-ss__source-icon'] = array(
				'width'       => $image_size,
				'height'      => $image_size,
				'font-size'   => $image_size,
				'line-height' => $image_size,
			);

			$t_selectors[' .aeopr-ss__source-wrap'] = array(
				'width'       => $t_image_size,
				'height'      => $t_image_size,
				'line-height' => $t_image_size,
			);

			$t_selectors[' .aeopr-ss__source-wrap svg'] = array(
				'width'  => $t_image_size,
				'height' => $t_image_size,
			);

			$t_selectors[' .aeopr-ss__source-image'] = array(
				'width' => $t_image_size,
			);

			$t_selectors[' .aeopr-ss__source-icon'] = array(
				'width'       => $t_image_size,
				'height'      => $t_image_size,
				'font-size'   => $t_image_size,
				'line-height' => $t_image_size,
			);

			$m_selectors[' .aeopr-ss__source-wrap'] = array(
				'width'       => $m_image_size,
				'height'      => $m_image_size,
				'line-height' => $m_image_size,
			);

			$m_selectors[' .aeopr-ss__source-wrap svg'] = array(
				'width'  => $m_image_size,
				'height' => $m_image_size,
			);

			$m_selectors[' .aeopr-ss__source-image'] = array(
				'width' => $m_image_size,
			);

			$m_selectors[' .aeopr-ss__source-icon']                                  = array(
				'width'       => $m_image_size,
				'height'      => $m_image_size,
				'font-size'   => $m_image_size,
				'line-height' => $m_image_size,
			);
			$m_selectors['.aeopr-social-share__layout-horizontal .aeopr-ss__wrapper'] = array(
				'margin-left'  => 0,
				'margin-right' => 0,
			);

			$selectors[' .aeopr-social-share__wrap'] = array(
				'justify-content'   => $alignment,
				'-webkit-box-pack'  => $alignment,
				'-ms-flex-pack'     => $alignment,
				'justify-content'   => $alignment,
				'-webkit-box-align' => $alignment,
				'-ms-flex-align'    => $alignment,
				'align-items'       => $alignment,
			);

			if ( ! $attr['childMigrate'] ) {

				foreach ( $attr['socials'] as $key => $socials ) {

					$socials['icon_color']          = ( isset( $socials['icon_color'] ) ) ? $socials['icon_color'] : '';
					$socials['icon_hover_color']    = ( isset( $socials['icon_hover_color'] ) ) ? $socials['icon_hover_color'] : '';
					$socials['icon_bg_color']       = ( isset( $socials['icon_bg_color'] ) ) ? $socials['icon_bg_color'] : '';
					$socials['icon_bg_hover_color'] = ( isset( $socials['icon_bg_hover_color'] ) ) ? $socials['icon_bg_hover_color'] : '';

					if ( $attr['social_count'] <= $key ) {
						break;
					}

					$child_selectors = self::get_social_share_child_selectors( $socials, $key, $attr['childMigrate'] );
					$selectors       = array_merge( $selectors, (array) $child_selectors );
				}
			}

			if ( 'horizontal' === $attr['social_layout'] ) {

				if ( 'desktop' === $attr['stack'] ) {

					$selectors[' .aeopr-ss__wrapper'] = array(
						'margin-left'   => 0,
						'margin-right'  => 0,
						'margin-bottom' => AEOPR_Helper::get_css_value( $attr['gap'], 'px' ),
					);

					$selectors[' .aeopr-social-share__wrap'] = array(
						'flex-direction'    => 'column',
						'justify-content'   => $alignment,
						'-webkit-box-pack'  => $alignment,
						'-ms-flex-pack'     => $alignment,
						'justify-content'   => $alignment,
						'-webkit-box-align' => $alignment,
						'-ms-flex-align'    => $alignment,
						'align-items'       => $alignment,
					);

				} elseif ( 'tablet' === $attr['stack'] ) {

					$t_selectors[' .aeopr-ss__wrapper'] = array(
						'margin-left'   => 0,
						'margin-right'  => 0,
						'margin-bottom' => AEOPR_Helper::get_css_value( $attr['gap'], 'px' ),
					);

					$t_selectors[' .aeopr-social-share__wrap'] = array(
						'flex-direction'    => 'column',
						'justify-content'   => $alignment,
						'-webkit-box-pack'  => $alignment,
						'-ms-flex-pack'     => $alignment,
						'justify-content'   => $alignment,
						'-webkit-box-align' => $alignment,
						'-ms-flex-align'    => $alignment,
						'align-items'       => $alignment,
					);

				} elseif ( 'mobile' === $attr['stack'] ) {

					$m_selectors[' .aeopr-ss__wrapper'] = array(
						'margin-left'   => 0,
						'margin-right'  => 0,
						'margin-bottom' => AEOPR_Helper::get_css_value( $attr['gap'], 'px' ),
					);

					$m_selectors[' .aeopr-social-share__wrap'] = array(
						'flex-direction'    => 'column',
						'justify-content'   => $alignment,
						'-webkit-box-pack'  => $alignment,
						'-ms-flex-pack'     => $alignment,
						'justify-content'   => $alignment,
						'-webkit-box-align' => $alignment,
						'-ms-flex-align'    => $alignment,
						'align-items'       => $alignment,
					);
				}
			}

			$combined_selectors = array(
				'desktop' => $selectors,
				'tablet'  => $t_selectors,
				'mobile'  => $m_selectors,
			);

			$base_selector = ( $attr['classMigrate'] ) ? '.aeopr-block-' : '#aeopr-social-share-';

			return AEOPR_Helper::generate_all_css( $combined_selectors, $base_selector . $id );
		}

		/**
		 * Get social share Block CSS
		 *
		 * @since 1.14.9
		 * @param array  $attr The block attributes.
		 * @param string $id The selector ID.
		 * @return array The Widget List.
		 */
		public static function get_social_share_child_css( $attr, $id ) {

			$defaults = AEOPR_Helper::$block_list['aeopr/social-share-child']['attributes'];

			$attr = array_merge( $defaults, (array) $attr );

			$selectors = self::get_social_share_child_selectors( $attr, $id, true );

			$desktop = AEOPR_Helper::generate_css( $selectors, '.aeopr-block-' . $id );

			$generated_css = array(
				'desktop' => $desktop,
				'tablet'  => '',
				'mobile'  => '',
			);

			return $generated_css;
		}

		/**
		 * Get Social share Block CSS
		 *
		 * @since 1.14.9
		 * @param array  $attr The block attributes.
		 * @param string $id The key for the Icon List Item.
		 * @param string $childMigrate The child migration flag.
		 * @return array The Widget List.
		 */
		public static function get_social_share_child_selectors( $attr, $id, $childMigrate ) {

			$wrapper = ( ! $childMigrate ) ? ' .aeopr-ss-repeater-' . $id : '.aeopr-ss-repeater';

			$selectors[ $wrapper . ' a.aeopr-ss__link' ]           = array(
				'color' => $attr['icon_color'],
			);
			$selectors[ $wrapper . ' a.aeopr-ss__link' ]           = array(
				'color' => $attr['icon_color'],
			);
			$selectors[ $wrapper . ' a.aeopr-ss__link svg' ]       = array(
				'fill' => $attr['icon_color'],
			);
			$selectors[ $wrapper . ':hover a.aeopr-ss__link' ]     = array(
				'color' => $attr['icon_hover_color'],
			);
			$selectors[ $wrapper . ':hover a.aeopr-ss__link svg' ] = array(
				'fill' => $attr['icon_hover_color'],
			);

			$selectors[ $wrapper . '.aeopr-ss__wrapper' ]       = array(
				'background' => $attr['icon_bg_color'],
			);
			$selectors[ $wrapper . '.aeopr-ss__wrapper:hover' ] = array(
				'background' => $attr['icon_bg_hover_color'],
			);

			return $selectors;
		}


		/**
		 * Get Icon List Block CSS
		 *
		 * @since 0.0.1
		 * @param array  $attr The block attributes.
		 * @param string $id The selector ID.
		 * @return array The Widget List.
		 */
		public static function get_icon_list_css( $attr, $id ) {

			$defaults = AEOPR_Helper::$block_list['aeopr/icon-list']['attributes'];

			$attr = array_merge( $defaults, (array) $attr );

			$alignment = ( 'left' === $attr['align'] ) ? 'flex-start' : ( ( 'right' === $attr['align'] ) ? 'flex-end' : 'center' );

			$m_selectors = array();
			$t_selectors = array();

			$icon_size   = AEOPR_Helper::get_css_value( $attr['size'], $attr['sizeType'] );
			$m_icon_size = AEOPR_Helper::get_css_value( $attr['sizeMobile'], $attr['sizeType'] );
			$t_icon_size = AEOPR_Helper::get_css_value( $attr['size'], $attr['sizeType'] );

			$selectors = array(
				'.aeopr-icon-list__layout-vertical .aeopr-icon-list__wrapper' => array(
					'margin-left'   => 0,
					'margin-right'  => 0,
					'margin-bottom' => AEOPR_Helper::get_css_value( $attr['gap'], 'px' ),
				),
				'.aeopr-icon-list__layout-vertical .aeopr-icon-list__wrap' => array(
					'flex-direction' => 'column',
				),
				'.aeopr-icon-list__layout-vertical .aeopr-icon-list__wrapper:last-child' => array(
					'margin-bottom' => 0,
				),
				'.aeopr-icon-list__layout-horizontal .aeopr-icon-list__wrapper' => array(
					'margin-left'  => AEOPR_Helper::get_css_value( ( $attr['gap'] / 2 ), 'px' ),
					'margin-right' => AEOPR_Helper::get_css_value( ( $attr['gap'] / 2 ), 'px' ),
				),
				'.aeopr-icon-list__layout-horizontal .aeopr-icon-list__wrapper:first-child' => array(
					'margin-left' => 0,
				),
				'.aeopr-icon-list__layout-horizontal .aeopr-icon-list__wrapper:last-child' => array(
					'margin-right' => 0,
				),
				// Desktop Icon Size CSS starts.
				' .aeopr-icon-list__source-image'       => array(
					'width' => $icon_size,
				),
				' .aeopr-icon-list__source-icon'        => array(
					'width'     => $icon_size,
					'height'    => $icon_size,
					'font-size' => $icon_size,
				),
				' .aeopr-icon-list__source-icon svg'    => array(
					'width'  => $icon_size,
					'height' => $icon_size,
				),
				' .aeopr-icon-list__source-icon:before' => array(
					'width'     => $icon_size,
					'height'    => $icon_size,
					'font-size' => $icon_size,
				),
				' .aeopr-icon-list__label-wrap'         => array(
					'text-align' => $attr['align'],
				),

				' .aeopr-icon-list__source-wrap'        => array(
					'padding'       => AEOPR_Helper::get_css_value( $attr['bgSize'], 'px' ),
					'border-radius' => AEOPR_Helper::get_css_value( $attr['borderRadius'], 'px' ),
					'border-style'  => ( $attr['border'] > 0 ) ? 'solid' : '',
					'border-width'  => AEOPR_Helper::get_css_value( $attr['border'], 'px' ),
				),
				' .aeopr-icon-list__wrap'               => array(
					'justify-content'   => $alignment,
					'-webkit-box-pack'  => $alignment,
					'-ms-flex-pack'     => $alignment,
					'justify-content'   => $alignment,
					'-webkit-box-align' => $alignment,
					'-ms-flex-align'    => $alignment,
					'align-items'       => $alignment,
				),
			);

			if ( $attr['childMigrate'] ) {
				$selectors[' .aeopr-icon-list-repeater'] = array(
					'font-family' => $attr['fontFamily'],
					'font-weight' => $attr['fontWeight'],
					'font-size'   => AEOPR_Helper::get_css_value( $attr['fontSize'], $attr['sizeType'] ),
					'line-height' => $attr['lineHeight'] . $attr['lineHeightType'],
				);
			}

			if ( 'right' === $attr['align'] ) {
				$selectors[':not(.aeopr-icon-list__no-label) .aeopr-icon-list__source-wrap'] = array(
					'margin-left' => AEOPR_Helper::get_css_value( $attr['inner_gap'], 'px' ),
				);
				$selectors[' .aeopr-icon-list__content-wrap']                               = array(
					'flex-direction' => 'row-reverse',
				);
			} else {
				$selectors[':not(.aeopr-icon-list__no-label) .aeopr-icon-list__source-wrap'] = array(
					'margin-right' => AEOPR_Helper::get_css_value( $attr['inner_gap'], 'px' ),
				);
			}
			// Desktop Icon Size CSS ends.
			// Mobile Icon Size CSS starts.
			$m_selectors = array(
				' .aeopr-icon-list__source-image'       => array(
					'width' => $m_icon_size,
				),
				' .aeopr-icon-list__source-icon'        => array(
					'width'     => $m_icon_size,
					'height'    => $m_icon_size,
					'font-size' => $m_icon_size,
				),
				' .aeopr-icon-list__source-icon svg'    => array(
					'width'  => $m_icon_size,
					'height' => $m_icon_size,
				),
				' .aeopr-icon-list__source-icon:before' => array(
					'width'     => $m_icon_size,
					'height'    => $m_icon_size,
					'font-size' => $m_icon_size,
				),
			);
			// Mobile Icon Size CSS ends.
			// Tablet Icon Size CSS starts.
			$t_selectors = array(
				' .aeopr-icon-list__source-image'       => array(
					'width' => $t_icon_size,
				),
				' .aeopr-icon-list__source-icon'        => array(
					'width'     => $t_icon_size,
					'height'    => $t_icon_size,
					'font-size' => $t_icon_size,
				),
				' .aeopr-icon-list__source-icon svg'    => array(
					'width'  => $t_icon_size,
					'height' => $t_icon_size,
				),
				' .aeopr-icon-list__source-icon:before' => array(
					'width'     => $t_icon_size,
					'height'    => $t_icon_size,
					'font-size' => $t_icon_size,
				),
			);
			// Tablet Icon Size CSS ends.
			$selectors[' .aeopr-icon-list-repeater .aeopr-icon-list__label'] = array(
				'font-size'   => AEOPR_Helper::get_css_value( $attr['fontSize'], $attr['fontSizeType'] ),
				'font-family' => $attr['fontFamily'],
				'font-weight' => $attr['fontWeight'],
				'line-height' => $attr['lineHeight'] . $attr['lineHeightType'],
			);

			$m_selectors[' .aeopr-icon-list-repeater .aeopr-icon-list__label'] = array(
				'font-size'   => AEOPR_Helper::get_css_value( $attr['fontSizeMobile'], $attr['fontSizeType'] ),
				'line-height' => AEOPR_Helper::get_css_value( $attr['lineHeightMobile'], $attr['lineHeightType'] ),
			);

			$t_selectors[' .aeopr-icon-list-repeater .aeopr-icon-list__label'] = array(
				'font-size'   => AEOPR_Helper::get_css_value( $attr['fontSizeTablet'], $attr['fontSizeType'] ),
				'line-height' => AEOPR_Helper::get_css_value( $attr['lineHeightTablet'], $attr['lineHeightType'] ),
			);

			if ( 'horizontal' === $attr['icon_layout'] ) {

				if ( 'tablet' === $attr['stack'] ) {

					$t_selectors[' .aeopr-icon-list__wrap .aeopr-icon-list__wrapper'] = array(
						'margin-left'   => 0,
						'margin-right'  => 0,
						'margin-bottom' => AEOPR_Helper::get_css_value( $attr['gap'], 'px' ),
					);

					$t_selectors[' .aeopr-icon-list__wrap'] = array(
						'flex-direction' => 'column',
					);

					$t_selectors[' .aeopr-icon-list__wrap .aeopr-icon-list__wrapper:last-child'] = array(
						'margin-bottom' => 0,
					);

				} elseif ( 'mobile' === $attr['stack'] ) {

					$m_selectors[' .aeopr-icon-list__wrap .aeopr-icon-list__wrapper'] = array(
						'margin-left'   => 0,
						'margin-right'  => 0,
						'margin-bottom' => AEOPR_Helper::get_css_value( $attr['gap'], 'px' ),
					);

					$m_selectors[' .aeopr-icon-list__wrap'] = array(
						'flex-direction' => 'column',
					);

					$m_selectors[' .aeopr-icon-list__wrap .aeopr-icon-list__wrapper:last-child'] = array(
						'margin-bottom' => 0,
					);
				}
			}
			if ( ! $attr['childMigrate'] ) {

				foreach ( $attr['icons'] as $key => $icon ) {

					$wrapper = ( ! $attr['childMigrate'] ) ? ' .aeopr-icon-list-repeater-' . $key . '.aeopr-icon-list__wrapper' : ' .aeopr-icon-list-repeater';

					$selectors[ $wrapper ]                                     = array(
						'font-family' => $attr['fontFamily'],
						'font-weight' => $attr['fontWeight'],
						'font-size'   => AEOPR_Helper::get_css_value( $attr['fontSize'], $attr['sizeType'] ),
						'line-height' => $attr['lineHeight'] . $attr['lineHeightType'],
					);
					$m_selectors_child[ $wrapper . ' .aeopr-icon-list__label' ] = array(
						'font-family' => $attr['fontFamily'],
						'font-weight' => $attr['fontWeight'],
						'font-size'   => AEOPR_Helper::get_css_value( $attr['fontSizeMobile'], $attr['sizeType'] ),
						'line-height' => $attr['lineHeightMobile'] . $attr['lineHeightType'],
					);
					$t_selectors_child[ $wrapper . ' .aeopr-icon-list__label' ] = array(
						'font-family' => $attr['fontFamily'],
						'font-weight' => $attr['fontWeight'],
						'font-size'   => AEOPR_Helper::get_css_value( $attr['fontSizeTablet'], $attr['sizeType'] ),
						'line-height' => $attr['lineHeightTablet'] . $attr['lineHeightType'],
					);

					$icon['icon_color']              = ( isset( $icon['icon_color'] ) ) ? $icon['icon_color'] : '';
					$icon['icon_hover_color']        = ( isset( $icon['icon_hover_color'] ) ) ? $icon['icon_hover_color'] : '';
					$icon['icon_bg_color']           = ( isset( $icon['icon_bg_color'] ) ) ? $icon['icon_bg_color'] : '';
					$icon['icon_bg_hover_color']     = ( isset( $icon['icon_bg_hover_color'] ) ) ? $icon['icon_bg_hover_color'] : '';
					$icon['icon_border_color']       = ( isset( $icon['icon_border_color'] ) ) ? $icon['icon_border_color'] : '';
					$icon['icon_border_hover_color'] = ( isset( $icon['icon_border_hover_color'] ) ) ? $icon['icon_border_hover_color'] : '';
					$icon['label_color']             = ( isset( $icon['label_color'] ) ) ? $icon['label_color'] : '';
					$icon['label_hover_color']       = ( isset( $icon['label_hover_color'] ) ) ? $icon['label_hover_color'] : '';

					if ( $attr['icon_count'] <= $key ) {
						break;
					}

					$child_selectors = self::get_icon_list_child_selectors( $icon, $key, $attr['childMigrate'] );
					$selectors       = array_merge( $selectors, (array) $child_selectors );
					$t_selectors     = array_merge( $t_selectors, (array) $t_selectors_child );
					$m_selectors     = array_merge( $m_selectors, (array) $m_selectors_child );
				}
			}

			$combined_selectors = array(
				'desktop' => $selectors,
				'tablet'  => $t_selectors,
				'mobile'  => $m_selectors,
			);

			$base_selector = ( $attr['classMigrate'] ) ? '.aeopr-block-' : '#aeopr-icon-list-';

			return AEOPR_Helper::generate_all_css( $combined_selectors, $base_selector . $id );
		}

		/**
		 * Get Icon List Block CSS
		 *
		 * @since 1.14.9
		 * @param array  $attr The block attributes.
		 * @param string $id The selector ID.
		 * @return array The Widget List.
		 */
		public static function get_icon_list_child_css( $attr, $id ) {

			$defaults = AEOPR_Helper::$block_list['aeopr/icon-list-child']['attributes'];

			$attr = array_merge( $defaults, (array) $attr );

			$selectors = self::get_icon_list_child_selectors( $attr, $id, true );

			$desktop = AEOPR_Helper::generate_css( $selectors, '.aeopr-block-' . $id );

			$generated_css = array(
				'desktop' => $desktop,
				'tablet'  => '',
				'mobile'  => '',
			);

			return $generated_css;
		}

		/**
		 * Get Icon List Block CSS
		 *
		 * @since 1.14.9
		 * @param array  $attr The block attributes.
		 * @param string $id The key for the Icon List Item.
		 * @param string $childMigrate The child migration flag.
		 * @return array The Widget List.
		 */
		public static function get_icon_list_child_selectors( $attr, $id, $childMigrate ) {

			$wrapper = ( ! $childMigrate ) ? ' .aeopr-icon-list-repeater-' . $id : '.aeopr-icon-list-repeater';

			$selectors[ $wrapper . ' .aeopr-icon-list__source-icon' ]           = array(
				'color' => $attr['icon_color'],
			);
			$selectors[ $wrapper . ' .aeopr-icon-list__source-icon' ]           = array(
				'color' => $attr['icon_color'],
			);
			$selectors[ $wrapper . ' .aeopr-icon-list__source-icon svg' ]       = array(
				'fill' => $attr['icon_color'],
			);
			$selectors[ $wrapper . ':hover .aeopr-icon-list__source-icon' ]     = array(
				'color' => $attr['icon_hover_color'],
			);
			$selectors[ $wrapper . ':hover .aeopr-icon-list__source-icon svg' ] = array(
				'fill' => $attr['icon_hover_color'],
			);
			$selectors[ $wrapper . ' .aeopr-icon-list__label' ]                 = array(
				'color' => $attr['label_color'],
			);
			$selectors[ $wrapper . ':hover .aeopr-icon-list__label' ]           = array(
				'color' => $attr['label_hover_color'],
			);
			$selectors[ $wrapper . ' .aeopr-icon-list__source-wrap' ]           = array(
				'background'   => $attr['icon_bg_color'],
				'border-color' => $attr['icon_border_color'],
			);
			$selectors[ $wrapper . ':hover .aeopr-icon-list__source-wrap' ]     = array(
				'background'   => $attr['icon_bg_hover_color'],
				'border-color' => $attr['icon_border_hover_color'],
			);

			return $selectors;
		}

		/**
		 * Get Content Timeline Block CSS
		 *
		 * @since 0.0.1
		 * @param array  $attr The block attributes.
		 * @param string $id The selector ID.
		 * @return array The Widget List.
		 */
		public static function get_content_timeline_css( $attr, $id ) {

			$defaults = AEOPR_Helper::$block_list['aeopr/content-timeline']['attributes'];

			$attr = array_merge( $defaults, (array) $attr );

			$selectors   = array();
			$t_selectors = array();
			$m_selectors = array();

			$selectors = array(
				' .aeopr-timeline__heading'      => array(
					'text-align'  => $attr['align'],
					'color'       => $attr['headingColor'],
					'font-size'   => AEOPR_Helper::get_css_value( $attr['headFontSize'], $attr['headFontSizeType'] ),
					'font-family' => $attr['headFontFamily'],
					'font-weight' => $attr['headFontWeight'],
					'line-height' => AEOPR_Helper::get_css_value( $attr['headLineHeight'], $attr['headLineHeightType'] ),
				),
				' .aeopr-timeline__heading-text' => array(
					'margin-bottom' => AEOPR_Helper::get_css_value( $attr['headSpace'], 'px' ),
				),
				' .aeopr-timeline__main .aeopr-timeline__marker.aeopr-timeline__in-view-icon .aeopr-timeline__icon-new' => array(
					'color' => $attr['iconFocus'],
				),
			);

			$desktop_selectors = self::get_timeline_selectors( $attr );
			$selectors         = array_merge( $selectors, $desktop_selectors );

			$tablet_selectors = self::get_timeline_tablet_selectors( $attr );
			$t_selectors      = array(
				' .aeopr-timeline__date-hide.aeopr-timeline__date-inner' => array(
					'font-size'   => AEOPR_Helper::get_css_value( $attr['dateFontsizeTablet'], $attr['dateFontsizeType'] ),
					'line-height' => AEOPR_Helper::get_css_value( $attr['dateLineHeightTablet'], $attr['dateLineHeightType'] ),
				),
				' .aeopr-timeline__date-new'    => array(
					'font-size'   => AEOPR_Helper::get_css_value( $attr['dateFontsizeTablet'], $attr['dateFontsizeType'] ),
					'line-height' => AEOPR_Helper::get_css_value( $attr['dateLineHeightTablet'], $attr['dateLineHeightType'] ),
				),
				' .aeopr-timeline__heading'     => array(
					'font-size'   => AEOPR_Helper::get_css_value( $attr['headFontSizeTablet'], $attr['headFontSizeType'] ),
					'line-height' => AEOPR_Helper::get_css_value( $attr['headLineHeightTablet'], $attr['headLineHeightType'] ),
				),
				' .aeopr-timeline-desc-content' => array(
					'font-size'   => AEOPR_Helper::get_css_value( $attr['subHeadFontSizeTablet'], $attr['subHeadFontSizeType'] ),
					'line-height' => AEOPR_Helper::get_css_value( $attr['subHeadLineHeightTablet'], $attr['subHeadLineHeightType'] ),
				),
			);
			$t_selectors      = array_merge( $t_selectors, $tablet_selectors );

			$mobile_selectors = self::get_timeline_mobile_selectors( $attr );
			$m_selectors      = array(
				' .aeopr-timeline__date-hide.aeopr-timeline__date-inner' => array(
					'font-size'   => AEOPR_Helper::get_css_value( $attr['dateFontsizeMobile'], $attr['dateFontsizeType'] ),
					'line-height' => AEOPR_Helper::get_css_value( $attr['dateLineHeightMobile'], $attr['dateLineHeightType'] ),
				),
				' .aeopr-timeline__date-new'    => array(
					'font-size'   => AEOPR_Helper::get_css_value( $attr['dateFontsizeMobile'], $attr['dateFontsizeType'] ),
					'line-height' => AEOPR_Helper::get_css_value( $attr['dateLineHeightMobile'], $attr['dateLineHeightType'] ),
				),
				' .aeopr-timeline__heading'     => array(
					'font-size'   => AEOPR_Helper::get_css_value( $attr['headFontSizeMobile'], $attr['headFontSizeType'] ),
					'line-height' => AEOPR_Helper::get_css_value( $attr['headLineHeightMobile'], $attr['headLineHeightType'] ),
				),
				' .aeopr-timeline-desc-content' => array(
					'font-size'   => AEOPR_Helper::get_css_value( $attr['subHeadFontSizeMobile'], $attr['subHeadFontSizeType'] ),
					'line-height' => AEOPR_Helper::get_css_value( $attr['subHeadLineHeightMobile'], $attr['subHeadLineHeightType'] ),
				),
			);
			$m_selectors      = array_merge( $m_selectors, $mobile_selectors );

			$combined_selectors = array(
				'desktop' => $selectors,
				'tablet'  => $t_selectors,
				'mobile'  => $m_selectors,
			);

			$base_selector = ( $attr['classMigrate'] ) ? '.aeopr-block-' : '#aeopr-ctm-';

			return AEOPR_Helper::generate_all_css( $combined_selectors, $base_selector . $id );
		}

		/**
		 * Get Content Timeline Block CSS
		 *
		 * @since 0.0.1
		 * @param array  $attr The block attributes.
		 * @param string $id The selector ID.
		 * @return array The Widget List.
		 */
		public static function get_post_timeline_css( $attr, $id ) {

			$defaults = AEOPR_Helper::$block_list['aeopr/post-timeline']['attributes'];

			$attr        = array_merge( $defaults, (array) $attr );
			$t_selectors = array();

			$selectors = array(
				' .aeopr-timeline__heading'      => array(
					'text-align' => $attr['align'],
				),
				' .aeopr-timeline__author'       => array(
					'text-align'    => $attr['align'],
					'margin-bottom' => AEOPR_Helper::get_css_value( $attr['authorSpace'], 'px' ),
				),
				' .aeopr-timeline__link_parent'  => array(
					'text-align' => $attr['align'],
				),
				' .aeopr-timeline__image a'      => array(
					'text-align' => $attr['align'],
				),
				' .aeopr-timeline__author-link'  => array(
					'color' => $attr['authorColor'],
				),
				' .dashicons-admin-users'       => array(
					'color'       => $attr['authorColor'],
					'font-size'   => AEOPR_Helper::get_css_value( $attr['authorFontSize'], $attr['authorFontSizeType'] ),
					'font-weight' => $attr['authorFontWeight'],
					'line-height' => AEOPR_Helper::get_css_value( $attr['authorLineHeight'], $attr['authorLineHeightType'] ),
				),
				' .aeopr-timeline__link'         => array(
					'color'            => $attr['ctaColor'],
					'background-color' => $attr['ctaBackground'],
				),
				' .aeopr-timeline__heading a'    => array(
					'text-align' => $attr['align'],
					'color'      => $attr['headingColor'],
				),
				' .aeopr-timeline__heading-text' => array(
					'margin-bottom' => AEOPR_Helper::get_css_value( $attr['headSpace'], 'px' ),
				),
				' .aeopr_timeline__cta-enable .aeopr-timeline-desc-content' => array(
					'margin-bottom' => AEOPR_Helper::get_css_value( $attr['contentSpace'], 'px' ),
				),
				' .aeopr-content'                => array(
					'padding' => AEOPR_Helper::get_css_value( $attr['contentPadding'], 'px' ),
				),
			);

			$desktop_selectors = self::get_timeline_selectors( $attr );
			$selectors         = array_merge( $selectors, $desktop_selectors );

			$t_selectors = array(
				' .dashicons-admin-users' => array(
					'font-size'   => AEOPR_Helper::get_css_value( $attr['authorFontSizeTablet'], $attr['authorFontSizeType'] ),
					'line-height' => AEOPR_Helper::get_css_value( $attr['authorLineHeightTablet'], $attr['authorLineHeightType'] ),
				),
				' .aeopr-timeline__center-block.aeopr-timeline__responsive-tablet .aeopr-timeline__author' => array(
					'text-align' => 'left',
				),
				' .aeopr-timeline__center-block.aeopr-timeline__responsive-tablet .aeopr-timeline__link_parent' => array(
					'text-align' => 'left',
				),
				' .aeopr-timeline__center-block.aeopr-timeline__responsive-tablet .aeopr-timeline__image a' => array(
					'text-align' => 'left',
				),
			);

			$tablet_selectors = self::get_timeline_tablet_selectors( $attr );
			$t_selectors      = array_merge( $t_selectors, $tablet_selectors );

			// Mobile responsive CSS.
			$m_selectors = array(
				' .dashicons-admin-users'  => array(
					'font-size'   => AEOPR_Helper::get_css_value( $attr['authorFontSizeMobile'], $attr['authorFontSizeType'] ),
					'line-height' => AEOPR_Helper::get_css_value( $attr['authorLineHeightMobile'], $attr['authorLineHeightType'] ),
				),
				' .aeopr-timeline__heading' => array(
					'text-align' => $attr['align'],
				),
				' .aeopr-timeline__center-block.aeopr-timeline__responsive-tablet .aeopr-timeline__author' => array(
					'text-align' => 'left',
				),
				' .aeopr-timeline__center-block.aeopr-timeline__responsive-tablet .aeopr-timeline__link_parent' => array(
					'text-align' => 'left',
				),
				' .aeopr-timeline__center-block.aeopr-timeline__responsive-mobile .aeopr-timeline__image a' => array(
					'text-align' => 'left',
				),
			);

			$mobile_selectors = self::get_timeline_mobile_selectors( $attr );
			$m_selectors      = array_merge( $m_selectors, $mobile_selectors );

			$combined_selectors = array(
				'desktop' => $selectors,
				'tablet'  => $t_selectors,
				'mobile'  => $m_selectors,
			);

			$combined_selectors = AEOPR_Helper::get_typography_css( $attr, 'date', ' .aeopr-timeline__date-hide.aeopr-timeline__date-inner', $combined_selectors );
			$combined_selectors = AEOPR_Helper::get_typography_css( $attr, 'date', ' .aeopr-timeline__date-new', $combined_selectors );
			$combined_selectors = AEOPR_Helper::get_typography_css( $attr, 'subHead', ' .aeopr-timeline-desc-content', $combined_selectors );
			$combined_selectors = AEOPR_Helper::get_typography_css( $attr, 'author', ' .aeopr-timeline__author-link', $combined_selectors );
			$combined_selectors = AEOPR_Helper::get_typography_css( $attr, 'cta', ' .aeopr-timeline__link', $combined_selectors );
			$combined_selectors = AEOPR_Helper::get_typography_css( $attr, 'head', ' .aeopr-timeline__heading a', $combined_selectors );

			return AEOPR_Helper::generate_all_css( $combined_selectors, '.aeopr-block-' . $id );
		}

		/**
		 * Get Restaurant Menu Block CSS
		 *
		 * @since 1.0.2
		 * @param array  $attr The block attributes.
		 * @param string $id The selector ID.
		 * @return array The Widget List.
		 */
		public static function get_restaurant_menu_css( $attr, $id ) {

			$defaults = AEOPR_Helper::$block_list['aeopr/restaurant-menu']['attributes'];

			$attr = array_merge( $defaults, (array) $attr );

			$m_selectors = array();
			$t_selectors = array();

			$align = $attr['headingAlign'];
			if ( 'left' === $align ) {
				$align = 'flex-start';
			} elseif ( 'right' === $align ) {
				$align = 'flex-end';
			}

			$selectors = array(
				' .aeopr-rest_menu__wrap'      => array(
					'padding-left'  => AEOPR_Helper::get_css_value( ( $attr['columnGap'] / 2 ), 'px' ),
					'padding-right' => AEOPR_Helper::get_css_value( ( $attr['columnGap'] / 2 ), 'px' ),
					'margin-bottom' => AEOPR_Helper::get_css_value( $attr['rowGap'], 'px' ),
				),
				' .aeopr-rest_menu__wrap .aeopr-rm__image-content' => array(
					'padding-left'   => AEOPR_Helper::get_css_value( $attr['imgHrPadding'], 'px' ),
					'padding-right'  => AEOPR_Helper::get_css_value( $attr['imgHrPadding'], 'px' ),
					'padding-top'    => AEOPR_Helper::get_css_value( $attr['imgVrPadding'], 'px' ),
					'padding-bottom' => AEOPR_Helper::get_css_value( $attr['imgVrPadding'], 'px' ),
				),
				' .aeopr-rm__image img'        => array(
					'width'     => AEOPR_Helper::get_css_value( $attr['imageWidth'], 'px' ),
					'max-width' => AEOPR_Helper::get_css_value( $attr['imageWidth'], 'px' ),
				),
				' .aeopr-rm__separator-parent' => array(
					'justify-content' => $align,
				),
				' .aeopr-rm__content'          => array(
					'text-align'     => $attr['headingAlign'],
					'padding-left'   => AEOPR_Helper::get_css_value( $attr['contentHrPadding'], 'px' ),
					'padding-right'  => AEOPR_Helper::get_css_value( $attr['contentHrPadding'], 'px' ),
					'padding-top'    => AEOPR_Helper::get_css_value( $attr['contentVrPadding'], 'px' ),
					'padding-bottom' => AEOPR_Helper::get_css_value( $attr['contentVrPadding'], 'px' ),
				),
				' .aeopr-rm__title'            => array(
					'color'         => $attr['titleColor'],
					'margin-bottom' => AEOPR_Helper::get_css_value( $attr['titleSpace'], 'px' ),
				),
				' .aeopr-rm__price'            => array(
					'color' => $attr['priceColor'],
				),
				' .aeopr-rm__desc'             => array(
					'color'         => $attr['descColor'],
					'margin-bottom' => AEOPR_Helper::get_css_value( $attr['descSpace'], 'px' ),
				),
			);

			if ( 'none' !== $attr['seperatorStyle'] ) {
				$selectors[' .aeopr-rest_menu__wrap .aeopr-rm__separator'] = array(
					'border-top-color' => $attr['seperatorColor'],
					'border-top-style' => $attr['seperatorStyle'],
					'border-top-width' => AEOPR_Helper::get_css_value( $attr['seperatorThickness'], 'px' ),
					'width'            => AEOPR_Helper::get_css_value( $attr['seperatorWidth'], '%' ),
				);
			}

			$selectors[ ' .aeopr-rest_menu__wrap.aeopr-rm__desk-column-' . $attr['columns'] . ':nth-child(' . $attr['columns'] . 'n+1)' ] = array(
				'margin-left' => '0',
				'clear'       => 'left',
			);

			$t_selectors = array(
				' .aeopr-rest_menu__wrap.aeopr-rm__desk-column-' . $attr['columns'] . ':nth-child(' . $attr['columns'] . 'n+1)' => array(
					'margin-left' => 'unset',
					'clear'       => 'unset',
				),
				' .aeopr-rest_menu__wrap.aeopr-rm__tablet-column-' . $attr['tcolumns'] . ':nth-child(' . $attr['tcolumns'] . 'n+1)' => array(
					'margin-left' => '0',
					'clear'       => 'left',
				),
			);

			$m_selectors = array(
				' .aeopr-rest_menu__wrap.aeopr-rm__desk-column-' . $attr['columns'] . ':nth-child(' . $attr['columns'] . 'n+1)' => array(
					'margin-left' => 'unset',
					'clear'       => 'unset',
				),
				' .aeopr-rest_menu__wrap.aeopr-rm__mobile-column-' . $attr['mcolumns'] . ':nth-child(' . $attr['mcolumns'] . 'n+1)' => array(
					'margin-left' => '0',
					'clear'       => 'left',
				),
			);

			$combined_selectors = array(
				'desktop' => $selectors,
				'tablet'  => $t_selectors,
				'mobile'  => $m_selectors,
			);

			$combined_selectors = AEOPR_Helper::get_typography_css( $attr, 'title', ' .aeopr-rm__title', $combined_selectors );
			$combined_selectors = AEOPR_Helper::get_typography_css( $attr, 'price', ' .aeopr-rm__price', $combined_selectors );
			$combined_selectors = AEOPR_Helper::get_typography_css( $attr, 'desc', ' .aeopr-rm__desc', $combined_selectors );

			$base_selector = ( $attr['classMigrate'] ) ? '.aeopr-block-' : '#aeopr-rm-';

			return AEOPR_Helper::generate_all_css( $combined_selectors, $base_selector . $id );
		}

		/**
		 * Get Post Grid Block CSS
		 *
		 * @since 1.4.0
		 * @param array  $attr The block attributes.
		 * @param string $id The selector ID.
		 * @return array The Widget List.
		 */
		public static function get_post_grid_css( $attr, $id ) {

			$defaults = AEOPR_Helper::$block_list['aeopr/post-grid']['attributes'];

			$attr = array_merge( $defaults, (array) $attr );

			$selectors = self::get_post_selectors( $attr );

			// Pagination CSS.
			$selectors[' .aeopr-post-pagination-wrap'] = array(

				'margin-top' => AEOPR_Helper::get_css_value( $attr['paginationSpacing'], 'px' ),
				'text-align' => $attr['paginationAlignment'],
			);
			if ( 'filled' === $attr['paginationLayout'] ) {
				$selectors[' .aeopr-post-pagination-wrap .page-numbers.current'] = array(

					'background-color' => $attr['paginationBgActiveColor'],
					'color'            => $attr['paginationActiveColor'],
				);
				$selectors[' .aeopr-post-pagination-wrap a']                     = array(

					'background-color' => $attr['paginationBgColor'],
					'color'            => $attr['paginationColor'],
				);
			} else {

				$selectors[' .aeopr-post-pagination-wrap .page-numbers.current'] = array(

					'border-style'     => 'solid',
					'background-color' => 'transparent',
					'border-width'     => AEOPR_Helper::get_css_value( $attr['paginationBorderSize'], 'px' ),
					'border-color'     => $attr['paginationBorderActiveColor'],
					'border-radius'    => AEOPR_Helper::get_css_value( $attr['paginationBorderRadius'], 'px' ),
					'color'            => $attr['paginationActiveColor'],
				);

				$selectors[' .aeopr-post-pagination-wrap a'] = array(

					'border-style'     => 'solid',
					'background-color' => 'transparent',
					'border-width'     => AEOPR_Helper::get_css_value( $attr['paginationBorderSize'], 'px' ),
					'border-color'     => $attr['paginationBorderColor'],
					'border-radius'    => AEOPR_Helper::get_css_value( $attr['paginationBorderRadius'], 'px' ),
					'color'            => $attr['paginationColor'],
				);

			}

			$m_selectors = self::get_post_mobile_selectors( $attr );

			$t_selectors = self::get_post_tablet_selectors( $attr );

			$combined_selectors = array(
				'desktop' => $selectors,
				'tablet'  => $t_selectors,
				'mobile'  => $m_selectors,
			);

			$combined_selectors = AEOPR_Helper::get_typography_css( $attr, 'title', ' .aeopr-post__text .aeopr-post__title', $combined_selectors );
			$combined_selectors = AEOPR_Helper::get_typography_css( $attr, 'title', ' .aeopr-post__text .aeopr-post__title a', $combined_selectors );
			$combined_selectors = AEOPR_Helper::get_typography_css( $attr, 'meta', ' .aeopr-post__text .aeopr-post-grid-byline', $combined_selectors );
			$combined_selectors = AEOPR_Helper::get_typography_css( $attr, 'meta', ' .aeopr-post__text .aeopr-post-grid-byline .aeopr-post__author', $combined_selectors );

			$combined_selectors = AEOPR_Helper::get_typography_css( $attr, 'meta', ' .aeopr-post__text .aeopr-post-grid-byline .aeopr-post__author a', $combined_selectors );
			$combined_selectors = AEOPR_Helper::get_typography_css( $attr, 'excerpt', ' .aeopr-post__text .aeopr-post__excerpt', $combined_selectors );
			$combined_selectors = AEOPR_Helper::get_typography_css( $attr, 'cta', ' .aeopr-post__text .aeopr-post__cta', $combined_selectors );
			$combined_selectors = AEOPR_Helper::get_typography_css( $attr, 'cta', ' .aeopr-post__text .aeopr-post__cta a', $combined_selectors );

			return AEOPR_Helper::generate_all_css( $combined_selectors, '.aeopr-block-' . $id );
		}

		/**
		 * Get Post Carousel Block CSS
		 *
		 * @since 1.4.0
		 * @param array  $attr The block attributes.
		 * @param string $id The selector ID.
		 * @return array The Widget List.
		 */
		public static function get_post_carousel_css( $attr, $id ) {

			$defaults = AEOPR_Helper::$block_list['aeopr/post-carousel']['attributes'];

			$attr = array_merge( $defaults, (array) $attr );

			$selectors = self::get_post_selectors( $attr );

			$m_selectors = self::get_post_mobile_selectors( $attr );

			$t_selectors = self::get_post_tablet_selectors( $attr );

			$arrow_size = AEOPR_Helper::get_css_value( $attr['arrowSize'], 'px' );

			$selectors[' .slick-arrow'] = array(
				'border-color' => $attr['arrowColor'],
			);

			$selectors[' .slick-arrow span'] = array(
				'color'     => $attr['arrowColor'],
				'font-size' => $arrow_size,
				'width'     => $arrow_size,
				'height'    => $arrow_size,
			);

			$selectors[' .slick-arrow svg'] = array(
				'fill'   => $attr['arrowColor'],
				'width'  => $arrow_size,
				'height' => $arrow_size,
			);

			$selectors[' .slick-arrow'] = array(
				'border-color'  => $attr['arrowColor'],
				'border-width'  => AEOPR_Helper::get_css_value( $attr['arrowBorderSize'], 'px' ),
				'border-radius' => AEOPR_Helper::get_css_value( $attr['arrowBorderRadius'], 'px' ),
			);

			$selectors['.aeopr-post-grid ul.slick-dots li.slick-active button:before'] = array(
				'color' => $attr['arrowColor'],
			);

			$selectors['.aeopr-slick-carousel ul.slick-dots li button:before'] = array(
				'color' => $attr['arrowColor'],
			);

			if ( isset( $attr['arrowDots'] ) && 'dots' === $attr['arrowDots'] ) {

				$selectors['.aeopr-slick-carousel'] = array(
					'padding' => '0 0 35px 0',
				);
			}

			$combined_selectors = array(
				'desktop' => $selectors,
				'tablet'  => $t_selectors,
				'mobile'  => $m_selectors,
			);

			$combined_selectors = AEOPR_Helper::get_typography_css( $attr, 'title', ' .aeopr-post__text .aeopr-post__title', $combined_selectors );
			$combined_selectors = AEOPR_Helper::get_typography_css( $attr, 'title', ' .aeopr-post__text .aeopr-post__title a', $combined_selectors );
			$combined_selectors = AEOPR_Helper::get_typography_css( $attr, 'meta', ' .aeopr-post__text .aeopr-post-grid-byline', $combined_selectors );
			$combined_selectors = AEOPR_Helper::get_typography_css( $attr, 'meta', ' .aeopr-post__text .aeopr-post-grid-byline .aeopr-post__author', $combined_selectors );

			$combined_selectors = AEOPR_Helper::get_typography_css( $attr, 'meta', ' .aeopr-post__text .aeopr-post-grid-byline .aeopr-post__author a', $combined_selectors );
			$combined_selectors = AEOPR_Helper::get_typography_css( $attr, 'excerpt', ' .aeopr-post__text .aeopr-post__excerpt', $combined_selectors );
			$combined_selectors = AEOPR_Helper::get_typography_css( $attr, 'cta', ' .aeopr-post__text .aeopr-post__cta', $combined_selectors );
			$combined_selectors = AEOPR_Helper::get_typography_css( $attr, 'cta', ' .aeopr-post__text .aeopr-post__cta a', $combined_selectors );

			return AEOPR_Helper::generate_all_css( $combined_selectors, '.aeopr-block-' . $id );
		}

		/**
		 * Get Post Masonry Block CSS
		 *
		 * @since 1.4.0
		 * @param array  $attr The block attributes.
		 * @param string $id The selector ID.
		 * @return array The Widget List.
		 */
		public static function get_post_masonry_css( $attr, $id ) {

			$defaults = AEOPR_Helper::$block_list['aeopr/post-masonry']['attributes'];

			$attr = array_merge( $defaults, (array) $attr );

			$selectors = self::get_post_selectors( $attr );

			$m_selectors = self::get_post_mobile_selectors( $attr );

			$t_selectors = self::get_post_tablet_selectors( $attr );

			$combined_selectors = array(
				'desktop' => $selectors,
				'tablet'  => $t_selectors,
				'mobile'  => $m_selectors,
			);

			$combined_selectors = AEOPR_Helper::get_typography_css( $attr, 'title', ' .aeopr-post__text .aeopr-post__title', $combined_selectors );
			$combined_selectors = AEOPR_Helper::get_typography_css( $attr, 'title', ' .aeopr-post__text .aeopr-post__title a', $combined_selectors );
			$combined_selectors = AEOPR_Helper::get_typography_css( $attr, 'meta', ' .aeopr-post__text .aeopr-post-grid-byline', $combined_selectors );
			$combined_selectors = AEOPR_Helper::get_typography_css( $attr, 'meta', ' .aeopr-post__text .aeopr-post-grid-byline .aeopr-post__author', $combined_selectors );

			$combined_selectors = AEOPR_Helper::get_typography_css( $attr, 'meta', ' .aeopr-post__text .aeopr-post-grid-byline .aeopr-post__author a', $combined_selectors );
			$combined_selectors = AEOPR_Helper::get_typography_css( $attr, 'excerpt', ' .aeopr-post__text .aeopr-post__excerpt', $combined_selectors );
			$combined_selectors = AEOPR_Helper::get_typography_css( $attr, 'cta', ' .aeopr-post__text .aeopr-post__cta', $combined_selectors );
			$combined_selectors = AEOPR_Helper::get_typography_css( $attr, 'cta', ' .aeopr-post__text .aeopr-post__cta a', $combined_selectors );

			return AEOPR_Helper::generate_all_css( $combined_selectors, '.aeopr-block-' . $id );
		}

		/**
		 * Get Post Block Selectors CSS
		 *
		 * @param array $attr The block attributes.
		 * @since 1.4.0
		 */
		public static function get_post_selectors( $attr ) {
			return array(
				' .aeopr-post__items'                       => array(
					'margin-right' => AEOPR_Helper::get_css_value( ( -$attr['rowGap'] / 2 ), 'px' ),
					'margin-left'  => AEOPR_Helper::get_css_value( ( -$attr['rowGap'] / 2 ), 'px' ),
				),
				' .aeopr-post__items article'               => array(
					'padding-right' => AEOPR_Helper::get_css_value( ( $attr['rowGap'] / 2 ), 'px' ),
					'padding-left'  => AEOPR_Helper::get_css_value( ( $attr['rowGap'] / 2 ), 'px' ),
					'margin-bottom' => AEOPR_Helper::get_css_value( ( $attr['columnGap'] ), 'px' ),
				),
				' .aeopr-post__inner-wrap'                  => array(
					'background' => $attr['bgColor'],
				),
				' .aeopr-post__text'                        => array(
					'padding'    => AEOPR_Helper::get_css_value( ( $attr['contentPadding'] ), 'px' ),
					'text-align' => $attr['align'],
				),
				' .aeopr-post__text .aeopr-post__title'      => array(
					'color'         => $attr['titleColor'],
					'margin-bottom' => AEOPR_Helper::get_css_value( $attr['titleBottomSpace'], 'px' ),
				),
				' .aeopr-post__text .aeopr-post__title a'    => array(
					'color' => $attr['titleColor'],
				),
				' .aeopr-post__text .aeopr-post-grid-byline' => array(
					'color'         => $attr['metaColor'],
					'margin-bottom' => AEOPR_Helper::get_css_value( $attr['metaBottomSpace'], 'px' ),
				),
				' .aeopr-post__text .aeopr-post-grid-byline .aeopr-post__author' => array(
					'color' => $attr['metaColor'],
				),
				' .aeopr-post__text .aeopr-post-grid-byline .aeopr-post__author a' => array(
					'color' => $attr['metaColor'],
				),
				' .aeopr-post__text .aeopr-post__excerpt'    => array(
					'color'         => $attr['excerptColor'],
					'margin-bottom' => AEOPR_Helper::get_css_value( $attr['excerptBottomSpace'], 'px' ),
				),
				' .aeopr-post__text .aeopr-post__cta'        => array(
					'color'         => $attr['ctaColor'],
					'background'    => $attr['ctaBgColor'],
					'border-color'  => $attr['borderColor'],
					'border-width'  => AEOPR_Helper::get_css_value( $attr['borderWidth'], 'px' ),
					'border-radius' => AEOPR_Helper::get_css_value( $attr['borderRadius'], 'px' ),
					'border-style'  => $attr['borderStyle'],
				),
				' .aeopr-post__text .aeopr-post__cta a'      => array(
					'color'   => $attr['ctaColor'],
					'padding' => ( $attr['btnVPadding'] ) . 'px ' . ( $attr['btnHPadding'] ) . 'px',
				),
				' .aeopr-post__text .aeopr-post__cta:hover'  => array(
					'color'        => $attr['ctaHColor'],
					'background'   => $attr['ctaBgHColor'],
					'border-color' => $attr['borderHColor'],
				),
				' .aeopr-post__text .aeopr-post__cta:hover a' => array(
					'color' => $attr['ctaHColor'],
				),
				' .aeopr-post__image:before'                => array(
					'background-color' => $attr['bgOverlayColor'],
					'opacity'          => ( $attr['overlayOpacity'] / 100 ),
				),
			);

		}

		/**
		 * Get Post Block Selectors CSS for Mobile devices
		 *
		 * @param array $attr The block attributes.
		 * @since 1.6.1
		 */
		public static function get_post_mobile_selectors( $attr ) {

			return array(
				' .aeopr-post__text' => array(
					'padding' => ( $attr['contentPaddingMobile'] ) . 'px',
				),
			);

		}

		/**
		 * Get Post Block Selectors CSS for Tablet devices
		 *
		 * @param array $attr The block attributes.
		 * @since 1.8.2
		 */
		public static function get_post_tablet_selectors( $attr ) {
			return array();

		}

		/**
		 * Get Blockquote CSS
		 *
		 * @since 1.8.2
		 * @param array  $attr The block attributes.
		 * @param string $id The selector ID.
		 * @return array The Widget List.
		 */
		public static function get_blockquote_css( $attr, $id ) {

			$defaults = AEOPR_Helper::$block_list['aeopr/blockquote']['attributes'];

			$attr = array_merge( $defaults, (array) $attr );

			$author_space = $attr['authorSpace'];

			if ( 'center' !== $attr['align'] || 'border' === $attr['skinStyle'] ) {
				$author_space = 0;
			}

			// Set align to left for border style.
			$text_align = $attr['align'];

			if ( 'border' === $attr['skinStyle'] ) {
				$text_align = 'left';
			}

			$selectors = array(
				' .aeopr-blockquote__content'          => array(
					'color'         => $attr['descColor'],
					'margin-bottom' => AEOPR_Helper::get_css_value( $attr['descSpace'], 'px' ),
					'text-align'    => $text_align,
				),
				' cite.aeopr-blockquote__author'       => array(
					'color'      => $attr['authorColor'],
					'text-align' => $text_align,
				),
				' .aeopr-blockquote__skin-border blockquote.aeopr-blockquote' => array(
					'border-color'      => $attr['borderColor'],
					'border-left-style' => $attr['borderStyle'],
					'border-left-width' => AEOPR_Helper::get_css_value( $attr['borderWidth'], 'px' ),
					'padding-left'      => AEOPR_Helper::get_css_value( $attr['borderGap'], 'px' ),
					'padding-top'       => AEOPR_Helper::get_css_value( $attr['verticalPadding'], 'px' ),
					'padding-bottom'    => AEOPR_Helper::get_css_value( $attr['verticalPadding'], 'px' ),
				),

				' .aeopr-blockquote__skin-quotation .aeopr-blockquote__icon-wrap' => array(
					'background'    => $attr['quoteBgColor'],
					'border-radius' => AEOPR_Helper::get_css_value( $attr['quoteBorderRadius'], '%' ),
					'margin-top'    => AEOPR_Helper::get_css_value( $attr['quoteTopMargin'], 'px' ),
					'margin-bottom' => AEOPR_Helper::get_css_value( $attr['quoteBottomMargin'], 'px' ),
					'margin-left'   => AEOPR_Helper::get_css_value( $attr['quoteLeftMargin'], 'px' ),
					'margin-right'  => AEOPR_Helper::get_css_value( $attr['quoteRightMargin'], 'px' ),
					'padding'       => AEOPR_Helper::get_css_value( $attr['quotePadding'], $attr['quotePaddingType'] ),
				),

				' .aeopr-blockquote__skin-quotation .aeopr-blockquote__icon' => array(
					'width'  => AEOPR_Helper::get_css_value( $attr['quoteSize'], $attr['quoteSizeType'] ),
					'height' => AEOPR_Helper::get_css_value( $attr['quoteSize'], $attr['quoteSizeType'] ),
				),

				' .aeopr-blockquote__skin-quotation .aeopr-blockquote__icon svg' => array(
					'fill' => $attr['quoteColor'],
				),

				' .aeopr-blockquote__style-style_1 .aeopr-blockquote' => array(
					'text-align' => $attr['align'],
				),

				' .aeopr-blockquote__author-wrap'      => array(
					'margin-bottom' => AEOPR_Helper::get_css_value( $author_space, 'px' ),
				),
				' .aeopr-blockquote__author-image img' => array(
					'width'         => AEOPR_Helper::get_css_value( $attr['authorImageWidth'], 'px' ),
					'height'        => AEOPR_Helper::get_css_value( $attr['authorImageWidth'], 'px' ),
					'border-radius' => AEOPR_Helper::get_css_value( $attr['authorImgBorderRadius'], '%' ),
				),

				' .aeopr-blockquote__skin-quotation .aeopr-blockquote__icon:hover svg' => array(
					'fill' => $attr['quoteHoverColor'],
				),

				' .aeopr-blockquote__skin-quotation .aeopr-blockquote__icon-wrap:hover' => array(
					'background' => $attr['quoteBgHoverColor'],
				),

				' .aeopr-blockquote__skin-border blockquote.aeopr-blockquote:hover' => array(
					'border-left-color' => $attr['borderHoverColor'],
				),
			);

			if ( $attr['enableTweet'] ) {
				$selectors[' .aeopr-blockquote__tweet-style-link a.aeopr-blockquote__tweet-button'] = array(
					'color' => $attr['tweetLinkColor'],
				);

				$selectors[' .aeopr-blockquote__tweet-style-link a.aeopr-blockquote__tweet-button svg'] = array(
					'fill' => $attr['tweetLinkColor'],
				);

				$selectors[' .aeopr-blockquote__tweet-style-classic a.aeopr-blockquote__tweet-button'] = array(
					'color'            => $attr['tweetBtnColor'],
					'background-color' => $attr['tweetBtnBgColor'],
					'padding-left'     => AEOPR_Helper::get_css_value( $attr['tweetBtnHrPadding'], 'px' ),
					'padding-right'    => AEOPR_Helper::get_css_value( $attr['tweetBtnHrPadding'], 'px' ),
					'padding-top'      => AEOPR_Helper::get_css_value( $attr['tweetBtnVrPadding'], 'px' ),
					'padding-bottom'   => AEOPR_Helper::get_css_value( $attr['tweetBtnVrPadding'], 'px' ),
				);

				$selectors[' .aeopr-blockquote__tweet-style-classic a.aeopr-blockquote__tweet-button svg'] = array(
					'fill' => $attr['tweetBtnColor'],
				);

				$selectors[' .aeopr-blockquote__tweet-style-bubble a.aeopr-blockquote__tweet-button'] = array(
					'color'            => $attr['tweetBtnColor'],
					'background-color' => $attr['tweetBtnBgColor'],
					'padding-left'     => AEOPR_Helper::get_css_value( $attr['tweetBtnHrPadding'], 'px' ),
					'padding-right'    => AEOPR_Helper::get_css_value( $attr['tweetBtnHrPadding'], 'px' ),
					'padding-top'      => AEOPR_Helper::get_css_value( $attr['tweetBtnVrPadding'], 'px' ),
					'padding-bottom'   => AEOPR_Helper::get_css_value( $attr['tweetBtnVrPadding'], 'px' ),
				);

				$selectors[' .aeopr-blockquote__tweet-style-bubble a.aeopr-blockquote__tweet-button svg'] = array(
					'fill' => $attr['tweetBtnColor'],
				);

				$selectors[' .aeopr-blockquote__tweet-style-bubble a.aeopr-blockquote__tweet-button:before'] = array(
					'border-right-color' => $attr['tweetBtnBgColor'],
				);

				$selectors[' a.aeopr-blockquote__tweet-button svg'] = array(
					'width'  => AEOPR_Helper::get_css_value( $attr['tweetBtnFontSize'], $attr['tweetBtnFontSizeType'] ),
					'height' => AEOPR_Helper::get_css_value( $attr['tweetBtnFontSize'], $attr['tweetBtnFontSizeType'] ),
				);

				$selectors[' .aeopr-blockquote__tweet-icon_text a.aeopr-blockquote__tweet-button svg'] = array(
					'margin-right' => AEOPR_Helper::get_css_value( $attr['tweetIconSpacing'], 'px' ),
				);

				// Hover CSS.
				$selectors[' .aeopr-blockquote__tweet-style-link a.aeopr-blockquote__tweet-button:hover'] = array(
					'color' => $attr['tweetBtnHoverColor'],
				);

				$selectors[' .aeopr-blockquote__tweet-style-link a.aeopr-blockquote__tweet-button:hover svg'] = array(
					'fill' => $attr['tweetBtnHoverColor'],
				);

				$selectors[' .aeopr-blockquote__tweet-style-classic a.aeopr-blockquote__tweet-button:hover'] = array(
					'color'            => $attr['tweetBtnHoverColor'],
					'background-color' => $attr['tweetBtnBgHoverColor'],
				);

				$selectors[' .aeopr-blockquote__tweet-style-classic a.aeopr-blockquote__tweet-button:hover svg'] = array(
					'fill' => $attr['tweetBtnHoverColor'],
				);

				$selectors[' .aeopr-blockquote__tweet-style-bubble a.aeopr-blockquote__tweet-button:hover'] = array(
					'color'            => $attr['tweetBtnHoverColor'],
					'background-color' => $attr['tweetBtnBgHoverColor'],
				);

				$selectors[' .aeopr-blockquote__tweet-style-bubble a.aeopr-blockquote__tweet-button:hover svg'] = array(
					'fill' => $attr['tweetBtnHoverColor'],
				);

				$selectors[' .aeopr-blockquote__tweet-style-bubble a.aeopr-blockquote__tweet-button:hover:before'] = array(
					'border-right-color' => $attr['tweetBtnBgHoverColor'],
				);
			}

			$t_selectors = array(
				' a.aeopr-blockquote__tweet-button svg' => array(
					'width'  => AEOPR_Helper::get_css_value( $attr['tweetBtnFontSizeTablet'], $attr['tweetBtnFontSizeType'] ),
					'height' => AEOPR_Helper::get_css_value( $attr['tweetBtnFontSizeTablet'], $attr['tweetBtnFontSizeType'] ),
				),
				' .aeopr-blockquote__skin-quotation .aeopr-blockquote__icon-wrap' => array(
					'padding' => AEOPR_Helper::get_css_value( $attr['quotePaddingTablet'], $attr['quotePaddingType'] ),
				),
				' .aeopr-blockquote__skin-quotation .aeopr-blockquote__icon' => array(
					'width'  => AEOPR_Helper::get_css_value( $attr['quoteSizeTablet'], $attr['quoteSizeType'] ),
					'height' => AEOPR_Helper::get_css_value( $attr['quoteSizeTablet'], $attr['quoteSizeType'] ),
				),
			);

			$m_selectors = array(
				' a.aeopr-blockquote__tweet-button svg' => array(
					'width'  => AEOPR_Helper::get_css_value( $attr['tweetBtnFontSizeMobile'], $attr['tweetBtnFontSizeType'] ),
					'height' => AEOPR_Helper::get_css_value( $attr['tweetBtnFontSizeMobile'], $attr['tweetBtnFontSizeType'] ),
				),
				' .aeopr-blockquote__skin-quotation .aeopr-blockquote__icon-wrap' => array(
					'padding' => AEOPR_Helper::get_css_value( $attr['quotePaddingMobile'], $attr['quotePaddingType'] ),
				),
				' .aeopr-blockquote__skin-quotation .aeopr-blockquote__icon' => array(
					'width'  => AEOPR_Helper::get_css_value( $attr['quoteSizeMobile'], $attr['quoteSizeType'] ),
					'height' => AEOPR_Helper::get_css_value( $attr['quoteSizeMobile'], $attr['quoteSizeType'] ),
				),
			);

			$combined_selectors = array(
				'desktop' => $selectors,
				'tablet'  => $t_selectors,
				'mobile'  => $m_selectors,
			);

			$combined_selectors = AEOPR_Helper::get_typography_css( $attr, 'tweetBtn', ' a.aeopr-blockquote__tweet-button', $combined_selectors );
			$combined_selectors = AEOPR_Helper::get_typography_css( $attr, 'author', ' cite.aeopr-blockquote__author', $combined_selectors );
			$combined_selectors = AEOPR_Helper::get_typography_css( $attr, 'desc', ' .aeopr-blockquote__content', $combined_selectors );

			$base_selector = ( $attr['classMigrate'] ) ? '.aeopr-block-' : '#aeopr-blockquote-';

			return AEOPR_Helper::generate_all_css( $combined_selectors, $base_selector . $id );
		}

		/**
		 * Get Timeline Block Desktop Selectors CSS
		 *
		 * @param array $attr The block attributes.
		 * @since 1.8.2
		 */
		public static function get_timeline_selectors( $attr ) {
			$connector_size = AEOPR_Helper::get_css_value( $attr['connectorBgsize'], 'px' );
			$selectors      = array(
				' .aeopr-timeline__heading-text'           => array(
					'margin-bottom' => AEOPR_Helper::get_css_value( $attr['headSpace'], 'px' ),
				),
				' .aeopr-timeline-desc-content'            => array(
					'text-align' => $attr['align'],
					'color'      => $attr['subHeadingColor'],
				),
				' .aeopr-timeline__events-new'             => array(
					'text-align' => $attr['align'],
				),
				' .aeopr-timeline__date-inner'             => array(
					'text-align' => $attr['align'],
				),
				' .aeopr-timeline__center-block .aeopr-timeline__day-right .aeopr-timeline__arrow:after' => array(
					'border-left-color' => $attr['backgroundColor'],
				),
				' .aeopr-timeline__right-block .aeopr-timeline__day-right .aeopr-timeline__arrow:after' => array(
					'border-left-color' => $attr['backgroundColor'],
				),
				' .aeopr-timeline__center-block .aeopr-timeline__day-left .aeopr-timeline__arrow:after' => array(
					'border-right-color' => $attr['backgroundColor'],
				),
				' .aeopr-timeline__left-block .aeopr-timeline__day-left .aeopr-timeline__arrow:after' => array(
					'border-right-color' => $attr['backgroundColor'],
				),
				' .aeopr-timeline__line__inner'            => array(
					'background-color' => $attr['separatorFillColor'],
				),
				' .aeopr-timeline__line'                   => array(
					'background-color' => $attr['separatorColor'],
					'width'            => AEOPR_Helper::get_css_value( $attr['separatorwidth'], 'px' ),
				),
				' .aeopr-timeline__right-block .aeopr-timeline__line' => array(
					'right' => 'calc( ' . $attr['connectorBgsize'] . 'px / 2 )',
				),
				' .aeopr-timeline__left-block .aeopr-timeline__line' => array(
					'left' => 'calc( ' . $attr['connectorBgsize'] . 'px / 2 )',
				),
				' .aeopr-timeline__center-block .aeopr-timeline__line' => array(
					'right' => 'calc( ' . $attr['connectorBgsize'] . 'px / 2 )',
				),
				' .aeopr-timeline__marker'                 => array(
					'background-color' => $attr['separatorBg'],
					'min-height'       => $connector_size,
					'min-width'        => $connector_size,
					'line-height'      => $connector_size,
					'border'           => $attr['borderwidth'] . 'px solid' . $attr['separatorBorder'],
				),
				' .aeopr-timeline__left-block .aeopr-timeline__left .aeopr-timeline__arrow' => array(
					'height' => $connector_size,
				),
				' .aeopr-timeline__right-block .aeopr-timeline__right .aeopr-timeline__arrow' => array(
					'height' => $connector_size,
				),
				' .aeopr-timeline__center-block .aeopr-timeline__left .aeopr-timeline__arrow' => array(
					'height' => $connector_size,
				),
				' .aeopr-timeline__center-block .aeopr-timeline__right .aeopr-timeline__arrow' => array(
					'height' => $connector_size,
				),
				' .aeopr-timeline__center-block .aeopr-timeline__marker' => array(
					'margin-left'  => AEOPR_Helper::get_css_value( $attr['horizontalSpace'], 'px' ),
					'margin-right' => AEOPR_Helper::get_css_value( $attr['horizontalSpace'], 'px' ),
				),
				' .aeopr-timeline__field:not(:last-child)' => array(
					'margin-bottom' => AEOPR_Helper::get_css_value( $attr['verticalSpace'], 'px' ),
				),
				' .aeopr-timeline__date-hide.aeopr-timeline__date-inner' => array(
					'margin-bottom' => AEOPR_Helper::get_css_value( $attr['dateBottomspace'], 'px' ),
					'color'         => $attr['dateColor'],
					'text-align'    => $attr['align'],
				),
				' .aeopr-timeline__left-block .aeopr-timeline__day-new.aeopr-timeline__day-left' => array(
					'margin-left' => AEOPR_Helper::get_css_value( $attr['horizontalSpace'], 'px' ),
				),
				' .aeopr-timeline__right-block .aeopr-timeline__day-new.aeopr-timeline__day-right' => array(
					'margin-right' => AEOPR_Helper::get_css_value( $attr['horizontalSpace'], 'px' ),
				),
				' .aeopr-timeline__date-new'               => array(
					'color' => $attr['dateColor'],
				),
				' .aeopr-timeline__events-inner-new'       => array(
					'background-color' => $attr['backgroundColor'],
					'border-radius'    => AEOPR_Helper::get_css_value( $attr['borderRadius'], 'px' ),
					'padding'          => AEOPR_Helper::get_css_value( $attr['bgPadding'], 'px' ),
				),
				' .aeopr-timeline__main .aeopr-timeline__icon-new' => array(
					'color'     => $attr['iconColor'],
					'font-size' => AEOPR_Helper::get_css_value( $attr['iconSize'], 'px' ),
					'width'     => AEOPR_Helper::get_css_value( $attr['iconSize'], 'px' ),
				),
				' .aeopr-timeline__main .aeopr-timeline__marker.aeopr-timeline__in-view-icon .aeopr-timeline__icon-new svg' => array(
					'fill' => $attr['iconFocus'],
				),
				' .aeopr-timeline__main .aeopr-timeline__marker.aeopr-timeline__in-view-icon .aeopr-timeline__icon-new' => array(
					'color' => $attr['iconFocus'],
				),
				' .aeopr-timeline__main .aeopr-timeline__marker.aeopr-timeline__in-view-icon' => array(
					'background'   => $attr['iconBgFocus'],
					'border-color' => $attr['borderFocus'],
				),
				' .aeopr-timeline__main .aeopr-timeline__icon-new svg' => array(
					'fill' => $attr['iconColor'],
				),
			);

			return $selectors;

		}

		/**
		 * Get Timeline Block Tablet Selectors CSS.
		 *
		 * @param array $attr The block attributes.
		 * @since 1.8.2
		 */
		public static function get_timeline_tablet_selectors( $attr ) {
			$tablet_selector = array(
				' .aeopr-timeline__center-block .aeopr-timeline__marker' => array(
					'margin-left'  => 0,
					'margin-right' => 0,
				),
				' .aeopr-timeline__center-block.aeopr-timeline__responsive-tablet .aeopr-timeline__day-right .aeopr-timeline__arrow:after' => array(
					'border-right-color' => $attr['backgroundColor'],
				),
				' .aeopr-timeline__center-block.aeopr-timeline__responsive-tablet .aeopr-timeline__line' => array(
					'left' => 'calc( ' . $attr['connectorBgsize'] . 'px / 2 )',
				),
			);

			return $tablet_selector;

		}

		/**
		 * Get Timeline Block Mobile Selectors CSS.
		 *
		 * @param array $attr The block attributes.
		 * @since 1.8.2
		 */
		public static function get_timeline_mobile_selectors( $attr ) {
			$m_selectors = array(
				' .aeopr-timeline__center-block .aeopr-timeline__marker' => array(
					'margin-left'  => 0,
					'margin-right' => 0,
				),
				' .aeopr-timeline__center-block .aeopr-timeline__day-new.aeopr-timeline__day-left' => array(
					'margin-left' => AEOPR_Helper::get_css_value( $attr['horizontalSpace'], 'px' ),
				),
				' .aeopr-timeline__center-block .aeopr-timeline__day-new.aeopr-timeline__day-right' => array(
					'margin-left' => AEOPR_Helper::get_css_value( $attr['horizontalSpace'], 'px' ),
				),
				' .aeopr-timeline__center-block.aeopr-timeline__responsive-mobile .aeopr-timeline__day-right .aeopr-timeline__arrow:after' => array(
					'border-right-color' => $attr['backgroundColor'],
				),
				' .aeopr-timeline__center-block.aeopr-timeline__responsive-mobile .aeopr-timeline__line' => array(
					'left' => 'calc( ' . $attr['connectorBgsize'] . 'px / 2 )',
				),
			);
			return $m_selectors;

		}

		/**
		 * Get Contact Form 7 CSS
		 *
		 * @param array  $attr The block attributes.
		 * @param string $id The selector ID.
		 * @since 1.10.0
		 */
		public static function get_cf7_styler_css( $attr, $id ) {
			$defaults = AEOPR_Helper::$block_list['aeopr/cf7-styler']['attributes'];

			$attr = array_merge( $defaults, (array) $attr );

			$field_hr_padding = AEOPR_Helper::get_css_value( $attr['fieldHrPadding'], 'px' );
			$field_vr_padding = AEOPR_Helper::get_css_value( $attr['fieldVrPadding'], 'px' );

			$selectors = array(
				' .wpcf7 .wpcf7-form'                => array(
					'text-align' => $attr['align'],
				),
				' .wpcf7 form.wpcf7-form:not(input)' => array(
					'color' => $attr['fieldLabelColor'],
				),
				' .wpcf7 input:not([type=submit])'   => array(
					'background-color' => $attr['fieldBgColor'],
					'color'            => $attr['fieldInputColor'],
					'border-style'     => $attr['fieldBorderStyle'],
					'border-color'     => $attr['fieldBorderColor'],
					'border-width'     => AEOPR_Helper::get_css_value( $attr['fieldBorderWidth'], 'px' ),
					'border-radius'    => AEOPR_Helper::get_css_value( $attr['fieldBorderRadius'], $attr['fieldBorderRadiusType'] ),
					'padding-left'     => $field_hr_padding,
					'padding-right'    => $field_hr_padding,
					'padding-top'      => $field_vr_padding,
					'padding-bottom'   => $field_vr_padding,
					'margin-top'       => AEOPR_Helper::get_css_value( $attr['fieldLabelSpacing'], 'px' ),
					'margin-bottom'    => AEOPR_Helper::get_css_value( $attr['fieldSpacing'], 'px' ),
					'text-align'       => $attr['align'],
				),
				' .wpcf7 select'                     => array(
					'background-color' => $attr['fieldBgColor'],
					'color'            => $attr['fieldLabelColor'],
					'border-style'     => $attr['fieldBorderStyle'],
					'border-color'     => $attr['fieldBorderColor'],
					'border-width'     => AEOPR_Helper::get_css_value( $attr['fieldBorderWidth'], 'px' ),
					'border-radius'    => AEOPR_Helper::get_css_value( $attr['fieldBorderRadius'], $attr['fieldBorderRadiusType'] ),
					'margin-top'       => AEOPR_Helper::get_css_value( $attr['fieldLabelSpacing'], 'px' ),
					'margin-bottom'    => AEOPR_Helper::get_css_value( $attr['fieldSpacing'], 'px' ),
					'text-align'       => $attr['align'],
				),
				' .wpcf7 select.wpcf7-form-control.wpcf7-select:not([multiple="multiple"])' => array(
					'padding-left'   => $field_hr_padding,
					'padding-right'  => $field_hr_padding,
					'padding-top'    => $field_vr_padding,
					'padding-bottom' => $field_vr_padding,
				),
				' .wpcf7 select.wpcf7-select[multiple="multiple"] option' => array(
					'padding-left'   => $field_hr_padding,
					'padding-right'  => $field_hr_padding,
					'padding-top'    => $field_vr_padding,
					'padding-bottom' => $field_vr_padding,
				),
				' .wpcf7 textarea'                   => array(
					'background-color' => $attr['fieldBgColor'],
					'color'            => $attr['fieldInputColor'],
					'border-color'     => $attr['fieldBorderColor'],
					'border-width'     => AEOPR_Helper::get_css_value( $attr['fieldBorderWidth'], 'px' ),
					'border-radius'    => AEOPR_Helper::get_css_value( $attr['fieldBorderRadius'], $attr['fieldBorderRadiusType'] ),
					'border-style'     => $attr['fieldBorderStyle'],
					'padding-left'     => $field_hr_padding,
					'padding-right'    => $field_hr_padding,
					'padding-top'      => $field_vr_padding,
					'padding-bottom'   => $field_vr_padding,
					'margin-top'       => AEOPR_Helper::get_css_value( $attr['fieldLabelSpacing'], 'px' ),
					'margin-bottom'    => AEOPR_Helper::get_css_value( $attr['fieldSpacing'], 'px' ),
					'text-align'       => $attr['align'],
				),
				' .wpcf7 textarea::placeholder'      => array(
					'color'      => $attr['fieldInputColor'],
					'text-align' => $attr['align'],
				),
				' .wpcf7 input::placeholder'         => array(
					'color'      => $attr['fieldInputColor'],
					'text-align' => $attr['align'],
				),

				// Focus.
				' .wpcf7 form input:not([type=submit]):focus' => array(
					'border-color' => $attr['fieldBorderFocusColor'],
				),
				' .wpcf7 form select:focus'          => array(
					'border-color' => $attr['fieldBorderFocusColor'],
				),
				' .wpcf7 textarea:focus'             => array(
					'border-color' => $attr['fieldBorderFocusColor'],
				),

				// Submit button.
				' .wpcf7 input.wpcf7-form-control.wpcf7-submit' => array(
					'color'            => $attr['buttonTextColor'],
					'background-color' => $attr['buttonBgColor'],
					'border-color'     => $attr['buttonBorderColor'],
					'border-style'     => $attr['buttonBorderStyle'],
					'border-width'     => AEOPR_Helper::get_css_value( $attr['buttonBorderWidth'], 'px' ),
					'border-radius'    => AEOPR_Helper::get_css_value( $attr['buttonBorderRadius'], $attr['buttonBorderRadiusType'] ),
					'padding-left'     => AEOPR_Helper::get_css_value( $attr['buttonHrPadding'], 'px' ),
					'padding-right'    => AEOPR_Helper::get_css_value( $attr['buttonHrPadding'], 'px' ),
					'padding-top'      => AEOPR_Helper::get_css_value( $attr['buttonVrPadding'], 'px' ),
					'padding-bottom'   => AEOPR_Helper::get_css_value( $attr['buttonVrPadding'], 'px' ),
				),
				' .wpcf7 input.wpcf7-form-control.wpcf7-submit:hover' => array(
					'color'            => $attr['buttonTextHoverColor'],
					'background-color' => $attr['buttonBgHoverColor'],
					'border-color'     => $attr['buttonBorderHoverColor'],
				),

				// Check box Radio.
				' .wpcf7 .wpcf7-checkbox input[type="checkbox"]:checked + span:before' => array(
					'background-color' => $attr['fieldBgColor'],
					'color'            => $attr['fieldInputColor'],
					'font-size'        => 'calc( ' . $attr['fieldVrPadding'] . 'px / 1.2 )',
					'border-color'     => $attr['fieldBorderFocusColor'],
				),
				' .wpcf7 .wpcf7-checkbox input[type="checkbox"] + span:before' => array(
					'background-color' => $attr['fieldBgColor'],
					'color'            => $attr['fieldInputColor'],
					'height'           => $field_vr_padding,
					'width'            => $field_vr_padding,
					'border-style'     => $attr['fieldBorderStyle'],
					'border-color'     => $attr['fieldBorderColor'],
					'border-width'     => AEOPR_Helper::get_css_value( $attr['fieldBorderWidth'], 'px' ),
					'border-radius'    => AEOPR_Helper::get_css_value( $attr['fieldBorderRadius'], $attr['fieldBorderRadiusType'] ),
					'font-size'        => 'calc( ' . $attr['fieldVrPadding'] . 'px / 1.2 )',
				),
				' .wpcf7 .wpcf7-acceptance input[type="checkbox"]:checked + span:before' => array(
					'background-color' => $attr['fieldBgColor'],
					'color'            => $attr['fieldInputColor'],
					'font-size'        => 'calc( ' . $attr['fieldVrPadding'] . 'px / 1.2 )',
					'border-color'     => $attr['fieldBorderFocusColor'],
				),
				' .wpcf7 .wpcf7-acceptance input[type="checkbox"] + span:before' => array(
					'background-color' => $attr['fieldBgColor'],
					'color'            => $attr['fieldInputColor'],
					'height'           => $field_vr_padding,
					'width'            => $field_vr_padding,
					'font-size'        => 'calc( ' . $attr['fieldVrPadding'] . 'px / 1.2 )',
					'border-color'     => $attr['fieldBorderColor'],
					'border-style'     => $attr['fieldBorderStyle'],
					'border-width'     => AEOPR_Helper::get_css_value( $attr['fieldBorderWidth'], 'px' ),
					'border-radius'    => AEOPR_Helper::get_css_value( $attr['fieldBorderRadius'], $attr['fieldBorderRadiusType'] ),
				),
				' .wpcf7 .wpcf7-radio input[type="radio"] + span:before' => array(
					'background-color' => $attr['fieldBgColor'],
					'color'            => $attr['fieldInputColor'],
					'height'           => $field_vr_padding,
					'width'            => $field_vr_padding,
					'border-style'     => $attr['fieldBorderStyle'],
					'border-color'     => $attr['fieldBorderColor'],
					'border-width'     => AEOPR_Helper::get_css_value( $attr['fieldBorderWidth'], 'px' ),
				),
				' .wpcf7 .wpcf7-radio input[type="radio"]:checked + span:before' => array(
					'border-color' => $attr['fieldBorderFocusColor'],
				),

				// Underline border.
				' .aeopr-cf7-styler__field-style-underline .wpcf7 input:not([type=submit])' => array(
					'border-style'        => 'none',
					'border-bottom-color' => $attr['fieldBorderColor'],
					'border-bottom-style' => 'solid',
					'border-bottom-width' => AEOPR_Helper::get_css_value( $attr['fieldBorderWidth'], 'px' ),
					'border-radius'       => AEOPR_Helper::get_css_value( $attr['fieldBorderRadius'], $attr['fieldBorderRadiusType'] ),
				),
				' .aeopr-cf7-styler__field-style-underline textarea' => array(
					'border-style'        => 'none',
					'border-bottom-color' => $attr['fieldBorderColor'],
					'border-bottom-style' => 'solid',
					'border-bottom-width' => AEOPR_Helper::get_css_value( $attr['fieldBorderWidth'], 'px' ),
					'border-radius'       => AEOPR_Helper::get_css_value( $attr['fieldBorderRadius'], $attr['fieldBorderRadiusType'] ),
				),
				' .aeopr-cf7-styler__field-style-underline select' => array(
					'border-style'        => 'none',
					'border-bottom-color' => $attr['fieldBorderColor'],
					'border-bottom-style' => 'solid',
					'border-bottom-width' => AEOPR_Helper::get_css_value( $attr['fieldBorderWidth'], 'px' ),
					'border-radius'       => AEOPR_Helper::get_css_value( $attr['fieldBorderRadius'], $attr['fieldBorderRadiusType'] ),
				),
				' .aeopr-cf7-styler__field-style-underline textarea' => array(
					'border-style'        => 'none',
					'border-bottom-color' => $attr['fieldBorderColor'],
					'border-bottom-style' => 'solid',
					'border-bottom-width' => AEOPR_Helper::get_css_value( $attr['fieldBorderWidth'], 'px' ),
					'border-radius'       => AEOPR_Helper::get_css_value( $attr['fieldBorderRadius'], $attr['fieldBorderRadiusType'] ),
				),
				' .aeopr-cf7-styler__field-style-underline .wpcf7-checkbox input[type="checkbox"] + span:before' => array(
					'border-style' => 'solid',
				),
				' .aeopr-cf7-styler__field-style-underline .wpcf7 input[type="radio"] + span:before' => array(
					'border-style' => 'solid',
				),
				' .aeopr-cf7-styler__field-style-underline .wpcf7-acceptance input[type="checkbox"] + span:before' => array(
					'border-style' => 'solid',
				),
				' .aeopr-cf7-styler__field-style-box .wpcf7-checkbox input[type="checkbox"]:checked + span:before' => array(
					'border-style'  => $attr['fieldBorderStyle'],
					'border-width'  => AEOPR_Helper::get_css_value( $attr['fieldBorderWidth'], 'px' ),
					'border-radius' => AEOPR_Helper::get_css_value( $attr['fieldBorderRadius'], $attr['fieldBorderRadiusType'] ),
					'font-size'     => 'calc( ' . $attr['fieldVrPadding'] . 'px / 1.2 )',
				),
				' .aeopr-cf7-styler__field-style-box .wpcf7-acceptance input[type="checkbox"]:checked + span:before' => array(
					'border-style'  => $attr['fieldBorderStyle'],
					'border-width'  => AEOPR_Helper::get_css_value( $attr['fieldBorderWidth'], 'px' ),
					'border-radius' => AEOPR_Helper::get_css_value( $attr['fieldBorderRadius'], $attr['fieldBorderRadiusType'] ),
					'font-size'     => 'calc( ' . $attr['fieldVrPadding'] . 'px / 1.2 )',
				),
				' .wpcf7-radio input[type="radio"]:checked + span:before' => array(
					'background-color' => $attr['fieldInputColor'],
				),

				// Override check box.
				' .aeopr-cf7-styler__check-style-enabled .wpcf7 .wpcf7-checkbox input[type="checkbox"] + span:before' => array(
					'background-color' => $attr['radioCheckBgColor'],
					'color'            => $attr['radioCheckSelectColor'],
					'height'           => AEOPR_Helper::get_css_value( $attr['radioCheckSize'], 'px' ),
					'width'            => AEOPR_Helper::get_css_value( $attr['radioCheckSize'], 'px' ),
					'font-size'        => 'calc( ' . $attr['radioCheckSize'] . 'px / 1.2 )',
					'border-color'     => $attr['radioCheckBorderColor'],
					'border-width'     => AEOPR_Helper::get_css_value( $attr['radioCheckBorderWidth'], 'px' ),
					'border-radius'    => AEOPR_Helper::get_css_value( $attr['radioCheckBorderRadius'], $attr['radioCheckBorderRadiusType'] ),
				),
				' .aeopr-cf7-styler__check-style-enabled .wpcf7 .wpcf7-checkbox input[type="checkbox"]:checked + span:before' => array(
					'border-color' => $attr['fieldBorderFocusColor'],
				),
				' .aeopr-cf7-styler__check-style-enabled .wpcf7 .wpcf7-acceptance input[type="checkbox"] + span:before' => array(
					'background-color' => $attr['radioCheckBgColor'],
					'color'            => $attr['radioCheckSelectColor'],
					'height'           => AEOPR_Helper::get_css_value( $attr['radioCheckSize'], 'px' ),
					'width'            => AEOPR_Helper::get_css_value( $attr['radioCheckSize'], 'px' ),
					'font-size'        => 'calc( ' . $attr['radioCheckSize'] . 'px / 1.2 )',
					'border-color'     => $attr['radioCheckBorderColor'],
					'border-width'     => AEOPR_Helper::get_css_value( $attr['radioCheckBorderWidth'], 'px' ),
					'border-radius'    => AEOPR_Helper::get_css_value( $attr['radioCheckBorderRadius'], $attr['radioCheckBorderRadiusType'] ),
				),
				' .aeopr-cf7-styler__check-style-enabled .wpcf7 .wpcf7-acceptance input[type="checkbox"]:checked + span:before' => array(
					'border-color' => $attr['fieldBorderFocusColor'],
				),

				' .aeopr-cf7-styler__check-style-enabled .wpcf7 input[type="radio"] + span:before' => array(
					'background-color' => $attr['radioCheckBgColor'],
					'color'            => $attr['radioCheckSelectColor'],
					'height'           => AEOPR_Helper::get_css_value( $attr['radioCheckSize'], 'px' ),
					'width'            => AEOPR_Helper::get_css_value( $attr['radioCheckSize'], 'px' ),
					'font-size'        => 'calc( ' . $attr['radioCheckSize'] . 'px / 1.2 )',
					'border-color'     => $attr['radioCheckBorderColor'],
					'border-width'     => AEOPR_Helper::get_css_value( $attr['radioCheckBorderWidth'], 'px' ),
				),
				' .aeopr-cf7-styler__check-style-enabled .wpcf7-radio input[type="radio"]:checked + span:before' => array(
					'background-color' => $attr['radioCheckSelectColor'],
				),
				' .aeopr-cf7-styler__check-style-enabled .wpcf7 form .wpcf7-list-item-label' => array(
					'color' => $attr['radioCheckLableColor'],
				),
				' span.wpcf7-not-valid-tip'          => array(
					'color' => $attr['validationMsgColor'],
				),
				' .aeopr-cf7-styler__highlight-border input.wpcf7-form-control.wpcf7-not-valid' => array(
					'border-color' => $attr['highlightBorderColor'],
				),
				' .aeopr-cf7-styler__highlight-border .wpcf7-form-control.wpcf7-not-valid .wpcf7-list-item-label:before' => array(
					'border-color' => $attr['highlightBorderColor'] . '!important',
				),
				' .aeopr-cf7-styler__highlight-style-bottom_right .wpcf7-not-valid-tip' => array(
					'background-color' => $attr['validationMsgBgColor'],
				),
				' .wpcf7-response-output'            => array(
					'border-width'   => AEOPR_Helper::get_css_value( $attr['msgBorderSize'], 'px' ),
					'border-radius'  => AEOPR_Helper::get_css_value( $attr['msgBorderRadius'], $attr['msgBorderRadiusType'] ),
					'padding-top'    => AEOPR_Helper::get_css_value( $attr['msgVrPadding'], 'px' ),
					'padding-bottom' => AEOPR_Helper::get_css_value( $attr['msgVrPadding'], 'px' ),
					'padding-left'   => AEOPR_Helper::get_css_value( $attr['msgHrPadding'], 'px' ),
					'padding-right'  => AEOPR_Helper::get_css_value( $attr['msgHrPadding'], 'px' ),
				),
				' .wpcf7-response-output.wpcf7-validation-errors' => array(
					'background-color' => $attr['errorMsgBgColor'],
					'border-color'     => $attr['errorMsgBorderColor'],
					'color'            => $attr['errorMsgColor'],
				),
				' .wpcf7-response-output.wpcf7-validation- success' => array(
					'background-color' => $attr['successMsgBgColor'],
					'border-color'     => $attr['successMsgBorderColor'],
					'color'            => $attr['successMsgColor'],
				),

			);

			$t_selectors = array(
				' .wpcf7 form.wpcf7-form:not(input)' => array(
					'color' => $attr['fieldLabelColor'],
				),
			);

			$m_selectors = array();

			$combined_selectors = array(
				'desktop' => $selectors,
				'tablet'  => $t_selectors,
				'mobile'  => $m_selectors,
			);

			$combined_selectors = AEOPR_Helper::get_typography_css( $attr, 'radioCheck', ' .aeopr-cf7-styler__check-style-enabled .wpcf7 form .wpcf7-list-item-label', $combined_selectors );
			$combined_selectors = AEOPR_Helper::get_typography_css( $attr, 'validationMsg', ' span.wpcf7-not-valid-tip', $combined_selectors );
			$combined_selectors = AEOPR_Helper::get_typography_css( $attr, 'msg', ' .wpcf7-response-output', $combined_selectors );
			$combined_selectors = AEOPR_Helper::get_typography_css( $attr, 'button', ' .wpcf7 input.wpcf7-form-control.wpcf7-submit', $combined_selectors );
			$combined_selectors = AEOPR_Helper::get_typography_css( $attr, 'label', ' .wpcf7 form .wpcf7-list-item-label', $combined_selectors );
			$combined_selectors = AEOPR_Helper::get_typography_css( $attr, 'label', ' .wpcf7 form label', $combined_selectors );
			$combined_selectors = AEOPR_Helper::get_typography_css( $attr, 'input', ' .wpcf7 select', $combined_selectors );
			$combined_selectors = AEOPR_Helper::get_typography_css( $attr, 'input', ' .wpcf7 textarea', $combined_selectors );
			$combined_selectors = AEOPR_Helper::get_typography_css( $attr, 'input', ' .wpcf7 input:not([type=submit])', $combined_selectors );

			return AEOPR_Helper::generate_all_css( $combined_selectors, '.aeopr-block-' . $id );
		}

		/**
		 * Get Gravity Form Styler CSS
		 *
		 * @param array  $attr The block attributes.
		 * @param string $id The selector ID.
		 * @since 1.12.0
		 */
		public static function get_gf_styler_css( $attr, $id ) {
			$defaults = AEOPR_Helper::$block_list['aeopr/gf-styler']['attributes'];

			$attr = array_merge( $defaults, (array) $attr );

			$attr['msgVrPadding']   = ( '' === $attr['msgVrPadding'] ) ? '0' : $attr['msgVrPadding'];
			$attr['msgHrPadding']   = ( '' === $attr['msgHrPadding'] ) ? '0' : $attr['msgHrPadding'];
			$attr['textAreaHeight'] = ( 'auto' === $attr['msgHrPadding'] ) ? $attr['textAreaHeight'] : $attr['textAreaHeight'] . 'px';

			$selectors = array(
				' .gform_wrapper form'                   => array(
					'text-align' => $attr['align'],
				),
				' .wp-block-aeopr-gf-styler form:not(input)' => array(
					'color' => $attr['fieldLabelColor'],
				),
				' .gform_heading'                        => array(
					'text-align' => $attr['titleDescAlignment'],
				),
				' input:not([type=submit])'              => array(
					'background-color' => $attr['fieldBgColor'],
					'color'            => $attr['fieldInputColor'],
					'border-style'     => $attr['fieldBorderStyle'],
					'border-color'     => $attr['fieldBorderColor'],
					'border-width'     => AEOPR_Helper::get_css_value( $attr['fieldBorderWidth'], 'px' ),
					'border-radius'    => AEOPR_Helper::get_css_value( $attr['fieldBorderRadius'], $attr['fieldBorderRadiusType'] ),
					'padding-left'     => AEOPR_Helper::get_css_value( $attr['fieldHrPadding'], 'px' ),
					'padding-right'    => AEOPR_Helper::get_css_value( $attr['fieldHrPadding'], 'px' ),
					'padding-top'      => AEOPR_Helper::get_css_value( $attr['fieldVrPadding'], 'px' ),
					'padding-bottom'   => AEOPR_Helper::get_css_value( $attr['fieldVrPadding'], 'px' ),
					'margin-top'       => AEOPR_Helper::get_css_value( $attr['fieldLabelSpacing'], 'px' ),
					'margin-bottom'    => AEOPR_Helper::get_css_value( $attr['fieldSpacing'], 'px' ),
					'text-align'       => $attr['align'],
				),
				' select'                                => array(
					'background-color' => $attr['fieldBgColor'],
					'border-style'     => $attr['fieldBorderStyle'],
					'border-color'     => $attr['fieldBorderColor'],
					'border-width'     => AEOPR_Helper::get_css_value( $attr['fieldBorderWidth'], 'px' ),
					'border-radius'    => AEOPR_Helper::get_css_value( $attr['fieldBorderRadius'], $attr['fieldBorderRadiusType'] ),
					'margin-top'       => AEOPR_Helper::get_css_value( $attr['fieldLabelSpacing'], 'px' ),
					'margin-bottom'    => AEOPR_Helper::get_css_value( $attr['fieldSpacing'], 'px' ),
					'color'            => $attr['fieldInputColor'],
					'text-align'       => $attr['align'],
					'padding-left'     => AEOPR_Helper::get_css_value( $attr['fieldHrPadding'], 'px' ),
					'padding-right'    => AEOPR_Helper::get_css_value( $attr['fieldHrPadding'], 'px' ),
					'padding-top'      => AEOPR_Helper::get_css_value( $attr['fieldVrPadding'], 'px' ),
					'padding-bottom'   => AEOPR_Helper::get_css_value( $attr['fieldVrPadding'], 'px' ),
				),
				' .chosen-container-single span'         => array(
					'background-color' => $attr['fieldBgColor'],
					'border-style'     => $attr['fieldBorderStyle'],
					'border-color'     => $attr['fieldBorderColor'],
					'border-width'     => AEOPR_Helper::get_css_value( $attr['fieldBorderWidth'], 'px' ),
					'border-radius'    => AEOPR_Helper::get_css_value( $attr['fieldBorderRadius'], $attr['fieldBorderRadiusType'] ),
					'margin-top'       => AEOPR_Helper::get_css_value( $attr['fieldLabelSpacing'], 'px' ),
					'margin-bottom'    => AEOPR_Helper::get_css_value( $attr['fieldSpacing'], 'px' ),
					'color'            => $attr['fieldInputColor'],
					'text-align'       => $attr['align'],
					'padding-left'     => AEOPR_Helper::get_css_value( $attr['fieldHrPadding'], 'px' ),
					'padding-right'    => AEOPR_Helper::get_css_value( $attr['fieldHrPadding'], 'px' ),
					'padding-top'      => AEOPR_Helper::get_css_value( $attr['fieldVrPadding'], 'px' ),
					'padding-bottom'   => AEOPR_Helper::get_css_value( $attr['fieldVrPadding'], 'px' ),
				),
				' .chosen-container-single.chosen-container-active .chosen-single span' => array(
					'margin-bottom' => 0,
				),
				' select.wpgf-form-control.wpgf-select:not([multiple="multiple"])' => array(
					'padding-left'   => AEOPR_Helper::get_css_value( $attr['fieldHrPadding'], 'px' ),
					'padding-right'  => AEOPR_Helper::get_css_value( $attr['fieldHrPadding'], 'px' ),
					'padding-top'    => AEOPR_Helper::get_css_value( $attr['fieldVrPadding'], 'px' ),
					'padding-bottom' => AEOPR_Helper::get_css_value( $attr['fieldVrPadding'], 'px' ),
				),
				' select.wpgf-select[multiple="multiple"] option' => array(
					'padding-left'   => AEOPR_Helper::get_css_value( $attr['fieldHrPadding'], 'px' ),
					'padding-right'  => AEOPR_Helper::get_css_value( $attr['fieldHrPadding'], 'px' ),
					'padding-top'    => AEOPR_Helper::get_css_value( $attr['fieldVrPadding'], 'px' ),
					'padding-bottom' => AEOPR_Helper::get_css_value( $attr['fieldVrPadding'], 'px' ),
				),
				' textarea'                              => array(
					'background-color' => $attr['fieldBgColor'],
					'color'            => $attr['fieldInputColor'],
					'border-color'     => $attr['fieldBorderColor'],
					'border-width'     => AEOPR_Helper::get_css_value( $attr['fieldBorderWidth'], 'px' ),
					'border-radius'    => AEOPR_Helper::get_css_value( $attr['fieldBorderRadius'], $attr['fieldBorderRadiusType'] ),
					'border-style'     => $attr['fieldBorderStyle'],
					'padding-left'     => AEOPR_Helper::get_css_value( $attr['fieldHrPadding'], 'px' ),
					'padding-right'    => AEOPR_Helper::get_css_value( $attr['fieldHrPadding'], 'px' ),
					'padding-top'      => AEOPR_Helper::get_css_value( $attr['fieldVrPadding'], 'px' ),
					'padding-bottom'   => AEOPR_Helper::get_css_value( $attr['fieldVrPadding'], 'px' ),
					'margin-top'       => AEOPR_Helper::get_css_value( $attr['fieldLabelSpacing'], 'px' ),
					'margin-bottom'    => AEOPR_Helper::get_css_value( $attr['fieldSpacing'], 'px' ),
					'text-align'       => $attr['align'],
					'height'           => $attr['textAreaHeight'],
				),
				' textarea::placeholder'                 => array(
					'color'      => $attr['fieldInputColor'],
					'text-align' => $attr['align'],
				),
				' input::placeholder'                    => array(
					'color'      => $attr['fieldInputColor'],
					'text-align' => $attr['align'],
				),
				' form label.gfield_label'               => array(
					'color'       => $attr['fieldLabelColor'],
					'font-size'   => AEOPR_Helper::get_css_value( $attr['labelFontSize'], $attr['labelFontSizeType'] ),
					'font-family' => $attr['labelFontFamily'],
					'font-weight' => $attr['labelFontWeight'],
					'line-height' => AEOPR_Helper::get_css_value( $attr['labelLineHeight'], $attr['labelLineHeightType'] ),
				),
				' form .gfield_radio label.gfield_label' => array(
					'color'       => $attr['fieldLabelColor'],
					'font-size'   => AEOPR_Helper::get_css_value( $attr['labelFontSize'], $attr['labelFontSizeType'] ),
					'font-family' => $attr['labelFontFamily'],
					'font-weight' => $attr['labelFontWeight'],
					'line-height' => AEOPR_Helper::get_css_value( $attr['labelLineHeight'], $attr['labelLineHeightType'] ),
				),
				' form .gfield_checkbox label.gfield_label' => array(
					'color'       => $attr['fieldLabelColor'],
					'font-size'   => AEOPR_Helper::get_css_value( $attr['labelFontSize'], $attr['labelFontSizeType'] ),
					'font-family' => $attr['labelFontFamily'],
					'font-weight' => $attr['labelFontWeight'],
					'line-height' => AEOPR_Helper::get_css_value( $attr['labelLineHeight'], $attr['labelLineHeightType'] ),
				),
				' .wpgf .gfield_checkbox input[type="checkbox"] + label, .wpgf .gfield_checkbox input[type="checkbox"] + label' => array(
					'margin-top' => AEOPR_Helper::get_css_value( $attr['fieldLabelSpacing'], 'px' ),
				),

				// Focus.
				' form input:not([type=submit]):focus'   => array(
					'border-color' => $attr['fieldBorderFocusColor'],
				),
				' form select:focus'                     => array(
					'border-color' => $attr['fieldBorderFocusColor'],
				),
				' textarea:focus'                        => array(
					'border-color' => $attr['fieldBorderFocusColor'],
				),

				// Submit button.
				' input.gform_button'                    => array(
					'color'            => $attr['buttonTextColor'],
					'background-color' => $attr['buttonBgColor'],
					'border-color'     => $attr['buttonBorderColor'],
					'border-style'     => $attr['buttonBorderStyle'],
					'border-width'     => AEOPR_Helper::get_css_value( $attr['buttonBorderWidth'], 'px' ),
					'border-radius'    => AEOPR_Helper::get_css_value( $attr['buttonBorderRadius'], $attr['buttonBorderRadiusType'] ),
					'padding-left'     => AEOPR_Helper::get_css_value( $attr['buttonHrPadding'], 'px' ),
					'padding-right'    => AEOPR_Helper::get_css_value( $attr['buttonHrPadding'], 'px' ),
					'padding-top'      => AEOPR_Helper::get_css_value( $attr['buttonVrPadding'], 'px' ),
					'padding-bottom'   => AEOPR_Helper::get_css_value( $attr['buttonVrPadding'], 'px' ),
				),
				' input.gform_button:hover'              => array(
					'color'            => $attr['buttonTextHoverColor'],
					'background-color' => $attr['buttonBgHoverColor'],
					'border-color'     => $attr['buttonBorderHoverColor'],
				),

				// Check box Radio.
				' .gfield_checkbox input[type="checkbox"]:checked + label:before' => array(
					'background-color' => $attr['fieldBgColor'],
					'color'            => $attr['fieldInputColor'],
					'font-size'        => 'calc( ' . $attr['fieldVrPadding'] . 'px / 1.2 )',
					'border-color'     => $attr['fieldBorderFocusColor'],
				),
				' .gfield_checkbox input[type="checkbox"] + label:before' => array(
					'background-color' => $attr['fieldBgColor'],
					'color'            => $attr['fieldInputColor'],
					'height'           => AEOPR_Helper::get_css_value( $attr['fieldVrPadding'], 'px' ),
					'width'            => AEOPR_Helper::get_css_value( $attr['fieldVrPadding'], 'px' ),
					'border-style'     => $attr['fieldBorderStyle'],
					'border-color'     => $attr['fieldBorderColor'],
					'border-width'     => AEOPR_Helper::get_css_value( $attr['fieldBorderWidth'], 'px' ),
					'border-radius'    => AEOPR_Helper::get_css_value( $attr['fieldBorderRadius'], $attr['fieldBorderRadiusType'] ),
					'font-size'        => 'calc( ' . $attr['fieldVrPadding'] . 'px / 1.2 )',
				),
				' input[type="checkbox"]:checked + label:before' => array(
					'background-color' => $attr['fieldBgColor'],
					'color'            => $attr['fieldInputColor'],
					'font-size'        => 'calc( ' . $attr['fieldVrPadding'] . 'px / 1.2 )',
					'border-color'     => $attr['fieldBorderFocusColor'],
				),
				' input[type="checkbox"] + label:before' => array(
					'background-color' => $attr['fieldBgColor'],
					'color'            => $attr['fieldInputColor'],
					'height'           => AEOPR_Helper::get_css_value( $attr['fieldVrPadding'], 'px' ),
					'width'            => AEOPR_Helper::get_css_value( $attr['fieldVrPadding'], 'px' ),
					'font-size'        => 'calc( ' . $attr['fieldVrPadding'] . 'px / 1.2 )',
					'border-color'     => $attr['fieldBorderColor'],
					'border-style'     => $attr['fieldBorderStyle'],
					'border-width'     => AEOPR_Helper::get_css_value( $attr['fieldBorderWidth'], 'px' ),
					'border-radius'    => AEOPR_Helper::get_css_value( $attr['fieldBorderRadius'], $attr['fieldBorderRadiusType'] ),
				),
				' .gfield_radio input[type="radio"] + label:before' => array(
					'background-color' => $attr['fieldBgColor'],
					'color'            => $attr['fieldInputColor'],
					'height'           => AEOPR_Helper::get_css_value( $attr['fieldVrPadding'], 'px' ),
					'width'            => AEOPR_Helper::get_css_value( $attr['fieldVrPadding'], 'px' ),
					'border-style'     => $attr['fieldBorderStyle'],
					'border-color'     => $attr['fieldBorderColor'],
					'border-width'     => AEOPR_Helper::get_css_value( $attr['fieldBorderWidth'], 'px' ),
				),
				' .gfield_radio input[type="radio"]:checked + label:before' => array(
					'border-color' => $attr['fieldBorderFocusColor'],
				),

				// Underline border.
				' .aeopr-gf-styler__field-style-underline input:not([type=submit])' => array(
					'border-style'        => 'none',
					'border-bottom-color' => $attr['fieldBorderColor'],
					'border-bottom-style' => 'solid',
					'border-bottom-width' => AEOPR_Helper::get_css_value( $attr['fieldBorderWidth'], 'px' ),
					'border-radius'       => AEOPR_Helper::get_css_value( $attr['fieldBorderRadius'], $attr['fieldBorderRadiusType'] ),
				),
				' .aeopr-gf-styler__field-style-underline textarea' => array(
					'border-style'        => 'none',
					'border-bottom-color' => $attr['fieldBorderColor'],
					'border-bottom-style' => 'solid',
					'border-bottom-width' => AEOPR_Helper::get_css_value( $attr['fieldBorderWidth'], 'px' ),
					'border-radius'       => AEOPR_Helper::get_css_value( $attr['fieldBorderRadius'], $attr['fieldBorderRadiusType'] ),
				),
				' .aeopr-gf-styler__field-style-underline select' => array(
					'border-style'        => 'none',
					'border-bottom-color' => $attr['fieldBorderColor'],
					'border-bottom-style' => 'solid',
					'border-bottom-width' => AEOPR_Helper::get_css_value( $attr['fieldBorderWidth'], 'px' ),
					'border-radius'       => AEOPR_Helper::get_css_value( $attr['fieldBorderRadius'], $attr['fieldBorderRadiusType'] ),
				),
				' .aeopr-gf-styler__field-style-underline textarea' => array(
					'border-style'        => 'none',
					'border-bottom-color' => $attr['fieldBorderColor'],
					'border-bottom-style' => 'solid',
					'border-bottom-width' => AEOPR_Helper::get_css_value( $attr['fieldBorderWidth'], 'px' ),
					'border-radius'       => AEOPR_Helper::get_css_value( $attr['fieldBorderRadius'], $attr['fieldBorderRadiusType'] ),
				),
				' .aeopr-gf-styler__check-style-enabled .gfield_checkbox input[type="checkbox"] + label:before' => array(
					'border-style' => 'solid',
				),
				' .aeopr-gf-styler__check-style-enabled input[type="radio"] + label:before' => array(
					'border-style' => 'solid',
				),
				' .aeopr-gf-styler__field-style-box .gfield_checkbox input[type="checkbox"]:checked + label:before' => array(
					'border-style'  => 'solid',
					'border-width'  => AEOPR_Helper::get_css_value( $attr['fieldBorderWidth'], 'px' ),
					'border-radius' => AEOPR_Helper::get_css_value( $attr['fieldBorderRadius'], $attr['fieldBorderRadiusType'] ),
					'font-size'     => 'calc( ' . $attr['radioCheckSize'] . 'px / 1.2 )',
				),
				' .aeopr-gf-styler__field-style-box input[type="checkbox"]:checked + label:before' => array(
					'border-style'  => 'solid',
					'border-width'  => AEOPR_Helper::get_css_value( $attr['fieldBorderWidth'], 'px' ),
					'border-radius' => AEOPR_Helper::get_css_value( $attr['fieldBorderRadius'], $attr['fieldBorderRadiusType'] ),
					'font-size'     => 'calc( ' . $attr['radioCheckSize'] . 'px / 1.2 )',
				),
				' .gfield_radio input[type="radio"]:checked + label:before' => array(
					'background-color' => $attr['fieldInputColor'],
				),

				// Override check box.
				' .aeopr-gf-styler__check-style-enabled .gfield_checkbox input[type="checkbox"] + label:before' => array(
					'background-color' => $attr['radioCheckBgColor'],
					'color'            => $attr['radioCheckSelectColor'],
					'height'           => AEOPR_Helper::get_css_value( $attr['radioCheckSize'], 'px' ),
					'width'            => AEOPR_Helper::get_css_value( $attr['radioCheckSize'], 'px' ),
					'font-size'        => 'calc( ' . $attr['radioCheckSize'] . 'px / 1.2 )',
					'border-color'     => $attr['radioCheckBorderColor'],
					'border-style'     => 'solid',
					'border-width'     => AEOPR_Helper::get_css_value( $attr['radioCheckBorderWidth'], 'px' ),
					'border-radius'    => AEOPR_Helper::get_css_value( $attr['radioCheckBorderRadius'], $attr['radioCheckBorderRadiusType'] ),
				),
				' .aeopr-gf-styler__check-style-enabled .gfield_checkbox input[type="checkbox"]:checked + label:before' => array(
					'border-color' => $attr['fieldBorderFocusColor'],
				),
				' .aeopr-gf-styler__check-style-enabled input[type="checkbox"] + label:before' => array(
					'background-color' => $attr['radioCheckBgColor'],
					'color'            => $attr['radioCheckSelectColor'],
					'height'           => AEOPR_Helper::get_css_value( $attr['radioCheckSize'], 'px' ),
					'width'            => AEOPR_Helper::get_css_value( $attr['radioCheckSize'], 'px' ),
					'font-size'        => 'calc( ' . $attr['radioCheckSize'] . 'px / 1.2 )',
					'border-color'     => $attr['radioCheckBorderColor'],
					'border-width'     => AEOPR_Helper::get_css_value( $attr['radioCheckBorderWidth'], 'px' ),
					'border-radius'    => AEOPR_Helper::get_css_value( $attr['radioCheckBorderRadius'], $attr['radioCheckBorderRadiusType'] ),
				),
				' .aeopr-gf-styler__check-style-enabled input[type="checkbox"]:checked + label:before' => array(
					'border-color' => $attr['fieldBorderFocusColor'],
				),

				' .aeopr-gf-styler__check-style-enabled input[type="radio"] + label:before' => array(
					'background-color' => $attr['radioCheckBgColor'],
					'color'            => $attr['radioCheckSelectColor'],
					'height'           => AEOPR_Helper::get_css_value( $attr['radioCheckSize'], 'px' ),
					'width'            => AEOPR_Helper::get_css_value( $attr['radioCheckSize'], 'px' ),
					'font-size'        => 'calc( ' . $attr['radioCheckSize'] . 'px / 1.2 )',
					'border-color'     => $attr['radioCheckBorderColor'],
					'border-width'     => AEOPR_Helper::get_css_value( $attr['radioCheckBorderWidth'], 'px' ),
				),
				' .aeopr-gf-styler__check-style-enabled .gfield_radio input[type="radio"]:checked + label:before' => array(
					'background-color' => $attr['radioCheckSelectColor'],
				),
				' .aeopr-gf-styler__check-style-enabled form .gfield_radio label' => array(
					'color' => $attr['radioCheckLableColor'],
				),
				' .aeopr-gf-styler__check-style-enabled form .gfield_checkbox label' => array(
					'color' => $attr['radioCheckLableColor'],
				),
				// Validation Errors.
				' .gform_wrapper .gfield_description.validation_message' => array(
					'color' => $attr['validationMsgColor'],
				),
				' .aeopr-gf-styler__error-yes .gform_wrapper .gfield.gfield_error' => array(
					'background-color' => $attr['validationMsgBgColor'],
				),

				' .aeopr-gf-styler__error-yes .gform_wrapper li.gfield_error input:not([type="submit"]):not([type="button"]):not([type="image"])' => array(
					'border-color' => $attr['highlightBorderColor'],
				),

				' .aeopr-gf-styler__error-yes .gform_wrapper .gfield_error .ginput_container select' => array(
					'border-color' => $attr['highlightBorderColor'],
				),

				' .aeopr-gf-styler__error-yes .gform_wrapper .gfield_error .ginput_container .chosen-single' => array(
					'border-color' => $attr['highlightBorderColor'],
				),

				' .aeopr-gf-styler__error-yes .gform_wrapper .gfield_error .ginput_container textarea' => array(
					'border-color' => $attr['highlightBorderColor'],
				),

				' .aeopr-gf-styler__error-yes .gform_wrapper li.gfield.gfield_error' => array(
					'border-color' => $attr['highlightBorderColor'],
				),

				' .aeopr-gf-styler__error-yes .gform_wrapper li.gfield.gfield_error.gfield_contains_required.gfield_creditcard_warning' => array(
					'border-color' => $attr['highlightBorderColor'],
				),

				' .aeopr-gf-styler__error-yes li.gfield_error .gfield_checkbox input[type="checkbox"] + label:before' => array(
					'border-color' => $attr['highlightBorderColor'],
				),

				' .aeopr-gf-styler__error-yes li.gfield_error .ginput_container_consent input[type="checkbox"] + label:before' => array(
					'border-color' => $attr['highlightBorderColor'],
				),

				' .aeopr-gf-styler__error-yes li.gfield_error .gfield_radio input[type="radio"] + label:before' => array(
					'border-color' => $attr['highlightBorderColor'],
				),

				' .aeopr-gf-styler__error-yes .gform_wrapper li.gfield_error input[type="text"]' => array(
					'border' => $attr['fieldBorderWidth'] . 'px ' . $attr['fieldBorderStyle'] . ' ' . $attr['fieldBorderColor'] . '!important',
				),

				' .uael-gf-style-underline.aeopr-gf-styler__error-yes .gform_wrapper li.gfield_error input[type="text"]' => array(
					'border-width' => $attr['fieldBorderWidth'] . 'px !important',
					'border-style' => 'solid !important',
					'border-color' => $attr['fieldBorderColor'] . '!important',
				),

				' .gform_wrapper div.validation_error'   => array(
					'color'            => $attr['errorMsgColor'],
					'background-color' => $attr['errorMsgBgColor'],
					'border-color'     => $attr['errorMsgBorderColor'],
					'border-style'     => 'solid',
					'border-width'     => AEOPR_Helper::get_css_value( $attr['msgBorderSize'], 'px' ),
					'border-radius'    => AEOPR_Helper::get_css_value( $attr['msgBorderRadius'], $attr['msgBorderRadiusType'] ),
					'padding'          => $attr['msgVrPadding'] . 'px ' . $attr['msgHrPadding'] . 'px',
				),

				' .gform_confirmation_message'           => array(
					'color' => $attr['successMsgColor'],
				),
			);

			$t_selectors = array(
				' form.wpgf-form:not(input)' => array(
					'color' => $attr['fieldLabelColor'],
				),
			);

			$m_selectors = array();

			$combined_selectors = array(
				'desktop' => $selectors,
				'tablet'  => $t_selectors,
				'mobile'  => $m_selectors,
			);

			$combined_selectors = AEOPR_Helper::get_typography_css( $attr, 'validationMsg', ' .gform_wrapper .validation_message', $combined_selectors );
			$combined_selectors = AEOPR_Helper::get_typography_css( $attr, 'validationMsg', ' span.wpgf-not-valid-tip', $combined_selectors );
			$combined_selectors = AEOPR_Helper::get_typography_css( $attr, 'successMsg', ' .gform_confirmation_message', $combined_selectors );
			$combined_selectors = AEOPR_Helper::get_typography_css( $attr, 'msg', ' .gform_wrapper div.validation_error', $combined_selectors );
			$combined_selectors = AEOPR_Helper::get_typography_css( $attr, 'msg', ' .wpgf-response-output', $combined_selectors );
			$combined_selectors = AEOPR_Helper::get_typography_css( $attr, 'button', ' input.gform_button', $combined_selectors );
			$combined_selectors = AEOPR_Helper::get_typography_css( $attr, 'label', ' form .gfield_checkbox label.gfield_label', $combined_selectors );
			$combined_selectors = AEOPR_Helper::get_typography_css( $attr, 'label', ' form .gfield_radio label.gfield_label', $combined_selectors );
			$combined_selectors = AEOPR_Helper::get_typography_css( $attr, 'label', ' form label.gfield_label', $combined_selectors );
			$combined_selectors = AEOPR_Helper::get_typography_css( $attr, 'input', ' textarea', $combined_selectors );
			$combined_selectors = AEOPR_Helper::get_typography_css( $attr, 'input', ' select', $combined_selectors );
			$combined_selectors = AEOPR_Helper::get_typography_css( $attr, 'input', ' input:not([type=submit])', $combined_selectors );
			$combined_selectors = AEOPR_Helper::get_typography_css( $attr, 'radioCheck', ' .aeopr-gf-styler__check-style-enabled form .gfield_checkbox label', $combined_selectors );
			$combined_selectors = AEOPR_Helper::get_typography_css( $attr, 'input', ' .chosen-container-single span', $combined_selectors );
			$combined_selectors = AEOPR_Helper::get_typography_css( $attr, 'radioCheck', ' .aeopr-gf-styler__check-style-enabled form .gfield_radio label', $combined_selectors );

			return AEOPR_Helper::generate_all_css( $combined_selectors, '.aeopr-block-' . $id );
		}

		/**
		 * Get Marketing Button Block CSS
		 *
		 * @since 1.11.0
		 * @param array  $attr The block attributes.
		 * @param string $id The selector ID.
		 * @return array The Widget List.
		 */
		public static function get_marketing_btn_css( $attr, $id ) {

			$defaults = AEOPR_Helper::$block_list['aeopr/marketing-button']['attributes'];

			$attr = array_merge( $defaults, (array) $attr );

			$m_selectors = array();
			$t_selectors = array();

			$icon_color       = ( '' === $attr['iconColor'] ) ? $attr['titleColor'] : $attr['iconColor'];
			$icon_hover_color = ( '' === $attr['iconHoverColor'] ) ? $attr['titleHoverColor'] : $attr['iconHoverColor'];

			$selectors = array(
				' .aeopr-marketing-btn__title-wrap'    => array(
					'margin-bottom' => AEOPR_Helper::get_css_value( $attr['titleSpace'], 'px' ),
				),
				' .aeopr-marketing-btn__title'         => array(
					'color' => $attr['titleColor'],
				),
				' .aeopr-marketing-btn__icon-wrap'     => array(
					'width'  => AEOPR_Helper::get_css_value( $attr['iconFontSize'], $attr['iconFontSizeType'] ),
					'height' => AEOPR_Helper::get_css_value( $attr['iconFontSize'], $attr['iconFontSizeType'] ),
				),
				' .aeopr-marketing-btn__icon-wrap svg' => array(
					'fill' => $icon_color,
				),
				' .aeopr-marketing-btn__prefix'        => array(
					'color' => $attr['prefixColor'],
				),
				' .aeopr-marketing-btn__link:hover .aeopr-marketing-btn__title' => array(
					'color' => $attr['titleHoverColor'],
				),
				' .aeopr-marketing-btn__link:hover .aeopr-marketing-btn__prefix' => array(
					'color' => $attr['prefixHoverColor'],
				),
				' .aeopr-marketing-btn__link:hover .aeopr-marketing-btn__icon-wrap svg' => array(
					'fill' => $icon_hover_color,
				),
				' .aeopr-marketing-btn__link'          => array(
					'padding-left'   => AEOPR_Helper::get_css_value( $attr['hPadding'], $attr['paddingType'] ),
					'padding-right'  => AEOPR_Helper::get_css_value( $attr['hPadding'], $attr['paddingType'] ),
					'padding-top'    => AEOPR_Helper::get_css_value( $attr['vPadding'], $attr['paddingType'] ),
					'padding-bottom' => AEOPR_Helper::get_css_value( $attr['vPadding'], $attr['paddingType'] ),
					'border-style'   => $attr['borderStyle'],
					'border-width'   => AEOPR_Helper::get_css_value( $attr['borderWidth'], 'px' ),
					'border-color'   => $attr['borderColor'],
					'border-radius'  => AEOPR_Helper::get_css_value( $attr['borderRadius'], 'px' ),
				),
				' .aeopr-marketing-btn__link:hover'    => array(
					'border-color' => $attr['borderHoverColor'],
				),
			);

			if ( 'transparent' === $attr['backgroundType'] ) {

				$selectors[' .aeopr-marketing-btn__link']['background'] = 'transparent';

			} elseif ( 'color' === $attr['backgroundType'] ) {

				$selectors[' .aeopr-marketing-btn__link']['background'] = AEOPR_Helper::hex2rgba( $attr['backgroundColor'], $attr['backgroundOpacity'] );

				// Hover Background.
				$selectors[' .aeopr-marketing-btn__link:hover']['background'] = AEOPR_Helper::hex2rgba( $attr['backgroundHoverColor'], $attr['backgroundHoverOpacity'] );

			} elseif ( 'gradient' === $attr['backgroundType'] ) {

				$selectors[' .aeopr-marketing-btn__link']['background-color'] = 'transparent';

				if ( 'linear' === $attr['gradientType'] ) {

					$selectors[' .aeopr-marketing-btn__link']['background-image'] = 'linear-gradient(' . $attr['gradientAngle'] . 'deg, ' . AEOPR_Helper::hex2rgba( $attr['gradientColor1'], $attr['backgroundOpacity'] ) . ' ' . $attr['gradientLocation1'] . '%, ' . AEOPR_Helper::hex2rgba( $attr['gradientColor2'], $attr['backgroundOpacity'] ) . ' ' . $attr['gradientLocation2'] . '%)';
				} else {

					$selectors[' .aeopr-marketing-btn__link']['background-image'] = 'radial-gradient( at center center, ' . AEOPR_Helper::hex2rgba( $attr['gradientColor1'], $attr['backgroundOpacity'] ) . ' ' . $attr['gradientLocation1'] . '%, ' . AEOPR_Helper::hex2rgba( $attr['gradientColor2'], $attr['backgroundOpacity'] ) . ' ' . $attr['gradientLocation2'] . '%)';
				}
			}

			$margin_type = ( 'after' === $attr['iconPosition'] ) ? 'margin-left' : 'margin-right';

			$selectors[' .aeopr-marketing-btn__icon-wrap'][ $margin_type ] = AEOPR_Helper::get_css_value( $attr['iconSpace'], 'px' );

			$m_selectors = array(
				' .aeopr-marketing-btn__icon-wrap' => array(
					'width'  => AEOPR_Helper::get_css_value( $attr['iconFontSizeMobile'], $attr['iconFontSizeType'] ),
					'height' => AEOPR_Helper::get_css_value( $attr['iconFontSizeMobile'], $attr['iconFontSizeType'] ),
				),
				' .aeopr-marketing-btn__link'      => array(
					'padding-left'   => AEOPR_Helper::get_css_value( $attr['hPaddingMobile'], $attr['paddingType'] ),
					'padding-right'  => AEOPR_Helper::get_css_value( $attr['hPaddingMobile'], $attr['paddingType'] ),
					'padding-top'    => AEOPR_Helper::get_css_value( $attr['vPaddingMobile'], $attr['paddingType'] ),
					'padding-bottom' => AEOPR_Helper::get_css_value( $attr['vPaddingMobile'], $attr['paddingType'] ),
				),

			);

			$t_selectors = array(
				' .aeopr-marketing-btn__icon-wrap' => array(
					'width'  => AEOPR_Helper::get_css_value( $attr['iconFontSizeTablet'], $attr['iconFontSizeType'] ),
					'height' => AEOPR_Helper::get_css_value( $attr['iconFontSizeTablet'], $attr['iconFontSizeType'] ),
				),
				' .aeopr-marketing-btn__link'      => array(
					'padding-left'   => AEOPR_Helper::get_css_value( $attr['hPaddingTablet'], $attr['paddingType'] ),
					'padding-right'  => AEOPR_Helper::get_css_value( $attr['hPaddingTablet'], $attr['paddingType'] ),
					'padding-top'    => AEOPR_Helper::get_css_value( $attr['vPaddingTablet'], $attr['paddingType'] ),
					'padding-bottom' => AEOPR_Helper::get_css_value( $attr['vPaddingTablet'], $attr['paddingType'] ),
				),

			);

			$combined_selectors = array(
				'desktop' => $selectors,
				'tablet'  => $t_selectors,
				'mobile'  => $m_selectors,
			);

			$combined_selectors = AEOPR_Helper::get_typography_css( $attr, 'title', ' .aeopr-marketing-btn__title', $combined_selectors );
			$combined_selectors = AEOPR_Helper::get_typography_css( $attr, 'prefix', ' .aeopr-marketing-btn__prefix', $combined_selectors );

			$base_selector = ( $attr['classMigrate'] ) ? '.aeopr-block-' : '#aeopr-marketing-btn-';

			return AEOPR_Helper::generate_all_css( $combined_selectors, $base_selector . $id );
		}

		/**
		 * Get Table of Contents Block CSS
		 *
		 * @since 1.13.0
		 * @param array  $attr The block attributes.
		 * @param string $id The selector ID.
		 * @return array The Widget List.
		 */
		public static function get_table_of_contents_css( $attr, $id ) {

			$defaults = AEOPR_Helper::$block_list['aeopr/table-of-contents']['attributes'];

			$attr        = array_merge( $defaults, (array) $attr );
			$m_selectors = array();
			$t_selectors = array();

			$selectors = array(
				' .aeopr-toc__list-wrap ul li a:hover' => array(
					'color' => $attr['linkHoverColor'],
				),
				' .aeopr-toc__list-wrap ul li a'       => array(
					'color' => $attr['linkColor'],
				),
				' .aeopr-toc__title'                   => array(
					'color'         => $attr['headingColor'],
					'margin-bottom' => AEOPR_Helper::get_css_value( $attr['headingBottom'], 'px' ),
				),
				' .aeopr-toc__wrap'                    => array(
					'border-style'   => $attr['borderStyle'],
					'border-width'   => AEOPR_Helper::get_css_value( $attr['borderWidth'], 'px' ),
					'border-color'   => $attr['borderColor'],
					'border-radius'  => AEOPR_Helper::get_css_value( $attr['borderRadius'], 'px' ),
					'padding-left'   => AEOPR_Helper::get_css_value( $attr['hPaddingDesktop'], $attr['paddingTypeDesktop'] ),
					'padding-right'  => AEOPR_Helper::get_css_value( $attr['hPaddingDesktop'], $attr['paddingTypeDesktop'] ),
					'padding-top'    => AEOPR_Helper::get_css_value( $attr['vPaddingDesktop'], $attr['paddingTypeDesktop'] ),
					'padding-bottom' => AEOPR_Helper::get_css_value( $attr['vPaddingDesktop'], $attr['paddingTypeDesktop'] ),
					'background'     => $attr['backgroundColor'],
				),
				' .aeopr-toc__list-wrap'               => array(
					'column-count' => $attr['tColumnsDesktop'],
					'overflow'     => 'hidden',
				),
				' .aeopr-toc__list-wrap > ul.aeopr-toc__list > li:first-child' => array(
					'padding-top' => 0,
				),
				' .aeopr-toc__list-wrap > ul.aeopr-toc__list li' => array(
					'color' => $attr['bulletColor'],
				),
				' .aeopr-toc__list-wrap ul.aeopr-toc__list:first-child' => array(
					'margin-left'   => AEOPR_Helper::get_css_value( $attr['hMarginDesktop'], $attr['marginTypeDesktop'] ),
					'margin-right'  => AEOPR_Helper::get_css_value( $attr['hMarginDesktop'], $attr['marginTypeDesktop'] ),
					'margin-top'    => AEOPR_Helper::get_css_value( $attr['vMarginDesktop'], $attr['marginTypeDesktop'] ),
					'margin-bottom' => AEOPR_Helper::get_css_value( $attr['vMarginDesktop'], $attr['marginTypeDesktop'] ),
				),
				' .aeopr-toc__list-wrap ul.aeopr-toc__list:last-child > li:last-child' => array(
					'padding-bottom' => 0,
				),
				' .uag-toc__collapsible-wrap svg'     => array(
					'width'  => AEOPR_Helper::get_css_value( $attr['iconSize'], 'px' ),
					'height' => AEOPR_Helper::get_css_value( $attr['iconSize'], 'px' ),
					'fill'   => $attr['iconColor'],
				),
			);

			if ( '' !== $attr['contentPaddingDesktop'] ) {
				$selectors[' .aeopr-toc__list-wrap ul.aeopr-toc__list > li']['padding-top']    = 'calc( ' . AEOPR_Helper::get_css_value( $attr['contentPaddingDesktop'] . $attr['contentPaddingTypeDesktop'] ) . ' / 2 )';
				$selectors[' .aeopr-toc__list-wrap ul.aeopr-toc__list > li']['padding-bottom'] = 'calc( ' . AEOPR_Helper::get_css_value( $attr['contentPaddingDesktop'] . $attr['contentPaddingTypeDesktop'] ) . ' / 2 )';
			}

			if ( $attr['customWidth'] ) {
				$selectors[' .aeopr-toc__wrap']['width'] = AEOPR_Helper::get_css_value( $attr['widthDesktop'], $attr['widthTypeDesktop'] );
			}

			if ( $attr['disableBullets'] ) {
				$selectors[' .aeopr-toc__list']                 = array(
					'list-style-type' => 'none',
				);
				$selectors[' .aeopr-toc__list .aeopr-toc__list'] = array(
					'list-style-type' => 'none',
				);
			}

			$m_selectors = array(
				' .aeopr-toc__wrap'      => array(
					'width'          => AEOPR_Helper::get_css_value( $attr['widthMobile'], $attr['widthTypeMobile'] ),
					'padding-left'   => AEOPR_Helper::get_css_value( $attr['hPaddingMobile'], $attr['paddingTypeMobile'] ),
					'padding-right'  => AEOPR_Helper::get_css_value( $attr['hPaddingMobile'], $attr['paddingTypeMobile'] ),
					'padding-top'    => AEOPR_Helper::get_css_value( $attr['vPaddingMobile'], $attr['paddingTypeMobile'] ),
					'padding-bottom' => AEOPR_Helper::get_css_value( $attr['vPaddingMobile'], $attr['paddingTypeMobile'] ),
				),
				' .aeopr-toc__list-wrap' => array(
					'column-count' => $attr['tColumnsMobile'],
					'overflow'     => 'hidden',
				),
				' .aeopr-toc__list-wrap > ul.aeopr-toc__list > li:first-child' => array(
					'padding-top' => 0,
				),
				' .aeopr-toc__list-wrap ul.aeopr-toc__list:last-child > li:last-child' => array(
					'padding-bottom' => 0,
				),

			);

			$t_selectors = array(
				' .aeopr-toc__wrap'      => array(
					'width'          => AEOPR_Helper::get_css_value( $attr['widthTablet'], $attr['widthTypeTablet'] ),
					'padding-left'   => AEOPR_Helper::get_css_value( $attr['hPaddingTablet'], $attr['paddingTypeTablet'] ),
					'padding-right'  => AEOPR_Helper::get_css_value( $attr['hPaddingTablet'], $attr['paddingTypeTablet'] ),
					'padding-top'    => AEOPR_Helper::get_css_value( $attr['vPaddingTablet'], $attr['paddingTypeTablet'] ),
					'padding-bottom' => AEOPR_Helper::get_css_value( $attr['vPaddingTablet'], $attr['paddingTypeTablet'] ),
				),
				' .aeopr-toc__list-wrap' => array(
					'column-count' => $attr['tColumnsTablet'],
					'overflow'     => 'hidden',
				),
				' .aeopr-toc__list-wrap > ul.aeopr-toc__list > li:first-child' => array(
					'padding-top' => 0,
				),
				' .aeopr-toc__list-wrap ul.aeopr-toc__list:last-child > li:last-child' => array(
					'padding-bottom' => 0,
				),
			);

			if ( '' !== $attr['contentPaddingTablet'] ) {
				$t_selectors[' .aeopr-toc__list-wrap ul.aeopr-toc__list > li'] = array(
					'padding-top'    => 'calc( ' . AEOPR_Helper::get_css_value( $attr['contentPaddingTablet'] . $attr['contentPaddingTypeTablet'] ) . ' / 2 )',
					'padding-bottom' => 'calc( ' . AEOPR_Helper::get_css_value( $attr['contentPaddingTablet'] . $attr['contentPaddingTypeTablet'] ) . ' / 2 )',
				);
			}

			if ( '' !== $attr['contentPaddingMobile'] ) {
				$m_selectors[' .aeopr-toc__list-wrap ul.aeopr-toc__list > li'] = array(
					'padding-top'    => 'calc( ' . AEOPR_Helper::get_css_value( $attr['contentPaddingMobile'] . $attr['contentPaddingTypeMobile'] ) . ' / 2 )',
					'padding-bottom' => 'calc( ' . AEOPR_Helper::get_css_value( $attr['contentPaddingMobile'] . $attr['contentPaddingTypeMobile'] ) . ' / 2 )',
				);
			}

			$combined_selectors = array(
				'desktop' => $selectors,
				'tablet'  => $t_selectors,
				'mobile'  => $m_selectors,
			);

			$combined_selectors = AEOPR_Helper::get_typography_css( $attr, 'heading', ' .aeopr-toc__title', $combined_selectors );
			$combined_selectors = AEOPR_Helper::get_typography_css( $attr, '', ' .aeopr-toc__list-wrap ul li a', $combined_selectors );

			$base_selector = ( $attr['classMigrate'] ) ? '.aeopr-block-' : '#aeopr-toc-';

			$desktop = AEOPR_Helper::generate_css( $combined_selectors['desktop'], $base_selector . $id );

			$tablet = AEOPR_Helper::generate_css( $combined_selectors['tablet'], $base_selector . $id );

			$mobile = AEOPR_Helper::generate_css( $combined_selectors['mobile'], $base_selector . $id );

			if ( '' !== $attr['scrollToTopColor'] ) {
				$desktop .= '.aeopr-toc__scroll-top { color: ' . $attr['scrollToTopColor'] . '; }';
			}

			if ( '' !== $attr['scrollToTopBgColor'] ) {
				$desktop .= '.aeopr-toc__scroll-top.aeopr-toc__show-scroll { background: ' . $attr['scrollToTopBgColor'] . '; }';
			}

			$generated_css = array(
				'desktop' => $desktop,
				'tablet'  => $tablet,
				'mobile'  => $mobile,
			);

			return $generated_css;
		}

		/**
		 * Get FAQ CSS.
		 *
		 * @since 1.15.0
		 * @param array  $attr The block attributes.
		 * @param string $id The selector ID.
		 */
		public static function get_faq_css( $attr, $id ) {

			$defaults = AEOPR_Helper::$block_list['aeopr/faq']['attributes'];

			$attr = array_merge( $defaults, $attr );

			$icon_color        = $attr['iconColor'];
			$icon_active_color = $attr['iconActiveColor'];

			if ( ! isset( $attr['iconColor'] ) || '' === $attr['iconColor'] ) {

				$icon_color = $attr['questionTextColor'];
			}
			if ( ! isset( $attr['iconActiveColor'] ) || '' === $attr['iconActiveColor'] ) {

				$icon_active_color = $attr['questionTextActiveColor'];
			}

			$icon_size   = AEOPR_Helper::get_css_value( $attr['iconSize'], $attr['iconSizeType'] );
			$t_icon_size = AEOPR_Helper::get_css_value( $attr['iconSizeTablet'], $attr['iconSizeType'] );
			$m_icon_size = AEOPR_Helper::get_css_value( $attr['iconSizeMobile'], $attr['iconSizeType'] );

			$selectors = array(
				' .aeopr-icon svg'                      => array(
					'width'     => $icon_size,
					'height'    => $icon_size,
					'font-size' => $icon_size,
					'fill'      => $icon_color,
				),
				' .aeopr-icon-active svg'               => array(
					'width'     => $icon_size,
					'height'    => $icon_size,
					'font-size' => $icon_size,
					'fill'      => $icon_active_color,
				),
				' .aeopr-faq-child__outer-wrap'         => array(
					'margin-bottom' => AEOPR_Helper::get_css_value( $attr['rowsGap'], 'px' ),
				),
				' .aeopr-faq-item'                      => array(
					'background-color' => $attr['boxBgColor'],
					'border-style'     => $attr['borderStyle'],
					'border-width'     => AEOPR_Helper::get_css_value( $attr['borderWidth'], 'px' ),
					'border-radius'    => AEOPR_Helper::get_css_value( $attr['borderRadius'], 'px' ),
					'border-color'     => $attr['borderColor'],
				),
				' .aeopr-faq-item .aeopr-question'       => array(
					'color' => $attr['questionTextColor'],
				),
				' .aeopr-faq-item.aeopr-faq-item-active .aeopr-question' => array(
					'color' => $attr['questionTextActiveColor'],
				),
				' .aeopr-faq-item:hover .aeopr-question' => array(
					'color' => $attr['questionTextActiveColor'],
				),
				' .aeopr-faq-questions-button'          => array(
					'padding-top'    => AEOPR_Helper::get_css_value( $attr['vquestionPaddingDesktop'], $attr['questionPaddingTypeDesktop'] ),
					'padding-bottom' => AEOPR_Helper::get_css_value( $attr['vquestionPaddingDesktop'], $attr['questionPaddingTypeDesktop'] ),
					'padding-right'  => AEOPR_Helper::get_css_value( $attr['hquestionPaddingDesktop'], $attr['questionPaddingTypeDesktop'] ),
					'padding-left'   => AEOPR_Helper::get_css_value( $attr['hquestionPaddingDesktop'], $attr['questionPaddingTypeDesktop'] ),
				),
				' .aeopr-faq-content span'              => array(
					'margin-top'    => AEOPR_Helper::get_css_value( $attr['vanswerPaddingDesktop'], $attr['answerPaddingTypeDesktop'] ),
					'margin-bottom' => AEOPR_Helper::get_css_value( $attr['vanswerPaddingDesktop'], $attr['answerPaddingTypeDesktop'] ),
					'margin-right'  => AEOPR_Helper::get_css_value( $attr['hanswerPaddingDesktop'], $attr['answerPaddingTypeDesktop'] ),
					'margin-left'   => AEOPR_Helper::get_css_value( $attr['hanswerPaddingDesktop'], $attr['answerPaddingTypeDesktop'] ),
				),
				'.aeopr-faq-icon-row .aeopr-faq-item .aeopr-faq-icon-wrap' => array(
					'margin-right' => AEOPR_Helper::get_css_value( $attr['gapBtwIconQUestion'], 'px' ),
				),
				'.aeopr-faq-icon-row-reverse .aeopr-faq-item .aeopr-faq-icon-wrap' => array(
					'margin-left' => AEOPR_Helper::get_css_value( $attr['gapBtwIconQUestion'], 'px' ),
				),
				' .aeopr-faq-item:hover .aeopr-icon svg' => array(
					'fill' => $icon_active_color,
				),
				' .aeopr-faq-item .aeopr-faq-questions-button.aeopr-faq-questions' => array(
					'flex-direction' => $attr['iconAlign'],
				),
				' .aeopr-faq-item .aeopr-faq-content p'  => array(
					'color' => $attr['answerTextColor'],
				),
			);

			$t_selectors = array(
				' .aeopr-faq-questions-button' => array(
					'padding-top'    => AEOPR_Helper::get_css_value( $attr['vquestionPaddingTablet'], $attr['questionPaddingTypeTablet'] ),
					'padding-bottom' => AEOPR_Helper::get_css_value( $attr['vquestionPaddingTablet'], $attr['questionPaddingTypeTablet'] ),
					'padding-right'  => AEOPR_Helper::get_css_value( $attr['hquestionPaddingTablet'], $attr['questionPaddingTypeTablet'] ),
					'padding-left'   => AEOPR_Helper::get_css_value( $attr['hquestionPaddingTablet'], $attr['questionPaddingTypeTablet'] ),
				),
				' .aeopr-faq-content span'     => array(
					'margin-top'    => AEOPR_Helper::get_css_value( $attr['vanswerPaddingTablet'], $attr['answerPaddingTypeTablet'] ),
					'margin-bottom' => AEOPR_Helper::get_css_value( $attr['vanswerPaddingTablet'], $attr['answerPaddingTypeTablet'] ),
					'margin-right'  => AEOPR_Helper::get_css_value( $attr['hanswerPaddingTablet'], $attr['answerPaddingTypeTablet'] ),
					'margin-left'   => AEOPR_Helper::get_css_value( $attr['hanswerPaddingTablet'], $attr['answerPaddingTypeTablet'] ),
				),
				' .aeopr-icon svg'             => array(
					'width'     => $t_icon_size,
					'height'    => $t_icon_size,
					'font-size' => $t_icon_size,
				),
				' .aeopr-icon-active svg'      => array(
					'width'     => $t_icon_size,
					'height'    => $t_icon_size,
					'font-size' => $t_icon_size,
				),
			);
			$m_selectors = array(
				' .aeopr-faq-questions-button' => array(
					'padding-top'    => AEOPR_Helper::get_css_value( $attr['vquestionPaddingMobile'], $attr['questionPaddingTypeMobile'] ),
					'padding-bottom' => AEOPR_Helper::get_css_value( $attr['vquestionPaddingMobile'], $attr['questionPaddingTypeMobile'] ),
					'padding-right'  => AEOPR_Helper::get_css_value( $attr['hquestionPaddingMobile'], $attr['questionPaddingTypeMobile'] ),
					'padding-left'   => AEOPR_Helper::get_css_value( $attr['hquestionPaddingMobile'], $attr['questionPaddingTypeMobile'] ),
				),
				' .aeopr-faq-content span'     => array(
					'margin-top'    => AEOPR_Helper::get_css_value( $attr['vanswerPaddingMobile'], $attr['answerPaddingTypeMobile'] ),
					'margin-bottom' => AEOPR_Helper::get_css_value( $attr['vanswerPaddingMobile'], $attr['answerPaddingTypeMobile'] ),
					'margin-right'  => AEOPR_Helper::get_css_value( $attr['hanswerPaddingMobile'], $attr['answerPaddingTypeMobile'] ),
					'margin-left'   => AEOPR_Helper::get_css_value( $attr['hanswerPaddingMobile'], $attr['answerPaddingTypeMobile'] ),
				),
				' .aeopr-icon svg'             => array(
					'width'     => $m_icon_size,
					'height'    => $m_icon_size,
					'font-size' => $m_icon_size,
				),
				' .aeopr-icon-active svg'      => array(
					'width'     => $m_icon_size,
					'height'    => $m_icon_size,
					'font-size' => $m_icon_size,
				),
			);

			if ( 'accordion' === $attr['layout'] && true === $attr['inactiveOtherItems'] ) {

				$selectors[' .wp-block-aeopr-faq-child.aeopr-faq-child__outer-wrap .aeopr-faq-content '] = array(
					'display' => 'none',
				);
			}
			if ( 'accordion' === $attr['layout'] && true === $attr['expandFirstItem'] ) {

				$selectors[' .aeopr-faq__wrap.aeopr-buttons-layout-wrap > .aeopr-faq-child__outer-wrap:first-child > .aeopr-faq-child__wrapper .aeopr-faq-item.aeopr-faq-item-active .aeopr-faq-content '] = array(
					'display' => 'block',
				);
			}
			if ( true === $attr['enableSeparator'] ) {

				$selectors[' .aeopr-faq-child__outer-wrap .aeopr-faq-content '] = array(
					'border-style'        => 'solid',
					'border-top-color'    => $attr['borderColor'],
					'border-top-width'    => AEOPR_Helper::get_css_value( $attr['borderWidth'], 'px' ),
					'border-right-width'  => '0px',
					'border-bottom-width' => '0px',
					'border-left-width'   => '0px',
				);
			}
			if ( 'grid' === $attr['layout'] ) {

				$selectors['.aeopr-faq-layout-grid .aeopr-faq__wrap .aeopr-faq-child__outer-wrap '] = array(
					'text-align' => $attr['align'],
				);
				$selectors['.aeopr-faq-layout-grid .aeopr-faq__wrap.aeopr-buttons-layout-wrap ']    = array(
					'grid-template-columns' => 'repeat(' . $attr['columns'] . ', 1fr)',
					'grid-column-gap'       => AEOPR_Helper::get_css_value( $attr['columnsGap'], 'px' ),
					'grid-row-gap'          => AEOPR_Helper::get_css_value( $attr['rowsGap'], 'px' ),
					'display'               => 'grid',
				);
			}

			$combined_selectors = array(
				'desktop' => $selectors,
				'tablet'  => $t_selectors,
				'mobile'  => $m_selectors,
			);

			$combined_selectors = AEOPR_Helper::get_typography_css( $attr, 'question', ' .aeopr-faq-questions-button .aeopr-question', $combined_selectors );
			$combined_selectors = AEOPR_Helper::get_typography_css( $attr, 'answer', ' .aeopr-faq-item .aeopr-faq-content p', $combined_selectors );

			return AEOPR_Helper::generate_all_css( $combined_selectors, '.aeopr-block-' . $id );
		}
	}
}
