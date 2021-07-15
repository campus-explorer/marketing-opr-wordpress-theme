/**
 * BLOCK: Column
 */

import classnames from "classnames"
import AEOPR_Block_Icons from "../../../dist/blocks/controls/block-icons"
import edit from "./edit"
import save from "./save"
import deprecated from "./deprecated"
import attributes from "./attributes"
import "./style.scss"
import "./editor.scss"

const { __ } = wp.i18n

const { registerBlockType } = wp.blocks

registerBlockType( "aeopr/advcolumn", {
	title: "aaaColumn",
	description: "Single Column Element",
	icon: AEOPR_Block_Icons.column,
	category: 'aeopr',
	parent: [ "aeopr/advanced-section"],
	supports: {
		//inserter: false,
		// Add EditorsKit block navigator toolbar
		editorsKitBlockNavigator: true,
	},
	attributes,
	edit,
	save,
	deprecated,
} )
