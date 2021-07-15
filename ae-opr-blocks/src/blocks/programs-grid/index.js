/**
 * BLOCK: AE Programs Grid Block
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


// Register the block
registerBlockType( 'aeopr/programs-grid', {
	title: __( 'AEOPR Programs Grid', 'aeopr' ),
	description: __(
		'Add a grid or list of programs.',
		'aeopr'
	),
	icon: 'grid-view',
	category: 'aeopr',
	keywords: [
		__( 'program', 'aeopr' ),
		__( 'programs', 'aeopr' ),
		__( 'grid', 'aeopr' ),
	],

	edit,

	// Render via PHP
	save(props) {
		return null;
	},
} );
