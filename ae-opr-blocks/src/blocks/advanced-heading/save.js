/**
 * BLOCK: Advanced Heading - Save Block
 */

import classnames from "classnames"

const {
	RichText
} = wp.blockEditor

export default function save( props ) {
	
	const {
		block_id,
		headingTitle,
		headingDesc,
		headingTag,
		seperatorStyle,
		headingId
	} = props.attributes

	var seprator_output =  ""
	if( seperatorStyle !== "none" ){
		seprator_output = <div className="aeopr-separator-wrap" ><div className="aeopr-separator"></div></div>
	}
	return (
		<div
			className={ classnames(
				props.className,
				`aeopr-block-${block_id}`,					
			) }
		>
			<RichText.Content
				tagName={ headingTag }
				value={ headingTitle }
				className='aeopr-heading-text'	
				id = { headingId }				
			/>
			{seprator_output}
			<RichText.Content
				tagName="p"
				value={ headingDesc }
				className='aeopr-desc-text'					
			/>
		</div>
	)
}
