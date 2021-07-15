/**
 * BLOCK: Video Testimonial Block
 */

import Archer_OPR_Block_Icons from "controls/block-icons"
import edit from "./components/edit"
import "./assets/style.scss"
import "./assets/editor.scss"
//import deprecated from "./components/deprecated"


const { __ } = wp.i18n

const {
	registerBlockType
} = wp.blocks

registerBlockType( "aeopr/video-testimonial", {
	title: "Video Testimonial",
	description: "Link to Video Testimonial",
	//icon: Archer_OPR_Block_Icons.video,
	category: 'aeopr',
	edit,
	save ( props ) {
            return null // See PHP side. This block is rendered on PHP.
        },
	//deprecated,
} )
