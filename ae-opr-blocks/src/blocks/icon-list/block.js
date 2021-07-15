/**
 * BLOCK: Icon List
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

registerBlockType( "aeopr/icon-list", {
	title: 'Icon List',
	description: 'List of icons',
	icon: AEOPR_Block_Icons.icon_list,
	category: 'aeopr',
	keywords: [
		__( "icon list" ),
		__( "image list" )
	],
	supports: {
		anchor: true,
	},
	attributes,
	edit,
	save,
	transform,
	deprecated
} )
