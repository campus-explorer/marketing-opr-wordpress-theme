/**
 * BLOCK: Icon Block - Save Block
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
		image_icon,
		icon,
		image,
		block_id,
		link,
		target,
		disableLink,
		hideLabel
	} = attributes

	let image_icon_html = ""

	if ( image_icon == "icon" ) {
		if ( icon ) {
			image_icon_html = <span className="aeopr-icon-list__source-icon">{ renderSVG(icon) }</span>
		}
	} else {
		if ( image && image.url ) {
			image_icon_html = <img className="aeopr-icon-list__source-image" src={image.url} />
		}
	}

	let target_val = ( target ) ? "_blank" : "_self"
	let link_url = ( !disableLink ) ? link : "/"

	return (
		<div
			className={ classnames(
				"aeopr-icon-list__wrapper",
				className,
				`aeopr-block-${ block_id }`
			) }
		>
			{ ! disableLink &&
				<a target={ target_val } aria-label={label} rel="noopener noreferrer" href={ link_url }></a>
			}
			<div className="aeopr-icon-list__content-wrap">
				<span className="aeopr-icon-list__source-wrap">{image_icon_html}</span>
				{ ! hideLabel && "" != label &&
					<div className="aeopr-icon-list__label-wrap">
						<RichText.Content
							tagName="span"
							value={ label }
							className='aeopr-icon-list__label' />
					</div>
				}
			</div>
		</div>
	)
}
