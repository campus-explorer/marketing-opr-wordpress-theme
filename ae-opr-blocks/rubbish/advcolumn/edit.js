/**
 * BLOCK: Column - Edit
 */

import classnames from "classnames"
import AEOPR_Block_Icons from "../../../dist/blocks/controls/block-icons"
import styling from "./styling"

const { __ } = wp.i18n

const {
	InnerBlocks,
	ColorPalette,
	InspectorControls,
	MediaUpload,
	PanelColorSettings,
} = wp.blockEditor

const {
	PanelBody,
	RangeControl,
	SelectControl,
	Button,
	ButtonGroup,
	BaseControl,
	TabPanel,
	Dashicon
} = wp.components

const {
	Component,
	Fragment,
} = wp.element

export default class AEOPRColumnEdit extends Component {

	constructor() {
		super( ...arguments )

		this.onRemoveImage = this.onRemoveImage.bind( this )
		this.onSelectImage = this.onSelectImage.bind( this )
	}

	componentDidMount() {

		// Assigning block_id in the attribute.
		this.props.setAttributes( { block_id: this.props.clientId } )

		this.props.setAttributes( { classMigrate: true } )

		// Pushing Style tag for this block css.
		const $style = document.createElement( "style" )
		$style.setAttribute( "id", "aeopr-column-style-" + this.props.clientId )
		document.head.appendChild( $style )
	}

	/*
	 * Event to set Image as null while removing.
	 */
	onRemoveImage() {
		const { backgroundImage } = this.props.attributes
		const { setAttributes } = this.props

		setAttributes( { backgroundImage: null } )
	}

	/*
	 * Event to set Image as while adding.
	 */
	onSelectImage( media ) {

		const { backgroundImage } = this.props.attributes
		const { setAttributes } = this.props

		if ( ! media || ! media.url ) {
			setAttributes( { backgroundImage: null } )
			return
		}

		if ( ! media.type || "image" != media.type ) {
			return
		}

		setAttributes( { backgroundImage: media } )
	}

