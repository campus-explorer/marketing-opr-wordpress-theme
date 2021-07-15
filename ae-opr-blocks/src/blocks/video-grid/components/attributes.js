/**
 * BLOCK: Video Grid Attributes */

const attributes = {
	block_id:{
		type:"string"
	},
	categories:{
		type : "string",
	},
	className :{
		type : "string",
	},
	postTitleTag :{
		type    : "string",
		default : "h3",
	},
	postLayout:{
		type    : "string",
		default : "grid",
	},
	columns   :{
		type    : "number",
		default:3
	},
	order     :{
		type    : "string",
		default : "desc",
	},
	orderBy   :{
		type    : "string",
		default : "date",
	},
	postType  :{
		type    : "string",
		default : "video",
	},
	sectionTag:{
		type    : "string",
		default : "section",
	},
	imageSize :{
		type    : "string",
		default : "full",
	},
	id:{
		type : "number",
	}	
}

export default attributes
