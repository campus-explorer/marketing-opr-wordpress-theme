/**
 * BLOCK: Atomic Blocks Post and Page Grid
 */

// Import block dependencies and components
import edit from './components/edit';

// Import CSS
import './styles/style.scss';
import './styles/editor.scss';

// Components
const { __ } = wp.i18n;

// Register block controls
const { registerBlockType } = wp.blocks;

// Register alignments
const validAlignments = [ 'center', 'wide', 'full' ];

// Register the block
registerBlockType( 'aeopr/ab-post-grid', {
	title: __( 'AEOPR Post and Page Grid', 'aeopr' ),
	description: __(
		'Add a grid or list of customizable posts or pages.',
		'aeopr'
	),
	icon: 'grid-view',
	category: 'aeopr',
	keywords: [
		__( 'post', 'aeopr' ),
		__( 'page', 'aeopr' ),
		__( 'grid', 'aeopr' ),
	],

	getEditWrapperProps( attributes ) {
		const { align } = attributes;
		if ( -1 !== validAlignments.indexOf( align ) ) {
			return { 'data-align': align };
		}
	},

	edit,

	ab_settings_data: {
		ab_postgrid_postType: {
			title: __( 'Content Type', 'aeopr' ),
		},
		ab_postgrid_queryControls: {
			title: __( 'Query Controls', 'aeopr' ),
		},
		ab_postgrid_offset: {
			title: __( 'Post Offset', 'aeopr' ),
		},
		ab_postgrid_columns: {
			title: __( 'Columns', 'aeopr' ),
		},
		ab_postgrid_displaySectionTitle: {
			title: __( 'Display Section Title', 'aeopr' ),
		},
		ab_postgrid_sectionTitle: {
			title: __( 'Section Title', 'aeopr' ),
		},
		ab_postgrid_displayPostImage: {
			title: __( 'Display Featured Image', 'aeopr' ),
		},
		ab_postgrid_imageSizeValue: {
			title: __( 'Image Size', 'aeopr' ),
		},
		ab_postgrid_displayPostTitle: {
			title: __( 'Display Post Title', 'aeopr' ),
		},
		ab_postgrid_displayPostAuthor: {
			title: __( 'Display Post Author', 'aeopr' ),
		},
		ab_postgrid_displayPostDate: {
			title: __( 'Display Post Date', 'aeopr' ),
		},
		ab_postgrid_displayPostExcerpt: {
			title: __( 'Display Post Excerpt', 'aeopr' ),
		},
		ab_postgrid_excerptLength: {
			title: __( 'Excerpt Length', 'aeopr' ),
		},
		ab_postgrid_displayPostLink: {
			title: __( 'Display Continue Reading Link', 'aeopr' ),
		},
		ab_postgrid_readMoreText: {
			title: __( 'Read More Text', 'aeopr' ),
		},
		ab_postgrid_sectionTag: {
			title: __( 'Post Grid Section Tag', 'aeopr' ),
		},
		ab_postgrid_sectionTitleTag: {
			title: __( 'Section Title Heading Tag', 'aeopr' ),
		},
		ab_postgrid_postTitleTag: {
			title: __( 'Post Title Heading Tag', 'aeopr' ),
		},
	},

	// Render via PHP
	save() {
		return null;
	},
} );
