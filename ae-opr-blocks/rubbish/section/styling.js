/**
 * Returns Dynamic Generated CSS
 */

import inlineStyles from "./inline-styles"
import generateCSS from "../../../dist/blocks/controls/generateCSS"
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
		className,
		innerWidth,
		innerWidthType,
		contentWidth,
		gradientColor1,
		gradientColor2,
		gradientLocation1,
		gradientLocation2,
		gradientType,
		gradientAngle,
		gradientPosition,
		borderRadius,
		topPaddingTablet,
		bottomPaddingTablet,
		leftPaddingTablet,
		rightPaddingTablet,
		topMarginTablet,
		bottomMarginTablet,
		leftMarginTablet,
		rightMarginTablet,
		topPaddingMobile,
		bottomPaddingMobile,
		leftPaddingMobile,
		rightPaddingMobile,
		topMarginMobile,
		bottomMarginMobile,
		leftMarginMobile,
		rightMarginMobile,
		align,
		overlayType,
		gradientOverlayColor1,
		gradientOverlayColor2,
		gradientOverlayType,
		gradientOverlayLocation1,
		gradientOverlayLocation2,
		gradientOverlayAngle,
		gradientOverlayPosition,
		backgroundOverlayOpacity,
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

	var inner_width = "100%"

	if( typeof contentWidth != "undefined" ) {
		if ( "boxed" != contentWidth ) {
			if ( typeof innerWidth != "undefined" ) {
				inner_width = generateCSSUnit( innerWidth, innerWidthType )
			}
		}
	}

	var tablet_selectors = {}
	var mobile_selectors = {}
	var boxShadowPositionCSS = boxShadowPosition;

	if ( 'outset' === boxShadowPosition ) {
		boxShadowPositionCSS = '';
	}
	var selectors = {
		".aeopr-section__wrap" : inlineStyles( props ),
		" .aeopr-section__video-wrap": {
			"opacity" : ( typeof backgroundVideoOpacity != "undefined" ) ? ( 100 - backgroundVideoOpacity )/100 : 0.5
		},
		" .aeopr-section__inner-wrap": {
			"max-width" : inner_width
		},
		".wp-block-aeopr-section": {
			"box-shadow": generateCSSUnit( boxShadowHOffset, "px" ) + ' ' + generateCSSUnit( boxShadowVOffset, "px" ) + ' ' + generateCSSUnit( boxShadowBlur, "px" ) + ' ' + generateCSSUnit( boxShadowSpread, "px" ) + ' ' + boxShadowColor + ' ' + boxShadowPositionCSS
		}
	}

	selectors[" > .aeopr-section__overlay"] = {}

	if ( "video" == backgroundType ) {
		selectors[" > .aeopr-section__overlay"] = {
			"opacity" : 1,
			"background-color": backgroundVideoColor
		}
	} else if( "image" == backgroundType ) {
		if( "color" == overlayType ){
			selectors[" > .aeopr-section__overlay"] = {
				"opacity" : ( typeof backgroundOpacity != "undefined" ) ? backgroundOpacity/100 : 0,
				"background-color": backgroundImageColor
			}
		}else{
			selectors[" > .aeopr-section__overlay"]["background-color"] = "transparent"
			selectors[" > .aeopr-section__overlay"]["opacity"] = ( typeof backgroundOpacity != "undefined" ) ? backgroundOpacity/100 : ""

			if ( "linear" === gradientOverlayType ) {

				selectors[" > .aeopr-section__overlay"]["background-image"] = `linear-gradient(${ gradientOverlayAngle }deg, ${ gradientOverlayColor1 } ${ gradientOverlayLocation1 }%, ${ gradientOverlayColor2 } ${ gradientOverlayLocation2 }%)`
			} else {

				selectors[" > .aeopr-section__overlay"]["background-image"] = `radial-gradient( at ${ gradientOverlayPosition }, ${ gradientOverlayColor1 } ${ gradientOverlayLocation1 }%, ${ gradientOverlayColor2 } ${ gradientOverlayLocation2 }%)`
			}
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
		}
	}

	mobile_selectors = {
		".aeopr-section__wrap" : {
			"padding-top": generateCSSUnit( topPaddingMobile, mobilePaddingType ),
			"padding-bottom": generateCSSUnit( bottomPaddingMobile, mobilePaddingType ),
			"padding-left": generateCSSUnit( leftPaddingMobile, mobilePaddingType ),
			"padding-right": generateCSSUnit( rightPaddingMobile, mobilePaddingType ),
		}
	}

	if ( "right" == align ) {
		mobile_selectors[".aeopr-section__wrap"]["margin-top"] = generateCSSUnit( topMarginMobile,mobileMarginType )
		mobile_selectors[".aeopr-section__wrap"]["margin-bottom"] =  generateCSSUnit( bottomMarginMobile,mobileMarginType )
		mobile_selectors[".aeopr-section__wrap"]["margin-right"] =  generateCSSUnit( rightMarginMobile,mobileMarginType )

		tablet_selectors[".aeopr-section__wrap"]["margin-top"] = generateCSSUnit( topMarginTablet, tabletMarginType )
		tablet_selectors[".aeopr-section__wrap"]["margin-bottom"] =  generateCSSUnit( bottomMarginTablet, tabletMarginType )
		tablet_selectors[".aeopr-section__wrap"]["margin-right"] =  generateCSSUnit( rightMarginTablet, tabletMarginType )
	} else if ( "left" == align ) {
		mobile_selectors[".aeopr-section__wrap"]["margin-top"] = generateCSSUnit( topMarginMobile,mobileMarginType )
		mobile_selectors[".aeopr-section__wrap"]["margin-bottom"] =  generateCSSUnit( bottomMarginMobile,mobileMarginType )
		mobile_selectors[".aeopr-section__wrap"]["margin-left"] =  generateCSSUnit( leftMarginMobile,mobileMarginType )

		tablet_selectors[".aeopr-section__wrap"]["margin-top"] = generateCSSUnit( topMarginTablet, tabletMarginType )
		tablet_selectors[".aeopr-section__wrap"]["margin-bottom"] =  generateCSSUnit( bottomMarginTablet, tabletMarginType )
		tablet_selectors[".aeopr-section__wrap"]["margin-left"] =  generateCSSUnit( leftMarginTablet, tabletMarginType )
	} else {
		mobile_selectors[".aeopr-section__wrap"]["margin-top"] = generateCSSUnit( topMarginMobile,mobileMarginType )
		mobile_selectors[".aeopr-section__wrap"]["margin-bottom"] =  generateCSSUnit( bottomMarginMobile,mobileMarginType )

		tablet_selectors[".aeopr-section__wrap"]["margin-top"] = generateCSSUnit( topMarginTablet, tabletMarginType )
		tablet_selectors[".aeopr-section__wrap"]["margin-bottom"] =  generateCSSUnit( bottomMarginTablet, tabletMarginType )
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
