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
		block_id
	} = attributes


	return (
		<div className={ classnames(
			className,
			"aeopr-content__outer-wrap",
			`aeopr-block-${ block_id}`
		) }>
			<InnerBlocks.Content />
		</div>
	)
}
