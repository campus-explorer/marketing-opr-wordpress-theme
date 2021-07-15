/**
 * Returns Dynamic Generated CSS
 */

import generateCSS from "../../../dist/blocks/controls/generateCSS"

function styling( props ) {
	var selectors = {
		".aeopr-hero-area-block__wrapper":{"background-color":"#003366"},
		".archer-hero-area-block__wrapper span.hero_background":{
			"top": "0",
			"position":"absolute",
			"bottom":"0",
			"left":"0",
			"right":"0",
			"opacity":".5"
		}
	}
	var styling_css = ""
	var id = `.aeopr-block-${ props.clientId }`

	styling_css = generateCSS( selectors, id )

	return styling_css
}

export default styling
