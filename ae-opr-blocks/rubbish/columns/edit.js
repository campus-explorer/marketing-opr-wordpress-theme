/**
 * BLOCK: AEOPR - Columns Edit Class
 */
import OptionSelectorControl from '../../components/option-selector-control'

// Import classes
import classnames from "classnames"
import styling from "./styling"
import memoize from "memize"
import times from "lodash/times"
import map from "lodash/map"
import AEOPR_Block_Icons from "../../../dist/blocks/controls/block-icons"
import shapes from "./shapes"
import BoxShadowControl from "../../components/box-shadow"
const ALLOWED_BLOCKS = [ "aeopr/column" ]

const { __ } = wp.i18n

const {
	Component,
	Fragment,
} = wp.element

const {
	AlignmentToolbar,
	BlockControls,
	BlockAlignmentToolbar,
	BlockVerticalAlignmentToolbar,
	ColorPalette,
	InspectorControls,
	InnerBlocks,
	MediaUpload,
	PanelColorSettings,
	getColorObjectByColorValue,
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
	Dashicon
} = wp.components

const getColumnsTemplate = memoize( ( columns ) => {
	return times( columns, n => [ "aeopr/column", { id: n + 1 } ] )
} )


class AEOPRColumns extends Component {

	constructor() {
		super( ...arguments )

		this.onRemoveVideo = this.onRemoveVideo.bind( this )
		this.onRemoveImage = this.onRemoveImage.bind( this )
		this.onSelectImage = this.onSelectImage.bind( this )
		this.onSelectVideo = this.onSelectVideo.bind( this )
	}

