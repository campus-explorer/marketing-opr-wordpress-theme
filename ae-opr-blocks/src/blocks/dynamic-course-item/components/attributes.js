/**
 * BLOCK: Courses Block - Attributes
 */

const attributes = {
	block_id: {
		type: "string"
	},
	label: {
		type:"string",
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
	},
	coursePrerequisites:{
		type:"array"
	},
	posts:{
		type:"object",
		default:null
	},
	courseContent_id:{
		type: "string"
	},
	courseContent_hours:{
		type:"string"
	},
	courseContent_abstract:{
		type:"string"
	}
	
}

export default attributes
