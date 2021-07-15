/**
 * BLOCK: AEOPR - Columns Edit Class
 */
import OptionSelectorControl from 'Src/components/option-selector-control'

// Import classes
import classnames from "classnames"
import styling from "../helpers/styling"
import memoize from "memize"
import times from "lodash/times"
import map from "lodash/map"
import AEOPR_Block_Icons from "Dist/blocks/controls/block-icons"
import shapes from "../helpers/shapes"
import BoxShadowControl from "Src/components/box-shadow"
const ALLOWED_BLOCKS = [ "aeopr/column", "aeopr/layout-grid" ]

import BackgroundStyles from 'Src/components/background-styler';

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
	withColors,
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

import { compose } from '@wordpress/compose';

const getColumnsTemplate = memoize( ( columns ) => {
	return times( columns, n => [ "aeopr/column", { id: n + 1 } ] )
} )


class AEOPRColumns extends Component {

	constructor() {
		super( ...arguments )

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
		$style.setAttribute( "id", "aeopr-content-section-style-" + this.props.clientId )
		document.head.appendChild( $style )
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
		
		
		const background_controls= (
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
						"aeopr-content-section__wrap",
						`aeopr-content-section__background-${backgroundType}`,
						`aeopr-content-section__stack-${stack}`,
						`aeopr-content-section__valign-${vAlign}`,
						`aeopr-content-section__width-${contentWidth}`,
						`aeopr-content-section__overlap-${sectionOverlap}`,
						`align${ align }`,
						`aeopr-block-${this.props.clientId}`,
						{
							[ backgroundColor.class ]: backgroundColor.class,
						}
					) }
				>
				
					<div className={ classnames(
						"aeopr-content-section__inner-wrap",
						`aeopr-content-section__columns-${columns}`
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

export default withColors( 'backgroundColor' )(AEOPRColumns);


//withNotices( AEOPRColumns );
