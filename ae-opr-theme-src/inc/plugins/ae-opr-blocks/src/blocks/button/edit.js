/**
 * BLOCK: Apply Button - Edit Class
 */

// Import classes
import classnames from "classnames"
import AEOPRIcon from "../../../dist/blocks/controls/ArcherOPRIcons.json"//change to button icon library
import FontIconPicker from "@fonticonpicker/react-fonticonpicker"
import styling from "./styling"
import renderSVG from "../../../dist/blocks/controls/renderIcon"
import AEOPR_Block_Icons from "../../../dist/blocks/controls/block-icons"

const { __ } = wp.i18n

const {
	Component,
	Fragment,
} = wp.element

const {
	BlockControls,
	InspectorControls,
	RichText,
	ColorPalette,
	__experimentalLinkControl
} = wp.blockEditor

const {
	PanelBody,
	SelectControl,
	TabPanel,
	ButtonGroup,
	Button,
	Dashicon,
	ToolbarButton,
	ToolbarGroup,
	ToggleControl,
	TextControl,
} = wp.components
class AEOPRButton extends Component {
	
	constructor() {
		super( ...arguments )
		this.onClickLinkSettings = this.onClickLinkSettings.bind(this)
		this.onChangeOpensInNewTab = this.onChangeOpensInNewTab.bind(this)
		this.state = {
			isURLPickerOpen:false,
		}
	}
	componentDidMount() {
		
		// Assigning block_id in the attribute.
		this.props.setAttributes( { block_id: this.props.clientId } )
        this.props.setAttributes( { classMigrate: true } )
		// Pushing Style tag for this block css.
		const $style = document.createElement( "style" )
		$style.setAttribute( "id", "aeopr-style-buttons-" + this.props.clientId )
		document.head.appendChild( $style )
	}
	onClickLinkSettings () {
		
		const { attributes, setAttributes } = this.props
		const { target } = attributes 
		if ( "_self" === target ) {
			setAttributes( { opensInNewTab: false } )
		} else if ( "_blank" === target ) {
			setAttributes( { opensInNewTab: true } )
		}

		this.setState( {
			isURLPickerOpen: true
		}) 
	}
	onChangeOpensInNewTab ( value ) {
		if ( true === value ) {
			this.props.setAttributes( { target: '_blank' } )
		} else {
			this.props.setAttributes( { target: '_self' } )
		}
	}
	render() {
		
		const { attributes, setAttributes } = this.props
	
		const {
			className,
			button_class,
			button_type,
			label,
			link,
			tab_index,
			vPadding,
			hPadding,
			sizeType,
			sizeMobile,
			sizeTablet,
			opensInNewTab
		} = attributes;
        var element = document.getElementById( "aeopr-style-buttons-" + this.props.clientId )

		if( null != element && "undefined" != typeof element ) {
			element.innerHTML = styling( this.props )
		}

		
		const buttonControls = () => (
				<PanelBody
					title={ __( "Button Settings" ) }
					initialOpen={ true }
					className="aeopr__url-panel-body"
				>
					<h2>{ __( "Button Type" ) }</h2>
					<ButtonGroup aria-label={ __( "Button Type" ) }>
						<Button
							key={ "learn-more" }
							className="components-button aeopr-type-btn"
							isSmall
							isPrimary={ button_type === "apply-now" }
							onClick={ () => setAttributes( {button_type:"apply-now", link: "/apply-now", label:"Apply Now" } ) }///updated link with /
						>
							{ "Apply Now" }
						</Button>
						<Button
							key={ "learn-more" }
							className="components-button aeopr-type-btn"
							isSmall
							isPrimary={ button_type === "learn-more" }
							onClick={ () => setAttributes( { button_type:"learn-more",link: "#", label:"Learn More" } ) }
						>
							{ "Learn More" }
						</Button>
					</ButtonGroup>
					
					
					<hr className="aeopr-editor__separator" />
					<h2>{ __( "Button Style" ) }</h2>
					<ButtonGroup aria-label={ __( "Button Style" ) }>
						<Button
							key={ "primary" }
							className="components-button aeopr-type-btn"
							isSmall
							isPrimary={ button_class === "aeopr-primary-button" }
							onClick={ () => setAttributes( { button_class: "aeopr-primary-button" } ) }
						>
							{ "Gold" }
						</Button>
						<Button
							key={ "secondary" }
							className="components-button aeopr-type-btn"
							isSmall
							isPrimary={ button_class === "aeopr-secondary-button" }
							onClick={ () => setAttributes( { button_class: "aeopr-secondary-button" } ) }
						>
							{ "Light Blue" }
						</Button>
						<Button
							key={ "dark" }
							className="components-button aeopr-type-btn"
							isSmall
							isPrimary={ button_class === "aeopr-dark-button" }
							onClick={ () => setAttributes( { button_class: "aeopr-dark-button" } ) }
						>
							{ "Dark Blue" }
						</Button>
					</ButtonGroup>
					
					<hr className="aeopr-editor__separator"/>
						<h2>{ __( "Button Link" ) }</h2>
				
						<p className="components-base-control__label">{__( "URL" )}</p>
						<TextControl
							value={ link }
							onChange={ ( value ) => setAttributes( { link: value } ) }
							placeholder={__( "Enter URL" )}
						/>
							
					
				</PanelBody>
			)

        return (
	        
            <Fragment>
             <InspectorControls>
            	{buttonControls}
					
            
            </InspectorControls>
				<div className={ classnames(
				className,
				"aeopr-button__outer-wrap",
				`aeopr-block-${ this.props.clientId }`
				) }>
					<a className={classnames('aeopr-button','aeopr-button__link',button_class, button_type+'-button')}
						rel ="noopener noreferrer"
						tabindex={tab_index}

					>{label}
					</a>	
					
				</div>
            </Fragment>
        )
	}
}
export default AEOPRButton