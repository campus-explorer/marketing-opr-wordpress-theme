/**
 * BLOCK: Apply Button - Deprecated
 */


import classnames from "classnames"


const deprecated = [
	//href change
	{
	
		attributes:{
			block_id: {
				type: "string"
			},
			button_class:{
				type:"string",
				default:"aeopr-secondary-button"
			},
			button_type:{
				type:"string",
				default:"learn-more"
			},
			classMigrate: {
				type: "boolean",
				default: false
			},
			align: {
				type: "string",
				default: "center"
			},
			stack: {
				type: "string",
				default: "none"
			},
			label: {
				type: "string",
				default:"Learn More" 
			},
			link: {
				type: "string",
				default:"apply-now" 
			},
			vPadding: {
				type: "number",
				default:10 
			},
			hPadding: {
				type: "number",
				default:14 
			},
			sizeType: {
				type: "string",
				default:"px" 
			} ,
			sizeMobile: {
				type: "number",
				default:"" 
			} ,
			sizeTablet: {
				type: "number",
				default:"" 
			} ,
			opensInNewTab: {
				type: "boolean"
			},
			tab_index:{
				type:"string",
			},
		},
		save(  { attributes, className } ) {
		
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
		
	},

	//tabindex of 0
	{
	
		attributes:{
			block_id: {
				type: "string"
			},
			button_class:{
				type:"string",
				default:"aeopr-secondary-button"
			},
			button_type:{
				type:"string",
				default:"learn-more"
			},
			classMigrate: {
				type: "boolean",
				default: false
			},
			align: {
				type: "string",
				default: "center"
			},
			stack: {
				type: "string",
				default: "none"
			},
			label: {
				type: "string",
				default:"Learn More" 
			},
			link: {
				type: "string",
				default:"/apply-now" 
			},
			vPadding: {
				type: "number",
				default:10 
			},
			hPadding: {
				type: "number",
				default:14 
			},
			sizeType: {
				type: "string",
				default:"px" 
			} ,
			sizeMobile: {
				type: "number",
				default:"" 
			} ,
			sizeTablet: {
				type: "number",
				default:"" 
			} ,
			opensInNewTab: {
				type: "boolean"
			},
			tab_index:{
				type:"string",
				default:"-1"
			},
		},
		save(  { attributes, className } ) {
		
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
		
	},
	//no tab index
	{
	
		attributes:{
			block_id: {
				type: "string"
			},
			button_class:{
				type:"string",
				default:"aeopr-secondary-button"
			},
			button_type:{
				type:"string",
				default:"learn-more"
			},
			classMigrate: {
				type: "boolean",
				default: false
			},
			align: {
				type: "string",
				default: "center"
			},
			stack: {
				type: "string",
				default: "none"
			},
			label: {
				type: "string",
				default:"Learn More" 
			},
			link: {
				type: "string",
				default:"apply-now" 
			},
			vPadding: {
				type: "number",
				default:10 
			},
			hPadding: {
				type: "number",
				default:14 
			},
			sizeType: {
				type: "string",
				default:"px" 
			} ,
			sizeMobile: {
				type: "number",
				default:"" 
			} ,
			sizeTablet: {
				type: "number",
				default:"" 
			} ,
			opensInNewTab: {
				type: "boolean"
			}
		},
		save(  { attributes, className } ) {
		
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
						>{label}</a>
					</div>
				
			)
		}
		
	},
]

export default deprecated;
