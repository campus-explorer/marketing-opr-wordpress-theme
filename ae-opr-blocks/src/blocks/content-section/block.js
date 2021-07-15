/**
 * BLOCK: Columns
 */

import classnames from "classnames"
import AEOPR_Block_Icons from "Dist/blocks/controls/block-icons"
import attributes from "./components/attributes"
import edit from "./components/edit"
import save from "./components/save"
import deprecated from "./components/deprecated"
import shapes from "./helpers/shapes"
import "./assets/style.scss"
import "./assets/editor.scss"


const { __ } = wp.i18n

const {
	registerBlockType
} = wp.blocks

const {
	InnerBlocks,
} = wp.blockEditor

registerBlockType( "aeopr/content-section", {
	title:"Content Section",
	description: "",
	icon: AEOPR_Block_Icons.columns,
	category: 'aeopr',
	keywords: [
		__( "columns" ),
		__( "rows" ),
	],
	attributes:{
		block_id: {
			type: "string",
		},
		classMigrate: {
			type: "boolean",
			default: false
		},
		columns: {
			type: "number",
			default: 1
		},
		align: {
			type: "string",
			default: "center"
		},
		vAlign: {
			type: "string",
			default: "top"
		},
		stack: {
			type: "string",
			default: "mobile"
		},
		contentWidth: {
			type: "string",
			default: "theme"
		},
		sectionOverlap:{
			type:"string",
			default:"none"
		},
		width: {
			type: "number",
			default: 900
		},
		widthType: {
			type: "string",
			default: "px"
		},
		tag: {
			type: "string",
			default: "section"
		},
		backgroundType: {
			type: "string",
			default: "color"
		},
		backgroundImage: {
			type: "object",
		},
		backgroundPosition: {
			type: "string",
			default: "center-center"
		},
		backgroundSize: {
			type: "string",
			default: "cover"
		},
		backgroundRepeat: {
			type: "string",
			default: "no-repeat"
		},
		backgroundVideo: {
			type: "object",
		},
		backgroundColor: {
			type: "string",
			default:''
		},
		backgroundOpacity: {
			type: "number",
			default: 80
		},
		backgroundVideoOpacity: {
			type: "number",
			default: 50
		},
		backgroundVideoColor: {
			type: "string",
		},
		backgroundImageColor: {
			type: "string"
		},
		
		boxShadowColor: {
			type: "string"
		},
		boxShadowHOffset : {
			type: "number",
			default: 0
		},
		boxShadowVOffset : {
			type: "number",
			default: 0
		},
		boxShadowBlur : {
			type: "number"
		},
		boxShadowSpread : {
			type: "number"
		},
		boxShadowPosition: {
			type: "string",
			default: "outset"
		},
	},
	edit,
	supports: {
		// Add EditorsKit block navigator toolbar
		editorsKitBlockNavigator: true,
		anchor: true,
	},
	save,
} )
