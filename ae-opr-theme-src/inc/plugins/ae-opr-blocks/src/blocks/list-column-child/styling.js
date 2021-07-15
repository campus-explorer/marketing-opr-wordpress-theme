/**
 * Returns Dynamic Generated CSS
 */

import inlineStyles from "./inline-styles"
import generateCSS from "../../../dist/blocks/controls/generateCSS"
import generateCSSUnit from "../../../dist/blocks/controls/generateCSSUnit"

function styling( props ) {

	const {
		colWidth,
		colWidthTablet,
		colWidthMobile,

		backgroundType,
	} = props.attributes

	var tablet_selectors = {}
	var mobile_selectors = {}

	var style = {
	}


	var selectors = {
		":before" : inlineStyles( props ),
		"" : style
	}

	var styling_css = ""

	var id = `#wpwrap .edit-post-visual-editor #block-${ props.clientId }`

	styling_css = generateCSS( selectors, id )


	return styling_css
}

export default styling
