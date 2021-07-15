/**
 * BLOCK: Courses Block
 */

import Archer_OPR_Block_Icons from "controls/block-icons"
import attributes from "./components/attributes"
import edit from "./components/edit"
import save from "./components/save"
import "./assets/style.scss"
import "./assets/editor.scss"
import deprecated from "./components/deprecated"


const { __ } = wp.i18n

const {
	registerBlockType
} = wp.blocks

registerBlockType( "aeopr/course-item", {
	title: "Course Itm",
	description: "Link to Course Information",
	icon: Archer_OPR_Block_Icons.post_timeline,
	category: 'aeopr',
	//parent: "aeopr/course-accordion"
	attributes,
	edit,
	save,
	//deprecated,
} )