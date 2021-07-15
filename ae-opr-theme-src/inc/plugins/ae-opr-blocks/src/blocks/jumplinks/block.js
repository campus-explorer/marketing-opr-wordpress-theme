/**
 * BLOCK: Table of Contents
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
} = wp.blocks

registerBlockType( "aeopr/jump-links", {
	title: "Jump Links",
	description: "",
	icon: "sort",
	category: 'aeopr',
	keywords: [
		__( "table of contents" ),
		__( "table" ),
		"jump links"
	],
	supports: {
		anchor: true,
		multiple: false,
	},
	attributes,
	edit,
	save,
	deprecated
} )
