/**
 * BLOCK: Icon List - Child
 */

import AEOPR_Block_Icons from "../../../dist/blocks/controls/block-icons"
import attributes from "./attributes"
import edit from "./edit"
import save from "./save"
import "./style.scss"
import "./editor.scss"
import deprecated from "./deprecated"


const { __ } = wp.i18n

const {
	registerBlockType
} = wp.blocks

registerBlockType( "aeopr/icon-list-child", {
	title: 'Icon List Child',
	description: 'child for icon list',
	icon: AEOPR_Block_Icons.icon_list_child,
	category: 'aeopr',
	parent: [ "aeopr/icon-list" ],
	attributes,
	edit,
	save,
	deprecated,
} )
