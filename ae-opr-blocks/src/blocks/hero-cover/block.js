/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
import edit from "./components/edit"
import save from "./components/save"
import "./assets/style.scss"
import "./assets/editor.scss"

const { __ } = wp.i18n



wp.blocks.registerBlockType( "aeopr/hero-block", {
	title: __( 'Hero Cover' ),
	description: __(
		'Add an image or video with a text overlay — great for headers.'
	),
	icon:'buddicons-replies',
	category: 'aeopr',
	attributes: {
		block_id: {
			type: "string"
		},
	    backgroundType: {
			type: "string",
			default:'color'
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
	},
	supports:{
		multiple: false,
	},
	save,
	edit,
});
