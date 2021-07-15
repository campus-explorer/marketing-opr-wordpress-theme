/**
 * BLOCK: Testimonial
 */


import classnames from "classnames"
import AuthorName from "./components/AuthorName"
import Company from "./components/Company"
import Description from "./components/Description"
import PositionClasses from "./classes"
import TestimonialStyle from "./inline-styles"
import TestimonialImage from "./components/TestimonialImage"
import times from "lodash/times"
import AEOPR_Block_Icons from "../../../dist/blocks/controls/block-icons"
import map from "lodash/map"

// Import all of our Text Options requirements.
import TypographyControl from "../../components/typography"

// Import Web font loader for google fonts.
import WebfontLoader from "../../components/typography/fontloader"

const { __ } = wp.i18n

const {
	AlignmentToolbar,
	BlockControls,
	ColorPalette,
	InspectorControls,
	RichText,
	PanelColorSettings,
	MediaUpload,
	getColorObjectByColorValue
} = wp.blockEditor

const {
	PanelBody,
	SelectControl,
	RangeControl,
	ToggleControl,
	BaseControl,
	Button,
	ButtonGroup,
	Dashicon,
	TabPanel
} = wp.components


const { Component, Fragment } = wp.element

class AEOPRtestimonial extends Component {

	constructor() {

		super( ...arguments )
		this.onSelectTestImage  = this.onSelectTestImage.bind( this )
		this.onRemoveTestImage  = this.onRemoveTestImage.bind(this)
		this.getImageName       = this.getImageName.bind(this)
		this.onRemoveImage 		= this.onRemoveImage.bind( this )
		this.onSelectImage 		= this.onSelectImage.bind( this )
	}

	/*
	 * Event to set Image as while adding.
	 */
	onSelectTestImage( media, index ) {
		const { test_block } = this.props.attributes
		const { setAttributes } = this.props

		let imag_url = null
		if ( ! media || ! media.url ) {
			imag_url = null
		}else{
			imag_url = media
		}

		if ( ! media.type || "image" !== media.type ) {
			imag_url = null
		}

		const newItems = test_block.map( ( item, thisIndex ) => {
			if ( index === thisIndex ) {
				item["image"] = imag_url
			}
			return item
		} )

		setAttributes( {
			test_block: newItems,
		} )

	}

	/*
	 * Event to set Image as null while removing.
	 */
	onRemoveTestImage( index ) {
		const { test_block } = this.props.attributes
		const { setAttributes } = this.props

		const newItems = test_block.map( ( item, thisIndex ) => {
			if ( index === thisIndex ) {
				item["image"] = null
			}
			return item
		} )

		setAttributes( {
			test_block: newItems,
		} )
	}

	/*
	 * Event to set Image selector label.
	 */
	getImageName( image ){
		const { test_block } = this.props.attributes

		let image_name = __( "Select Image" )
		if(image){
			if(image.url == null || image.url == "" ){
				image_name = __( "Select Image" )
			}else{
				image_name = __( "Replace Image" )
			}
		}
		return image_name
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

		if ( ! media.type || "image" !== media.type ) {
			setAttributes( { backgroundImage: null } )
			return
		}

		setAttributes( { backgroundImage: media } )
	}

