/**
 * BLOCK: Button - Save Block
 */

import classnames from "classnames"
import times from "lodash/times"
const { __ } = wp.i18n

const {
	RichText
} = wp.blockEditor

// Extend component
const { Fragment } = wp.element

export default function save( { attributes, className } ) {
	const {
		block_id,
		button_type,
		button_class,
		label,
		link,
		tab_index
	} = attributes

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
