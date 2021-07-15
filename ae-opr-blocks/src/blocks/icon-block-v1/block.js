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

registerBlockType( "aeopr/icon-block", {
	title: 'Icon',
	description: 'Add a single icon from a library',
	icon: AEOPR_Block_Icons.icon_list_child,
	category: 'aeopr',
	attributes,
	edit,
	save,
	deprecated,
} )
