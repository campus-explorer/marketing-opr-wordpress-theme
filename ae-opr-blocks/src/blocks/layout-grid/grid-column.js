/**
 * WordPress dependencies
 */

import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */

import editColumn from './src/grid-column/edit';
import saveColumn from './src/grid-column/save';
import {GridColumnIcon } from './src/icons';
import {
	getSpanForDevice,
	getOffsetForDevice,
	DEVICE_BREAKPOINTS,
	MAX_COLUMNS,
} from './src/constants';
//import deprecated from './grid-column/deprecated';


registerBlockType( 'aeopr/layout-grid-column', {
	description: __(
		'A column used inside a Layout Grid block.',
		'layout-grid'
	),
	title: __( 'Column', 'layout-grid' ),
	icon: GridColumnIcon,
	category: 'aeopr',
	parent: [ 'aeopr/layout-grid' ],
	supports: {
		inserter: false,
		reusable: false,
		html: false,
		anchor: true,
		align: [ 'left', 'right', 'center' ]
	},
	attributes: {
		backgroundColor: {
			type: 'string',
		},
		customBackgroundColor: {
			type: 'string',
		},
		padding: {
			type: 'string',
			default: 'none',
		},
		verticalAlignment: {
			type: 'string',
		},
		align:{
			type:'string',
			default:'left'
		}
	},
	edit: editColumn,
	save: saveColumn,
	//deprecated,
} );
