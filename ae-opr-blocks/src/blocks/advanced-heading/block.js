/**
 * BLOCK: Advanced Heading
 */

import attributes from "./attributes"
import edit from "./edit"
import save from "./save"
import transform from "./transform"
import "./style.scss"
import { heading as icon } from '@wordpress/icons';

const { __ } = wp.i18n

const {
	registerBlockType,
	createBlock
} = wp.blocks

const {
	RichText
} = wp.blockEditor


registerBlockType( "aeopr/advanced-heading", {

	title: 'Advanced Heading',
	description: 'Advanced Heading',
	icon,
	keywords: [
		__( "advanced heading" ),
		__( "heading" ),
	],
	supports: {
		anchor: true,
	},
	category: 'aeopr',
	attributes,
	transform,
	edit,
	save,
} )