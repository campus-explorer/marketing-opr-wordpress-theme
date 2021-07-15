/**
 * BLOCK: Hero Area Block - Attributes
 */

const attributes = {
	block_id: {
		type: "string"
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
    mainHeading: {
            type: 'array',
            source: 'children',
            selector: 'h1',
        },
    supportHeading: {
        type: 'array',
        source: 'children',
        selector: 'h3',
    },
    showDate:{
	    type:'boolean'
    },
    classDate:{
	    type:'string'
    },
    applyDate:{
	    type:'string'
    }
}

export default attributes
