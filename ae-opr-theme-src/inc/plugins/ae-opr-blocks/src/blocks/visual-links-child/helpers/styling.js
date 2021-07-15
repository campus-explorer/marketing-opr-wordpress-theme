/**
 * Returns Dynamic Generated CSS
 */

import generateCSS from "controls/generateCSS"

function styling( props ) {

	const {
		backgroundImage,
		backgroundPosition,
		backgroundSize,
		backgroundRepeat,
		backgroundColor,
		backgroundOpacity,
		backgroundImageColor,
		backgroundColorHover,
		overlayType,
		align,
		alignTablet,
		alignMobile,
		link_text_color,
		link_text_hover_color
	} = props.attributes
	const url = (backgroundImage)?backgroundImage.url:null;
	var selectors = {
		".aeopr-visual-links__background-image":{
			"position":"relative"
		},
		".aeopr-visual-links__background-image .aeopr-background-container":{
			"display":"none",
			"background-color" : backgroundColorHover,
			"background-image" : "url("+url+")",
			"background-size" : backgroundSize,
	        "background-position" :backgroundPosition,
	        "background-repeat": backgroundRepeat
		},
		".aeopr-visual-links__background-image:hover  .aeopr-background-container" : {
			"display":"block",
			"position":"absolute",
			 "z-index": 3,
		    "top": 0,
		    "bottom": 0,
		    "left": 0,
		    "right": 0
		},
		".aeopr-visual-links__background-image .aeopr-background-container:before":{
			"content":"''",
			"opacity": backgroundOpacity/100,
			"background-color":backgroundImageColor,
			"position": "absolute",
		    "z-index": 4,
		    "top": 0,
		    "bottom": 0,
		    "left": 0,
		    "right": 0
		},
		".aeopr-visual-links__wrap .aeopr-visual-links__text-wrap":{
			"position":"relative",
			"z-index": 5
		},
		".aeopr-visual-links__wrap .aeopr-visual-links__title" : {
			"color" : link_text_color,
		},
		".aeopr-visual-links__wrap:hover .aeopr-visual-links__title" : {
			"color" : link_text_hover_color
		},
		".aeopr-visual-links__wrap .aeopr-visual-links__text" : {
			"color" : link_text_color,
		},
		".aeopr-visual-links__wrap:hover .aeopr-visual-links__text" : {
			"color" : link_text_hover_color
		},
	}

	var styling_css = ""
	var id = `.aeopr-block-${ props.clientId }`

	styling_css = generateCSS( selectors, id )

	return styling_css
}

export default styling
