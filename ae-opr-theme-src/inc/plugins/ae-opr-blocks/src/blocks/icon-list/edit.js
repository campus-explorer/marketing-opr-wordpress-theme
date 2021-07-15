/**
 * BLOCK: Icon List - Edit Class
 * Based on Icon List - Ultimate Addons for Gutenberg
 * Plugin URI: https://www.brainstormforce.com
 */

// Import classes
import classnames from "classnames"
import times from "lodash/times"
import map from "lodash/map"
import memoize from "memize"
import styling from "./styling"
//import Slider from "react-slick"

// Import all of our Text Options requirements.
import TypographyControl from "../../components/typography"


const { __ } = wp.i18n
const { select } = wp.data;

const {
	Component,
	Fragment,
} = wp.element

const {
	BlockControls,
	BlockAlignmentToolbar,
	InspectorControls,
	InnerBlocks,
} = wp.blockEditor

const {
	PanelBody,
	SelectControl,
	RangeControl,
	Button,
	ToggleControl,
	TabPanel,
	ButtonGroup,
	Dashicon
} = wp.components

const { 
	withDispatch, 
	withSelect, 
	} = wp.data

const {
	compose
} = wp.compose

const ALLOWED_BLOCKS = [ "aeopr/icon-list-child" ]

class AEOPRIconList extends Component {

	constructor() {
		super( ...arguments )

		this.changeChildAttr = this.changeChildAttr.bind( this )
	}

	componentDidMount() {

		// Assigning block_id in the attribute.
		this.props.setAttributes( { block_id: this.props.clientId } )

		this.props.setAttributes( { classMigrate : true } )
		this.props.setAttributes( { childMigrate : true } )
		//this.props.setAttributes({ child_count: select('core/block-editor').getBlocks( this.props.clientId ).length});

		// Pushing Style tag for this block css.
		const $style = document.createElement( "style" )
		$style.setAttribute( "id", "aeopr-style-icon-list-" + this.props.clientId )
		document.head.appendChild( $style )

		this.changeChildAttr( this.props.attributes.hideLabel )
	}

	changeChildAttr ( value ) {
		const { setAttributes } = this.props
		const getChildBlocks = select('core/block-editor').getBlocks( this.props.clientId );

		getChildBlocks.forEach((iconChild, key) => {
			iconChild.attributes.hideLabel = value
		});
		setAttributes( { hideLabel: value } )
	}

