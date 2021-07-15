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

export default function save( props ) {
	
	const { attributes, className } = props

	const {
		block_id,
		target,
		link,
		label
	} = props.attributes

	return (
		<div className={ classnames(
			className,
			"aeopr-buttons__outer-wrap",
			`aeopr-block-${ block_id }`
			) }>
			<div className="aeopr-button__wrapper">
				<div className="aeopr-buttons-repeater">
					<RichText.Content
						value={ label }
						tagName='a'
						className='aeopr-button__link'
						href={ link }
						rel ="noopener noreferrer"
						target={ target }
					/>
				</div>
			</div>
		</div>
		
	)
}