	render() {
		const { name, isSelected, className, setAttributes, attributes, mergeBlocks, insertBlocksAfter, onReplace } = this.props

		// Setup the attributes.
		const {
			test_item_count,
			test_block,
			headingAlign,
			companyColor,
			descColor,
			authorColor,

			nameFontSizeType,
			nameFontSize,
			nameFontSizeTablet,
			nameFontSizeMobile,
			nameFontFamily,
			nameFontWeight,
			nameFontSubset,
			nameLineHeightType,
			nameLineHeight,
			nameLineHeightTablet,
			nameLineHeightMobile,
			nameLoadGoogleFonts,

			companyFontSizeType,
			companyFontSize,
			companyFontSizeTablet,
			companyFontSizeMobile,
			companyFontFamily,
			companyFontWeight,
			companyFontSubset,
			companyLineHeightType,
			companyLineHeight,
			companyLineHeightTablet,
			companyLineHeightMobile,
			companyLoadGoogleFonts,

			descFontSizeType,
			descFontSize,
			descFontSizeTablet,
			descFontSizeMobile,
			descFontFamily,
			descFontWeight,
			descFontSubset,
			descLineHeightType,
			descLineHeight,
			descLineHeightTablet,
			descLineHeightMobile,
			descLoadGoogleFonts,

			separatorWidth,
			separatorSpace,
			descSpace,
			iconimgStyle,
			imagePosition,
			imageAlignment,
			block_id,
			source_type,
			nameSpace,
			imgHrPadding,
			imgVrPadding,
			iconImage,
			imageSize,
			imageWidth,
			columns,
			tcolumns,
			mcolumns,
			pauseOnHover,
			infiniteLoop,
			transitionSpeed,
			arrowDots,
			arrowSize,
			arrowBorderSize,
			arrowBorderRadius,
			autoplay,
			autoplaySpeed,
			arrowColor,
			rowGap,
			columnGap,
			contentPadding,
			backgroundType,
			backgroundColor,
			backgroundImage,
			backgroundPosition,
			backgroundSize,
			backgroundRepeat,
			backgroundImageColor,
			backgroundOpacity,
			borderStyle,
			borderWidth ,
			borderRadius,
			borderColor,
			stack,
		} = attributes

		// Add CSS.
		var element = document.getElementById( "aeopr-testimonial-style-" + this.props.clientId )
		if( null != element && "undefined" != typeof element ) {
			element.innerHTML = TestimonialStyle( this.props )
		}

		const bgColor = (backgroundColor)?`has-background-color-${backgroundColor}`:'';
		
		const sizeTypes = [
			{ key: "px", name: __( "px" ) },
			{ key: "em", name: __( "em" ) },
		]

	

		// Typography settings.
		const TypographySettings = (
				<PanelBody title={ __( "Typography" ) } initialOpen={ false }>
					<PanelColorSettings
						title={ __( "Color Settings" ) }
						initialOpen={ true }
						colorSettings={ [
							{
								value: descColor,
								onChange: ( colorValue ) => setAttributes( { descColor: colorValue } ),
								label: __( "Testimonial Color" ),
							},
							{
								value: authorColor,
								onChange: ( colorValue ) => setAttributes( { authorColor: colorValue } ),
								label: __( "Name Color" ),
							},
							{
								value: companyColor,
								onChange: ( colorValue ) => setAttributes( { companyColor: colorValue } ),
								label: __( "Company Color" ),
							}
						] }
					/>
			</PanelBody>
		)

		// Margin Settings.

		const background_settings = (
			<Fragment>
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
					{ "color" == backgroundType &&
							<Fragment>
								<p className="aeopr-setting-label">{ __( "Background Color" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={{ backgroundColor: backgroundColor }} ></span></span></p>
								<ColorPalette
									value={ backgroundColor }
									onChange={ ( colorValue ) => {
									const newColor = getColorObjectByColorValue(wp.data.select( "core/editor" )
									.getEditorSettings().colors, colorValue)
									const colorSlug = (newColor)?newColor.slug:'transparent';
									
									setAttributes({backgroundColor: colorSlug})
									
									}}
									disableCustomColors= {true}
									allowReset
									clearable={true}
								/>
							</Fragment>
					}
					{ "image" == backgroundType &&
							<Fragment>
								<BaseControl
									className="editor-bg-image-control"
									label={ __( "Background Image" ) }>
									<MediaUpload
										title={ __( "Select Background Image" ) }
										onSelect={ this.onSelectImage }
										allowedTypes= { [ "image" ] }
										value={ backgroundImage }
										render={ ( { open } ) => (
											<Button isDefault onClick={ open }>
												{ ! backgroundImage ? __( "Select Background Image" ) : __( "Replace image" ) }
											</Button>
										) }
									/>
									{ backgroundImage &&
										<Button className="aeopr-rm-btn" onClick={ this.onRemoveImage } isLink isDestructive>
											{ __( "Remove Image" ) }
										</Button>
									}
								</BaseControl>
								{ backgroundImage &&
									<Fragment>
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
											label={ __( "Size" ) }
											value={ backgroundSize }
											onChange={ ( value ) => setAttributes( { backgroundSize: value } ) }
											options={ [
												{ value: "auto", label: __( "Auto" ) },
												{ value: "cover", label: __( "Cover" ) },
												{ value: "contain", label: __( "Contain" ) }
											] }
										/>
										<Fragment>
											<p className="aeopr-setting-label">{ __( "Image Overlay Color" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={{ backgroundColor: backgroundImageColor }} ></span></span></p>
											<ColorPalette
												value={ backgroundImageColor }
												onChange={ ( colorValue ) => {
													
													const newColor = getColorObjectByColorValue(wp.data.select( "core/editor" )
													.getEditorSettings().colors, colorValue)
													const colorSlug = (newColor)?newColor.slug:'transparent';
													
													setAttributes({backgroundImageColor: colorSlug})
													
													}}
												disableCustomColors= {true}
												allowReset
												clearable={true}
											/>
										</Fragment>
									</Fragment>
								}
							</Fragment>
					}
					{ ( "image" == backgroundType && backgroundImage )  &&
							<RangeControl
								label={ __( "Opacity" ) }
								value={ backgroundOpacity }
								onChange={ ( value ) => setAttributes( { backgroundOpacity: value } ) }
								min={ 0 }
								max={ 100 }
								allowReset
								initialPosition={0}
							/>
					}
				</PanelBody>
			</Fragment>
		)

		// Image sizes.
		const imageSizeOptions = [
			{ value: "thumbnail", label: __( "Thumbnail" ) },
			{ value: "medium", label: __( "Medium" ) },
			{ value: "full", label: __( "Large" ) }
		]

		let image_enable = false
		// Set testinomial image panel
		const tmControls = ( index ) => {
			let image_val = null
			if( test_block[index] && typeof test_block[index] !== "undefined"){
				image_val = test_block[index]["image"]
			}
			return (
				<PanelBody key={index}
					title={ __( "Image Settings" ) }
					initialOpen={ true }
					className= {"aeopr-repeater-panel"}
				>

					<BaseControl
						className="editor-bg-image-control"
						label={ __( "" ) }
					>
						<MediaUpload
							title={ __( "Select Image" ) }
							onSelect={ ( media ) => {
								this.onSelectTestImage( media, index )
							} }
							allowedTypes= { [ "image" ] }
							value={ image_val }
							render={ ( { open } ) => (
								<Button isDefault onClick={ open }>
									{  this.getImageName( test_block[index]["image"] ) }
								</Button>
							) }
						/>
						{ ( image_val && test_block[index]["image"].url !== null && test_block[index]["image"].url !=="" ) &&
							<Button className="aeopr-rm-btn" key= { index} onClick={ (value) => {
								this.onRemoveTestImage(index)
							} } isLink isDestructive>
								{ __( "Remove Image" ) }
							</Button>
						}
					</BaseControl>
				</PanelBody>
			)
		}


		let cnt = 0
		test_block.map( ( item, thisIndex ) => {
			let image_arr = test_block[thisIndex]
			if( image_arr && typeof image_arr !== "undefined"){
	            const image = image_arr["image"]
	            if( typeof image !== "undefined" && image !== null && image !=="" ){
	            	cnt++
	            }
	        }
		} )

		// Global Controls.
		const inspect_control = (
			<InspectorControls>

				<PanelBody
					title={ __( "Image" ) }
					initialOpen={ false }
				>
					{ times( test_item_count, n => tmControls( n ) ) }

					{  cnt > 0 && <Fragment>
						<hr className="aeopr-editor__separator" />
						<SelectControl
							label={ __( "Image Position" ) }
							value={ imagePosition }
							onChange={ ( value ) => setAttributes( { imagePosition: value } ) }
							options={ [
								{ value: "top", label: __( "Top" ) },
								{ value: "bottom", label: __( "Bottom" ) },
								{ value: "left", label: __( "Left" ) },
								{ value: "right", label: __( "Right" ) },
							] }
						/>
						{ (imagePosition == "left" || imagePosition == "right") &&
						<Fragment>
							<SelectControl
								label={ __( "Vertical Alignment" ) }
								value={ imageAlignment }
								onChange={ ( value ) => setAttributes( { imageAlignment: value } ) }
								options={ [
									{ value: "top", label: __( "Top" ) },
									{ value: "middle", label: __( "Middle" ) },
								] }
							/>
							<SelectControl
								label={ __( "Stack on" ) }
								value={ stack }
								options={ [
									{ value: "none", label: __( "None" ) },
									{ value: "tablet", label: __( "Tablet" ) },
									{ value: "mobile", label: __( "Mobile" ) },
								] }
								help={ __( "Note: Choose on what breakpoint the Info Box will stack." ) }
								onChange={ ( value ) => setAttributes( { stack: value } ) }
							/>
						</Fragment>
						}
						<SelectControl
							label={ __( "Image Style" ) }
							value={ iconimgStyle }
							onChange={ ( value ) => setAttributes( { iconimgStyle: value } ) }
							options={ [
								{ value: "normal", label: __( "Normal" ) },
								{ value: "circle", label: __( "Circle" ) },
								{ value: "square", label: __( "Square" ) },
							] }
						/>
						<SelectControl
							label={ __( "Image Size" ) }
							options={ imageSizeOptions }
							value={ imageSize }
							onChange={ ( value ) => setAttributes( { imageSize: value } ) }
						/>
					 <RangeControl
							label={ __( "Width" ) }
							value={ imageWidth }
							onChange={ ( value ) => setAttributes( { imageWidth: value } ) }
							min={ 0 }
							max={ 500 }
							allowReset
						/>
					</Fragment>
					}
					


				</PanelBody>
				{ TypographySettings }
				{ background_settings }
			</InspectorControls>
		)

		return (
			<Fragment>
				<BlockControls key='controls'>
					<AlignmentToolbar
						value={ headingAlign }
						onChange={ ( value ) => setAttributes( { headingAlign: value } ) }
					/>
				</BlockControls>
				{inspect_control}
				<section className={ classnames(

					"aeopr-content-section__wrap",
					"aeopr-testimonial__outer-wrap",
					`aeopr-block-${ this.props.clientId }`,
					"aeopr-content-section__width-fullwidth",
					bgColor
				) }
				>
					<div className = { classnames(
						"aeopr-testimonial__wrap",
						...PositionClasses( attributes ),
					) }  >
						<div className = "aeopr-tm__content" >
							{(backgroundOpacity) && <div className = "aeopr-tm__overlay" style={{opacity:backgroundOpacity}}></div>}
							<TestimonialImage attributes={attributes}  index_value = "0" />

							<div className ="aeopr-tm__text-wrap">
								<Description attributes={attributes} setAttributes = { setAttributes } props = { this.props }  index_value = "0"/>
								<AuthorName attributes={attributes} setAttributes = { setAttributes } props = { this.props } index_value = "0"/>
								<Company attributes={attributes} setAttributes = { setAttributes } props = { this.props }  index_value = "0"/>
							</div>
						</div>
					</div>
				</section>
			</Fragment>
		)
	}

	componentDidMount() {

		// Assigning block_id in the attribute.
		this.props.setAttributes( { block_id: this.props.clientId } )

		this.props.setAttributes( { classMigrate: true } )

		// Pushing Style tag for this block css.
		const $style = document.createElement( "style" )
		$style.setAttribute( "id", "aeopr-testimonial-style-" + this.props.clientId )
		document.head.appendChild( $style )
	}
}

export default AEOPRtestimonial
