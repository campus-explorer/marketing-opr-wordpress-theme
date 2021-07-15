/**
 * Returns Dynamic Generated CSS
 */

import inlineStyles from "./inline-styles"
import generateCSS from "../../../dist/blocks/controls/generateCSS"
import hexToRgba from "../../../dist/blocks/controls/hexToRgba"
import generateCSSUnit from "../../../dist/blocks/controls/generateCSSUnit"

function styling( props ) {

	const {
		classMigrate,
		backgroundType,
		backgroundVideoColor,
		backgroundImageColor,
		backgroundOpacity,
		backgroundColor,
		backgroundVideoOpacity,
		backgroundVideo,
		borderRadius,
		contentWidth,
		width,
		widthType,
		columnGap,
		topColor,
		topHeight,
		topHeightTablet,
		topHeightMobile,
		topWidth,
		bottomColor,
		bottomHeight,
		bottomHeightTablet,
		bottomHeightMobile,
		bottomWidth,
		gradientColor1,
		gradientColor2,
		gradientLocation1,
		gradientLocation2,
		gradientType,
		gradientAngle,
		gradientPosition,
		topPaddingTablet,
		bottomPaddingTablet,
		leftPaddingTablet,
		rightPaddingTablet,
		topPaddingMobile,
		bottomPaddingMobile,
		leftPaddingMobile,
		rightPaddingMobile,
		topMarginMobile,
		bottomMarginMobile,
		topMarginTablet,
		bottomMarginTablet,
		topDividerOpacity,
		bottomDividerOpacity,
		mobileMarginType,
		tabletMarginType,
		mobilePaddingType,
		tabletPaddingType,
		boxShadowColor,
		boxShadowHOffset,
		boxShadowVOffset,
		boxShadowBlur,
		boxShadowSpread,
		boxShadowPosition,
	} = props.attributes

	let max_width = "100%"

	if ( "custom" == contentWidth ) {
		if ( "" != width ) {
			max_width = generateCSSUnit( width, widthType )
		}
	}
	var boxShadowPositionCSS = boxShadowPosition;

	if ( 'outset' === boxShadowPosition ) {
		boxShadowPositionCSS = '';
	}
	
	var tablet_selectors = {}
	var mobile_selectors = {}

	var selectors = {
		".aeopr-section__wrap" : inlineStyles( props ),
		" .aeopr-section__video-wrap": {
			"opacity" : ( typeof backgroundVideoOpacity != "undefined" ) ? ( 100 - backgroundVideoOpacity )/100 : 0.5
		},
		" > .aeopr-section__inner-wrap": {
			"max-width" : max_width
		},
		" .aeopr-column__inner-wrap" : {
			"padding" : generateCSSUnit( columnGap, "px" )
		},
		" .aeopr-section__shape-top svg" : {
			width: "calc( " + topWidth + "% + 1.3px )",
			height: generateCSSUnit( topHeight, "px" )
		},
		" .aeopr-section__shape-top .aeopr-section__shape-fill" : {
			fill: hexToRgba( topColor, ( typeof topDividerOpacity != "undefined" ) ? topDividerOpacity : 100 ),
		},
		" .aeopr-section__shape-bottom svg" : {
			width: "calc( " + bottomWidth + "% + 1.3px )",
			height: generateCSSUnit( bottomHeight, "px" )
		},
		" .aeopr-section__shape-bottom .aeopr-section__shape-fill" : {
			fill: hexToRgba( bottomColor, ( typeof bottomDividerOpacity != "undefined" ) ? bottomDividerOpacity : 100 ),
		},
		".wp-block-aeopr-section": {
			"box-shadow": generateCSSUnit( boxShadowHOffset, "px" ) + ' ' + generateCSSUnit( boxShadowVOffset, "px" ) + ' ' + generateCSSUnit( boxShadowBlur, "px" ) + ' ' + generateCSSUnit( boxShadowSpread, "px" ) + ' ' + boxShadowColor + ' ' + boxShadowPositionCSS  
		},
	}

	selectors[" > .aeopr-section__overlay"] = {}

	if ( "video" == backgroundType ) {
		selectors[" > .aeopr-section__overlay"] = {
			"opacity" : 1,
			"background-color": backgroundVideoColor
		}
	} else if( "image" == backgroundType ) {
		selectors[" > .aeopr-section__overlay"] = {
			"opacity" : ( typeof backgroundOpacity != "undefined" ) ? backgroundOpacity/100 : "",
			"background-color": backgroundImageColor
		}
	} else if( "color" == backgroundType ) {
		selectors[" > .aeopr-section__overlay"] = {
			"opacity" : ( typeof backgroundOpacity != "undefined" ) ? backgroundOpacity/100 : "",
			"background-color" : backgroundColor
		}
	} else if ( "gradient" === backgroundType ) {

		selectors[" > .aeopr-section__overlay"]["background-color"] = "transparent"
		selectors[" > .aeopr-section__overlay"]["opacity"] = ( typeof backgroundOpacity != "undefined" ) ? backgroundOpacity/100 : ""

		if ( "linear" === gradientType ) {

			selectors[" > .aeopr-section__overlay"]["background-image"] = `linear-gradient(${ gradientAngle }deg, ${ gradientColor1 } ${ gradientLocation1 }%, ${ gradientColor2 } ${ gradientLocation2 }%)`
		} else {

			selectors[" > .aeopr-section__overlay"]["background-image"] = `radial-gradient( at ${ gradientPosition }, ${ gradientColor1 } ${ gradientLocation1 }%, ${ gradientColor2 } ${ gradientLocation2 }%)`
		}
	}

	selectors[" > .aeopr-section__overlay"]["border-radius"] = generateCSSUnit( borderRadius, "px" )

	tablet_selectors = {
		".aeopr-section__wrap" : {
			"padding-top": generateCSSUnit( topPaddingTablet, tabletPaddingType ),
			"padding-bottom": generateCSSUnit( bottomPaddingTablet, tabletPaddingType ),
			"padding-left": generateCSSUnit( leftPaddingTablet, tabletPaddingType ),
			"padding-right": generateCSSUnit( rightPaddingTablet, tabletPaddingType ),
			"margin-top": generateCSSUnit( topMarginTablet, tabletMarginType ),
			"margin-bottom": generateCSSUnit( bottomMarginTablet, tabletMarginType ),
		},
		" .aeopr-section__shape-top svg" : {
			height: generateCSSUnit( topHeightTablet, "px" )
		},
		" .aeopr-section__shape-bottom svg" : {
			height: generateCSSUnit( bottomHeightTablet, "px" )
		},
	}

	mobile_selectors = {
		".aeopr-section__wrap" : {
			"padding-top": generateCSSUnit( topPaddingMobile, mobilePaddingType ),
			"padding-bottom": generateCSSUnit( bottomPaddingMobile, mobilePaddingType ),
			"padding-left": generateCSSUnit( leftPaddingMobile, mobilePaddingType ),
			"padding-right": generateCSSUnit( rightPaddingMobile, mobilePaddingType ),
			"margin-top": generateCSSUnit( topMarginMobile, mobileMarginType ),
			"margin-bottom": generateCSSUnit( bottomMarginMobile, mobileMarginType ),
		},
		" .aeopr-section__shape-top svg" : {
			height: generateCSSUnit( topHeightMobile, "px" )
		},
		" .aeopr-section__shape-bottom svg" : {
			height: generateCSSUnit( bottomHeightMobile, "px" )
		},
	}

	var styling_css = ""
	var id = `#aeopr-section-${ props.clientId }`
	if ( classMigrate ) {
		id = `.aeopr-block-${ props.clientId }`
	}

	styling_css = generateCSS( selectors, id )

	styling_css += generateCSS( tablet_selectors, id, true, "tablet" )

	styling_css += generateCSS( mobile_selectors, id, true, "mobile" )

	return styling_css
}

export default styling
