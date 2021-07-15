/**
 * WordPress dependencies
 */
const { createBlock, getBlockAttributes } = wp.blocks;

/**
 * Internal dependencies
 */

const transform = {
	from: [
		{
			type: 'block',
			priority:7,
			blocks:['aeopr/columns'],
			
			transform: ( attributes, innerBlocks) => {

				return createBlock( 'aeopr/content-section', attributes, innerBlocks );
			},
		},
	],
};

export default transform;
