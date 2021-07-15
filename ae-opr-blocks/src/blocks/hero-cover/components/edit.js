import assign from 'lodash.assign';
import classnames from "classnames"
import styling from "../helpers/styling"

const { createHigherOrderComponent } = wp.compose;
const { Fragment, Component } = wp.element;
const { 
	
} = wp.editor;
const {
	MediaUpload,
	InspectorControls,
	RichText,
	ColorPalette,
	InnerBlocks,
	PanelColorSettings,
	getColorObjectByColorValue,
	withColors,
} = wp.blockEditor;
const { 
	PanelBody,
	SelectControl,
	Button,
	ButtonGroup,
	TextControl,
	ToggleControl,
	TabPanel,
	G, 
	Path, 
	SVG,
	RangeControl,
	BaseControl,
	Dashicon
	} = wp.components;
const{
	select, 
	dispatch, 
	withSelect,
	withDispatch,
}=wp.data;
const { addFilter } = wp.hooks;
const { __ } = wp.i18n;

const BLOCKS_TEMPLATE = [
			[ 'core/heading', { placeholder: 'Hero Subheadline', level:2 } ],
		    [ 'core/heading', { placeholder: 'Hero Headline', level:1,className:'has-text-color-white'} ],
		];
const ALLOWED_BLOCKS = [
	'aeopr/layout-grid',
	'core/heading',
	'aeopr/icon-list',
	'aeopr/button',
	'aeopr/startapply-banner'
	//'core/columns',
	///create a block template with columns and icon-block
	
]

//if the meta for _aeopr_start_date_show is not set, then default to true

class AEOPRHeroArea extends Component {

	constructor() {
		super( ...arguments )
		this.onRemoveImage = this.onRemoveImage.bind( this )
		this.onSelectImage = this.onSelectImage.bind( this )
	}

	componentDidMount() {
		// Assigning block_id in the attribute.
		this.props.setAttributes( { 
			block_id: this.props.clientId, 
			classDate: aeopr_settings.start_date,
			applyDate: aeopr_settings.apply_date
			
			})

		// Pushing Style tag for this block css.
		const $style = document.createElement( "style" )
		$style.setAttribute( "id", "aeopr-style-hero-area-" + this.props.clientId )
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
		
		
		function GetFormattedDate(date) {
			if(!date)return;
		    var todayTime = new Date(date.split(','));
		    var month = (todayTime.getMonth() + 1);
		    var day = (todayTime.getDate()+1);
		    var year = (todayTime.getFullYear());
		    return month + "/" + day + "/" + year;
		}
		
		
		function onImageSelect(imageObject) {
		    setAttributes({
		        backgroundImage: imageObject.sizes.full.url
		    })
		}
		const { attributes, 
				setAttributes, 
				backgroundColor,
				setBackgroundColor,
				customBackgroundColor } = this.props
		const {
			className,
			label,
			block_id,
			backgroundImage,
			backgroundOpacity,
			backgroundImageColor,
			backgroundPosition,
			backgroundType,
			backgroundSize,
			overlayType,
			showDate,
			classDate,
			applyDate
		} = attributes
		var element = document.getElementById( "aeopr-style-hero-area-" + this.props.clientId )

		if( null != element && "undefined" != typeof element ) {
			element.innerHTML = styling( this.props )
		}
		///move dates to attributes
		const bgColor = (backgroundColor)?`has-background-color-${backgroundColor}`:'';
		let overlay = (""==backgroundImageColor)? null: "has-background-overlay has-background-color-"+backgroundImageColor;
		

		const BgImage = backgroundImage && (
				<span className={classnames(
					'aeopr-background-container',
					'hero_background',
					`aeopr-column__background-position-${backgroundPosition}`,
					`hero__background-size-${backgroundSize}`,
					 overlay
					 )}
						style={{
							backgroundImage:'url('+backgroundImage.url+')',
							opacity:backgroundOpacity/100
						}}/>);
						
						

		const inspector_controls = (
			<Fragment>
					
				<PanelBody title={ __( "Background" ) } initialOpen={ false }>
					<SelectControl
						label={ __( "Background Type" ) }
						value={ backgroundType }
						onChange={ ( value ) =>{
							 setAttributes( { backgroundType: value } )
							 } }
						options={ [
							{ value: "color", label: __( "Color" ) },
							{ value: "image", label: __( "Image" ) }
						] }
					/>
					
					
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

					
					{  "image" == backgroundType && backgroundImage &&
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
		let RenderHtml = (props) => {
			return (
				<>
					<div
						className={ classnames(
							"aeopr-hero-area__wrapper",
							(showDate!==true)?null:'has-date-bar',
							{
								[ backgroundColor.class ]: backgroundColor.class,
							}

						) }
						
					>
						{BgImage}
						
						<div className="aeopr-hero-area__content-wrapper has-text-color-peruwhite">
							
							<InnerBlocks
								template={BLOCKS_TEMPLATE}
								allowedBlocks={ALLOWED_BLOCKS}
								templateInsertUpdatesSelection={false}
								/>
						</div>
					
					
							
					</div>
				</>
			)
		}
		
		
		return (
			<Fragment>
				<RenderHtml/>
				<InspectorControls>
				   {inspector_controls}
				</InspectorControls>
			</Fragment>
		)
	}
}

export default withColors( 'backgroundColor' )( AEOPRHeroArea );