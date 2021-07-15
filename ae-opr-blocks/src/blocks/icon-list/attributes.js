/**
 * BLOCK: Icon List - Attributes
 */

const ITEM_COUNT = 1

const icons = []

for ( var i = 1; i <= ITEM_COUNT; i++ ) {
	icons.push(
		{
			"label": "",
			"image_icon": "icon",
			"icon": "quote",
			"image": "",
			"icon_color": "#3a3a3a",
			"label_color": "",
			"icon_hover_color": "",
			"label_hover_color": "",
			"icon_bg_color": "",
			"icon_bg_hover_color": "",
			"icon_border_color": "",
			"icon_border_hover_color": "",
			"link": "#",
			"target": false,
			"disableLink": true,
			"hideLabel" : false
		}
	)
}

const attributes = {
	block_id: {
		type: "string"
	},
	classMigrate: {
		type: "boolean",
		default: false
	},
	childMigrate: {
		type: "boolean",
		default: false
	},
	child_count:{
		type:"number",
		default:1
	},
	align: {
		type: "string",
		default: "left"
	},
	icon_count: {
		type: "number",
		default: ITEM_COUNT
	},
	icons: {
		type: "array",
		default : icons,
	},
	gap: {
		type: "number",
		default: 10
	},
	inner_gap: {
		type: "number",
		default: 15
	},
	iconPosition: {
		type: "string",
		default: "middle"
	},
	size: {
		type: "number",
		default: 16
	},
	sizeType: {
		type: "string",
		default: "px"
	},
	sizeMobile: {
		type: "number"
	},
	sizeTablet: {
		type: "number"
	},
	bgSize: {
		type: "number",
		default: 0
	},
	border: {
		type: "number",
		default: 0
	},
	borderRadius: {
		type: "number",
		default: 0
	},
	hideLabel: {
		type: "boolean",
		default: false
	},
	fontSize: {
		type: "number"
	},
	fontSizeType: {
		type: "string",
		default: "px"
	},
	fontSizeMobile: {
		type: "number"
	},
	fontSizeTablet: {
		type: "number"
	},
	fontFamily: {
		type: "string",
		default: "Default",
	},
	fontWeight: {
		type: "string",
	},
	fontSubset: {
		type: "string",
	},
	lineHeightType: {
		type: "string",
		default: "em"
	},
	lineHeight: {
		type: "number",
	},
	lineHeightTablet: {
		type: "number",
	},
	lineHeightMobile: {
		type: "number",
	},
	loadGoogleFonts: {
		type: "boolean",
		default: false
	},
	icon_layout: {
		type: "string",
		default: "horizontal"
	},
	stack: {
		type: "string",
		default: "none"
	}
}

export default attributes
