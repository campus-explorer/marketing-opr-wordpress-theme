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
	apiFetch} = wp;
const {
	withSelect} = wp.data;
const {
	AlignmentToolbar,
	BlockControls,
	BlockAlignmentToolbar,
	BlockVerticalAlignmentToolbar,
	ColorPalette,
	InspectorControls,
	InnerBlocks,
	MediaUpload,
	PanelColorSettings
} = wp.blockEditor

const {
	PanelBody,
	SelectControl,
	RangeControl,
	Button,
	ButtonGroup,
	BaseControl,
	withNotices,
	ToggleControl,
	Toolbar,
	Tooltip,
	TabPanel,
	Dashicon,
	Spinner,
	Text
} = wp.components

const {
	compose
} = wp.compose



export default class AEOPRMenuSection extends Component {

	constructor() {
		super( ...arguments )
		//this.state ={menuItems:''}
			}

	componentDidMount() {

		// Assigning block_id in the attribute.
		this.props.setAttributes( { block_id: this.props.clientId } )

		// Pushing Style tag for this block css.
		const $style = document.createElement( "style" )
		$style.setAttribute( "id", "aeopr-menu-section-style-" + this.props.clientId )
		document.head.appendChild( $style )
	}


 
	render() {

		const { attributes, setAttributes, isSelected, className } = this.props

		const {
			area_name,
			menuItems,			
		} = attributes
		
		console.log(area_name,'begin')
		const handleMenuChange = ( item ) => {
			console.log(item, area_name, 'change')
			apiFetch({path:`/wp/v2/menu/${item}`}).
			then( response =>{
				//this.setState
				setAttributes({menuItems: response, area_name:item})
			}).catch()
			console.log(menuItems, area_name, 'final set')
		}

					
		
		var element = document.getElementById( "aeopr-menu-section-style-" + this.props.clientId )

		if( null != element && "undefined" != typeof element ) {
			//element.innerHTML = styling( this.props )
		}

		let active = ( isSelected ) ? "active" : "not-active"
		//const PostsDropdownControl = compose(
		 //	withSelect( ( select ) => {
					//return {
						//menuItems: select('wp/v2/menu/').receiveMenuItems(),
					//};
				//} )( props => {
					//const { attributes: { role }, userRoles, className, setAttributes } = props;
					
					/*let rolesToString = '';
					let selectedRoles = [];
					if ( null !== role ) {
						selectedRoles = JSON.parse( role );
					}
		
					if ( ! userRoles.length ) {
						return (
							<p className={className} >
								<Spinner />
								{ __( 'Loading Data', 'secure-blocks-for-gutenberg' ) }
							</p>
						);
					}*/
					//return [
				/*const programSelect = () =>(
					<PanelBody title={ __( 'Choose Area' ) } >
						<Select
							className="aeopr-block-inspector__control"
							name='menu-section-items'
							value={ area_name }
							onChange={ handleMenuChange }
							options={ [ {label: 'Select Area', value:null},
										{label: 'Undergraduate', value:'13'},
										{label:'Graduate', value:'10'}
									]}
						/>
					</PanelBody>
						
				)*/
		//)
		//create menu list from state 
		const menuList = () =>{
			//const menuListItems = this.state.menuItems;
			console.log(area_name, menuItems, 'start list')
			if(menuItems){
				//collect items into tags 
				console.log(menuItems,'list')
				//need to check for menu-column-title class, render as li no a and group
				const theList = menuItems.map((key,index)=>
					<a href={menuItems[index].url}>{menuItems[index].title}</a>
				)
				//return the collection to render.
				return theList;
			}
		}
		//{ menuList() }

		return (
			<>
				<InspectorControls>
					<PanelBody title={ __( 'Choose Area' ) } >
							<SelectControl
								className="aeopr-block-inspector__control"
								name='menu-section-items'
								value={ area_name }
								onChange={ (value)=>{
									setAttributes({area_name: value});
									//handleMenuChange(value) 
								}}
								options={ [ {label: 'Select Area', value:0},
											{label: 'All Undergraduate', value:13},
											{label: 'Undergrad - BA', value:5},
											{label: 'Undergrad - CJ', value:8},
											{label: 'Undergrad - Psych', value:9},
											{label:'Graduate', value:10}
										]}
							/>
						</PanelBody>

				</InspectorControls>
				<div style={{height: '100px'}}>
				 	{area_name}
				 </div>
			</>
			
		)
	}
}

