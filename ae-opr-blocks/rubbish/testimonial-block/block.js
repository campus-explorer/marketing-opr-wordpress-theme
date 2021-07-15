/**
 * BLOCK: Testimonial Block
 */

import Archer_OPR_Block_Icons from "../../../dist/blocks/controls/block-icons"
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

registerBlockType( "aeopr/testimonial-block", {
	title: "Testimonial",
	description: "Testimonial area",
	icon: Archer_OPR_Block_Icons.testimonial_block,
	category: 'aeopr',
	attributes,
	edit,
	save,
	//deprecated,
} )