	componentDidMount() {

		// Assigning block_id in the attribute.
		this.props.setAttributes( { block_id: this.props.clientId } )

		this.props.setAttributes( { classMigrate: true } )

		if ( 'middle' === this.props.attributes.vAlign ) {
			this.props.setAttributes( { vAlign: 'center' } )
		}
		// Pushing Style tag for this block css.
		const $style = document.createElement( "style" )
		$style.setAttribute( "id", "aeopr-columns-style-" + this.props.clientId )
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

		const { attributes, setAttributes, isSelected, className } = this.props

		const {
			stack,
			align,
			vAlign,
			contentWidth,
			sectionOverlap,
			width,
			widthType,
			tag,
			backgroundType,
			backgroundImage,
			backgroundVideo,
			backgroundColor,
			backgroundPosition,
			backgroundRepeat,
			backgroundSize,
			backgroundOpacity,
			backgroundVideoColor,
			backgroundVideoOpacity,
			backgroundImageColor,
			columns,
			boxShadowColor,
			boxShadowHOffset,
			boxShadowVOffset,
			boxShadowBlur,
			boxShadowSpread,
			boxShadowPosition,
		} = attributes
		

		var element = document.getElementById( "aeopr-columns-style-" + this.props.clientId )

		if( null != element && "undefined" != typeof element ) {
			element.innerHTML = styling( this.props )
		}

		let active = ( isSelected ) ? "active" : "not-active"
		
		const bgColor = (backgroundColor)?`has-background-color-${backgroundColor}`:'';
		let overlay = (""==backgroundImageColor)? null: "has-background-overlay has-background-color-"+backgroundImageColor;
		const BgImage = (backgroundImage)?(
				<span className={classnames('aeopr-background-container', overlay)}
						style={{
							backgroundImage:'url('+backgroundImage.url+')'
						}}/>):'';
		
		
		const background_controls = (
			<PanelBody title={ __( "Background" ) } initialOpen={ false }>
				<SelectControl
					label={ __( "Background Type" ) }
					value={ backgroundType }
					onChange={ ( value ) => setAttributes( { backgroundType: value } ) }
					options={ [
						{ value: "none", label: __( "None" ) },
						{ value: "color", label: __( "Color" ) },
						{ value: "image", label: __( "Image" ) },
						{ value: "video", label: __( "Video" ) },
					] }
				/>
				{ "none" == backgroundType && (
						setAttributes({backgroundColor: '',backgroundImageColor:''})	
						)
					}
				{ "color" == backgroundType && (
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
				) }
				{ "image" == backgroundType &&
					( <Fragment>
						<BaseControl
							className="editor-bg-image-control"
							label={ __( "Background Image" ) }>
							<MediaUpload
								title={ __( "Select Background Image" ) }
								onSelect={ this.onSelectImage }
								allowedTypes={ [ "image" ] }
								value={ backgroundImage }
								render={ ( { open } ) => (
									<Button isDefault onClick={ open }>
										{ ! backgroundImage ? __( "Select Background Image" ) : __( "Replace image" ) }
									</Button>
								) }
							/>
							{ backgroundImage &&
								( <Button className="aeopr-rm-btn" onClick={ this.onRemoveImage } isLink isDestructive>
									{ __( "Remove Image" ) }
								</Button> )
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
							</Fragment> )
						}
					</Fragment> )
				}
				
				{ "video" == backgroundType && (
					<BaseControl
						className="editor-bg-video-control"
						label={ __( "Background Video" ) }
					>
						<MediaUpload
							title={ __( "Select Background Video" ) }
							onSelect={ this.onSelectVideo }
							allowedTypes={ [ "video" ] }
							value={ backgroundVideo }
							render={ ( { open } ) => (
								<Button isDefault onClick={ open }>
									{ ! backgroundVideo ? __( "Select Background Video" ) : __( "Replace Video" ) }
								</Button>
							) }
						/>
						{ backgroundVideo &&
							( <Button onClick={ this.onRemoveVideo } isLink isDestructive>
								{ __( "Remove Video" ) }
							</Button> )
						}
					</BaseControl> )
				}
				{ "image" == backgroundType && backgroundImage  &&
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
				{ "video" == backgroundType && backgroundVideo && (
					<Fragment>
						<p className="aeopr-setting-label">{ __( "Video Overlay Color" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={{ backgroundColor: backgroundVideoColor }} ></span></span></p>
						<ColorPalette
							value={ backgroundVideoColor }
							onChange={ ( colorValue ) => setAttributes( { backgroundVideoColor: colorValue } ) }
							allowReset
						/>
					</Fragment>
				) }
				{ "video" == backgroundType && backgroundVideo && (
					<RangeControl
						label={ __( "Opacity" ) }
						value={ backgroundVideoOpacity }
						onChange={ ( value ) => setAttributes( { backgroundVideoOpacity: value } ) }
						min={ 0 }
						max={ 100 }
						allowReset
						initialPosition={50}
					/>
				)}
			</PanelBody>
		)
		
		
		
		const layout_controls = (
			<PanelBody title={ __( "Layout" ) }>
				<RangeControl
					label={ __( "Columns" ) }
					value={ columns }
					min={ 0 }
					max={ 6 }
					onChange={ ( value ) => setAttributes( { columns: value } ) }
				/>
				<SelectControl
					label={ __( "Stack on" ) }
					value={ stack }
					options={ [
						{ value: "none", label: __( "None" ) },
						{ value: "tablet", label: __( "Tablet" ) },
						{ value: "mobile", label: __( "Mobile" ) },
					] }
					onChange={ ( value ) => setAttributes( { stack: value } ) }
					help={ __( "Note: Choose on what breakpoint the columns will stack." ) }
				/>
				<SelectControl
					label={ __( "Container Width" ) }
					value={ contentWidth }
					onChange={ ( value ) => setAttributes( { contentWidth: value } ) }
					options={ [
						{ value: "content", label: __( "Theme Content Width" ) },
						{ value: "fullwidth", label: __( "Full Window Width" ) },
					] }
				/>
				<SelectControl
					label={ __( "Overlap" ) }
					value={ sectionOverlap }
					onChange={ ( value ) => setAttributes( { sectionOverlap: value } ) }
					options={ [
						{ value: "none", label: __( "None" ) },
						{ value: "top", label: __( "Overlap Top" ) },
						{ value: "bottom", label: __( "Overlap Bottom" ) },
						{ value: "top-bottom", label: __( "Overlap Top & Bottom" ) },
					] }
				/>
			</PanelBody>
		)
		return (
			<Fragment>
				<BlockControls>
					<BlockVerticalAlignmentToolbar
						value={ vAlign }
						onChange={ ( value ) => {
							setAttributes( { vAlign: value } )
						} }
					/>
				</BlockControls>
				<InspectorControls>
					{layout_controls}
					{background_controls}
					
				</InspectorControls>
				<section
					className={ classnames(
						className,
						"aeopr-columns__wrap",
						`aeopr-columns__background-${backgroundType}`,
						`aeopr-columns__stack-${stack}`,
						`aeopr-columns__valign-${vAlign}`,
						`aeopr-columns__width-${contentWidth}`,
						`aeopr-columns__overlap-${sectionOverlap}`,
						`align${ align }`,
						`aeopr-block-${this.props.clientId}`,
						bgColor,
					) }
				>
				
					<div className={ classnames(
						"aeopr-columns__inner-wrap",
						`aeopr-columns__columns-${columns}`
					) }>
						<InnerBlocks
							template={ getColumnsTemplate( columns ) }
							templateLock="all"
							allowedBlocks={ ALLOWED_BLOCKS }
						/>
					</div>
					{BgImage}
				</section>
			</Fragment>
		)
	}
}

export default withNotices( AEOPRColumns )
