/**
 * BLOCK: Column - Save Block
 */

import classnames from "classnames"

const {
	InnerBlocks
} = wp.blockEditor

export default function save( { attributes, className } ) {
	
	const { block_id, backgroundType, align, alignMobile, alignTablet  } = attributes

	let align_class = ( "center" == align ) ? "" : `aeopr-column__align-${align}`
	let align_class_mobile = ( "" == alignMobile ) ? "" : `aeopr-column__align-mobile-${alignMobile}`
	let align_class_tablet = ( "" == alignTablet ) ? "" : `aeopr-column__align-tablet-${alignTablet}`

	return (
		<div
			className={ classnames(
				className,
				"aeopr-column__wrap",
				`aeopr-column__background-${backgroundType}`,
				align_class,
				align_class_mobile,
				align_class_tablet,
				`aeopr-block-${block_id}`
			) }
		>
			<div className="aeopr-column__overlay"></div>
			<div className="aeopr-column__inner-wrap">
				<InnerBlocks.Content />
			</div>
		</div>
	)
}
