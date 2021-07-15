/**
 * Returns Dynamic Generated CSS
 */

import generateCSSUnit from "../../../dist/blocks/controls/generateCSSUnit"

function inlineStyles( props, isEditor ) {

	const {
		backgroundColor,
	} = props.attributes

	var style = {}


	style["background-color"] = backgroundColor

	return style
}

export default inlineStyles
