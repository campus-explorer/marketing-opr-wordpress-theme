/**
 * WordPress dependencies
 */

import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */

import editGrid from './src/grid/edit';
import saveGrid from './src/grid/save';
import { GridIcon, GridColumnIcon } from './src/icons';
import {
	getSpanForDevice,
	getOffsetForDevice,
	DEVICE_BREAKPOINTS,
	MAX_COLUMNS,
} from './src/constants';
import "./style.scss"
import "./editor.scss"

function getColumnAttributes( total, breakpoints ) {
	const attributes = {};

	for ( let index = 0; index < total; index++ ) {
		breakpoints.map( ( breakpoint ) => {
			attributes[ getSpanForDevice( index, breakpoint ) ] = {
				type: 'number',
			};
			attributes[ getOffsetForDevice( index, breakpoint ) ] = {
				type: 'number',
				default: 0,
			};
		} );
	}

	return attributes;
}

registerBlockType( 'aeopr/layout-grid', {
	title: __( 'AEOPR Layout Grid', 'aeopr' ),
	description: __(
		'Align blocks to a global grid, with support for responsive breakpoints.',
		'layout-grid'
	),
	icon: GridIcon,
	category: 'aeopr',
	supports: {
		align: [ 'full','wide' ],
		html: false,
		anchor: true,
	},
	example: {
		attributes: {
			columns: 2,
		},
		innerBlocks: [
			{
				name: 'aeopr/layout-grid-column',
				innerBlocks: [
					{
						name: 'core/paragraph',
						attributes: {
							customFontSize: 32,
							content: __(
								'<strong>Snow Patrol</strong>',
								'layout-grid'
							),
							align: 'center',
						},
					},
				],
			},
			{
				name: 'aeopr/layout-grid-column',
				innerBlocks: [
					{
						name: 'core/image',
						attributes: {
							url:
								'https://s.w.org/images/core/5.3/Windbuchencom.jpg',
						},
					},
				],
			},
		],
	},
	attributes: {
		align: {
			type: 'string',
			default: 'full',
		},
		gutterSize: {
			type: 'string',
			default: 'large',
		},
		addGutterEnds: {
			type: 'boolean',
			default: true,
		},
		verticalAlignment: {
			type: 'string',
		},
		backgroundColor: {
			type: 'string',
		},
		customBackgroundColor: {
			type: 'string',
		},
		backgroundImage:{
			type:'object',
		},
		backgroundOpacity:{
			type:'number',
			default:100,	
		},
		backgroundPosition: {
			type: "string",
			default: "center-center"
		},
		backgroundSize: {
			type: "string",
			default: "cover"
		},
		backgroundRepeat:{
			type:"string",
			default:"no-repeat"
		},
		tagName:{
			type:'string',
			default:'div'
		},
		...getColumnAttributes( MAX_COLUMNS, DEVICE_BREAKPOINTS ),
	},
	edit: editGrid,
	save: saveGrid,
} );

