import OptionSelectorControl from 'Src/components/option-selector-control'

import classnames from "classnames"

const { __ } = wp.i18n

const {
	Component,
	Fragment,
} = wp.element

const {
	ColorPalette,
	MediaUpload,
	PanelColorSettings,
	getColorObjectByColorValue,
	withColors,
} = wp.blockEditor

const {
	PanelBody,
	SelectControl,
	RangeControl,
	Button,
	ButtonGroup,
	BaseControl,
	ToggleControl,
	Toolbar,
	Tooltip,
	TabPanel,
	Dashicon
} = wp.components



class BackgroundStyles extends Component{
	
	constructor() {
		super( ...arguments )

		this.onRemoveVideo = this.onRemoveVideo.bind( this )
		this.onRemoveImage = this.onRemoveImage.bind( this )
		this.onSelectImage = this.onSelectImage.bind( this )
		this.onSelectVideo = this.onSelectVideo.bind( this )
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

	/*
	 * Event to set Video as null while removing.
	 */
	onRemoveVideo() {
		const { backgroundVideo } = this.props.attributes
		const { setAttributes } = this.props

		setAttributes( { backgroundVideo: null } )
	}

	/*
	 * Event to set Video while adding.
	 */
	onSelectVideo( media ) {
		const { backgroundVideo } = this.props.attributes
		const { setAttributes } = this.props

		if ( ! media || ! media.url ) {
			setAttributes( { backgroundVideo: null } )
			return
		}
		if ( ! media.type || "video" != media.type ) {
			return
		}
		setAttributes( { backgroundVideo: media } )
	}
	
	
	render() {

		const { 
			attributes, 
			setAttributes, 
			isSelected, 
			className,
			backgroundColor,
			setBackgroundColor,
			customBackgroundColor } = this.props

		const {
			backgroundType,
			backgroundImage,
			backgroundVideo,
			backgroundPosition,
			backgroundRepeat,
			backgroundSize,
			backgroundOpacity,
			backgroundVideoColor,
			backgroundVideoOpacity,
			backgroundImageColor,
			boxShadowColor,
			boxShadowHOffset,
			boxShadowVOffset,
			boxShadowBlur,
			boxShadowSpread,
			boxShadowPosition,
		} = attributes

	
		const bgColor = (backgroundColor)?`has-background-color-${backgroundColor}`:'';
		
		let overlay = (""==backgroundImageColor)? null: "has-background-overlay has-background-color-"+backgroundImageColor;		
		
		const BgImage = (backgroundImage)?(
				<span className={classnames(
					'aeopr-background-container',
					`aeopr-background-position-${backgroundPosition}`,
					`aeopr-background-size-${backgroundSize}`,
					 overlay
					 )}
						style={{
							backgroundImage:'url('+backgroundImage.url+')',
							opacity:backgroundOpacity/100
						}}/>):'';
		
		
		return(
			<PanelBody title={ __( "Background" ) } initialOpen={ false }>
				<SelectControl
					label={ __( "Background Type" ) }
					value={ backgroundType }
					onChange={ ( value ) => setAttributes( { backgroundType: value } ) }
					options={ [
						{ value: "none", label: __( "None" ) },
						{ value: "color", label: __( "Color" ) },
						{ value: "image", label: __( "Image" ) },
					] }
				/>
				{ "none" == backgroundType && (
						setAttributes({backgroundColor: '',backgroundImageColor:''})	
						)
					}
				{ "color" == backgroundType && (
					<PanelColorSettings
							title={ __( 'Background Color', 'hero-cover' ) }
							initialOpen
							disableCustomColors= {true}
							colorSettings={ [
								{
									value: backgroundColor.color,
									onChange: setBackgroundColor,
									label: __( 'Background', 'hero-cover' ),
								},
							] }
						/>
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
										{ value: "left-top", label: __( "Top Left" ) },
										{ value: "center-top", label: __( "Top Center" ) },
										{ value: "right-top", label: __( "Top Right" ) },
										{ value: "left-center", label: __( "Center Left" ) },
										{ value: "center-center", label: __( "Center Center" ) },
										{ value: "right-center", label: __( "Center Right" ) },
										{ value: "left-bottom", label: __( "Bottom Left" ) },
										{ value: "center-bottom", label: __( "Bottom Center" ) },
										{ value: "right-bottom", label: __( "Bottom Right" ) },
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
												const colorSlug = (newColor)?newColor.slug:'transparent';
												setAttributes({backgroundImageColor: colorSlug})
												
												}}
											disableCustomColors= 'true'
										/>
									</Fragment>
								}
							</Fragment> )
						}
					</Fragment> )
				}
			</PanelBody>
		)
	}
	
}

export default withColors( 'backgroundColor' )(BackgroundStyles)