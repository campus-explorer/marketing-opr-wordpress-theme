const {
	RichText,
} = wp.blockEditor

const {
	createBlock
} = wp.blocks

const { __ } = wp.i18n

class Company extends React.Component {

	render() {

		const {	
			attributes, 
			setAttributes , 
			props,
			index_value	
		} = this.props

		const test_arr = attributes.test_block[index_value]
		let company = ""
		if( test_arr && typeof test_arr !== "undefined"){
			company = test_arr["company"]			
		}

		var data_copy = [...attributes.test_block]
		
		if( setAttributes !== "not_set" ){
			return (
				<RichText
	                tagName= 'p'
	                value={ company }
	                className = {`aeopr-tm__company has-${attributes.companyColor}-color`}
	                onChange={ ( value ) => { 
	                	var new_content = { "description" : data_copy[index_value]["description"], "name":data_copy[index_value]["name"], "company" : value, "image" : data_copy[index_value]["image"]  }
						data_copy[index_value] = new_content
						setAttributes( { "test_block": data_copy } )	
	                	
	                } }     
	                multiline={ false }
	                placeholder={ __( "Company Name" ) }
	                onMerge = { props.mergeBlocks }		
	                unstableOnSplit = {
						props.insertBlocksAfter ?
							( before, after, ...blocks ) => {
								setAttributes( { content: before } )
								props.insertBlocksAfter( [
									...blocks,
									createBlock( "core/paragraph", { content: after } ),
								] )
							} :
							undefined
					}			
					onRemove={ () => props.onReplace( [] ) }              
	            />			
			)
		}else{
			return (
				<RichText.Content
	                tagName= 'p'
	                value={ company }
	                className='aeopr-tm__company'
	            />			
			)
		}
	}
}

export default Company