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

	

	// Render via PHP
	save() {
		return null;
	},
} );
