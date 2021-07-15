/**
 * BLOCK: Courses Block - Attributes
 */

const attributes = {
	block_id: {
		type: "string"
	},
	label: {
		selector: ".aeopr-icon-block__label",
		default: "#Label"
	},
	hideLabel: {
		type: "boolean",
		default: false
	}, 
	label_color: {
		type: "string"
	},
	label_hover_color: {
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
	},
	courseContent:{
		type:"object",
		default:{"course_id":0,"course_credit_hours":0}
	},
	course:{
		type:"number"
	},
	courseTitle:{
		type:"string"
	}
}

export default attributes
