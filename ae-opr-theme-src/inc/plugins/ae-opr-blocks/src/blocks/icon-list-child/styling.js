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
		".aeopr-icon-list-repeater .aeopr-icon-list__source-icon" : {
			"color" : icon_color
		},
		".aeopr-icon-list-repeater .aeopr-icon-list__source-icon svg" : {
			"fill" : icon_color
		},
		".aeopr-icon-list-repeater:hover .aeopr-icon-list__source-icon" : {
			"color" : icon_hover_color
		},
		".aeopr-icon-list-repeater:hover .aeopr-icon-list__source-icon svg" : {
			"fill" : icon_hover_color
		},
		".aeopr-icon-list-repeater .aeopr-icon-list__label" : {
			"color" : label_color,
		},
		".aeopr-icon-list-repeater:hover .aeopr-icon-list__label" : {
			"color" : label_hover_color
		},
		".aeopr-icon-list-repeater .aeopr-icon-list__source-wrap" : {
			"background" : icon_bg_color,
			"border-color" : icon_border_color
		},
		".aeopr-icon-list-repeater:hover .aeopr-icon-list__source-wrap" : {
			"background" : icon_bg_hover_color,
			"border-color" : icon_border_hover_color
		}
	}

	var styling_css = ""
	var id = `.aeopr-block-${ props.clientId }`

	styling_css = generateCSS( selectors, id )

	return styling_css
}

export default styling
