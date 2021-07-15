/**
 * BLOCK: Content Area
 * A Block template for general content that has limits on what can be added
 */

import AEOPR_Block_Icons from "../../../dist/blocks/controls/block-icons"
import attributes from "./attributes"
import edit from "./edit"
import save from "./save"
import transform from "./transform"
import deprecated from "./deprecated"
import "./style.scss"
import "./editor.scss"

const { __ } = wp.i18n
const {
	registerBlockType
} = wp.blocks

registerBlockType( "aeopr/content-area", {
	title: 'Content Area',
	description: 'Page Content Area',
	icon: AEOPR_Block_Icons.table_of_contents,
	category: 'aeopr',
	keywords: [
		__( "content area" )
	],
	supports: {
		multiple: false,
	},
	attributes,
	edit,
	save,
	transform,
	deprecated
} )
