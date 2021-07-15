/**
 * BLOCK: Post Grid block for AEOPR 
 * Based on Atomic Blocks Post and Page Grid
 */

// Import block dependencies and components
import edit from './components/edit';

// Import CSS
import './assets/css/style.scss';
import './assets/css/editor.scss';

import attributes from './components/attributes'
// Components
const { __ } = wp.i18n;

// Register block controls
const { registerBlockType } = wp.blocks;
const {InnerBlocks } = wp.blockEditor;



// Register the block
registerBlockType( 'aeopr/video-grid', {
	title: __( 'AEOPR Video Grid', 'aeopr' ),
	description: __(
		'Add a grid or list of customizable posts.',
		'aeopr'
	),
	icon: 'grid-view',
	category: 'aeopr',
	keywords: [
		__( 'post', 'aeopr' ),
		__( 'grid', 'aeopr' ),
	],

	edit,
	attributes,
	aeopr_settings_data: {
		aeopr_postgrid_postType: {
			title: __( 'Content Type', 'aeopr' ),
		},
		aeopr_postgrid_queryControls: {
			title: __( 'Query Controls', 'aeopr' ),
		},
		aeopr_postgrid_offset: {
			title: __( 'Post Offset', 'aeopr' ),
		},
		aeopr_postgrid_columns: {
			title: __( 'Columns', 'aeopr' ),
		},
		aeopr_postgrid_displaySectionTitle: {
			title: __( 'Display Section Title', 'aeopr' ),
		},
		aeopr_postgrid_sectionTitle: {
			title: __( 'Section Title', 'aeopr' ),
		},
		aeopr_postgrid_displayPostImage: {
			title: __( 'Display Featured Image', 'aeopr' ),
		},
		aeopr_postgrid_imageSizeValue: {
			title: __( 'Image Size', 'aeopr' ),
		},
		aeopr_postgrid_displayPostTitle: {
			title: __( 'Display Post Title', 'aeopr' ),
		},
		aeopr_postgrid_displayPostAuthor: {
			title: __( 'Display Post Author', 'aeopr' ),
		},
		aeopr_postgrid_displayPostDate: {
			title: __( 'Display Post Date', 'aeopr' ),
		},
		aeopr_postgrid_displayPostExcerpt: {
			title: __( 'Display Post Excerpt', 'aeopr' ),
		},
		aeopr_postgrid_excerptLength: {
			title: __( 'Excerpt Length', 'aeopr' ),
		},
		aeopr_postgrid_displayPostLink: {
			title: __( 'Display Continue Reading Link', 'aeopr' ),
		},
		aeopr_postgrid_readMoreText: {
			title: __( 'Read More Text', 'aeopr' ),
		},
		aeopr_postgrid_sectionTag: {
			title: __( 'Post Grid Section Tag', 'aeopr' ),
		},
		aeopr_postgrid_sectionTitleTag: {
			title: __( 'Section Title Heading Tag', 'aeopr' ),
		},
		aeopr_postgrid_postTitleTag: {
			title: __( 'Post Title Heading Tag', 'aeopr' ),
		},
	},

	// Render via PHP
	save ( props ) {
            return null // See PHP side. This block is rendered on PHP.
        }
} );
