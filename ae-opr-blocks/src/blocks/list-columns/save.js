/**
 * BLOCK: List Columns - Save Block
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
			backgroundType,
			backgroundColor,
			backgroundImageColor, 
			backgroundImage,
			contentWidth,
			sectionOverlap,
			align,
			columns,
			stack,
			vAlign,
			} = props.attributes

		const bgColor = (backgroundColor)?`has-background-color-${backgroundColor}`:null;
		let overlay = (""==backgroundImageColor)? null: "has-background-overlay has-background-color-"+backgroundImageColor;
		const BgImage = (backgroundImage)?(
				<span className={classnames('aeopr-background-container', overlay)}
						style={{
							backgroundImage:'url('+backgroundImage.url+')'
						}}/>):null;


		return (
			<section
				className={ classnames(
					className,
						"aeopr-list-columns__wrap",
						`aeopr-list-columns__background-${backgroundType}`,
						`aeopr-list-columns__stack-${stack}`,
						`aeopr-list-columns__valign-${vAlign}`,
						`aeopr-list-columns__width-${contentWidth}`,
						`aeopr-list-columns__overlap-${sectionOverlap}`,
						`align${ align }`,
						`aeopr-block-${block_id}`,
						bgColor,
				) }
			>
				
				<div className={ classnames(
					"aeopr-list-columns__inner-wrap",
					`aeopr-list-columns__columns-${columns}`
				) }>
					<InnerBlocks.Content />
				</div>
				{BgImage}
			</section>
		)
	}


