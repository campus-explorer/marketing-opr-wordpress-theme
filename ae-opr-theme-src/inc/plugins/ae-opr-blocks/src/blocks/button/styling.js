/**
 * Returns Dynamic Generated CSS
 */

import generateCSS from "../../../dist/blocks/controls/generateCSS"
import generateCSSUnit from "../../../dist/blocks/controls/generateCSSUnit"

function styling( props ) {

	const {
		fontFamily,
		fontWeight,
		size,
		vPadding,
		hPadding,
		borderWidth,
		borderRadius,
		borderStyle,
		borderColor,
		borderHColor,
		color,
		background,
		hColor,
		hBackground,
		sizeType,
		sizeMobile,
		sizeTablet,
		lineHeight,
		lineHeightType,
		lineHeightMobile,
		lineHeightTablet,
	} = props.attributes;

	var tablet_selectors = {}
	var mobile_selectors = {}

	var selectors = {
		" .aeopr-buttons-repeater" : {
			"font-size" : generateCSSUnit( size, sizeType ),
			"line-height" : generateCSSUnit( lineHeight, lineHeightType ),
			"font-family": fontFamily,
			"font-weight": fontWeight,
			"border-width": generateCSSUnit( borderWidth, "px" ),
			"border-style": borderStyle,
			"border-color": borderColor,
			"border-radius" : generateCSSUnit( borderRadius, "px" ),
			"background": background
		},
		" .aeopr-buttons-repeater:hover" : {
			"background": hBackground,
			"border-width": generateCSSUnit( borderWidth, "px" ),
			"border-style": borderStyle,
			"border-color": borderHColor,
		},
		" .aeopr-buttons-repeater a.aeopr-button__link" : {
			"padding" : vPadding + "px " + hPadding + "px",
			"color": color
		},
		" .aeopr-buttons-repeater:hover a.aeopr-button__link" : {
			"color": hColor
		},
		" .aeopr-buttons-repeater:hover .aeopr-button__link": {
			"color": hColor
		},
		" .aeopr-buttons-repeater .aeopr-button__link" : {
			"padding" : vPadding + "px " + hPadding + "px",
			"color": color
		},

	}

	mobile_selectors[" .aeopr-buttons-repeater"] = {
		"font-size" : generateCSSUnit( sizeMobile, sizeType ),
		"line-height" : generateCSSUnit( lineHeightMobile, lineHeightType ),
	}

	tablet_selectors[" .aeopr-buttons-repeater"] = {
		"font-size" : generateCSSUnit( sizeTablet, sizeType ),
		"line-height" : generateCSSUnit( lineHeightTablet, lineHeightType ),
	}

	var id = `.aeopr-block-${ props.clientId }`
	var styling_css = generateCSS( selectors, id )

	styling_css += generateCSS( tablet_selectors, id, true, "tablet" )

	styling_css += generateCSS( mobile_selectors, id, true, "mobile" )

	return styling_css
}

export default styling
