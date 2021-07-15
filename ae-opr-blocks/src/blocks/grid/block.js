/**
 * BLOCK: Grid
 */

import AECPC_Block_Icons from "Dist/blocks/controls/block-icons"
import attributes from "./components/attributes"
import edit from "./components/edit"
import save from "./components/save"
import "./assets/style.scss"
import "./assets/editor.scss"

const { __ } = wp.i18n
const {
	registerBlockType
} = wp.blocks

registerBlockType( "aeopr/grid", {
	title: 'Grid',
	description: 'Flexible grid area',
	icon: 'grid-view',
	category: 'aeopr',
	keywords: [
		__( "grid" )
	],
	supports: {
		anchor: true,
		align: true,
	},
	attributes,
	edit,
	save,
} )
