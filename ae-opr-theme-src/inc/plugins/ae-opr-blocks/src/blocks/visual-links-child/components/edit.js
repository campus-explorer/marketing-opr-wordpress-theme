/**
 * BLOCK: Visual Links Child - Edit Class
 */

// Import classes
import classnames from "classnames"
import styling from "../helpers/styling"
import renderSVG from "controls/renderIcon"

const { __ } = wp.i18n

const {
	Component,
	Fragment,
} = wp.element
const {addFilter} = wp.hooks

const {
	InspectorControls,
	MediaUpload,
	RichText,
	ColorPalette,
	getColorObjectByColorValue,
	PanelColorSettings,
	InnerBlocks,
} = wp.blockEditor

const {
	PanelBody,
	SelectControl,
	Button,
	ButtonGroup,
	BaseControl,
	RangeControl,
	TextControl,
	ToggleControl,
	TabPanel,
} = wp.components










class AEOPRVisualLinksChild extends Component {

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
		$style.setAttribute( "id", "aeopr-style-visual-links-child-" + this.props.clientId )
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
	handleColorChange(value){
		console.log (getColorObjectByColorValue(wp.data.select( "core/editor" ).getEditorSettings().colors, value));
	}
	
	render() {
		
		const { attributes, setAttributes, isSelected, className } = this.props
		const {
			image_icon,
			icon,
			link,
			link_label,
			link_title,
			link_text,
			link_text_color,
			link_text_color_hover,
			button_class,
			button_text,
			tab_index,
			target,
			backgroundType,
			backgroundImage,
			backgroundColor,
			backgroundColorHover,
			backgroundPosition,
			backgroundRepeat,
			backgroundSize,
			backgroundOpacity,
			backgroundImageColor,
			align,
			alignMobile,
			alignTablet,
			overlayType
		} = attributes
	
		const colorControls = () => {

			const color_control = (
					<Fragment>
						<p className="aeopr-setting-label">
							{ __( "Text Color" ) }
							<span className="components-base-control__label">
								<span className="component-color-indicator" style={{ backgroundColor: link_text_color }} >
								</span>
							</span>
						</p>
						<ColorPalette
							value={ link_text_color }
							onChange={ (value)=> {
								const newColor = getColorObjectByColorValue(wp.data.select( "core/editor" )
								.getEditorSettings().colors, value)
								setAttributes({link_text_color: newColor.slug})
								
								}}
							disableCustomColors= {true}
							clearable={true}
						/>

					</Fragment>
				)
			const color_control_hover = (
					<Fragment>
						<p className="aeopr-setting-label">
							{ __( "Text Hover Color" ) }
							<span className="components-base-control__label">
								<span className="component-color-indicator" style={{ backgroundColor: link_text_color_hover }} >
								</span>
							</span>
						</p>
						<ColorPalette
							value={ link_text_color_hover }
							onChange={ ( value ) =>  {
								const newColor = getColorObjectByColorValue(wp.data.select( "core/editor" )
								.getEditorSettings().colors, value)
								setAttributes({link_text_color_hover: newColor.slug})
								
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
		const buttonControls = () => (
			<Fragment>
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
			</Fragment>
				
		)
		const overlayOpacity =( "image" == backgroundType && backgroundImage ) &&
					( <RangeControl
						label={ __( "Opacity" ) }
						value={ backgroundOpacity }
						onChange={ ( value ) => setAttributes( { backgroundOpacity: value } ) }
						min={ 0 }
						max={ 100 }
						allowReset
						initialPosition={0}
					/> )
		const linkBackgroundSettings = () =>(
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
						<p className="aeopr-setting-label">{ __( "Background Color" ) }
							<span className="components-base-control__label">
								<span className="component-color-indicator" style={{ backgroundColor: backgroundColor }} >
								</span>
							</span>
						</p>
						<ColorPalette
							value={ backgroundColor }
							onChange={ ( colorValue ) =>  {
								const newColor = getColorObjectByColorValue(wp.data.select( "core/editor" )
								.getEditorSettings().colors, colorValue)
								setAttributes({backgroundColor: newColor.slug})
								
								}}
							disableCustomColors= {true}
							clearable={true}
							
						/>
						<p className="aeopr-setting-label">
							{ __( "Background Hover Color" ) }
							<span className="components-base-control__label">
								<span className="component-color-indicator" style={{ backgroundColorHover: backgroundColorHover }} >
								</span>
							</span>
						</p>
						<ColorPalette
							value={ backgroundColorHover }
							onChange={ ( value ) =>  {
								const newColor = getColorObjectByColorValue(wp.data.select( "core/editor" )
								.getEditorSettings().colors, value)
								setAttributes({backgroundColorHover: newColor.slug})
								
								}}
							disableCustomColors= {true}
							clearable={true}
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
												<span className="component-color-indicator" style={{ backgroundColor: backgroundImageColor }} >
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
											disableCustomColors= {true}
											clearable={true}
										/>
									</Fragment>
								}
							</Fragment> )
						}
					</Fragment> )
				}
				
				
			</PanelBody>
		)
		var element = document.getElementById( "aeopr-style-visual-links-child-" + this.props.clientId )

