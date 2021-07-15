const attributes = {
	block_id: {
		type: "string",
	},
	classMigrate: {
		type: "boolean",
		default: false
	},
	align : {
		type: "string",
		default: "left"
	},
	alignTablet : {
		type: "string",
		default: ""
	},
	alignMobile : {
		type: "string",
		default: ""
	},
	vALign:{
		type:"string",
		default:"top"
	},
	colWidth: {
		type: "number",
		default: "",
	},
	colWidthTablet: {
		type: "number",
		default: "",
	},
	colWidthMobile: {
		type: "number",
		default: "",
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
	
	backgroundOpacity: {
		type: "number",
		default:80
	},
	backgroundImageColor: {
		type: "string"
	},
	overlayType: {
		type: "string",
		default: "color"
	},
}

export default attributes
