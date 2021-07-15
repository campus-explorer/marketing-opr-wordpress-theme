/**
 * BLOCK: Button - Save Block
 */

import classnames from "classnames"
const { __ } = wp.i18n


export default function save_original( props ) {
	
	const { attributes, className } = props

	const {
		block_id,
		button_type,
		button_class,
		label,
		link,
		tab_index
	} = props.attributes

	return (
		<div className={ classnames(
			className,
			"aeopr-button__outer-wrap",
			`aeopr-block-${ block_id }`
			) }>
					<a className={classnames('aeopr-button','aeopr-button__link', button_class, button_type+'-button')}
						href={ link }
						rel ="noopener noreferrer"
						tabindex={tab_index}
					>{label}</a>
			</div>
		
	)
}
