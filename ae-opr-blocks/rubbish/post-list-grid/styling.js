/**
 * Returns Dynamic Generated CSS
 */

import generateCSS from "../../../dist/blocks/controls/generateCSS"

function styling( props ) {

	const {
		icon_color,
		label_color,
		icon_hover_color,
		label_hover_color,
		icon_bg_color,
		icon_bg_hover_color,
		icon_border_color,
		icon_border_hover_color,
	} = props.attributes

	var selectors = {
		".archer-icon-block__wrapper .archer-icon-block__source-icon" : {
			"color" : icon_color
		},
		".archer-icon-block__wrapper .archer-icon-block__source-icon svg" : {
			"fill" : icon_color
		},
		".archer-icon-block__wrapper .archer-icon-block__source-icon:hover" : {
			"color" : icon_hover_color
		},
		".archer-icon-block__wrapper .archer-icon-block__source-icon svg:hover " : {
			"fill" : icon_hover_color
		},
		".archer-icon-block__label-wrap .archer-icon-block__label" : {
			"color" : label_color,
		},
		".archer-icon-block__label:hover " : {
			"color" : label_hover_color
		},
		".archer-icon-block__wrapper .archer-icon-block__content-wrap>*" : {
			"color" : label_color,
		},
		".archer-icon-block__wrapper .archer-icon-block__content-wrap:hover>* " : {
			"color" : label_hover_color
		},
		".archer-icon-block__source-wrap" : {
			"background" : icon_bg_color
		},
		".archer-icon-block__source-wrap:hover " : {
			"background" : icon_bg_hover_color
		}
	}

	var styling_css = ""
	var id = `.archer-block-${ props.clientId }`

	styling_css = generateCSS( selectors, id )

	return styling_css
}

export default styling
