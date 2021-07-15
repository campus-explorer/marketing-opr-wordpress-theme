/**
 * BLOCK: Icon List - Child - Save Block
 */

// Import block dependencies and components.
import classnames from "classnames"
import renderSVG from "../../../dist/blocks/controls/renderIcon"

const {
	RichText
} = wp.blockEditor

export default function save( props ) {
	
	const { attributes, className } = props

	const {
		label,
		label_color,
		image_icon,
		icon,
		icon_color,
		image,
		imageWidth,
		block_id,
		link,
		link_title,
		tab_index,
		target,
		disableLink,
		hideLabel
	} = attributes

	let image_icon_html = ""

	if ( image_icon == "icon" ) {
		if ( icon ) {
			image_icon_html = <span className="aeopr-icon-list__source-icon">{ renderSVG(icon, icon_color) }</span>
		}
	} else {
		if ( image && image.url ) {
			image_icon_html = <img className="aeopr-icon-list__source-image" alt={image.alt} src={image.url} style={{width:imageWidth+'px', height:'auto'}}/>
		}
	}

	let target_val = ( target ) ? "_blank" : "_self"
	let link_url = ( !disableLink ) ? link : "/"
	return (
		<div
			className={ classnames(
				"aeopr-icon-list__content-wrap",
				className,
				`aeopr-block-${ block_id }`
			) }
		>
			{ ! disableLink &&
				<a 
					target={ target_val } 
					aria-label={link_title || label} 
					rel="noopener noreferrer" 
					href={ link_url }
					tabindex={tab_index}
				></a>
			}
				{image_icon_html}
				{ ! hideLabel && "" != label &&
					<div className="aeopr-icon-list__label-wrap">
						<RichText.Content
							tagName="span"
							value={ label }
							className='aeopr-icon-list__label' 
							style={{color:label_color}}/>
					</div>
				}
		</div>
	)
}
