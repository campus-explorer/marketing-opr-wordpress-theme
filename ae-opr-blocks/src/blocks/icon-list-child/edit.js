/**
 * BLOCK: Icon List - Edit Class
 */

// Import classes
import classnames from "classnames"
import AEOPRIcon from "Dist/blocks/controls/ArcherOPRIcons.json"
import FontIconPicker from "@fonticonpicker/react-fonticonpicker"
import styling from "./styling"
import renderSVG from "Dist/blocks/controls/renderIcon"

const { __ } = wp.i18n

const {
	Component,
	Fragment,
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
	RangeControl
} = wp.components

let svg_icons = Object.keys( AEOPRIcon )

class AEOPRIconListChild extends Component {

	constructor() {
		super( ...arguments )

		this.onRemoveImage = this.onRemoveImage.bind( this )
		this.onSelectImage = this.onSelectImage.bind( this )
	}

	componentDidMount() {

		// Assigning block_id in the attribute.
		this.props.setAttributes( { block_id: this.props.clientId } )

		// Pushing Style tag for this block css.
		const $style = document.createElement( "style" )
		$style.setAttribute( "id", "aeopr-style-icon-list-child-" + this.props.clientId )
		document.head.appendChild( $style )
	}

	/*
	 * Event to set Image as null while removing.
	 */
	onRemoveImage() {
		const { setAttributes } = this.props
		setAttributes( { image: null } )
	}

	/*
	 * Event to set Image as while adding.
	 */
	onSelectImage( media ) {

		const { setAttributes } = this.props

		if ( ! media || ! media.url ) {
			setAttributes( { image: null } )
			return
		}

		if ( ! media.type || "image" != media.type ) {
			return
		}

		setAttributes( { image: media } )
	}

