/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
import attributes from "./attributes"
import edit from "./edit"
import save from "./save"
import "./style.scss"
import "./editor.scss"

const { __ } = wp.i18n



wp.blocks.registerBlockType( "aeopr/hero-block", {
	title: __( 'Hero Cover' ),
	description: __(
		'Add an image or video with a text overlay — great for headers.'
	),
	icon:'buddicons-replies',
	category: 'aeopr',
	attributes,
	supports:{
		multiple: false,
	},
	//transforms,
	save,
	edit,
	//deprecated,
});
