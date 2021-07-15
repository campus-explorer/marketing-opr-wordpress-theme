/**
 * BLOCK: Visual Links - Child
 */
import classname from "classnames"
import AEOPR_Block_Icons from "dist/blocks/controls/block-icons"
import attributes from "./components/attributes"
import edit from "./components/edit"
import save from "./components/save"
import "./assets/style.scss"
import "./assets/editor.scss"
import deprecated from "./components/deprecated"


const { __ } = wp.i18n
const {
	InnerBlocks
} = wp.blockEditor

const {
	registerBlockType
} = wp.blocks
const {addFilter} = wp.hooks

registerBlockType( "aeopr/visual-links-child", {
	title: 'Visual Link Child',
	description: 'child for visual links',
	icon: AEOPR_Block_Icons.buttons_child,
	category: 'aeopr',
	customClassName: true,
	//attributes,
	edit,
	save: props => {
	  return <InnerBlocks.Content />
	},
	deprecated,
} )
