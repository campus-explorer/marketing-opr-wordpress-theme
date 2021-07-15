/**
 * BLOCK: Columns
 */

import classnames from "classnames"
import AEOPR_Block_Icons from "../../../dist/blocks/controls/block-icons"
import attributes from "./attributes"
import edit from "./edit"
import save from "./save"
import deprecated from "./deprecated"
import transform from "./transform"
import shapes from "./shapes"
import "./style.scss"
import "./editor.scss"


const { __ } = wp.i18n

const {
	registerBlockType
} = wp.blocks

const {
	InnerBlocks,
} = wp.blockEditor

registerBlockType( "aeopr/columns-basic", {
	title:"Content Section 2",
	description: "",
	icon: AEOPR_Block_Icons.columns,
	category: 'aeopr',
	keywords: [
		__( "columns" ),
		__( "rows" ),
	],
	attributes,
	edit,
	getEditWrapperProps( attributes ) {
		return { "data-align": attributes.align }
		return { "data-valign": attributes.vAlign }
	},
	supports: {
		// Add EditorsKit block navigator toolbar
		editorsKitBlockNavigator: true,
		anchor: true,
		align:true,
		alignWide:false
	},
	save,
	transform
} )
