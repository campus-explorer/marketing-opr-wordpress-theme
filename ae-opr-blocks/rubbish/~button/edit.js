/**
 * BLOCK: Button - Edit Class
 */

// Import classes
import classnames from "classnames"
import AEOPRIcon from "../../../dist/blocks/controls/ArcherOPRIcons.json"//change to button icon library
import FontIconPicker from "@fonticonpicker/react-fonticonpicker"
import styling from "./styling"
import renderSVG from "../../../dist/blocks/controls/renderIcon"
import AEOPR_Block_Icons from "../../../dist/blocks/controls/block-icons"

const { __ } = wp.i18n

const {
	Component,
	Fragment,
} = wp.element

const {
	BlockControls,
	InspectorControls,
	RichText,
	ColorPalette,
	__experimentalLinkControl
} = wp.blockEditor

const {
	PanelBody,
	SelectControl,
	RangeControl,
	TabPanel,
	ButtonGroup,
	Button,
	Dashicon,
	Popover,
	ToolbarButton,
	ToolbarGroup,
} = wp.components
class AEOPRButtonsChild extends Component {
	
	constructor() {
		super( ...arguments )
		this.onClickLinkSettings = this.onClickLinkSettings.bind(this)
		this.onChangeOpensInNewTab = this.onChangeOpensInNewTab.bind(this)
		this.state = {
			isURLPickerOpen:false,
		}
	}
	componentDidMount() {
		
		// Assigning block_id in the attribute.
		this.props.setAttributes( { block_id: this.props.clientId } )
        this.props.setAttributes( { classMigrate: true } )
		// Pushing Style tag for this block css.
		const $style = document.createElement( "style" )
		$style.setAttribute( "id", "aeopr-style-buttons-" + this.props.clientId )
		document.head.appendChild( $style )
	}
	onClickLinkSettings () {
		
		const { attributes, setAttributes } = this.props
		const { target } = attributes 
		if ( "_self" === target ) {
			setAttributes( { opensInNewTab: false } )
		} else if ( "_blank" === target ) {
			setAttributes( { opensInNewTab: true } )
		}

		this.setState( {
			isURLPickerOpen: true
		}) 
	}
	onChangeOpensInNewTab ( value ) {
		if ( true === value ) {
			this.props.setAttributes( { target: '_blank' } )
		} else {
			this.props.setAttributes( { target: '_self' } )
		}
	}
	render() {
		
		const { attributes, setAttributes } = this.props
	
		const {
			className,
			label,
			link,
			size,
			vPadding,
			hPadding,
			borderWidth,
			borderRadius,
			borderStyle,
			borderColor,
			borderHColor,
			color,
			background,
			hColor,
			hBackground,
			sizeType,
			sizeMobile,
			sizeTablet,
			lineHeight,
			lineHeightType,
			lineHeightMobile,
			lineHeightTablet,
			opensInNewTab
		} = attributes;
        var element = document.getElementById( "aeopr-style-buttons-" + this.props.clientId )

		if( null != element && "undefined" != typeof element ) {
			element.innerHTML = styling( this.props )
		}

		const linkControl = this.state.isURLPickerOpen && (

			<Popover
				position="bottom center"
				onClose={ () => this.setState( {
					isURLPickerOpen: false
				}) }
			>
				<__experimentalLinkControl
					value={ { url:link, opensInNewTab:opensInNewTab }  }
					onChange={( {
					url: newURL = '',
					opensInNewTab: newOpensInNewTab,
					} ) => {
						setAttributes( { link: newURL } );
						setAttributes( { opensInNewTab: newOpensInNewTab } );
						this.onChangeOpensInNewTab( newOpensInNewTab );
						
					} }
				/>
			</Popover>
		);
		const buttonControls = () => {
			return (
				<PanelBody
					title={ __( "Button Settings" ) }
					initialOpen={ true }
					className="aeopr__url-panel-body"
				>
					<h2>{  __( " Color Settings" ) }</h2>
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
								let btn_color_tab
								if( "normal" === tabName.name ) {
									btn_color_tab = <Fragment>
										<p className="aeopr-setting-label">{ __( "Text Color" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={{ backgroundColor: color }} ></span></span></p>
										<ColorPalette
											value={ color }
											onChange={ ( value ) => setAttributes( { color: value } ) }
											allowReset
										/>
										<p className="aeopr-setting-label">{ __( "Background Color" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={{ backgroundColor: background }} ></span></span></p>
										<ColorPalette
											value={ background }
											onChange={ ( value ) => setAttributes( { background: value } ) }
											allowReset
										/>
										<p className="aeopr-setting-label">{ __( "Border Color" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={{ backgroundColor: borderColor }} ></span></span></p>
										<ColorPalette
											value={ borderColor }
											onChange={ ( value ) => setAttributes( { borderColor: value } ) }
											allowReset
										/>
									</Fragment>
								}else {
									btn_color_tab = <Fragment>
										<p className="aeopr-setting-label">{ __( "Text Hover Color" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={{ backgroundColor: hColor }} ></span></span></p>
										<ColorPalette
											value={ hColor }
											onChange={ ( value ) => setAttributes( { hColor: value } ) }
											allowReset
										/>
										<p className="aeopr-setting-label">{ __( "Background Hover Color" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={{ backgroundColor: hBackground }} ></span></span></p>
										<ColorPalette
											value={ hBackground }
											onChange={ ( value ) => setAttributes( { hBackground: value } ) }
											allowReset
										/>
										<p className="aeopr-setting-label">{ __( "Border Hover Color" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={{ backgroundColor: borderHColor }} ></span></span></p>
										<ColorPalette
											value={ borderHColor }
											onChange={ ( value ) => setAttributes( { borderHColor: value } ) }
											allowReset
										/>
									</Fragment>
								}
								return <div>{ btn_color_tab }</div>
							}
						}
					</TabPanel>
					<hr className="aeopr-editor__separator" />
					<h2>{ __( "Padding (px)" ) }</h2>
					<RangeControl
						label={ AEOPR_Block_Icons.vertical_spacing }
						className={ "aeopr-margin-control" }
						value={ vPadding }
						onChange={ value => {
							setAttributes( { vPadding: value } )
						} }
						min={ 0 }
						max={ 100 }
					/>
					<RangeControl
						label={ AEOPR_Block_Icons.horizontal_spacing }
						className={ "aeopr-margin-control" }
						value={ hPadding }
						onChange={ value => {
							setAttributes( { hPadding: value } )
						} }
						min={ 0 }
						max={ 100 }
					/>
					<h2>{ __( "Border" ) }</h2>
					<SelectControl
						label={ __( "Style" ) }
						value={ borderStyle }
						options={ [
							{ value: "none", label: __( "None" ) },
							{ value: "solid", label: __( "Solid" ) },
							{ value: "dotted", label: __( "Dotted" ) },
							{ value: "dashed", label: __( "Dashed" ) },
							{ value: "double", label: __( "Double" ) },
						] }
						onChange={ value => {
							setAttributes( { borderStyle: value } )
						} }
					/>
					{ borderStyle != "none" &&
						<RangeControl
							label={ __( "Thickness" ) }
							value={ borderWidth }
							onChange={ value => {
								setAttributes( { borderWidth: value } )
							} }
							min={ 0 }
							max={ 20 }
						/>
					}
					<RangeControl
						label={ __( "Rounded Corners" ) }
						value={ borderRadius }
						onChange={ value => {
							setAttributes( { borderRadius: value } )
						} }
						min={ 0 }
						max={ 50 }
					/>
					<hr className="aeopr-editor__separator" />
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
											<ButtonGroup className="aeopr-size-type-field" aria-label={ __( "Size Type" ) }>
												<Button
													key={ "px" }
													className="aeopr-size-btn"
													isSmall
													isPrimary={ sizeType === "px" }
													aria-pressed={ sizeType === "px" }
													onClick={ () => setAttributes( { sizeType: "px" } ) }
												>
													{ "px" }
												</Button>
												<Button
													key={ "%" }
													className="aeopr-size-btn"
													isSmall
													isPrimary={ sizeType === "%" }
													aria-pressed={ sizeType === "%" }
													onClick={ () => setAttributes( { sizeType: "%" } ) }
												>
													{ "%" }
												</Button>
											</ButtonGroup>
											<RangeControl
												label={ __( "Font Size" ) }
												value={ sizeMobile }
												onChange={ value => {
													setAttributes( { sizeMobile: value } )
												} }
												min={ 0 }
												max={ 100 }
												beforeIcon="editor-textcolor"
												allowReset
												initialPosition={16}
											/>
										</Fragment>
									)
								} else if ( "tablet" === tab.name ) {
									tabout = (
										<Fragment>
											<ButtonGroup className="aeopr-size-type-field" aria-label={ __( "Size Type" ) }>
												<Button
													key={ "px" }
													className="aeopr-size-btn"
													isSmall
													isPrimary={ sizeType === "px" }
													aria-pressed={ sizeType === "px" }
													onClick={ () => setAttributes( { sizeType: "px" } ) }
												>
													{ "px" }
												</Button>
												<Button
													key={ "%" }
													className="aeopr-size-btn"
													isSmall
													isPrimary={ sizeType === "%" }
													aria-pressed={ sizeType === "%" }
													onClick={ () => setAttributes( { sizeType: "%" } ) }
												>
													{ "%" }
												</Button>
											</ButtonGroup>
											<RangeControl
												label={ __( "Font Size" ) }
												value={ sizeTablet }
												onChange={ value => {
													setAttributes( { sizeTablet: value } )
												} }
												min={ 0 }
												max={ 100 }
												beforeIcon="editor-textcolor"
												allowReset
												initialPosition={16}
											/>
										</Fragment>
									)
								} else {
									tabout = (
										<Fragment>
											<ButtonGroup className="aeopr-size-type-field" aria-label={ __( "Size Type" ) }>
												<Button
													key={ "px" }
													className="aeopr-size-btn"
													isSmall
													isPrimary={ sizeType === "px" }
													aria-pressed={ sizeType === "px" }
													onClick={ () => setAttributes( { sizeType: "px" } ) }
												>
													{ "px" }
												</Button>
												<Button
													key={ "%" }
													className="aeopr-size-btn"
													isSmall
													isPrimary={ sizeType === "%" }
													aria-pressed={ sizeType === "%" }
													onClick={ () => setAttributes( { sizeType: "%" } ) }
												>
													{ "%" }
												</Button>
											</ButtonGroup>
											<RangeControl
												label={ __( "Font Size" ) }
												value={ size }
												onChange={ value => {
													setAttributes( { size: value } )
												} }
												min={ 0 }
												max={ 100 }
												beforeIcon="editor-textcolor"
												allowReset
												initialPosition={16}
											/>
										</Fragment>
									)
								}

								return <div>{ tabout }</div>
							}
						}
					</TabPanel>
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
											<ButtonGroup className="aeopr-size-type-field" aria-label={ __( "Size Type" ) }>
												<Button
													key={ "px" }
													className="aeopr-size-btn"
													isSmall
													isPrimary={ lineHeightType === "px" }
													aria-pressed={ lineHeightType === "px" }
													onClick={ () => setAttributes( { lineHeightType: "px" } ) }
												>
													{ "px" }
												</Button>
												<Button
													key={ "%" }
													className="aeopr-size-btn"
													isSmall
													isPrimary={ lineHeightType === "%" }
													aria-pressed={ lineHeightType === "%" }
													onClick={ () => setAttributes( { lineHeightType: "%" } ) }
												>
													{ "%" }
												</Button>
											</ButtonGroup>
											<RangeControl
												label={ __( "Line Height" ) }
												value={ lineHeightMobile }
												onChange={ value => {
													setAttributes( { lineHeightMobile: value } )
												} }
												min={ 0 }
												max={ 100 }
												beforeIcon="editor-textcolor"
												allowReset
												initialPosition={16}
											/>
										</Fragment>
									)
								} else if ( "tablet" === tab.name ) {
									tabout = (
										<Fragment>
											<ButtonGroup className="aeopr-size-type-field" aria-label={ __( "Size Type" ) }>
												<Button
													key={ "px" }
													className="aeopr-size-btn"
													isSmall
													isPrimary={ lineHeightType === "px" }
													aria-pressed={ lineHeightType === "px" }
													onClick={ () => setAttributes( { lineHeightType: "px" } ) }
												>
													{ "px" }
												</Button>
												<Button
													key={ "%" }
													className="aeopr-size-btn"
													isSmall
													isPrimary={ lineHeightType === "%" }
													aria-pressed={ lineHeightType === "%" }
													onClick={ () => setAttributes( { lineHeightType: "%" } ) }
												>
													{ "%" }
												</Button>
											</ButtonGroup>
											<RangeControl
												label={ __( "Line Height" ) }
												value={ lineHeightTablet }
												onChange={ value => {
													setAttributes( { lineHeightTablet: value } )
												} }
												min={ 0 }
												max={ 100 }
												beforeIcon="editor-textcolor"
												allowReset
												step={0.1}
												initialPosition={16}
											/>
										</Fragment>
									)
								} else {
									tabout = (
										<Fragment>
											<ButtonGroup className="aeopr-size-type-field" aria-label={ __( "Size Type" ) }>
												<Button
													key={ "px" }
													className="aeopr-size-btn"
													isSmall
													isPrimary={ lineHeightType === "px" }
													aria-pressed={ lineHeightType === "px" }
													onClick={ () => setAttributes( { lineHeightType: "px" } ) }
												>
													{ "px" }
												</Button>
												<Button
													key={ "%" }
													className="aeopr-size-btn"
													isSmall
													isPrimary={ lineHeightType === "%" }
													aria-pressed={ lineHeightType === "%" }
													onClick={ () => setAttributes( { lineHeightType: "%" } ) }
												>
													{ "%" }
												</Button>
											</ButtonGroup>
											<RangeControl
												label={ __( "Line Height" ) }
												value={ lineHeight }
												onChange={ value => {
													setAttributes( { lineHeight: value } )
												} }
												min={ 0 }
												max={ 100 }
												step={0.1}
												beforeIcon="editor-textcolor"
												allowReset
												initialPosition={16}
											/>
										</Fragment>
									)
								}

								return <div>{ tabout }</div>
							}
						}
					</TabPanel>
					<hr className="aeopr-editor__separator" />
				</PanelBody>
			)
		}

        return (
            <Fragment>

				<BlockControls>
					<ToolbarGroup>
						<ToolbarButton
							icon = 'admin-links'
							name="link"
							title={ __( 'Link' ) }
							onClick={ this.onClickLinkSettings }
						/>
					</ToolbarGroup>
				</BlockControls>
				{ linkControl }
				<InspectorControls>
					{ buttonControls }
				</InspectorControls>
				<div className={ classnames(
				className,
				"aeopr-buttons__outer-wrap",
				`aeopr-block-${ this.props.clientId }`
				) }>
					<div className="aeopr-button__wrapper">
						<div className="aeopr-buttons-repeater aeopr-button__wrapper">
							<RichText
								placeholder={ __( "Add text…" ) }
								value={ label }
								tagName='div'
								onChange={ value => {
									setAttributes( { label: value })
								} }
								allowedFormats={ [ "bold", "italic", "strikethrough" ] }
								className='aeopr-button__link'
								rel ="noopener noreferrer"
								keepPlaceholderOnFocus
							/>	
						</div>
					</div>
				</div>
            </Fragment>
        )
	}
}
export default AEOPRButtonsChild