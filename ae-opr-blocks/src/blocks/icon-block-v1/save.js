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
		label_color,
		label_color_name,
		icon,
		icon_size,
		icon_color,
		icon_color_name,
		block_id,
		link,
		target,
		disableLink,
		hideLabel
	} = attributes

	const icon_html = ( icon )?(<div className="aeopr-icon-block__source-icon" style={{width:icon_size+'px', height:'auto'}}>{ renderSVG(icon, icon_color_name) }</div>):null;

	let target_val = ( target ) ? "_blank" : "_self"
	let link_url = ( !disableLink ) ? link : "/"

	return (
		<div
			className={ classnames(
				"aeopr-icon-block__content-wrap",
				className,
				`aeopr-block-${ block_id }`
			) }
		>
			{ ! disableLink &&
				<a target={ target_val } aria-label={label} rel="noopener noreferrer" href={ link_url }></a>
			}
				{icon_html}
				{ ! hideLabel && "" != label &&
					<div className="aeopr-icon-block__label-wrap">
						<RichText.Content
							tagName="span"
							value={ label }
							className='aeopr-icon-block__label' 
							style={{color:label_color_name}}/>
					</div>
				}
		</div>
	)
}
