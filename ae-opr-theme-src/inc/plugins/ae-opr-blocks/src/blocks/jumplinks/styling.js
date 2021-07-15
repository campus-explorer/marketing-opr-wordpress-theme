/**
 * Returns Dynamic Generated CSS
 */

import generateCSS from "../../../dist/blocks/controls/generateCSS"
import generateCSSUnit from "../../../dist/blocks/controls/generateCSSUnit"

function styling( props ) {

	const {
		classMigrate,
		customWidth,
		widthDesktop,
		widthTablet,
		widthMobile,
		widthTypeTablet,
		widthTypeMobile,
		widthTypeDesktop,
		tColumnsDesktop,
		tColumnsTablet,
		tColumnsMobile,
		iconColor,
		bulletColor,
		iconSize,
		//Color
		backgroundColor,
		linkColor,
		linkHoverColor,
		scrollToTopColor,
		scrollToTopBgColor,
		headingColor,
		//Margin
		vMarginDesktop,
		vMarginTablet,
		vMarginMobile,
		hMarginDesktop,
		hMarginTablet,
		hMarginMobile,
		marginTypeMobile,
		marginTypeTablet,
		marginTypeDesktop,
		//Padding,
		vPaddingDesktop,
		vPaddingTablet,
		vPaddingMobile,
		hPaddingDesktop,
		hPaddingTablet,
		hPaddingMobile,
		headingBottom,
		paddingTypeDesktop,
		paddingTypeTablet,
		paddingTypeMobile,
		//Padding,
		contentPaddingDesktop,
		contentPaddingTablet,
		contentPaddingMobile,
		contentPaddingTypeDesktop,
		contentPaddingTypeTablet,
		contentPaddingTypeMobile,
		//Border
		borderStyle,
		borderWidth,
		borderRadius,
		borderColor,
		//Typography
		loadGoogleFonts,
		fontFamily,
		fontWeight,
		fontSubset,
		fontSize,
		fontSizeType,
		fontSizeTablet,
		fontSizeMobile,
		lineHeightType,
		lineHeight,
		lineHeightTablet,
		lineHeightMobile,

		headingLoadGoogleFonts,
		headingFontFamily,
		headingFontWeight,
		headingFontSubset,
		headingFontSize,
		headingFontSizeType,
		headingFontSizeTablet,
		headingFontSizeMobile,
		headingLineHeightType,
		headingLineHeight,
		headingLineHeightTablet,
		headingLineHeightMobile,
		disableBullets,
	} = props.attributes

	var selectors = {}
	var tablet_selectors = {}
	var mobile_selectors = {}

	

	var id = `#aeopr-toc-${ props.clientId }`
	if ( classMigrate ) {
		id = `.aeopr-block-${ props.clientId }`
	}

	var styling_css = generateCSS( selectors, id )

	styling_css += generateCSS( tablet_selectors, id, true, "tablet" )

	styling_css += generateCSS( mobile_selectors, id, true, "mobile" )

	if ( "" != scrollToTopColor ) {
		styling_css += ".aeopr-toc__scroll-top { color: " + scrollToTopColor + "; }"
	}

	if ( "" != scrollToTopBgColor ) {
		styling_css += ".aeopr-toc__scroll-top.aeopr-toc__show-scroll { background: " + scrollToTopBgColor + "; }"
	}

	return styling_css
}

export default styling
