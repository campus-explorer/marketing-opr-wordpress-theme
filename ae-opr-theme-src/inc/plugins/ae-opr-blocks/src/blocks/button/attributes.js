/**
 * BLOCK: Button - Attributes
 */

const attributes = {
	block_id: {
		type: "string"
	},
	button_class:{
		type:"string",
		default:"aeopr-secondary-button"
	},
	button_type:{
		type:"string",
		default:"learn-more"
	},
	classMigrate: {
		type: "boolean",
		default: false
	},
	align: {
		type: "string",
		default: "center"
	},
	stack: {
		type: "string",
		default: "none"
	},
	label: {
		type: "string",
		default:"Learn More" 
	},
	link: {
		type: "string",
		default:"/apply-now" 
	},
	vPadding: {
		type: "number",
		default:10 
	},
	hPadding: {
		type: "number",
		default:14 
	},
	sizeType: {
		type: "string",
		default:"px" 
	} ,
	sizeMobile: {
		type: "number",
		default:"" 
	} ,
	sizeTablet: {
		type: "number",
		default:"" 
	} ,
	tab_index:{
		type:"string",
		default:"0"
	},
	opensInNewTab: {
		type: "boolean"
	}
}

export default attributes