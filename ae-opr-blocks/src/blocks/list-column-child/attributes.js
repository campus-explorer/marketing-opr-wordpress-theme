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
		default: "center"
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
		default:"color"
	},
	backgroundColor: {
		type: "string",
	}
}

export default attributes
