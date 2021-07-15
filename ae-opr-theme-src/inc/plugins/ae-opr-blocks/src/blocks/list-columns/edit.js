/**
 * BLOCK: AEOPR - List Columns Edit Class
 */
//import OptionSelectorControl from '../../components/option-selector-control'

// Import classes
import classnames from "classnames"
import styling from "./styling"
import memoize from "memize"
import times from "lodash/times"
//import map from "lodash/map" //needed for OptionSelectorControl
const ALLOWED_BLOCKS = [ "aeopr/list-column-child" ]

const { __ } = wp.i18n

const {
	Component,
	Fragment,
} = wp.element

const {
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
	return times( columns, n => [ "aeopr/list-column-child", { id: n + 1 } ] )
} )


class AEOPRListColumns extends Component {

	constructor() {
		super( ...arguments )
		this.onRemoveImage = this.onRemoveImage.bind( this )
		this.onSelectImage = this.onSelectImage.bind( this )

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
		$style.setAttribute( "id", "aeopr-list-columns-style-" + this.props.clientId )
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

		const { attributes, setAttributes, isSelected, className } = this.props

		const {
			stack,
			align,
			vAlign,
			contentWidth,
			sectionOverlap,
			width,
			widthType,
			backgroundType,
			backgroundImage,
			backgroundColor,
			backgroundPosition,
			backgroundRepeat,
			backgroundSize,
			backgroundOpacity,
			backgroundImageColor,
			columns,
		} = attributes
		

		var element = document.getElementById( "aeopr-list-columns-style-" + this.props.clientId )

		if( null != element && "undefined" != typeof element ) {
			element.innerHTML = styling( this.props )
		}

		let active = ( isSelected ) ? "active" : "not-active"
		
		const bgColor = (""==backgroundColor)?null:`has-background-color-${backgroundColor}`;
		let overlay = (backgroundImageColor)? "has-background-overlay has-background-color-"+backgroundImageColor: null;
		const BgImage = (backgroundImage)?(
				<span className={classnames('aeopr-background-container', overlay)}
						style={{
							backgroundImage:'url('+backgroundImage.url+')'
						}}/>):null;
		
		
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
						{ value: "", label: __( "None" ) },
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
						"aeopr-list-columns__wrap",
						`aeopr-list-columns__background-${backgroundType}`,
						`aeopr-list-columns__edit-${ active }`,
						`aeopr-list-columns__stack-${stack}`,
						`aeopr-list-columns__valign-${vAlign}`,
						`aeopr-list-columns__width-${contentWidth}`,
						`aeopr-list-columns__overlap-${sectionOverlap}`,
						`align${ align }`,
						`aeopr-block-${this.props.clientId}`,
						bgColor,
					) }
				>
					<div className={ classnames(
						"aeopr-list-columns__inner-wrap",
						`aeopr-list-columns__columns-${columns}`
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

export default withNotices( AEOPRListColumns )
