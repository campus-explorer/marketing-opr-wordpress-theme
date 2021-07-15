/**
 * BLOCK: CE Widget Block - Save Block
 */

// Import block dependencies and components.
import classnames from "classnames"


export default function save( props ) {
	
	const { attributes, className } = props

	const {
		label,
		block_id,
		partnerId,
		collegeId,
	} = attributes
	
	const {
			themeName
		}=aecpc_settings;
	

	return (
		<div
			className={ classnames(
				"aecpc-cewidget__wrapper",
				"campusexplorer-widget",
				className,
				`aecpc-block-${ block_id }`,
						
			) }
			data-ce-no_autoscroll="1" 
					data-ce-source="sa-BA902BCC" 
					data-ce-theme={themeName}
					data-ce-ptid={partnerId}
					data-ce-college={collegeId}
					/>
	)
}