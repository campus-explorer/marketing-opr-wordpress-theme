/**
 * BLOCK: Columns - Attributes
 */

const attributes = {
	block_id: {
		type: "string",
	},
	classMigrate: {
		type: "boolean",
		default: false
	},
	columns: {
		type: "number",
		default: 2
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
		type:"string"
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
}

export default attributes
