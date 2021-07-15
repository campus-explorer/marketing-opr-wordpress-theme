/**
 * BLOCK: Section
 */

import classnames from "classnames"
import AEOPR_Block_Icons from "../../../dist/blocks/controls/block-icons"
import "./style.scss"
import "./editor.scss"
import attributes from "./attributes"
import edit from "./edit"
import save from "./save"
import deprecated from "./deprecated"
import inlineStyles from "./inline-styles"


const { __ } = wp.i18n

const {
	registerBlockType
} = wp.blocks

registerBlockType( "aeopr/section", {
	title: 'Section',
	description: '',
	icon: AEOPR_Block_Icons.section,
	category: aeopr_blocks_info.category,
	keywords: [
		__( "section" ),
		__( "wrapper" ),
	],
	supports: {
		anchor: true,
	},
	attributes,
	edit,
	getEditWrapperProps( attributes ) {
		const { align, contentWidth } = attributes
		if ( "left" === align || "right" === align || "wide" === align || "full" === align ) {
			if ( "full_width" == contentWidth ) {
				return { "data-align": align }
			}
		}
	},
	save,
	deprecated,
} )
