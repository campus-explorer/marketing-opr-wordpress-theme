/**
 * BLOCK: Grid - Save Block
 */

// Import block dependencies and components.
import classnames from "classnames"
import renderSVG from "Dist/blocks/controls/renderIcon"

const {
	InnerBlocks
} = wp.blockEditor

export default function save( props ) {
	
	const { attributes, className } = props

	const {
		align,
		block_id,
		cell_layout,
		cell_count,
		child_count,
		cellPosition,
		stack,
	} = attributes


	return (
		<div className={ classnames(
			"aeopr-grid__outer-wrap",
			`aeopr-grid__layout-${cell_layout}`,
			`aeopr-block-${ block_id}`,
			`aeopr-grid__cells-${child_count}`,
			(cell_layout==='stack' || stack!=="none")&&`aeopr-grid__${stack}-stack`
		) }>
				<InnerBlocks.Content />
		</div>
	)
}
