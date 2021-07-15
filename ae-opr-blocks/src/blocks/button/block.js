/**
 * BLOCK: Button
 */

import AEOPR_Block_Icons from "Dist/blocks/controls/block-icons"
import attributes from "./attributes"
import edit from "./edit"
import save from "./save"
import deprecated from "./deprecated/deprecated"
import "./style.scss"
import "./editor.scss"

const {
	registerBlockType
} = wp.blocks

registerBlockType( "aeopr/button", {
	title: 'Button',
	description: '',
	icon: AEOPR_Block_Icons.apply_button,
	category: 'aeopr',
	attributes,
	edit,
	save,
	deprecated,
} )