	render() {

		const {
			attributes: {
				topPadding,
				bottomPadding,
				leftPadding,
				rightPadding,
				topMargin,
				bottomMargin,
				leftMargin,
				rightMargin,
				topPaddingTablet,
				bottomPaddingTablet,
				leftPaddingTablet,
				rightPaddingTablet,
				topMarginTablet,
				bottomMarginTablet,
				leftMarginTablet,
				rightMarginTablet,
				topPaddingMobile,
				bottomPaddingMobile,
				leftPaddingMobile,
				rightPaddingMobile,
				topMarginMobile,
				bottomMarginMobile,
				leftMarginMobile,
				rightMarginMobile,
				colWidth,
				colWidthTablet,
				colWidthMobile,
				backgroundType,
				backgroundImage,
				backgroundColor,
				backgroundPosition,
				backgroundAttachment,
				backgroundRepeat,
				backgroundSize,
				gradientColor1,
				gradientColor2,
				gradientLocation1,
				gradientLocation2,
				gradientType,
				gradientAngle,
				backgroundOpacity,
				backgroundImageColor,
				borderStyle,
				borderWidth,
				borderRadius,
				borderColor,
				align,
				alignMobile,
				alignTablet,
				overlayType,
				gradientOverlayColor1,
				gradientOverlayColor2,
				gradientOverlayType,
				gradientOverlayLocation1,
				gradientOverlayLocation2,
				gradientOverlayAngle,
				mobileMarginType,
				tabletMarginType,
				desktopMarginType,
				mobilePaddingType,
				tabletPaddingType,
				desktopPaddingType,
			},
			setAttributes,
			className,
			isSelected
		} = this.props

		var element = document.getElementById( "aeopr-column-style-" + this.props.clientId )

		if( null != element && "undefined" != typeof element ) {
			element.innerHTML = styling( this.props )
		}


		const inspector_controls = (
			<Fragment>
				<PanelBody title={ __( "Layout" ) }>
					<TabPanel className="aeopr-size-type-field-tabs aeopr-without-size-type" activeClass="active-tab"
						tabs={ [
							{
								name: "desktop",
								title: <Dashicon icon="desktop" />,
								className: "aeopr-desktop-tab aeopr-responsive-tabs",
							},
							{
								name: "tablet",
								title: <Dashicon icon="tablet" />,
								className: "aeopr-tablet-tab aeopr-responsive-tabs",
							},
							{
								name: "mobile",
								title: <Dashicon icon="smartphone" />,
								className: "aeopr-mobile-tab aeopr-responsive-tabs",
							},
						] }>
						{
							( tab ) => {
								let tabout

								if ( "mobile" === tab.name ) {
									tabout = (
										<RangeControl
											label={ __( "Content Width (%)" ) }
											value={ colWidthMobile }
											onChange={ ( value ) => {
												setAttributes( {
													colWidthMobile: value,
												} )
											} }
											min={ 0 }
											max={ 100 }
										/>
									)
								} else if ( "tablet" === tab.name ) {
									tabout = (
										<RangeControl
											label={ __( "Content Width (%)" ) }
											value={ colWidthTablet }
											onChange={ ( value ) => {
												setAttributes( {
													colWidthTablet: value,
												} )
											} }
											min={ 0 }
											max={ 100 }
										/>
									)
								} else {
									tabout = (
										<RangeControl
											label={ __( "Content Width (%)" ) }
											value={ colWidth }
											onChange={ ( value ) => {
												setAttributes( {
													colWidth: value,
												} )
											} }
											min={ 0 }
											max={ 100 }
										/>
									)
								}

								return <div>{ tabout }</div>
							}
						}
					</TabPanel>
				</PanelBody>
				<PanelBody title={ __( "Background" ) } initialOpen={ false }>
					<SelectControl
						label={ __( "Background Type" ) }
						value={ backgroundType }
						onChange={ ( value ) => setAttributes( { backgroundType: value } ) }
						options={ [
							{ value: "none", label: __( "None" ) },
							{ value: "color", label: __( "Color" ) },
							{ value: "image", label: __( "Image" ) }
						] }
					/>
					{ "color" == backgroundType && (
						<Fragment>
							<p className="aeopr-setting-label">{ __( "Background Color" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={{ backgroundColor: backgroundColor }} ></span></span></p>
							<ColorPalette
								value={ backgroundColor }
								onChange={ ( colorValue ) => setAttributes( { backgroundColor: colorValue } ) }
								allowReset
							/>
						</Fragment>
					) }
					{ "image" == backgroundType &&
						( <Fragment>
							<BaseControl
								className="editor-bg-image-control"
								label={ __( "Background Image" ) }>
									
								{ backgroundImage && (
									<img src={backgroundImage.url}/>
									)}
								<MediaUpload
									title={ __( "Select Background Image" ) }
									onSelect={ this.onSelectImage }
									allowedTypes={ [ "image" ] }
									value={ backgroundImage }
									render={ ( { open } ) => (
										<Button isSecondary onClick={ open }>
											{ ! backgroundImage ? __( "Select Background Image" ) : __( "Replace image" ) }
										</Button>
									) }
								/>
								{ backgroundImage &&
									(	
										<Button className="aeopr-rm-btn" onClick={ this.onRemoveImage } isLink isDestructive>
											{ __( "Remove Image" ) }
										</Button> 
									)
								}
							</BaseControl>
							{ backgroundImage &&
								( <Fragment>
								
									<SelectControl
										label={ __( "Image Position" ) }
										value={ backgroundPosition }
										onChange={ ( value ) => setAttributes( { backgroundPosition: value } ) }
										options={ [
											{ value: "top-left", label: __( "Top Left" ) },
											{ value: "top-center", label: __( "Top Center" ) },
											{ value: "top-right", label: __( "Top Right" ) },
											{ value: "center-left", label: __( "Center Left" ) },
											{ value: "center-center", label: __( "Center Center" ) },
											{ value: "center-right", label: __( "Center Right" ) },
											{ value: "bottom-left", label: __( "Bottom Left" ) },
											{ value: "bottom-center", label: __( "Bottom Center" ) },
											{ value: "bottom-right", label: __( "Bottom Right" ) },
										] }
									/>
									
									<SelectControl
										label={ __( "Repeat" ) }
										value={ backgroundRepeat }
										onChange={ ( value ) => setAttributes( { backgroundRepeat: value } ) }
										options={ [
											{ value: "no-repeat", label: __( "No Repeat" ) },
											{ value: "repeat", label: __( "Repeat" ) },
											{ value: "repeat-x", label: __( "Repeat-x" ) },
											{ value: "repeat-y", label: __( "Repeat-y" ) }
										] }
									/>
									<SelectControl
										label={ __( "Size" ) }
										value={ backgroundSize }
										onChange={ ( value ) => setAttributes( { backgroundSize: value } ) }
										options={ [
											{ value: "auto", label: __( "Auto" ) },
											{ value: "cover", label: __( "Cover" ) },
											{ value: "contain", label: __( "Contain" ) }
										] }
									/>
									<SelectControl
										label={ __( "Image Overlay Type" ) }
										value={ overlayType }
										onChange={ ( value ) => setAttributes( { overlayType: value } ) }
										options={ [
											{ value:"", label: __("None")},
											{value: "color", label: __( "Color" ) }
										] }
									/>
									{ "color" == overlayType &&<Fragment>
											<p className="aeopr-setting-label">
												{ __( "Image Overlay Color" ) }
												<span className="components-base-control__label">
													<span className="component-color-indicator" 
														style={{ backgroundColor: backgroundImageColor }} >
													</span>
												</span>
											</p>
											<ColorPalette
												value={ backgroundImageColor }
												onChange={ ( colorValue ) =>  {
													const newColor = getColorObjectByColorValue(wp.data.select( "core/editor" )
													.getEditorSettings().colors, colorValue)
													setAttributes({backgroundImageColor: newColor.slug})
													
													}}
												disableCustomColors= 'true'
											/>
										</Fragment>
									}
								</Fragment> )
							}
						</Fragment> )
					}
					
					{ (  "image" == backgroundType && backgroundImage ) &&
							( <RangeControl
								label={ __( "Opacity" ) }
								value={ backgroundOpacity }
								onChange={ ( value ) => setAttributes( { backgroundOpacity: value } ) }
								min={ 0 }
								max={ 100 }
								allowReset
								initialPosition={0}
							/> )
					}
				</PanelBody>
			</Fragment>
		)

		let active = ( isSelected ) ? "active" : "not-active"

		let align_class = ( "center" == align ) ? "" : `aeopr-column__align-${align}`
		let align_class_mobile = ( "" == alignMobile ) ? "" : `aeopr-column__align-mobile-${alignMobile}`
		let align_class_tablet = ( "" == alignTablet ) ? "" : `aeopr-column__align-tablet-${alignTablet}`

		return (
			<Fragment>
				<InspectorControls>
					{ inspector_controls }
				</InspectorControls>
				<div
					className={ classnames(
						className,
						"aeopr-column__wrap",
						`aeopr-column__background-${backgroundType}`,
						`aeopr-column__edit-${ active }`,
						align_class,
						align_class_mobile,
						align_class_tablet,
						`aeopr-block-${this.props.clientId}`
					) }
				>
					<div className="aeopr-column__overlay"></div>
					<div className="aeopr-column__inner-wrap">
						<InnerBlocks templateLock={ false } />
					</div>
				</div>
			</Fragment>
		)
	}
}