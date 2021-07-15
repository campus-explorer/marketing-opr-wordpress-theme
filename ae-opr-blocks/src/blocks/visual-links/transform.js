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
			type: 'raw',
			// Paragraph is a fallback and should be matched last.
			priority: 20,
			selector: 'p',
			schema: ( { phrasingContentSchema, isPaste } ) => ( {
				p: {
					children: phrasingContentSchema,
					attributes: isPaste ? [] : [ 'style' ],
				},
			} ),
			transform( node ) {
				const attributes = getBlockAttributes( 'aeopr/visual-links', node.outerHTML );
				const { textAlign } = node.style || {};

				if (
					textAlign === 'left' ||
					textAlign === 'center' ||
					textAlign === 'right'
				) {
					attributes.align = textAlign;
				}

				return createBlock( 'aeopr/visual-links', attributes );
			},
		},
	],
};

export default transform;
