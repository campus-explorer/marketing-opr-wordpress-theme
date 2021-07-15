/**
 * BLOCK: Icon Block - Edit Class
 */

// Import classes
import classnames from "classnames"
import AEOPRIcon from "../../../dist/blocks/controls/ArcherOPRIcons.json"
import FontIconPicker from "@fonticonpicker/react-fonticonpicker"
import styling from "./styling"
import renderSVG from "../../../dist/blocks/controls/renderIcon"

const { __ } = wp.i18n

const {
	Component,
	Fragment,
} = wp.element

const {
	InspectorControls,
	MediaUpload,
	RichText,
	ColorPalette,
	getColorObjectByColorValue,

} = wp.blockEditor

const {
	PanelBody,
	SelectControl,
	Button,
	TextControl,
	ToggleControl,
	TabPanel,
	RangeControl
} = wp.components

let svg_icons = Object.keys( AEOPRIcon )

export default class AEOPRIconBlock extends Component {

	constructor() {
		super( ...arguments )
	}

	componentDidMount() {

		// Assigning block_id in the attribute.
		this.props.setAttributes( { block_id: this.props.clientId } )

		// Pushing Style tag for this block css.
		const $style = document.createElement( "style" )
		$style.setAttribute( "id", "aeopr-style-icon-block-" + this.props.clientId )
		document.head.appendChild( $style )
	}

