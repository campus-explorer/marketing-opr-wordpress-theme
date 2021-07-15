/**
 * BLOCK: Courses Block - Edit Class
 */

// Import classes
import classnames from "classnames"
import styling from "./styling"


const { __ } = wp.i18n

const {
	Component,
	Fragment,
	createElement,
} = wp.element

const {
	InspectorControls,
	MediaUpload,
	RichText,
	ColorPalette
} = wp.blockEditor

const {
	PanelBody,
	SelectControl,
	Button,
	TextControl,
	ToggleControl,
	TabPanel,
} = wp.components
const { 
	withDispatch, 
	withSelect, 
	subscribe,
	getEntityRecord 
	} = wp.data
	
const {
	compose
} = wp.compose



export default class AEOPRStartDate extends Component {

	constructor() {
		super( ...arguments )
	}

	componentDidMount() {

		// Assigning block_id in the attribute.
		this.props.setAttributes( { block_id: this.props.clientId } )

		// Pushing Style tag for this block css.
		const $style = document.createElement( "style" )
		$style.setAttribute( "id", "aeopr-style-courses-block-" + this.props.clientId )
		document.head.appendChild( $style )
	}

	render() {
		const { attributes, setAttributes } = this.props
		const {
			className,
			label
		} = attributes

		var element = document.getElementById( "aeopr-style-start-date-bar-" + this.props.clientId )

		if( null != element && "undefined" != typeof element ) {
			element.innerHTML = styling( this.props )
		}
		
		

		return (
			<div
				className={ classnames(
					"aeopr-start-date-bar__wrapper",
					className,
					`aeopr-block-${ this.props.clientId }`
				) }
			>
				{aeopr_settings.start_date}	
					
			</div>
		)
	}
}