		if( null != element && "undefined" != typeof element ) {
			element.innerHTML = styling( this.props )
		}

		const renderHtml = () => {
		
			let active = ( isSelected ) ? "active" : "not-active"

			let align_class = ( "center" == align ) ? "" : `aeopr-visual-links__align-${align}`
			let align_class_mobile = ( "" == alignMobile ) ? "" : `aeopr-visual-links__align-mobile-${alignMobile}`
			let align_class_tablet = ( "" == alignTablet ) ? "" : `aeopr-visual-links__align-tablet-${alignTablet}`
			let overlay = (""==backgroundImageColor)? null: "has-background-overlay has-background-color-"+backgroundImageColor;
			const BgImage = (backgroundImage)?(
				<span className={
					classnames(
						'aeopr-background-container', 
						`aeopr-column__background-position-${backgroundPosition}`,
						`aeopr-column__background-size-${backgroundSize}`,
						`aeopr-column__background-opacity-${backgroundOpacity}`,
						overlay)}
						style={{
							backgroundImage:'url('+backgroundImage.url+')'
						}}/>):'';			
			return (
				<div
					className={ classnames(
						"aeopr-visual-links__wrap",
						`aeopr-visual-links__background-${backgroundType}`,
						"link-child",
						align_class,
						align_class_mobile,
						align_class_tablet,
						className,
						`aeopr-block-${ this.props.clientId }`,
						`has-child-hover-color-${link_text_color_hover}`
					) }
					
				>
					<a 
						rel="noopener noreferrer" 
						href={ link } 
						aria-label={link_label}
						tabindex={tab_index}
					></a>

						
					<InnerBlocks
						templateLock="insert"
						template={[
							['core/heading',{level:4, className:"aeopr-visual-links-child__heading"}],
							['core/paragraph',{
								allowedFormats:[ 'core/bold', 'core/italic'], 
								className:"aeopr-visual-links-child__text"}],
							["aeopr/button"]
						]}
						/>
					{BgImage}
				</div>
			)
		}
	

		return (
			<>
				<InspectorControls>
					{ linkBackgroundSettings() }
					<PanelBody
						title={__("Color Settings")}
					>
						{ colorControls() }
					</PanelBody>
					<PanelBody
						title={__("Link Setting")}
					>
						<h2>{ __( "List Item Link" ) }</h2>
				
						<p className="components-base-control__label">{__( "URL" )}</p>
						<TextControl
							value={ link }
							onChange={ ( value ) => setAttributes( { link: value } ) }
							placeholder={__( "Enter URL" )}
						/>
						<p className="components-base-control__label">{__( "Link Title" )}</p>
						<TextControl
							value={ link_label }
							onChange={ ( value ) => setAttributes( { link_label: value } ) }
							placeholder={__( "Enter Screen Reader Title" )}
						/>
						<p className="components-base-control__label">{__( "Link Index" )}</p>
						<TextControl
							value={ tab_index }
							onChange={ ( value ) => setAttributes( { tab_index: value } ) }
							placeholder={__( "Enter Tab Index Number" )}
							help={__("Numerical value used for keyboard accesibility. -1 means tab key will not access. Larger numbers mean item is accessed later in the group.")}
						/>
							
						<hr className="aeopr-editor__separator" />
						
						{ buttonControls() }
					</PanelBody>
				</InspectorControls>
				{renderHtml()}
			</>
		)
	}
}

export default AEOPRVisualLinksChild
