'use strict';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { postList as icon } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import edit from './edit';

export const name = 'aeopr/opr-latest-posts';

export const settings = {
	title: __(
		'AEOPR Latest Posts (Custom Post Type)',
		'aeopr'
	),
	description: __(
		'Display a list of your most recent posts.',
		'aeopr'
	),
	icon,
	category: 'aeopr',
	keywords: [__('recent posts', 'aeopr')],
	supports: {
		align: true,
		html: false,
	},
	edit,
};
