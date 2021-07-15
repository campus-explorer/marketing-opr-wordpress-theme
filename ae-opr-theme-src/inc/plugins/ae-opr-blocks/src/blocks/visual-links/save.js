/**
 * BLOCK: Column - Save Block
 */

// Import block dependencies and components.
import classnames from "classnames"

const {
	InnerBlocks
} = wp.blockEditor

export default function save( props ) {
	
	const { attributes, className } = props

	const {
		block_id,
		link_layout,
		link_count
	} = attributes


	return (
		<div className={ classnames(
			className,
			"aeopr-visual-links__outer-wrap",
			`aeopr-visual-links__layout-${link_layout}`,
			`aeopr-block-${ block_id}`,
			`aeopr-visual-links__children-${link_count}`
		) }>
				<InnerBlocks.Content />
		</div>
	)
}
