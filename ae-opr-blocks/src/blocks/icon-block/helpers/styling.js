/**
 * Returns Dynamic Generated CSS
 */

import generateCSS from "Dist/blocks/controls/generateCSS"

function styling( props ) {

	const {
		icon_size,
		icon_background_border_radius,			
		icon_hover_color,
		icon_hover_background_color,
	} = props.attributes
	
	const borderRadius = icon_background_border_radius+'%';
	const iconWidth = icon_size+'px';
	
	/// add an inner space attribute to control the spacing
	var selectors = {
		".aecpc-icon-block__content-wrap:hover": {
			"background-color" : icon_hover_background_color
		},
		".aecpc-icon-block__content-wrap:hover  svg" : {
			"fill" : icon_hover_color
		},
	}

	var styling_css = ""
	var id = `.aecpc-block-${ props.clientId }`

	styling_css = generateCSS( selectors, id )

	return styling_css
}

export default styling