	render() {

		const { attributes, setAttributes } = this.props

		
		const {
			align,
			className,
			child_count,
			icon_count,
			icons,
			gap,
			inner_gap,
			stack,
			icon_layout,
			iconPosition,
			size,
			sizeType,
			sizeMobile,
			sizeTablet,
			hideLabel,
			borderRadius,
			bgSize,
			border,
			fontSize,
			fontSizeType,
			fontSizeMobile,
			fontSizeTablet,
			fontFamily,
			fontWeight,
			fontSubset,
			lineHeight,
			lineHeightType,
			lineHeightMobile,
			lineHeightTablet,
		} = attributes
		
		var element = document.getElementById( "aeopr-style-icon-list-" + this.props.clientId )

		if( null != element && "undefined" != typeof element ) {
			element.innerHTML = styling( this.props )
		}

		const labelClass = ( hideLabel ) ? "aeopr-icon-list__no-label" : ""

		const sizeTypes = [
			{ key: "px", name: __( "px" ) },
			{ key: "em", name: __( "em" ) },
		]

		const sizeTypeControls = (
			<ButtonGroup className="aeopr-size-type-field" aria-label={ __( "Size Type" ) }>
				{ map( sizeTypes, ( { name, key } ) => (
					<Button
						key={ key }
						className="aeopr-size-btn"
						isSmall
						isPrimary={ sizeType === key }
						aria-pressed={ sizeType === key }
						onClick={ () => setAttributes( { sizeType: key } ) }
					>
						{ name }
					</Button>
				) ) }
			</ButtonGroup>
		)

		const getIconTemplate = memoize( ( icon_block, icons ) => {
			return times( icon_block, n => [ "aeopr/icon-list-child", icons[n] ] )
		} )

/// --> monitor children for changes		
		const IconListChildren = withSelect(( select, props )  => {
					return {
						innerBlocks: select( 'core/block-editor' ).getBlocks( props.clientId )
					};
				}
			)( function( props, {setAttributes, attributes} ) {
				props.setAttributes({child_count: props.innerBlocks.length});
				return true

		 
			}
		 
		);
		return (
			<Fragment>
				
				
				<IconListChildren
					clientId={this.props.clientId}
					{...this.props}
					/>
				
				
				<BlockControls>
					<BlockAlignmentToolbar
						value={ align }
						onChange={ ( value ) => {
							setAttributes( { align: value } )
						} }
						controls={ [ "left", "center", "right" ] }
					/>
				</BlockControls>
				<InspectorControls>
					<PanelBody title={ __( "General" ) } initialOpen={ true }>
						<SelectControl
							label={ __( "Layout" ) }
							value={ icon_layout }
							options={ [
								{ value: "horizontal", label: __( "Horizontal" ) },
								{ value: "vertical", label: __( "Vertical" ) },
							] }
							onChange={ ( value ) => setAttributes( { icon_layout: value } ) }
						/>
						{ "horizontal" == icon_layout &&
							<Fragment>
								<SelectControl
									label={ __( "Stack on" ) }
									value={ stack }
									options={ [
										{ value: "none", label: __( "None" ) },
										{ value: "tablet", label: __( "Tablet" ) },
										{ value: "mobile", label: __( "Mobile" ) },
									] }
									onChange={ ( value ) => setAttributes( { stack: value } ) }
									help={ __( "Note: Choose on what breakpoint the Icons will stack." ) }
								/>
							</Fragment>
						}
						<ToggleControl
							label={ __( "Hide Labels" ) }
							checked={ hideLabel }
							onChange={ (value) => this.changeChildAttr( value ) }
						/>
						<hr className="aeopr-editor__separator" />
						<RangeControl
							label={ __( "Gap between Items" ) }
							value={ gap }
							onChange={ ( value ) => setAttributes( { gap: value } ) }
							help={ __( "Note: For better editing experience, the gap between items might look larger than applied.  Viewing in frontend will show the actual results." ) }
							min={ 0 }
							max={ 100 }
						/>
						{ ! hideLabel &&
							<RangeControl
								label={ __( "Gap between Icon and Label" ) }
								value={ inner_gap }
								onChange={ ( value ) => setAttributes( { inner_gap: value } ) }
								min={ 0 }
								max={ 100 }
							/>
						}
						<hr className="aeopr-editor__separator" />
						<SelectControl
							label={ __( "Icon Alignment" ) }
							value={ iconPosition }
							options={ [
								{ value: "top", label: __( "Top" ) },
								{ value: "middle", label: __( "Middle" ) },
							] }
							onChange={ ( value ) => setAttributes( { iconPosition: value } ) }
							help={ __( "Note: This manages the Icon Position with respect to the Label." ) }
						/>
						<TabPanel className="aeopr-size-type-field-tabs" activeClass="active-tab"
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
											<Fragment>
												{sizeTypeControls}
												<RangeControl
													label={ __( "Size" ) }
													value={ sizeMobile }
													onChange={ ( value ) => setAttributes( { sizeMobile: value } ) }
													min={ 0 }
													max={ 500 }
													allowReset
													initialPosition={40}
												/>
											</Fragment>
										)
									} else if ( "tablet" === tab.name ) {
										tabout = (
											<Fragment>
												{sizeTypeControls}
												<RangeControl
													label={ __( "Size" ) }
													value={ sizeTablet }
													onChange={ ( value ) => setAttributes( { sizeTablet: value } ) }
													min={ 0 }
													max={ 500 }
													allowReset
													initialPosition={40}
												/>
											</Fragment>
										)
									} else {
										tabout = (
											<Fragment>
												{sizeTypeControls}
												<RangeControl
													label={ __( "Icon Size" ) }
													value={ size }
													onChange={ ( value ) => setAttributes( { size: value } ) }
													min={ 0 }
													max={ 500 }
													allowReset
													initialPosition={40}
												/>
											</Fragment>
										)
									}

									return <div>{ tabout }</div>
								}
							}
						</TabPanel>
					</PanelBody>
				</InspectorControls>
				<div className={ classnames(
					className,
					"aeopr-icon-list__outer-wrap",
					`aeopr-icon-list__layout-${icon_layout}`,
					( iconPosition == "top" ? "aeopr-icon-list__icon-at-top" : "" ),
					labelClass,
					`aeopr-block-${ this.props.clientId }`,
					`aeopr-icon-list__icons-${child_count}`
				) }>
						<InnerBlocks
							template={ getIconTemplate( icon_count, icons ) }
							templateLock={ false }
							allowedBlocks={ ALLOWED_BLOCKS }
							__experimentalMoverDirection={ icon_layout }
						/>
				</div>
			</Fragment>
		)
	}
}

export default AEOPRIconList
