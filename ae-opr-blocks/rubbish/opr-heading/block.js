/**
 * External dependencies
 */
//import { isEmpty } from 'lodash';

/**
 * WordPress dependencies
 */
import { heading as icon } from '@wordpress/icons';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
//import deprecated from './deprecated';
import edit from './edit';
import save from './save';
//import transforms from './transforms';



const {
	registerBlockType
} = wp.blocks

registerBlockType( "aeopr/opr-heading", {
	title: __( 'Heading' ),
	description: __(
		'Introduce new sections and organize content to help visitors (and search engines) understand the structure of your content.'
	),
	category:'aeopr',
	icon,
	keywords: [ __( 'title' ), __( 'subtitle' ) ],
	example: {
		attributes: {
			content: __( 'Code is Poetry' ),
			level: 2,
		},
	},
	//transforms,
	//deprecated,
	edit,
	save
});
