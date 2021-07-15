/**
 * BLOCK: Courses Block
 */

import Archer_OPR_Block_Icons from "controls/block-icons"
//import attributes from "./attributes"
import edit from "./components/edit"
//import save from "./save"
import "./assets/style.scss"
import "./assets/editor.scss"
import deprecated from "./components/deprecated"


const { __ } = wp.i18n

const {
	registerBlockType,
	createBlock
} = wp.blocks

registerBlockType( "aeopr/dynamic-course-item", {
	title: "Link to Course Item",
	description: "Link to Course Information",
	icon: Archer_OPR_Block_Icons.post_timeline,
	category: 'aeopr',
	parent: ["aeopr/course-accordion"],
	//attributes,
	edit,
	save ( props ) {
            return null // See PHP side. This block is rendered on PHP.
        },
	deprecated,
	transforms: {
	    from: [
	      {
	        type: "block",
	        blocks: ["aeopr/course-item"],
	         transform: ( attributes) => {
                return createBlock(
                    'aeopr/dynamic-course-item',
                    attributes
                );
            },

	      },
	    ],
	},
	usesContext: ['aeopr/courseList']
} )
