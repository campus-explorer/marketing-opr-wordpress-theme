/**
 * Returns Dynamic Generated CSS
 */

import generateCSS from "../../../dist/blocks/controls/generateCSS"
import generateCSSUnit from "../../../dist/blocks/controls/generateCSSUnit"

function TestimonialStyle( props ) {
	const {
		classMigrate,
		headingAlign,
		companyColor,
		descColor,
		authorColor,
		nameFontSizeType,
		nameFontSize,
		nameFontSizeTablet,
		nameFontSizeMobile,
		nameFontFamily,
		nameFontWeight,
		nameFontSubset,
		nameLineHeightType,
		nameLineHeight,
		nameLineHeightTablet,
		nameLineHeightMobile,
		companyFontSizeType,
		companyFontSize,
		companyFontSizeTablet,
		companyFontSizeMobile,
		companyFontFamily,
		companyFontWeight,
		companyFontSubset,
		companyLineHeightType,
		companyLineHeight,
		companyLineHeightTablet,
		companyLineHeightMobile,
		descFontSizeType,
		descFontSize,
		descFontSizeTablet,
		descFontSizeMobile,
		descFontFamily,
		descFontWeight,
		descFontSubset,
		descLineHeightType,
		descLineHeight,
		descLineHeightTablet,
		descLineHeightMobile,
		descLoadGoogleFonts,
		descSpace,
		block_id,
		nameSpace,
		imgVrPadding,
		imgHrPadding,
		imageWidth,
		rowGap,
		columnGap,
		contentPadding,
		backgroundColor,
		backgroundImage,
		backgroundPosition,
		backgroundSize,
		backgroundRepeat,
		backgroundImageColor,
		backgroundOpacity,
		borderStyle,
		borderWidth ,
		borderRadius,
		borderColor,
		arrowColor,
		test_item_count,
		columns,
		arrowDots,
		arrowSize
	} = props.attributes

	var img_align = "center"

	if( headingAlign == "left" ){
		img_align = "flex-start"
	}else if( headingAlign == "right" ){
		img_align = "flex-end"
	}

	var position = backgroundPosition.replace( "-", " " )

	var selectors = {
		" .aeopr-testimonial__wrap": {
			"padding-left" : generateCSSUnit( ( columnGap/2 ), "px" ),
			"padding-right" : generateCSSUnit( ( columnGap/2 ), "px" ),
			"margin-bottom" : generateCSSUnit( rowGap, "px" ),
		},
		" .aeopr-testimonial__wrap .aeopr-tm__image-content": {
			"padding-left" : generateCSSUnit( imgHrPadding, "px" ),
			"padding-right" : generateCSSUnit( imgHrPadding, "px" ),
			"padding-top" : generateCSSUnit( imgVrPadding, "px" ),
			"padding-bottom" : generateCSSUnit( imgVrPadding, "px" ),
		},
		" .aeopr-tm__image-position-top .aeopr-tm__image-content": {
			"justify-content" : img_align,
		},
		// Image
		" .aeopr-tm__image img": {
			"width": generateCSSUnit( imageWidth, "px" ),
			"max-width": generateCSSUnit( imageWidth, "px" ),
		},
		" .aeopr-tm__content": {
			"text-align" : headingAlign,
			"padding" : generateCSSUnit( contentPadding, "px" ),
		},
		// Prefix Style
		" .aeopr-tm__author-name": {
			"font-size" : generateCSSUnit( nameFontSize, nameFontSizeType ),
			"font-family": nameFontFamily,
			"font-weight": nameFontWeight,
			"line-height": generateCSSUnit( nameLineHeight, nameLineHeightType ),
			"color": authorColor,
			"margin-bottom": generateCSSUnit( nameSpace, "px" ),
		},
		// Title Style
		" .aeopr-tm__company": {
			"font-size" : generateCSSUnit( companyFontSize, companyFontSizeType ),
			"font-family": companyFontFamily,
			"font-weight": companyFontWeight,
			"line-height": generateCSSUnit( companyLineHeight, companyLineHeightType ),
			"color": companyColor,
		},
		// Description Style
		" .aeopr-tm__desc": {
			"font-size" : generateCSSUnit( descFontSize, descFontSizeType ),
			"font-family": descFontFamily,
			"font-weight": descFontWeight,
			"line-height": generateCSSUnit( descLineHeight, descLineHeightType ),
			"color": descColor,
			"margin-bottom": generateCSSUnit( descSpace, "px" ),
		},
		" .aeopr-testimonial__wrap.aeopr-tm__bg-type-color .aeopr-tm__content": {
			"background-color": backgroundColor,
		},
		" .aeopr-testimonial__wrap.aeopr-tm__bg-type-image .aeopr-tm__content": {
			"background-image": ( backgroundImage ) ? `url(${ backgroundImage.url })` : null,
			"background-position":position,
			"background-repeat":backgroundRepeat,
			"background-size":backgroundSize,
		},
		" .aeopr-testimonial__wrap.aeopr-tm__bg-type-image .aeopr-tm__overlay": {
			"background-color":backgroundImageColor,
			"opacity":( typeof backgroundOpacity != "undefined" ) ? ( 100 - backgroundOpacity )/100 : 0.5,
		},
		" ul.slick-dots li button:before": {
			"color" : arrowColor,
		},
		" ul.slick-dots li.slick-active button:before": {
			"color" : arrowColor,
		},
		" .slick-arrow svg": {
			"fill" : arrowColor,
			"height": generateCSSUnit( arrowSize, "px" ),
			"width": generateCSSUnit( arrowSize, "px" ),
		},
	}

	if( test_item_count == columns ) {
		selectors[".aeopr-slick-carousel"] = {
			"padding": '0',
		}
	}

	if ( borderStyle != "none" ) {

		selectors[" .aeopr-testimonial__wrap .aeopr-tm__content"] = {
			"border-color": borderColor,
			"border-style": borderStyle,
			"border-width": generateCSSUnit( borderWidth, "px" ),
			"border-radius": generateCSSUnit( borderRadius, "px" ),
		}
	}else{
		selectors[" .aeopr-testimonial__wrap .aeopr-tm__content"] = {
			"border-radius": generateCSSUnit( borderRadius, "px" ),
		}
	}

	if( arrowDots === "dots"){
		selectors[" .aeopr-slick-carousel.aeopr-tm__arrow-outside"] = {
			"padding" : "0 0 35px 0",
		}
	}

	if( test_item_count === 1 || test_item_count === columns ){
		selectors[" .aeopr-slick-carousel.aeopr-tm__arrow-outside"] = {
			"padding" : "0",
		}
	}

	var mobile_selectors = {
		" .aeopr-tm__desc": {
			"font-size" : generateCSSUnit( descFontSizeMobile, descFontSizeType ),
			"line-height": generateCSSUnit( descLineHeightMobile, descLineHeightType ),
		},
		" .aeopr-tm__company": {
			"font-size" : generateCSSUnit( companyFontSizeMobile, companyFontSizeType ),
			"line-height": generateCSSUnit( companyLineHeightMobile, companyLineHeightType ),
		},
		" .aeopr-tm__author-name": {
			"font-size" : generateCSSUnit( nameFontSizeMobile, nameFontSizeType ),
			"line-height": generateCSSUnit( nameLineHeightMobile, nameLineHeightType ),
		},
	}

	var tablet_selectors = {
		" .aeopr-tm__desc": {
			"font-size" : generateCSSUnit( descFontSizeTablet, descFontSizeType ),
			"line-height": generateCSSUnit( descLineHeightTablet, descLineHeightType ),
		},
		" .aeopr-tm__company": {
			"font-size" : generateCSSUnit( companyFontSizeTablet, companyFontSizeType ),
			"line-height": generateCSSUnit( companyLineHeightTablet, companyLineHeightType ),
		},
		" .aeopr-tm__author-name": {
			"font-size" : generateCSSUnit( nameFontSizeTablet, nameFontSizeType ),
			"line-height": generateCSSUnit( nameLineHeightTablet, nameLineHeightType ),
		},
		" .aeopr-tm__content": {
			"text-align" : "center",
		},
	}

	var styling_css = ""
	var id = `#wpwrap #aeopr-testimonial-${ props.clientId }`
	if ( classMigrate ) {
		id = `.aeopr-block-${ props.clientId }`
	}

	styling_css = generateCSS( selectors, id )
	styling_css += generateCSS( tablet_selectors, id, true, "tablet" )
	styling_css += generateCSS( mobile_selectors, id, true, "mobile" )

	return styling_css

}

export default TestimonialStyle
