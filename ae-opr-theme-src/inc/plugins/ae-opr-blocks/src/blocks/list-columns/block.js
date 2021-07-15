/**
 * BLOCK: List Columns
 */

import classnames from "classnames"
import AEOPR_Block_Icons from "../../../dist/blocks/controls/block-icons"
import attributes from "./attributes"
import edit from "./edit"
import save from "./save"
import "./style.scss"
import "./editor.scss"


const { __ } = wp.i18n

const {
	registerBlockType
} = wp.blocks

const {
	InnerBlocks,
} = wp.blockEditor

registerBlockType( "aeopr/columns-list", {
	title:"List Columns",
	description: "Create columns of list items",
	icon: 'excerpt-view',
	category: 'aeopr',
	attributes,
	edit,
	save,
	//deprecated,
} )
