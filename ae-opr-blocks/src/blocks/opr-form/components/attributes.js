/**
 * BLOCK: CEWidget Block - Attributes
 */

const attributes = {
	block_id: {
		type: "string"
	},
	label: {
		type:"string",
	},
	redirect:{
		type:"string",
		default: aeopr_settings.redirect
	}	
}

export default attributes
