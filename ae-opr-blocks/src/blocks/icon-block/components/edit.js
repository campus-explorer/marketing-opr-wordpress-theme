/**
 * BLOCK: Icon Block - Edit Class
 */

// Import classes
import classnames from "classnames"
import AEOPRIcon from "Dist/blocks/controls/ArcherOPRIcons.json"
import FontIconPicker from "@fonticonpicker/react-fonticonpicker"
import styling from "../helpers/styling"
//import renderSVG from "Dist/blocks/controls/renderIcon"

const { __ } = wp.i18n

const {
	Component,
	Fragment,
} = wp.element

const {
	InspectorControls,
	MediaUpload,
	RichText,
	PanelColorSettings,
	ColorPalette,
	getColorObjectByColorValue,
	getColorObjectByAttributeValues,
	withColors,

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

const {compose}=wp.compose;

let svg_icons;
let svg_icons_names;

/// if site option has SVG library set, use it. Otherwise use default.

if(aeopr_settings.client_icon_library&&aeopr_settings.client_icon_library!=''){
	fetch(`${window.location.origin}${aeopr_settings.client_icon_library}`)
	.then((res)=>{
	
		if(!res.ok){
			svg_icons_names = Object.keys(AEOPRIcon)
			svg_icons = AEOPRIcon;
			return
			console.log('default library')
		}
		return res.json()		
		})
	.then((data) =>{
		svg_icons_names = (data)&&Object.keys(data)
		svg_icons = (data)&&data;
		
	})
	.catch((err)=>{
		console.log(err,'error');
		svg_icons_names = Object.keys(AEOPRIcon)
		svg_icons = AEOPRIcon;
	
		})
}else{
		svg_icons=AEOPRIcon
		svg_icons_names= Object.keys(AEOPRIcon)

	}
		



class AEOPRIconBlock extends Component {

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

		const { 
			attributes, 
			setAttributes,
			backgroundColor,
			customBackgroundColor,
			setBackgroundColor,
			borderColor,
			customBorderColor,
			setBorderColor,
			iconColor,
			customIconColor,
			setIconColor } = this.props
		const {
			icon,
			icon_size,
			iconColorValue,
			borderRadius,
			borderWidth,
			link,
			target,
			disableLink,
		} = attributes


		
		if(svg_icons)setAttributes({'icon_library':svg_icons});
		
		
		const renderSVGLocal=(svg,fill)=>{

			var targetIcon = attributes.icon_library && attributes.icon_library[svg];

			if(targetIcon){
				var viewbox_array = targetIcon["svg"]["solid"]["viewBox"]
				var path =  targetIcon["svg"]["solid"]["path"]
				var viewBox = viewbox_array.join( " " )
				return(
					<svg xmlns="http://www.w3.org/2000/svg" viewBox={viewBox} className={svg+" svg"}><path fill={fill} d={path}></path></svg>
				)
			}
		}			
		iconColor?.class && setAttributes({'iconColorValue':iconColor.color});
		borderColor?.class && setAttributes({'borderColorValue':borderColor.color})
		
		const iconColorControls = () => {

			return(
					<Fragment>
						<PanelBody title={ __('Icon Color', 'aeopr')}>
							<PanelColorSettings
								title={ __( 'Icon Color', 'aeopr' ) }
								colorSettings={ [
									{
										value: iconColor.color,
										onChange: setIconColor,
										label: __( 'Color', 'aeopr' ),

									},
								] }
							/>
							<PanelColorSettings
								title={ __( 'Background Color', 'aeopr' ) }
								colorSettings={ [
									{
										value: backgroundColor.color,
										onChange: setBackgroundColor,
										label: __( 'Color', 'aeopr' ),

									},
								] }
							/>
						</PanelBody>
						<PanelBody title={__('Border Settings','aeopr')}>
							<RangeControl
						        label="Border Width"
						        value={ borderWidth }
						        onChange={ ( value ) => setAttributes( { borderWidth: value } ) }
						        min={ 0 }
						        max={ 20 }
						    />
	
							<PanelColorSettings
								title={ __( 'Border Color', 'aeopr' ) }
								colorSettings={ [
									{
										value: borderColor.color,
										onChange:  setBorderColor,
										label: __( 'Color', 'aeopr' ),
											
									},
								] }
							/>
							<RangeControl
						        label="Border Radius (%)"
						        value={ borderRadius }
						        onChange={ ( radiusValue ) => setAttributes( { borderRadius: radiusValue } ) }
						        min={ 0 }
						        max={ 50 }
						    />
						</PanelBody>

					</Fragment>
			)
		}

		var element = document.getElementById( "aeopr-style-icon-block-" + this.props.clientId )

		if( null != element && "undefined" != typeof element ) {
			element.innerHTML = styling( this.props )
		}

		const renderHtml = () => {
			
			const icon_color_render = iconColor?.color || customIconColor;
			const icon_html =  (icon && attributes.icon_library) && renderSVGLocal(icon, icon_color_render) ;
			
			const styles = {
				width: `${icon_size}px`, 
				height: `${icon_size}px`, 
				borderRadius: `${borderRadius}%`,
				borderColor: borderColor?.color || customBorderColor,
				borderWidth: `${borderWidth}px`,
				borderStyle: borderWidth?'solid':'none'
			}
			
			if(undefined==backgroundColor.class) styles.backgroundColor=backgroundColor.color;	
				
			let target_val = ( target ) ? "_blank" : "_self"
			let link_url = ( !disableLink ) ? link : "/"

			return (
				<div
					className={ classnames(
						"aeopr-icon-block__content-wrap",
						`aeopr-block-${ this.props.clientId }`,
						{
							[ backgroundColor?.class ]: backgroundColor?.class,
						}
					) }
					style={ styles }
				>
					{(!disableLink) && (<a target={ target_val } rel="noopener noreferrer" aria-label={label} href={ link_url }></a>)}
					{(icon && attributes.icon_library) && renderSVGLocal(icon, icon_color_render)}
						
				</div>
			)
		}

		return (
			<Fragment>
				<InspectorControls>
					<PanelBody title={ __( "Icon Settings" ) } initialOpen={ true } >
						<Fragment>
							<p className="components-base-control__label">{__( "Icon" )}</p>
							{
								(attributes.icon_library && attributes.icon_library!='')&&
									(<FontIconPicker
										icons={svg_icons_names}
										renderFunc= {renderSVGLocal}
										theme="default"
										value={icon}
										onChange={ ( value ) => setAttributes( { icon: value } ) }
										isMulti={false}
										noSelectedPlaceholder= { __( "Select Icon" ) }
									/>)
							}
						</Fragment>
						 <RangeControl
							label={ __( "Icon Size" ) }
							value={ icon_size }
							onChange={ ( value ) => setAttributes( { icon_size: value } ) }
							min={ 20 }
							max={200}
							allowReset
							initialPosition={20}
						/>
						<hr className="aeopr-editor__separator" />
						<h2>{ __( "Icon Link" ) }</h2>
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
						{ iconColorControls() }
					</PanelBody>
				</InspectorControls>
				{renderHtml()}
			</Fragment>
		)
	}
}
export default compose([
	withColors('borderColor'),
	withColors('backgroundColor'),
	withColors('iconColor')
])(AEOPRIconBlock)