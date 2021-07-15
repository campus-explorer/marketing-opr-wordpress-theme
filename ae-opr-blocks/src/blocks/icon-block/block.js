/**
 * BLOCK: Icon List - Child
 */

import AEOPR_Block_Icons from "Dist/blocks/controls/block-icons"
import attributes from "./components/attributes"
import edit from "./components/edit"
import save from "./components/save"
import "./assets/style.scss"
import "./assets/editor.scss"
import deprecated from "./components/deprecated"


const { __ } = wp.i18n

const {
	registerBlockType
} = wp.blocks

registerBlockType( "aeopr/icon-block", {
	title: 'Icon',
	description: 'Add a single icon from a library',
	icon: AEOPR_Block_Icons.icon_list_child,
	category: 'aeopr',
	attributes,
	edit,
	save,
	deprecated,
} )
