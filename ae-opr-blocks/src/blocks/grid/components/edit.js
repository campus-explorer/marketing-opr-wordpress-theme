/**
 * BLOCK: Grid Edit
 * Based on Icon List - Ultimate Addons for Gutenberg
 * Plugin URI: https://www.brainstormforce.com
 */

// Import classes
import classnames from "classnames"
import times from "lodash/times"
import map from "lodash/map"
import memoize from "memize"
import styling from "../helpers/styling"



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

const ALLOWED_BLOCKS = [
"aeopr/icon-block",
"core/heading",
"core/image",
"core/video",
"core/embed",
"aeopr/layout-grid",
"core/paragraph",
"aeopr/columns" ]

class AEOPRGridArea extends Component {

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
		$style.setAttribute( "id", "aeopr-style-grid-" + this.props.clientId )
		document.head.appendChild( $style )

	}

	changeChildAttr ( value ) {
		const { setAttributes } = this.props
		const getChildBlocks = select('core/block-editor').getBlocks( this.props.clientId );

		getChildBlocks.forEach((child, key) => {
			//child.attributes.hideLabel = value
		});
		//setAttributes( { hideLabel: value } )
	}

	render() {

		const { attributes, setAttributes } = this.props

		
		const {
			align,
			child_count,
			cell_count,
			cells,
			gap,
			inner_gap,
			stack,
			cell_layout,
			cellWidth,
			cellWidthType,
			cellWidthMobile,
			cellPosition,
			borderRadius,
			bgSize,
			border
		} = attributes

		var element = document.getElementById( "aeopr-style-grid-" + this.props.clientId )

		if( null != element && "undefined" != typeof element ) {
			element.innerHTML = styling( this.props )
		}


		const cellWidthTypes = [
			{ key: "px", name: __( "px" ) },
			{ key: "%", name: __( "%" ) },
		]

		const sizeTypeControls = (
			<ButtonGroup className="aeopr-size-type-field" aria-label={ __( "Size Type" ) }>
				{ map( cellWidthTypes, ( { name, key } ) => (
					<Button
						key={ key }
						className="aeopr-width-btn"
						isSmall
						isPrimary={ cellWidthType === key }
						aria-pressed={ cellWidthType === key }
						onClick={ () => setAttributes( { cellWidthType: key } ) }
					>
						{ name }
					</Button>
				) ) }
			</ButtonGroup>
		)

		const getCellTemplate = memoize( ( cell_block, cells ) => {
			return times( cell_block, n => [ "core/paragraph", cells[n] ] )
		} )

/// --> monitor children for changes		
		const GridChildren = withSelect(( select, props )  => {
					return {
						innerBlocks: select( 'core/block-editor' ).getBlocks( props.clientId )
					};
				}
			)( function( props, {setAttributes, attributes} ) {
				props.setAttributes({cell_count: props.innerBlocks.length});
				return true

		 
			}
		 
		);
		return (
			<Fragment>
				
				
				<GridChildren
					clientId={this.props.clientId}
					{...this.props}
					/>
				
				
				<InspectorControls>
					<PanelBody title={ __( "General" ) } initialOpen={ true }>
						<SelectControl
							label={ __( "Layout" ) }
							value={ cell_layout }
							options={ [
								{ value: "horizontal", label: __( "Horizontal" ) },
								{ value: "stacked", label: __( "Stacked" ) },
							] }
							onChange={ ( value ) => {
									(value==="stacked")&& setAttibutes({stack: "all"});
									setAttributes( { cell_layout: value } ) 
								}
								}
						/>
						{ "horizontal" == cell_layout &&
							<Fragment>
								<SelectControl
									label={ __( "Stack on" ) }
									value={ stack }
									options={ [
										{ value: "no", label: __( "None" ) },
										{ value: "all", label: __( "All" ) },
										{ value: "mobile", label: __( "Mobile" ) },
									] }
									onChange={ ( value ) => setAttributes( { stack: value } ) }
									help={ __( "Note: Choose on what breakpoint the cells will stack." ) }
								/>
							</Fragment>
						}
						<RangeControl
							label={ __( 'Columns' ) }
							value={ child_count }
							onChange={ ( value ) => setAttributes({child_count: value })}
							
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
						<hr className="aeopr-editor__separator" />
						<SelectControl
							label={ __( "Cell Alignment" ) }
							value={ cellPosition }
							options={ [
								{ value: "top", label: __( "Top" ) },
								{ value: "middle", label: __( "Middle" ) },
								{ value: "bottom", label: __( "Bottom" ) },
							] }
							onChange={ ( value ) => setAttributes( { cellPosition: value } ) }
						/>
						<TabPanel className="aeopr-size-type-field-tabs" activeClass="active-tab"
							tabs={ [
								{
									name: "desktop",
									title: <Dashicon icon="desktop" />,
									className: "aeopr-desktop-tab aeopr-responsive-tabs",
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
													label={ __( "Width" ) }
													value={ cellWidthMobile }
													onChange={ ( value ) => setAttributes( { cellWidthMobile: value } ) }
													min={ 0 }
													max={ 100 }
													allowReset
													initialPosition={50}
												/>
											</Fragment>
										)
									} else {
										tabout = (
											<Fragment>
												{sizeTypeControls}
												<RangeControl
													label={ __( "Width" ) }
													value={ cellWidth }
													onChange={ ( value ) => setAttributes( { cellWidth: value } ) }
													min={ 0 }
													max={ 100 }
													allowReset
													initialPosition={50}
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
					"aeopr-grid__outer-wrap",
					`aeopr-grid__layout-${cell_layout}`,
					`aeopr-block-${ this.props.clientId }`,
					`aeopr-grid__cells-${child_count}`,
					(cell_layout==='stack' || stack!=="none")&&`aeopr-grid__${stack}-stack`
				) }>
						<InnerBlocks
							template={ getCellTemplate( cell_count, cells ) }
							templateLock={ false }
							//allowedBlocks={ ALLOWED_BLOCKS }
							__experimentalMoverDirection={ cell_layout }
						/>
				</div>
			</Fragment>
		)
	}
}

export default AEOPRGridArea
