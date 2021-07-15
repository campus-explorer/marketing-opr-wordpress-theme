/**
 * BLOCK: Visual Links
 */

import AEOPR_Block_Icons from "../../../dist/blocks/controls/block-icons"
import attributes from "./attributes"
import edit from "./edit"
import save from "./save"
//import transform from "./transform"
//import deprecated from "./deprecated"
import "./style.scss"
import "./editor.scss"

const { __ } = wp.i18n
const {
	registerBlockType
} = wp.blocks

registerBlockType( "aeopr/visual-links", {
	title: 'Visual Links',
	description: 'List of advanced links with backgrounds and hover states',
	icon: AEOPR_Block_Icons.buttons,
	category: 'aeopr',
	keywords: [
		__( "links" ),
		__( "visual links" )
	],
	attributes,
	edit,
	save,
	//transform,
	//deprecated
} )
