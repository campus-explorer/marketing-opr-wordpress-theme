/**
 * Returns Dynamic Generated CSS
 */

import generateCSS from "../../../dist/blocks/controls/generateCSS"
import generateCSSUnit from "../../../dist/blocks/controls/generateCSSUnit"

function styling( props ) {

	const {
		align,
		classMigrate,
		gap,
		inner_gap,
		link_layout,
		size,
		sizeType,
		sizeTablet,
		sizeMobile,
		fontSize,
		fontSizeType,
		fontSizeMobile,
		fontSizeTablet,
		fontFamily,
		fontWeight,
		lineHeightType,
		lineHeight,
		lineHeightTablet,
		lineHeightMobile,
		stack,
		border,
		bgSize,
		borderRadius,
	} = props.attributes

	var selectors = {}
	var tablet_selectors = {}
	var mobile_selectors = {}
	var alignment = ( align == "left" ) ? "flex-start" : ( ( align == "right" ) ? "flex-end" : "center" )
	var editor_gap = ( undefined !== typeof gap && '' !== gap ) ? ( gap + 15 ) : 15;
	
	selectors = {
		" .aeopr-visual-links__source-wrap" : {
			"padding": generateCSSUnit( bgSize, "px" ),
			"border-radius": generateCSSUnit( borderRadius, "px" ),
			"border-style" : ( 0 == border || undefined == border ) ? "none" : "solid",
			"border-width" : generateCSSUnit( border, "px" )
		},
		".aeopr-visual-links__layout-vertical .wp-block[data-type=\"aeopr/visual-links-child\"]" : {
			"margin-left" : 0,
			"margin-right" : 0,
			"margin-bottom" : generateCSSUnit( editor_gap, "px" )
		},
		".aeopr-visual-links__layout-vertical .aeopr-visual-links__wrap" : {
			"flex-direction": "column"
		},
		".aeopr-visual-links__layout-vertical .aeopr-visual-links__wrapper:last-child" : {
			"margin-bottom" : 0
		},
		".aeopr-visual-links__layout-horizontal .wp-block[data-type=\"aeopr/visual-links-child\"]" : {
			"margin-left" : generateCSSUnit( ( editor_gap/2 ), "px" ),
			"margin-right" : generateCSSUnit( ( editor_gap/2 ), "px" )
		},
		".aeopr-visual-links__layout-horizontal .wp-block[data-type=\"aeopr/visual-links-child\"]:first-child" : {
			"margin-left" : 0
		},
		".aeopr-visual-links__layout-horizontal .wp-block[data-type=\"aeopr/visual-links-child\"]:last-child" : {
			"margin-right" : 0
		},
		" .aeopr-visual-links__source-image" : {
			"width": generateCSSUnit( size, sizeType )
		},
		" .aeopr-visual-links__source-icon" : {
			"width": generateCSSUnit( size, sizeType ),
			"height": generateCSSUnit( size, sizeType ),
			"font-size": generateCSSUnit( size, sizeType )
		},
		" .aeopr-visual-links__source-icon svg" : {
			"width": generateCSSUnit( size, sizeType ),
			"height": generateCSSUnit( size, sizeType ),
		},
		" .aeopr-visual-links__source-icon:before" : {
			"width": generateCSSUnit( size, sizeType ),
			"height": generateCSSUnit( size, sizeType ),
			"font-size": generateCSSUnit( size, sizeType )
		},
		" .aeopr-visual-links__label-wrap" : {
			"text-align": align
		},
		" .aeopr-visual-links__wrap .block-editor-inner-blocks" : {
			"text-align": align
		},
	}

	mobile_selectors = {
		" .aeopr-visual-links__source-image": {
			"width": generateCSSUnit( sizeMobile, sizeType )
		},
		" .aeopr-visual-links__source-icon": {
			"width": generateCSSUnit( sizeMobile, sizeType ),
			"height": generateCSSUnit( sizeMobile, sizeType ),
			"font-size": generateCSSUnit( sizeMobile, sizeType )
		},
		" .aeopr-visual-links__source-icon svg": {
			"width": generateCSSUnit( sizeMobile, sizeType ),
			"height": generateCSSUnit( sizeMobile, sizeType ),
		},
		" .aeopr-visual-links__source-icon:before": {
			"width": generateCSSUnit( sizeMobile, sizeType ),
			"height": generateCSSUnit( sizeMobile, sizeType ),
			"font-size": generateCSSUnit( sizeMobile, sizeType )
		},
	}

	tablet_selectors = {
		" .aeopr-visual-links__source-image" : {
			"width": generateCSSUnit( sizeTablet, sizeType )
		},
		" .aeopr-visual-links__source-icon" : {
			"width": generateCSSUnit( sizeTablet, sizeType ),
			"height": generateCSSUnit( sizeTablet, sizeType ),
			"font-size": generateCSSUnit( sizeTablet, sizeType )
		},
		" .aeopr-visual-links__source-icon svg" : {
			"width": generateCSSUnit( sizeTablet, sizeType ),
			"height": generateCSSUnit( sizeTablet, sizeType ),
		},
		" .aeopr-visual-links__source-icon:before" : {
			"width": generateCSSUnit( sizeTablet, sizeType ),
			"height": generateCSSUnit( sizeTablet, sizeType ),
			"font-size": generateCSSUnit( sizeTablet, sizeType )
		}
	}

	if ( "horizontal" == link_layout ) {

		if ( "tablet" == stack ) {

			tablet_selectors[" .aeopr-visual-links__wrap .wp-block[data-type=\"aeopr/visual-links-child\"]"] = {
				"margin-left" : 0,
				"margin-right" : 0,
				"margin-bottom" : generateCSSUnit( editor_gap, "px" )
			}

			tablet_selectors[" .aeopr-visual-links__wrap"] = {
				"flex-direction": "column"
			}

			tablet_selectors[" .aeopr-visual-links__wrap .wp-block[data-type=\"aeopr/visual-links-child\"]:last-child"] = {
				"margin-bottom" : 0
			}

		} else if ( "mobile" == stack ) {

			mobile_selectors[" .aeopr-visual-links__wrap .wp-block[data-type=\"aeopr/visual-links-child\"]"] = {
				"margin-left" : 0,
				"margin-right" : 0,
				"margin-bottom" : generateCSSUnit( editor_gap, "px" )
			}

			mobile_selectors[" .aeopr-visual-links__wrap"] = {
				"flex-direction": "column"
			}

			mobile_selectors[" .aeopr-visual-links__wrap .aeopr-visual-links__wrapper:last-child"] = {
				"margin-bottom" : 0
			}
		}

		selectors[" .aeopr-visual-links__wrap .block-editor-block-list__layout"] = {
			"justify-content" : alignment,
			"-webkit-box-pack": alignment,
			"-ms-flex-pack": alignment,
		}
	}

	if ( "right" == align ) {
		selectors[":not(.aeopr-visual-links__no-label) .aeopr-visual-links__source-wrap"] = {
			"margin-left" : generateCSSUnit( inner_gap, "px" )
		}
		selectors[" .aeopr-visual-links__content-wrap"] = {
			"flex-direction" : "row-reverse"
		}
	} else {
		selectors[":not(.aeopr-visual-links__no-label) .aeopr-visual-links__source-wrap"] = {
			"margin-right" : generateCSSUnit( inner_gap, "px" )
		}
	}

	selectors[" .aeopr-visual-links-repeater .aeopr-visual-links__label"] = {
		"font-size" : generateCSSUnit( fontSize, fontSizeType ),
		"font-family": fontFamily,
		"font-weight": fontWeight,
		"line-height": generateCSSUnit( lineHeight, lineHeightType ),
	}

	mobile_selectors[" .aeopr-visual-links-repeater .aeopr-visual-links__label"] = {
		"font-size" : generateCSSUnit( fontSizeMobile, fontSizeType ),
		"line-height": generateCSSUnit( lineHeightMobile, lineHeightType ),
	}

	tablet_selectors[" .aeopr-visual-links-repeater .aeopr-visual-links__label"] = {
		"font-size" : generateCSSUnit( fontSizeTablet, fontSizeType ),
		"line-height": generateCSSUnit( lineHeightTablet, lineHeightType ),
	}

	var styling_css = ""
	var id = `#aeopr-visual-links-${ props.clientId }`
	if ( classMigrate ) {
		id = `.aeopr-block-${ props.clientId }`
	}

	styling_css = generateCSS( selectors, id )

	styling_css += generateCSS( tablet_selectors, id, true, "tablet" )

	styling_css += generateCSS( mobile_selectors, id, true, "mobile" )

	return styling_css
}

export default styling
