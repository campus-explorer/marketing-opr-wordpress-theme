/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { cover as icon } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import deprecated from './deprecated';
import edit from './edit';
import metadata from './block.json';
import save from './save';
import transforms from './transforms';

const { name } = metadata;

export { metadata, name };

export const settings = {
	title: __( 'Hero Cover' ),
	description: __(
		'Add an image or video with a text overlay — great for headers.'
	),
	icon,

	transforms,
	save,
	edit,
	deprecated,
};
