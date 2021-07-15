/**
 * BLOCK: Advanced Section
 */

import AEOPR_Block_Icons from "../../../dist/blocks/controls/block-icons"
import attributes from "./attributes"
import edit from "./edit"
import save from "./save"
import deprecated from "./deprecated"
import "./style.scss"
import "./editor.scss"


const { __ } = wp.i18n

const {
	registerBlockType
} = wp.blocks;


registerBlockType( "aeopr/menu-section", {
	title: "Programs Section",
	description: "Gets a list of programs",
	icon: AEOPR_Block_Icons.faq,
	category: 'aeopr',
	keywords: [
		__( "columns" ),
		__( "rows" ),
		__("section"),
	],
	attributes,
	edit,
	save,
	//deprecated,
} )
