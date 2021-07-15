/**
 * BLOCK: Post Grid List Block
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

registerBlockType( "aeopr/post-list-grid", {
	title: "Post Grid",
	description: "Lists posts in grid format",
	icon: 'grid-view',
	category: 'aeopr',
	attributes,
	edit,
	save,
	//deprecated,
} )
