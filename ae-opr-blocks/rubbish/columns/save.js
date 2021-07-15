/**
 * BLOCK: Advanced Section - Save Block
 */

import classnames from "classnames"
const { __ } = wp.i18n

const {
	RichText,
	InnerBlocks
} = wp.blockEditor

// Extend component
const { Fragment } = wp.element

export default function save( props ){

		const { attributes, className } = props

		const {
			block_id,
			tag,
			backgroundType,
			backgroundVideo,
			backgroundColor,
			backgroundImageColor, 
			backgroundImage,
			contentWidth,
			sectionOverlap,
			align,
			columns,
			stack,
			vAlign,
			topType,
			bottomType,
			bottomFlip,
			topFlip
		} = props.attributes

		const bgColor = (backgroundColor)?`has-background-color-${backgroundColor}`:'';
		let overlay = (""==backgroundImageColor)? null: "has-background-overlay has-background-color-"+backgroundImageColor;
		const BgImage = (backgroundImage)?(
				<span className={classnames('aeopr-background-container', overlay)}
						style={{
							backgroundImage:'url('+backgroundImage.url+')'
						}}/>):'';


		return (
			<section
				className={ classnames(
					className,
					"aeopr-columns__wrap",
					`aeopr-columns__background-${backgroundType}`,
					`aeopr-columns__stack-${stack}`,
					`aeopr-columns__valign-${vAlign}`,
					`aeopr-columns__width-${contentWidth}`,
					`aeopr-columns__overlap-${sectionOverlap}`,
					`align${ align }`,
					`aeopr-block-${block_id}`,
					bgColor,
				) }
			>
				<div className={ classnames(
					"aeopr-columns__inner-wrap",
					`aeopr-columns__columns-${columns}`
				) }>
					<InnerBlocks.Content />
				</div>
				{BgImage}
			</section>
		)
	}


