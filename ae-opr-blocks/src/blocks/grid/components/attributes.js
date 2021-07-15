/**
 * BLOCK: Grid - Attributes
 */

const ITEM_COUNT = 1

const cells = []

for ( var i = 1; i <= ITEM_COUNT; i++ ) {
	cells.push(
		{
			"placeholder":"Grid Cell Area"
		}
	)
}

const attributes = {
	block_id: {
		type: "string"
	},
	classMigrate: {
		type: "boolean",
		default: false
	},
	childMigrate: {
		type: "boolean",
		default: false
	},
	child_count:{
		type:"number",
		default:1
	},
	align: {
		type: "string",
		default: "left"
	},
	cell_count: {
		type: "number",
		default: ITEM_COUNT
	},
	cells: {
		type: "array",
		default : cells,
	},
	gap: {
		type: "number",
		default: 10
	},
	inner_gap: {
		type: "number",
		default: 15
	},
	cellPosition: {
		type: "string",
		default: "middle"
	},
	cellWidth: {
		type: "number",
		default: 16
	},
	cellWidthType: {
		type: "string",
		default: "px"
	},
	cellWidthMobile: {
		type: "number"
	},
	bgSize: {
		type: "number",
		default: 0
	},
	border: {
		type: "number",
		default: 0
	},
	borderRadius: {
		type: "number",
		default: 0
	},
	
	cell_layout: {
		type: "string",
		default: "horizontal"
	},
	stack: {
		type: "string",
		default: "no"
	}
}

export default attributes
