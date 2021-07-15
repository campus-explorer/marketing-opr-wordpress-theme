/**
 * BLOCK: Start Date Block - Save Block
 */

// Import block dependencies and components.
import classnames from "classnames"


export default function save( props ) {
	
	const { attributes, className } = props

	const {
		block_id
	} = attributes
	

	return (
		<div
			className={ classnames(
				"aeopr-start-date-bar__wrapper",
				className,
				`aeopr-block-${ block_id }`
			) }
		>
		{aeopr_settings.start_date}
				
		</div>
	)
}
