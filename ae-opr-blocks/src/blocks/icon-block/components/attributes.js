/**
 * BLOCK: Icon Block - Attributes
 */
const attributes = {
	block_id: {
		type: "string"
	},
	icon: {
		type: "string",
		default: ""
	},
	icon_library:{
		type:"object",
	},
	icon_size:{
		type:"number",
		default:20
	},
	iconColor: {
		type: "string"
	},
	customIconColor:{
		type:'string'
	},
	iconColorValue:{
		type:'string'
	}	,
	backgroundColor: {
		type: "string"
	},
	borderRadius:{
		type:"number",
		default:50
	},
	borderWidth:{
		type:"number",
	},
	borderColor:{
		type:"string"
	},
	borderColorValue:{
		type:'string'	
	},
	icon_hover_color: {
		type: "string"
	},
	icon_hover_color_name:{
		type:"string"	
	},
	icon_hover_background_color: {
		type: "string"
	},
	icon_hover_background_color_name:{
		type:"string"	
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
