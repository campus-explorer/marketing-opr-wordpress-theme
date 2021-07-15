/**
 * BLOCK: Icon Block - Attributes
 */

const attributes = {
	block_id: {
		type: "string"
	},
	label: {
		selector: ".aeopr-icon-block__label",
	},
	hideLabel: {
		type: "boolean",
		default: true
	}, 
	icon: {
		type: "string",
		default: ""
	},
	icon_size:{
		type:"number",
		default:40
	},
	icon_color: {
		type: "string",
		default: "#3a3a3a"
	},
	icon_color_name: {
		type: "string"
	},
	label_color: {
		type: "string"
	},
	label_color_name:{
		type:"string"
	},
	icon_hover_color: {
		type: "string"
	},
	icon_hover_color_name:{
		type:"string"	
	},
	label_hover_color: {
		type: "string"
	},
	label_hover_color_name: {
		type: "string"
	},
	link: {
		type: "string",
		default: "#"
	},
	target: {
		type: "boolean",
		default: false
	},
	disableLink: {
		type: "boolean",
		default: true
	}
}

export default attributes