	render() {

		const { attributes, setAttributes } = this.props
		const {
			className,
			label,
			icon,
			icon_size,
			icon_color,
			icon_color_name,
			label_color,
			label_color_name,			
			icon_hover_color,
			icon_hover_color_name,
			label_hover_color,
			label_hover_color_name,
			link,
			target,
			disableLink,
			hideLabel,
		} = attributes

		const iconColorControls = () => {

			const color_control = (
					<Fragment>
						<p className="aeopr-setting-label">{ __( "Text Color" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={{ backgroundColor: label_color }} ></span></span></p>
						<ColorPalette
							value={ label_color }
							onChange={ ( colorValue ) => {
								const newColor = getColorObjectByColorValue(wp.data.select( "core/editor" )
								.getEditorSettings().colors, colorValue)
								setAttributes({label_color: newColor.slug, label_color_name:colorValue})
								
								}}
							disableCustomColors= {true}
							clearable={true}
						/>
						<p className="aeopr-setting-label">{ __( "Icon Color" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={{ backgroundColor: icon_color }} ></span></span></p>
						<ColorPalette
							value={ icon_color }
							onChange={ ( colorValue ) => {
								const newColor = getColorObjectByColorValue(wp.data.select( "core/editor" )
								.getEditorSettings().colors, colorValue)
								
								setAttributes({icon_color: newColor.slug, icon_color_name:colorValue})
								}}
							disableCustomColors= {true}
							clearable={true}
						/>
					</Fragment>
				)
			const color_control_hover = (
					<Fragment>
						<p className="aeopr-setting-label">{ __( "Text Hover Color" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={{ backgroundColor: label_hover_color }} ></span></span></p>
						<ColorPalette
							value={ label_hover_color }
							onChange={ ( colorValue ) => {
								const newColor = getColorObjectByColorValue(wp.data.select( "core/editor" )
								.getEditorSettings().colors, colorValue)
								
								setAttributes({label_hover_color: newColor.slug, label_hover_color_name:colorValue})
								
								}}
							disableCustomColors= {true}
							clearable={true}
						/>
						<p className="aeopr-setting-label">{ __( "Icon Hover Color" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={{ backgroundColor: icon_hover_color }} ></span></span></p>
						<ColorPalette
							value={ icon_hover_color }
							onChange={ ( colorValue ) => {
								const newColor = getColorObjectByColorValue(wp.data.select( "core/editor" )
								.getEditorSettings().colors, colorValue)
								setAttributes({icon_hover_color: newColor.slug, icon_hover_color_name:colorValue})
								
								}}
							disableCustomColors= {true}
							clearable={true}
						/>
					</Fragment>
				)

			return (
				<TabPanel className="aeopr-inspect-tabs aeopr-inspect-tabs-col-2"
					activeClass="active-tab"
					tabs={ [
						{
							name: "normal",
							title: __( "Normal" ),
							className: "aeopr-normal-tab",
						},
						{
							name: "hover",
							title: __( "Hover" ),
							className: "aeopr-hover-tab",
						},
					] }>
					{
						( tabName ) => {
							let color_tab
							if( "normal" === tabName.name ) {
								color_tab = color_control
							}else {
								color_tab = color_control_hover
							}
							return <div>{ color_tab }</div>
						}
					}
				</TabPanel>
			)
		}

		var element = document.getElementById( "aeopr-style-icon-block-" + this.props.clientId )

		if( null != element && "undefined" != typeof element ) {
			element.innerHTML = styling( this.props )
		}

		const renderHtml = () => {
			const icon_html = ( icon )?(<div className="aeopr-icon-block__source-icon" style={{width:icon_size+'px', height:'auto'}}>{ renderSVG(icon, icon_color_name) }</div>):null;
			let target_val = ( target ) ? "_blank" : "_self"
			let link_url = ( !disableLink ) ? link : "/"

			return (
				<div
					className={ classnames(
						"aeopr-icon-block__content-wrap",
						className,
						`aeopr-block-${ this.props.clientId }`
					) }
				>
					{ ! disableLink &&
						<a target={ target_val } rel="noopener noreferrer" aria-label={label} href={ link_url }></a>
					}
						{icon_html}
						{ ! hideLabel && "" != label &&
							<div className="aeopr-icon-block__label-wrap">
								<RichText
									tagName="div"
									value={ label }
									onChange={ ( value ) => setAttributes( { label: value } ) }
									className='aeopr-icon-block__label'
									placeholder={ __( "Description" ) }
									multiline={false}
									allowedFormats={[ 'core/bold', 'core/italic', 'core/strikethrough' ]}
									style={{color:label_color_name}}
								/>
							</div>
						}
				</div>
			)
		}

		return (
			<Fragment>
				<InspectorControls>
					<PanelBody title={ __( "Icon Settings" ) } initialOpen={ true } >
						<Fragment>
							<p className="components-base-control__label">{__( "Icon" )}</p>
							<FontIconPicker
								icons={svg_icons}
								renderFunc= {renderSVG}
								theme="default"
								value={icon}
								onChange={ ( value ) => setAttributes( { icon: value } ) }
								isMulti={false}
								noSelectedPlaceholder= { __( "Select Icon" ) }
							/>
						</Fragment>
						 <RangeControl
							label={ __( "Icon Size" ) }
							value={ icon_size }
							onChange={ ( value ) => setAttributes( { icon_size: value } ) }
							min={ 40 }
							max={ 150 }
							allowReset
							resetFallbackValue={40}
							initialPosition={0}
						/>
						<hr className="aeopr-editor__separator" />
						<h2>{ __( "List Item Link" ) }</h2>
						<ToggleControl
							label={ __( "Disable Link" ) }
							checked={ disableLink }
							onChange={ ( value ) => setAttributes( { disableLink: ! disableLink } ) }
						/>
						{ ! disableLink &&
							<Fragment>
								<p className="components-base-control__label">{__( "URL" )}</p>
								<TextControl
									value={ link }
									onChange={ ( value ) => setAttributes( { link: value } ) }
									placeholder={__( "Enter URL" )}
								/>
								<ToggleControl
									label={ __( "Open in New Tab" ) }
									checked={ target }
									onChange={ ( value ) => setAttributes( { target: !target } ) }
								/>
							</Fragment>
						}
						<hr className="aeopr-editor__separator" />
						<h2>{ __( "Icon Color Settings" ) }</h2>
						{ iconColorControls() }
					</PanelBody>
				</InspectorControls>
				{renderHtml()}
			</Fragment>
		)
	}
}
