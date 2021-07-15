/**
 * BLOCK: Menu Section Edit Class
 */
//import OptionSelectorControl from '../../components/option-selector-control'

// Import classes
import classnames from "classnames"

const { __ } = wp.i18n

const {
	Component,
	Fragment,
} = wp.element
const {
	apiFetch
	} = wp;
const {
	InspectorControls,
	InnerBlocks,
} = wp.blockEditor

const {
	PanelBody,
	SelectControl,
} = wp.components




export default class AEOPRMenuSection extends Component {

	constructor() {
		super( ...arguments )
	}

	componentDidMount() {

		// Assigning block_id in the attribute.
		this.props.setAttributes( { block_id: this.props.clientId } )
		if (!this.props.attributes.menuItems && this.props.attributes.area_name){
			apiFetch({path:`/wp/v2/menu/${this.props.attributes.area_name}`}).
			then( response =>{
				this.props.setAttributes({menuItems: response, area_name:this.props.attributes.area_name})
				
			}).catch()
		}
	}
 
	render() {
		const { attributes, setAttributes, isSelected, className } = this.props

		const {
			area_name,
			menuItems,			
		} = attributes
		
		const {
			all_menus
		}= aeopr_settings;
		let active = ( isSelected ) ? "active" : "not-active"
		
/// --> get menu object from api based on rea id		
		const getMenu = ( item ) => {
			apiFetch({path:`/wp/v2/menu/${item}`}).
			then( response =>{
				setAttributes({menuItems: response, area_name:item})
				
			}).catch()

		}
		
		if (!menuItems && area_name){
			getMenu(area_name)
		}
		
		const menu_list = () =>{
			if(menuItems){
				//collect items into tags 
				//need to check for menu-column-title class, render as li no a and group
				const theList = menuItems.map((key,index)=>
					<a href={menuItems[index].url}>{menuItems[index].title}</a>
				)
				//return the collection to render.
				return theList;
			}
			//return area_name;
		}




		return (
			<>
				<InspectorControls>
					<PanelBody title={ __( 'Choose Area' ) } >
							<SelectControl
								className="aeopr-block-inspector__control"
								value={ area_name }
								onChange={ (value)=>{
									getMenu(value) 
								}}
								options={ [ {label: 'Select Area', value:'0'},
											{label: 'All Undergraduate', value:'13'},
											{label: 'Undergrad - BA', value:'5'},
											{label: 'Undergrad - CJ', value:'8'},
											{label: 'Undergrad - Psych', value:'9'},
											{label:'Graduate', value:'10'}
										]}
							/>
						</PanelBody>

				</InspectorControls>
				<div
					className={ classnames(
						className,
						"aeopr-page-menu__outer-wrap",
						`aeopr-block-${ this.props.clientId }`
						) } >
					
					
					 	{(!menuItems && area_name)&&(getMenu(area_name))}
					 	
					 	
					 	{menuItems && (
						 	menuItems.map(index=>{
							 	return <p key={`item-${index.db_id}`}>{index.title}</p>
					 		})
					 	)}
					 	
				</div>
			</>
			
		)
	}
}

