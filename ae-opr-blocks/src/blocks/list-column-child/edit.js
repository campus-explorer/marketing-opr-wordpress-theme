/**
 * BLOCK: List Columns Child - Edit
 */

import classnames from "classnames"
import styling from "./styling"

const { __ } = wp.i18n

const {
	InnerBlocks,
	BlockControls,
	ColorPalette,
	InspectorControls,
	MediaUpload,
	PanelColorSettings,
	getColorObjectByColorValue,
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

export default class AEOPRListColumnChild extends Component {

	constructor() {
		super( ...arguments )
	}

	componentDidMount() {

		// Assigning block_id in the attribute.
		this.props.setAttributes( { block_id: this.props.clientId } )

		this.props.setAttributes( { classMigrate: true } )

		// Pushing Style tag for this block css.
		const $style = document.createElement( "style" )
		$style.setAttribute( "id", "aeopr-list-column-child-style-" + this.props.clientId )
		document.head.appendChild( $style )
	}


	render() {

		const {
			attributes: {
				colWidth,
				colWidthTablet,
				colWidthMobile,
				backgroundType,
				backgroundColor,
			},
			setAttributes,
			className,
			isSelected
		} = this.props

		var element = document.getElementById( "aeopr-list-column-child-style-" + this.props.clientId )

		if( null != element && "undefined" != typeof element ) {
			element.innerHTML = styling( this.props )
		}

		const bgColor = (backgroundColor)?`has-background-color-${backgroundColor}`:'';
						
						

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

				</PanelBody>
			</Fragment>
		)

		let active = ( isSelected ) ? "active" : "not-active"


		return (
			<Fragment>
			<BlockControls/>
				<InspectorControls>
					{ inspector_controls }
				</InspectorControls>
				<div
					className={ classnames(
						className,
						"aeopr-list-column-child__wrap",
						`aeopr-list-column-child__background-${backgroundType}`,
						bgColor,
						`aeopr-list-column-child__edit-${ active }`,
						`aeopr-block-${this.props.clientId}`
					) }
				>

					<div className="aeopr-list-column-child__inner-wrap">
						<InnerBlocks 
						template={[["core/list",{placeholder:"Add List Item"}]]}
						templateLock={ false } 
						allowBlocks={['core/list']}/>
					</div>
				</div>
				
			</Fragment>
		)
	}
}