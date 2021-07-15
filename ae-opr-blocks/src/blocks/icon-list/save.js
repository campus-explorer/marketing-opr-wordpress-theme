/**
 * BLOCK: Column - Save Block
 */

// Import block dependencies and components.
import classnames from "classnames"
import renderSVG from "../../../dist/blocks/controls/renderIcon"

const {
	InnerBlocks
} = wp.blockEditor

export default function save( props ) {
	
	const { attributes, className } = props

	const {
		block_id,
		icon_layout,
		icon_count,
		child_count,
		hideLabel,
		iconPosition
	} = attributes

	const labelClass = ( hideLabel ) ? "aeopr-icon-list__no-label" : ""

	return (
		<div className={ classnames(
			className,
			"aeopr-icon-list__outer-wrap",
			`aeopr-icon-list__layout-${icon_layout}`,
			( iconPosition == "top" ? "aeopr-icon-list__icon-at-top" : "" ),
			labelClass,
			`aeopr-block-${ block_id}`,
			`aeopr-icon-list__icons-${child_count}`
		) }>
				<InnerBlocks.Content />
		</div>
	)
}
