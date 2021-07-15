/**
 * BLOCK: Icon List Child - Attributes
 */

const attributes = {
	block_id: {
		type: "string"
	},
	button_class:{
		type:"string",
		default:"aeopr-primary-button"
	},
	button_text:{
		type:"string",
		default:"Learn More"
	},
	image_icon: {
		type: "string",
		default: "image"
	}, 
	icon: {
		type: "string",
		default: "far fa-image"
	},
	image: {
		type: "object",
	},
	link_bg_color: {
		type: "string",
		default:"#ccc"
	},
	link: {
		type: "string",
		default: "#"
	},
	tab_index:{
		type:"string",
		default:"-1"
	},
	target: {
		type: "boolean",
		default: false
	},
	link_label:{
		type:"string"
	},
	link_title:{
		type:"array",
		source:"children",
		selector:"h4"
	},
	link_text:{
		type:"array",
		source:"children",
		selector:"p"
	},
	link_text_color:{
		type:'string',
		default:'perublack'
	},
	link_text_color_hover:{
		type:'string',
		default:'peruwhite'
	},
	backgroundType: {
		type: "string",
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
	backgroundColor: {
		type: "string",
	},
	backgroundColorHover: {
		type: "string"
	},
	backgroundOpacity: {
		type: "number"
	},
	backgroundImageColor: {
		type: "string"
	},
	overlayType: {
		type: "string",
		default: ""
	},
	align : {
		type: "string",
		default: "center"
	},
	alignTablet : {
		type: "string",
		default: ""
	},
	alignMobile : {
		type: "string",
		default: ""
	}

}

export default attributes
