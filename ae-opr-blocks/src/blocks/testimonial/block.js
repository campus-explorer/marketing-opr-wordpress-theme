/**
 * BLOCK: Testimonial
 */

import classnames from "classnames"
import AEOPR_Block_Icons from "../../../dist/blocks/controls/block-icons"
import edit from "./edit"
import save from "./save"
import attributes from "./attributes"
import deprecated from "./deprecated"
import "./style.scss"
import "./editor.scss"
const { __ } = wp.i18n

const {
	registerBlockType,
} = wp.blocks

registerBlockType( "aeopr/testimonial", {
	title: "Testimonial Block", // Block title.
	description: "Testimonial Block", // Block description.
	icon: AEOPR_Block_Icons.testimonial, // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	keywords: [
		__( "testimonial" ),
		__( "opr" ),
	],
	supports: {
		anchor: true,
	},
	category: "aeopr",
	attributes,
	edit,
	save,
	//deprecated,
} )
