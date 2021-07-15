/**
 * BLOCK: Icon List Child - Attributes
 */

const attributes = {
	block_id: {
		type: "string"
	},
	label: {
		selector: ".aecpc-icon-list__label",
		default:null
	},
	placeholder:{
		type:"string",
		default:"Description"
	},
	image_icon: {
		type: "string",
		default: "icon"
	},
	hideLabel: {
		type: "boolean",
		default: false
	}, 
	icon: {
		type: "string",
		default: "quote"
	},
	image: {
		type: "object",
	},
	imageWidth:{
		type:"number",
		default:60
	},
	icon_color: {
		type: "string",
		default: "#3a3a3a"
	},
	label_color: {
		type: "string"
	},
	icon_hover_color: {
		type: "string"
	},
	label_hover_color: {
		type: "string"
	},
	icon_bg_color: {
		type: "string"
	},
	icon_bg_hover_color: {
		type: "string"
	},
	icon_border_color: {
		type: "string"
	},
	icon_border_hover_color: {
		type: "string"
	},
	link: {
		type: "string",
		default: "#"
	},
	link_title: {
		type: "string"
	},
	tab_index:{
		type:"string",
		default:"-1"
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
