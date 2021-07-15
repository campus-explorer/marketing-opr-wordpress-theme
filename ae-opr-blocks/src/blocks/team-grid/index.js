/**
 * BLOCK: Archer Team Grid Block
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
registerBlockType( 'archer/team-grid', {
	title: __( 'Archer Team Grid', 'archer' ),
	description: __(
		'Add a grid or list of team members.',
		'archer'
	),
	icon: 'grid-view',
	category: 'archer',
	keywords: [
		__( 'team', 'archer' ),
		__( 'people', 'archer' ),
		__( 'grid', 'archer' ),
	],

	edit,

	// Render via PHP
	save(props) {
		return null;
	},
} );
