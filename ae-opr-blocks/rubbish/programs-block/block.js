/**
 * BLOCK: Icon Block
 */

import Archer_Block_Icons from "../../../dist/blocks/controls/block-icons"
import attributes from "./attributes"
import edit from "./edit"
import save from "./save"
import "./style.scss"
import "./editor.scss"
//import deprecated from "./deprecated"


const { __ } = wp.i18n

const {
	registerBlockType
} = wp.blocks

registerBlockType( "archer/icon-block", {
	title: "Icon Item",
	description: "Single Icon",
	icon: Archer_Block_Icons.icon_block,
	category: 'archer',
	attributes,
	edit,
	save,
	//deprecated,
} )
