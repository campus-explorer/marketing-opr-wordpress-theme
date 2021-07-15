/**
 * BLOCK: Advanced Section - Save Block
 */

import classnames from "classnames"
const { __ } = wp.i18n

const {
	RichText,
	InnerBlocks,
	getColorClassName
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
			customBackgroundColor,
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

		const backgroundClass = getColorClassName(
		'background-color',
		backgroundColor
	);
	
	const style = {
		backgroundColor: backgroundClass ? undefined : customBackgroundColor,
	};
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
					"aeopr-content-section__wrap",
					`aeopr-content-section__background-${backgroundType}`,
					`aeopr-content-section__stack-${stack}`,
					`aeopr-content-section__valign-${vAlign}`,
					`aeopr-content-section__width-${contentWidth}`,
					`aeopr-content-section__overlap-${sectionOverlap}`,
					`align${ align }`,
					`aeopr-block-${block_id}`,
					{
						[ backgroundClass ]: backgroundClass,
					}
				) }
			>
				<div className={ classnames(
					"aeopr-content-section__inner-wrap",
					`aeopr-content-section__columns-${columns}`
				) }>
					<InnerBlocks.Content />
				</div>
				{BgImage}
			</section>
		)
	}


