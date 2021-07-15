/**
 * BLOCK: Column - Save Block
 */

import classnames from "classnames"

const {
	InnerBlocks
} = wp.blockEditor

export default function save( { attributes, className } ) {

	const { 
		block_id, 
		backgroundType, 
		backgroundImageColor, 
		backgroundImage, 
		backgroundColor,
		backgroundPosition,
		backgroundSize,
		backgroundRepeat, 
		vAlign,
		align, 
		alignMobile, 
		alignTablet  
		} = attributes
	
	const bgColor = (backgroundColor)?`has-background-color-${backgroundColor}`:'';
	let overlay = (""==backgroundImageColor)? null: "has-background-overlay has-background-color-"+backgroundImageColor;
		const BgImage = (backgroundImage)?(
				<span className={classnames(
					'aeopr-background-container', 
					`aeopr-column__background-position-${backgroundPosition}`,
					`aeopr-column__background-size-${backgroundSize}`,
					`aeopr-column__background-repeat-${backgroundRepeat}`,
					overlay
					)}
						style={{
							backgroundImage:'url('+backgroundImage.url+')'
						}}/>):'';

	let align_class =  `aeopr-column__align-${align}`
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
				`aeopr-block-${block_id}`,
				bgColor,
			) }
		>
	
			<div className="aeopr-column__inner-wrap">
				<InnerBlocks.Content />
			</div>
			{BgImage}
		</div>
	)
}
