/**
 * Returns Dynamic Generated CSS
 */

import generateCSS from "Dist/blocks/controls/generateCSS"
import generateCSSUnit from "Dist/blocks/controls/generateCSSUnit"

function styling( props ) {

	const {
		align,
		child_count,
		cell_count,
		cells,
		gap,
		inner_gap,
		stack,
		cell_layout,
		cellWidth,
		cellWidthType,
		cellWidthMobile,
		cellPosition,
		borderRadius,
		bgSize,
		border
	} = props.attributes

	var selectors = {}
	var mobile_selectors = {}
	var alignment = ( align == "left" ) ? "flex-start" : ( ( align == "right" ) ? "flex-end" : "center" )
	var editor_gap = ( undefined !== typeof gap && '' !== gap ) ? ( gap + 15 ) : 15;
	
	selectors = {
		/*".aecpc-grid__outer-wrap > .block-editor-inner-blocks > .block-editor-block-list__layout": {
			"display": "flex",
			"align-items" : "flex-start",
			"justify-content": "flex-start",
			"flex-flow": "row wrap",
			"margin": "0px auto"

		},
		".aecpc-grid__outer-wrap": {
			"display": "flex",
			"align-items" : "flex-start",
			"justify-content": "flex-start",
			"flex-flow": "row wrap",
			"margin": "0px auto"

		},
		".aecpc-grid__outer-wrap > .block-editor-inner-blocks > .block-editor-block-list__layout > *":{
			"margin": `0px ${gap}rem`,
			"flex-basis": `calc(50% - ${gap}rem)`
		},
		".aecpc-grid__outer-wrap > *":{
			"margin": `0px ${gap}rem`,
			"flex-basis": `calc(50% - ${gap}rem)`
		},		
		".aecpc-grid__layout-vertical .aecpc-grid__wrapper:last-child" : {
			"margin-bottom" : 0
		},
		" .aecpc-grid__wrap .block-editor-inner-blocks" : {
			"text-align": align
		},*/
	}


	if ( "horizontal" == cell_layout ) {

		if ( "mobile" == stack ) {

			mobile_selectors[" .aecpc-grid__wrap .wp-block[data-type=\"aecpc/icon-block\"]"] = {
				"margin-left" : 0,
				"margin-right" : 0,
				"margin-bottom" : generateCSSUnit( editor_gap, "px" )
			}

			mobile_selectors[" .aecpc-grid__wrap"] = {
				"flex-direction": "column"
			}

			mobile_selectors[" .aecpc-grid__wrap .aecpc-grid__wrapper:last-child"] = {
				"margin-bottom" : 0
			}
		}

		selectors[" .aecpc-grid__wrap .block-editor-block-list__layout"] = {
			"justify-content" : alignment,
			"-webkit-box-pack": alignment,
			"-ms-flex-pack": alignment,
		}
	}


	var styling_css = ""
	var id = `.aecpc-block-${ props.clientId }`

	styling_css = generateCSS( selectors, id )


	styling_css += generateCSS( mobile_selectors, id, true, "mobile" )

	return styling_css
}

export default styling
