/**
 * BLOCK: Button
 */

import AEOPR_Block_Icons from "../../../dist/blocks/controls/block-icons"
import attributes from "./attributes"
import edit from "./edit"
import save from "./save"
import "./style.scss"

const {
	registerBlockType
} = wp.blocks

registerBlockType( "aeopr/button", {
	title: 'Button',
	description: '',
	icon: AEOPR_Block_Icons.buttons_child,
	category: 'aeopr',
	attributes,
	edit,
	save,
} )