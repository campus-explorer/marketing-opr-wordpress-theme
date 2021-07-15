/**
 * BLOCK: Course Group Accordion Block
 * Based on Atomic Blocks Accordion Block
 */

// Import block dependencies and components
import Edit from './components/edit';
import Save from './components/save';
import Deprecated from './deprecated/deprecated';
import {useEffect} from 'react';

// Import CSS
import './styles/style.scss';
import './styles/editor.scss';

// Components
const { __ } = wp.i18n;

// Extend component
const { Component } = wp.element;

const { 
	getEntityRecord,
	subscribe,
	withDispatch, 
	withSelect,
	useSelect
	} = wp.data
	
const {
	compose
} = wp.compose

// Register block
const { registerBlockType } = wp.blocks;

const blockAttributes = {
	accordionTitle: {
		type: 'array',
		selector: '.aeopr-course-accordion-title',
		source: 'children',
	},
	accordionText: {
		type: 'array',
		selector: '.aeopr-course-accordion-text',
		source: 'children',
	},
	accordionAlignment: {
		type: 'string',
	},
	accordionFontSize: {
		type: 'number',
		default: undefined,
	},
	accordionOpen: {
		type: 'boolean',
		default: false,
	},
	courses:{
		type:'array'
	}
};
function htmlDecode(input) {
  var doc = new DOMParser().parseFromString(input, "text/html");
  return doc.documentElement.textContent;
}

// Register the block
registerBlockType( 'aeopr/course-accordion', {
	title: __( 'Course Group'),
	description: __(
		'Add accordion block for course grouping'
	),
	icon: 'editor-ul',
	category: 'aeopr',
	keywords: [
		__( 'accordion', 'aeopr' ),
		__( 'list', 'aeopr' ),
	],
	attributes: blockAttributes,

	ab_settings_data: {
		ab_accordion_accordionOpen: {
			title: __( 'Open by default', 'aeopr' ),
		},
	},

	// Render the block components
	edit: withSelect( select => {
				return {
					posts: select( 'core' ).getEntityRecords( 
						'postType', 
						'course', 
						{
							per_page:-1,
							orderby:'title',
							order:'asc'
						} )
				}
			} )( (props)=>{
				var options = [];
				// if posts found
				if( props.posts ) {
					props.posts.map((post) => { // simple foreach loop
						options.push({value:post.id, label:post.acf.course_id+' '+htmlDecode(post.title.rendered)+' ('+post.id+')'
						});
					});
				}
				useEffect( () => {if(options.length>0)props.setAttributes({courses:options})}, [ options ] );
				return <Edit { ...props } />;
	}),

	// Save the attributes and markup
	save: ( props ) => {
		return <Save { ...props } />;
	},

	deprecated: Deprecated,
	providesContext: {
        'aeopr/courseList': 'courses',
    },
} );
