/**
 * BLOCK: Icon List - Child - Save Block
 */

// Import block dependencies and components.
import classnames from "classnames"

const {
	RichText,
	InnerBlocks
} = wp.blockEditor

export default function save( { attributes, className }) {

	const {
		block_id,
		button_class,
		button_text,
		link,
		link_label,
		link_title,
		link_text,
		link_text_color,
		link_text_color_hover,
		align,
		alignMobile,
		alignTablet,
		overlayType,
		tab_index,
		backgroundType,
		backgroundImage,
		backgroundImageColor,
		backgroundPosition,
		backgroundSize,
		backgroundOpacity		
	} = attributes

	let align_class = ( "center" == align ) ? "" : `aeopr-visual-links__align-${align}`
	let align_class_mobile = ( "" == alignMobile ) ? "" : `aeopr-visual-links__align-mobile-${alignMobile}`
	let align_class_tablet = ( "" == alignTablet ) ? "" : `aeopr-visual-links__align-tablet-${alignTablet}`

	let overlay = (""==backgroundImageColor)? null: "has-background-overlay has-background-color-"+backgroundImageColor;
	const BgImage = (backgroundImage)?(
		<span className={
			classnames(
				'aeopr-background-container',
				'aeopr-background-container', 
				`aeopr-column__background-position-${backgroundPosition}`,
				`aeopr-column__background-size-${backgroundSize}`,
				`aeopr-column__background-opacity-${backgroundOpacity}`,
				overlay)}
				style={{
					backgroundImage:'url('+backgroundImage.url+')'
				}}/>):'';

	return (
		<div
			className={ classnames(
				"aeopr-visual-links__wrap",
				`aeopr-visual-links__background-${backgroundType}`,
				align_class,
				align_class_mobile,
				align_class_tablet,
				`aeopr-block-${ block_id }`,
				`has-child-hover-color-${link_text_color_hover}`
			) }
		>
			<a 
				rel="noopener noreferrer"  
				href={ link }
				aria-label={link_label}
				tabindex={tab_index}></a>
				
				<InnerBlocks.Content/>
			{BgImage}
				
		</div>
	)
}