	render() {

		const { attributes, setAttributes } = this.props
		const {
			className,
			label,
			placeholder,
			image_icon,
			icon,
			image,
			imageWidth,
			icon_color,
			label_color,
			icon_hover_color,
			label_hover_color,
			icon_bg_color,
			icon_bg_hover_color,
			icon_border_color,
			icon_border_hover_color,
			link,
			link_title,
			tab_index,
			target,
			disableLink,
			hideLabel,
		} = attributes

		const iconColorControls = () => {

			let color_control = ""
			let color_control_hover = ""

			if ( "image" == image_icon ) {

				color_control = (
					<Fragment>
						<p className="aeopr-setting-label">{ __( "Text Color" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={{ backgroundColor: label_color }} ></span></span></p>
						<ColorPalette
							value={ label_color }
							onChange={ ( value ) => setAttributes( { label_color: value } ) }
							allowReset
						/>
						<p className="aeopr-setting-label">{ __( "Image Background Color" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={{ backgroundColor: icon_bg_color }} ></span></span></p>
						<ColorPalette
							value={ icon_bg_color }
							onChange={ ( value ) => setAttributes( { icon_bg_color: value } ) }
							allowReset
						/>
						<p className="aeopr-setting-label">{ __( "Image Border Color" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={{ backgroundColor: icon_border_color }} ></span></span></p>
						<ColorPalette
							value={ icon_border_color }
							onChange={ ( value ) => setAttributes( { icon_border_color: value } ) }
							allowReset
						/>
					</Fragment>
				)
				color_control_hover = (
					<Fragment>
						<p className="aeopr-setting-label">{ __( "Text Hover Color" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={{ backgroundColor: label_hover_color }} ></span></span></p>
						<ColorPalette
							value={ label_hover_color }
							onChange={ ( value ) => setAttributes( { label_hover_color: value } ) }
							allowReset
						/>
						<p className="aeopr-setting-label">{ __( "Image Background Hover Color" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={{ backgroundColor: icon_bg_hover_color }} ></span></span></p>
						<ColorPalette
							value={ icon_bg_hover_color }
							onChange={ ( value ) => setAttributes( { icon_bg_hover_color: value } ) }
							allowReset
						/>
						<p className="aeopr-setting-label">{ __( "Image Border Hover Color" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={{ backgroundColor: icon_border_hover_color }} ></span></span></p>
						<ColorPalette
							value={ icon_border_hover_color }
							onChange={ ( value ) => setAttributes( { icon_border_hover_color: value } ) }
							allowReset
						/>
					</Fragment>
				)
			} else {

				color_control = (
					<Fragment>
						<p className="aeopr-setting-label">{ __( "Text Color" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={{ backgroundColor: label_color }} ></span></span></p>
						<ColorPalette
							value={ label_color }
							onChange={ ( value ) => setAttributes( { label_color: value } ) }
							allowReset
						/>
						<p className="aeopr-setting-label">{ __( "Icon Color" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={{ backgroundColor: icon_color }} ></span></span></p>
						<ColorPalette
							value={ icon_color }
							onChange={ ( value ) => setAttributes( { icon_color: value } ) }
							allowReset
						/>
						<p className="aeopr-setting-label">{ __( "Icon Background Color" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={{ backgroundColor: icon_bg_color }} ></span></span></p>
						<ColorPalette
							value={ icon_bg_color }
							onChange={ ( value ) => setAttributes( { icon_bg_color: value } ) }
							allowReset
						/>
						<p className="aeopr-setting-label">{ __( "Icon Border Color" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={{ backgroundColor: icon_border_color }} ></span></span></p>
						<ColorPalette
							value={ icon_border_color }
							onChange={ ( value ) => setAttributes( { icon_border_color: value } ) }
							allowReset
						/>
					</Fragment>
				)
				color_control_hover = (
					<Fragment>
						<p className="aeopr-setting-label">{ __( "Text Hover Color" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={{ backgroundColor: label_hover_color }} ></span></span></p>
						<ColorPalette
							value={ label_hover_color }
							onChange={ ( value ) => setAttributes( { label_hover_color: value } ) }
							allowReset
						/>
						<p className="aeopr-setting-label">{ __( "Icon Hover Color" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={{ backgroundColor: icon_hover_color }} ></span></span></p>
						<ColorPalette
							value={ icon_hover_color }
							onChange={ ( value ) => setAttributes( { icon_hover_color: value } ) }
							allowReset
						/>
						<p className="aeopr-setting-label">{ __( "Icon Background Hover Color" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={{ backgroundColor: icon_bg_hover_color }} ></span></span></p>
						<ColorPalette
							value={ icon_bg_hover_color }
							onChange={ ( value ) => setAttributes( { icon_bg_hover_color: value } ) }
							allowReset
						/>
						<p className="aeopr-setting-label">{ __( "Icon Border Hover Color" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={{ backgroundColor: icon_border_hover_color }} ></span></span></p>
						<ColorPalette
							value={ icon_border_hover_color }
							onChange={ ( value ) => setAttributes( { icon_border_hover_color: value } ) }
							allowReset
						/>
					</Fragment>
				)
			}

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

		var element = document.getElementById( "aeopr-style-icon-list-child-" + this.props.clientId )

		if( null != element && "undefined" != typeof element ) {
			element.innerHTML = styling( this.props )
		}

		const renderHtml = () => {
			let image_icon_html = ""

			if ( image_icon == "icon" ) {
				if ( icon ) {
					image_icon_html = <span className="aeopr-icon-list__source-icon" >{ renderSVG(icon, icon_color) }</span>
				}
			} else {
				if ( image && image.url ) {

					image_icon_html = <img className="aeopr-icon-list__source-image" alt={image.alt} src={image.url} style={{width:imageWidth+'px', height:'auto'}}/>
				}
			}

			let target_val = ( target ) ? "_blank" : "_self"
			let link_url = ( !disableLink ) ? link : "/"

			return (
				<div
					className={ classnames(
						"aeopr-icon-list__content-wrap",
						className,
						`aeopr-block-${ this.props.clientId }`
					) }
				>
					{ ! disableLink &&
						<a target={ target_val } 
							rel="noopener noreferrer" 
							aria-label={link_title || label} 
							href={ link_url }
							tabindex={tab_index}></a>
					}
						{image_icon_html}
						{ ! hideLabel &&
							<div className="aeopr-icon-list__label-wrap">
								<RichText
									tagName="div"
									value={ label }
									onChange={ ( value ) => setAttributes( { label: value } ) }
									className='aeopr-icon-list__label'
									placeholder={placeholder}
									multiline={false}
									allowedFormats={[ 'core/bold', 'core/italic' ]}
									style={{color:label_color}}
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
						<SelectControl
							label={ __( "Image / Icon" ) }
							value={ image_icon }
							options={ [
								{ value: "icon", label: __( "Icon" ) },
								{ value: "image", label: __( "Image" ) },
							] }
							onChange={ ( value ) => setAttributes( { image_icon: value } ) }
						/>
						{ "icon" == image_icon &&
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
						}
						{ "image" == image_icon &&
							<Fragment>
								<MediaUpload
									title={ __( "Select Image" ) }
									onSelect={ this.onSelectImage }
									allowedTypes={ [ "image" ] }
									value={ image }
									render={ ( { open } ) => (
										<Button isDefault onClick={ open }>
											{ ! image ? __( "Select Image" ) : __( "Replace image" ) }
										</Button>
									) }
								/>
								{ image &&
									( <Button className="aeopr-rm-btn" onClick={ this.onRemoveImage } isLink isDestructive>
										{ __( "Remove Image" ) }
									</Button> )
								}
							<hr className="aeopr-editor__separator" />
							<RangeControl
								label={ __( "Width" ) }
								value={ imageWidth }
								onChange={ ( value ) => setAttributes( { imageWidth: value } ) }
								min={ 40 }
								max={ 250 }
								allowReset
							/>	
							</Fragment>
						}
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
								<p className="components-base-control__label">{__( "Screen Reader Label" )}</p>
								<TextControl
									value={ link_title }
									onChange={ ( value ) => setAttributes( { link_title: value } ) }
									placeholder={__( "Enter Text" )}
								/>
								<ToggleControl
									label={ __( "Open in New Tab" ) }
									checked={ target }
									onChange={ ( value ) => setAttributes( { target: !target } ) }
								/>
								<p className="components-base-control__label">{__( "Link Index" )}</p>
								<TextControl
									value={ tab_index }
									onChange={ ( value ) => setAttributes( { tab_index: value } ) }
									placeholder={__( "Enter Tab Index Number" )}
									help={__("Numerical value used for keyboard accesibility. -1 means tab key will not access. Larger numbers mean item is accessed later in the group.")}
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

export default AEOPRIconListChild
