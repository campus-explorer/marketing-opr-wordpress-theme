/**
 * BLOCK: OPR Form Block - Edit Class
 */

// Import classes
import classnames from "classnames"
import styling from "../helpers/styling"
import { __experimentalInputControl as InputControl } from '@wordpress/components';

const { __ } = wp.i18n

const {
	Component,
	Fragment,
	createElement,
	RawHTML
} = wp.element

const {
	InspectorControls,
	RichText
} = wp.blockEditor

const {
	PanelBody,
	Button,
	TextControl,
	ToggleControl,
	TabPanel,
} = wp.components


class AEOPRForm extends Component {

	constructor() {
		super( ...arguments )
	}

	componentDidMount() {

		// Assigning block_id in the attribute.
		this.props.setAttributes( { block_id: this.props.clientId } )

		// Pushing Style tag for this block css.
		const $style = document.createElement( "style" )

		const $script = document.createElement("script")
		$script.setAttribute("src", "/wp-content/themes/ae-opr-theme-pkg/inc/packages/aeopr-forms/build/index.js");
		document.head.appendChild($script);

	}
	
	render() {
		const { attributes, setAttributes } = this.props
		const {
			redirect,
			program_focus,
			button_label
		} = attributes		

		return (
			<Fragment>
				<InspectorControls>
					<PanelBody title={ __( "Form Settings" ) } initialOpen={ true } >
					<InputControl
				        label="Redirect"
				        value={ redirect}
				        type="url"
				        onChange={ ( value) => setAttributes( { redirect: value } ) }
				    />
				    <InputControl
				        label="Selection Focus"
				        value={ program_focus}
				        type="text"
				        onChange={ ( value) => setAttributes( { program_focus: value } ) }
				    />
				    <InputControl
				        label="Button Text"
				        value={ button_label}
				        type="text"
				        onChange={ ( value) => setAttributes( { button_label: value } ) }
				    />
						
					</PanelBody>
				</InspectorControls>
				<div
					className={ classnames(
						"aeopr-form__wrapper",
						"aeopr-leadform",
						
					) }
					id={`aeopr-form-${ this.props.clientId }`}
					data-has-form="1" 
					data-redirect={redirect}
					data-program-focus={program_focus}
				>
					
				</div>
				<span 
					className="aeopr-form-preview-block"
					style={{
						    position: 'absolute',
						    top: '0px',
						    bottom: '0px',
						    left: '0px',
						    right: '0px',
						    background: 'transparent'
						    
					}}
					>
				</span>

			</Fragment>
		)
	}
}

export default AEOPRForm

