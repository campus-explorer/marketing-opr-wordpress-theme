/**
 * BLOCK: Visual Links - Edit Class
 */

// Import classes
import classnames from "classnames"
import times from "lodash/times"
import map from "lodash/map"
import styling from "./styling"




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

const ALLOWED_BLOCKS = [ "aeopr/visual-links-child" ]

class AEOPRVisualLinks extends Component {

	constructor() {
		super( ...arguments )
	}

	componentDidMount() {

		// Assigning block_id in the attribute.
		this.props.setAttributes( { block_id: this.props.clientId } )

		this.props.setAttributes( { classMigrate : true } )
		this.props.setAttributes( { childMigrate : true } )

		// Pushing Style tag for this block css.
		const $style = document.createElement( "style" )
		$style.setAttribute( "id", "aeopr-style-visual-links-" + this.props.clientId )
		document.head.appendChild( $style )

	}



	render() {

		const { attributes, setAttributes } = this.props

		const {
			align,
			className,
			link_layout,
			link_count,
			links,
			gap,
			inner_gap,
			stack,
			size,
			sizeType,
			sizeMobile,
			sizeTablet,
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

		

		var element = document.getElementById( "aeopr-style-visual-links-" + this.props.clientId )

		if( null != element && "undefined" != typeof element ) {
			element.innerHTML = styling( this.props )
		}
		
		const innerCount = select('core/editor').getBlocksByClientId(this.props.clientId)[0].innerBlocks.length;
		setAttributes({link_count: innerCount})
		return (
			<Fragment>
				<BlockControls/>
				<InspectorControls>
					<PanelBody title={ __( "General" ) } initialOpen={ true }>
						<SelectControl
							label={ __( "Layout" ) }
							value={ link_layout }
							options={ [
								{ value: "horizontal", label: __( "Horizontal" ) },
								{ value: "vertical", label: __( "Vertical" ) },
							] }
							onChange={ ( value ) => setAttributes( { link_layout: value } ) }
						/>
						{ "horizontal" == link_layout &&
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
				
					</PanelBody>
				</InspectorControls>
				<div className={ classnames(
					className,
					"aeopr-visual-links__outer-wrap",
					`aeopr-visual-links__layout-${link_layout}`,
					`aeopr-block-${ this.props.clientId }`,
					`aeopr-visual-links__children-${link_count}`
				) }>
						<InnerBlocks

							templateLock={ false }
							allowedBlocks={ ALLOWED_BLOCKS }
						/>
				</div>
			</Fragment>
		)
	}
}

export default AEOPRVisualLinks
