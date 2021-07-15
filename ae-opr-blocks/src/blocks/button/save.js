/**
 * BLOCK: Button - Save Block
 */

import classnames from "classnames"
import times from "lodash/times"
const { __ } = wp.i18n



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

		<a className={classnames('aeopr-button','aeopr-button__link', button_class, button_type+'-button')}
			href={ link }
			rel ="noopener noreferrer"
			tabindex={tab_index}
		>{label}</a>		
	)
}
