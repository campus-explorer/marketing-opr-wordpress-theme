/**
 * BLOCK: List Columns Child - Save Block
 */

import classnames from "classnames"

const {
	InnerBlocks
} = wp.blockEditor

export default function save( { attributes, className } ) {
	
	const { 
		block_id, 
		backgroundType, 
		backgroundColor, 
		} = attributes
	
	const bgColor = (backgroundColor)?`has-background-color-${backgroundColor}`:null;

	return (
		<div
			className={ classnames(
				className,
				"aeopr-list-column-child__wrap",
				`aeopr-list-column-child__background-${backgroundType}`,
				`aeopr-block-${block_id}`,
				bgColor,
			) }
		>
	
			<div className="aeopr-list-column-child__inner-wrap">
				<InnerBlocks.Content />
			</div>
		</div>
	)
}
