/**
 * BLOCK: Advanced Heading
 */

// Import block dependencies and components.
import classnames from "classnames"
import map from "lodash/map"
import styling from "./styling"


//  Import CSS.
import "./style.scss"

const { __ } = wp.i18n

const {
	registerBlockType,
	createBlock
} = wp.blocks

const {
	AlignmentToolbar,
	BlockControls,
	InspectorControls,
	RichText,
	ColorPalette,
} = wp.blockEditor

const {
	PanelBody,
	SelectControl,
	RangeControl,
	ButtonGroup,
	Button,
	TabPanel,
	Dashicon,
	TextControl
} = wp.components

const { withSelect } = wp.data

const { Component, Fragment } = wp.element

class AEOPRAdvancedHeading extends Component {

	constructor() {
		super( ...arguments )

		this.splitBlock = this.splitBlock.bind( this )
	}

	componentDidMount() {

		// Assigning block_id in the attribute.
		this.props.setAttributes( { block_id: this.props.clientId } )

		// Assigning block_id in the attribute.
		this.props.setAttributes( { classMigrate: true } )

		let level_val = parseInt( this.props.attributes.headingTag.replace( 'h' , '' ) )
		this.props.setAttributes( { level: level_val } )

		// Pushing Style tag for this block css.
		const $style = document.createElement( "style" )
		$style.setAttribute( "id", "aeopr-adv-heading-style-" + this.props.clientId )
		document.head.appendChild( $style )
	}

	/*
	 * Heading Tag Change
	 */
	onTagChange( value ) {
		const { setAttributes } = this.props

		let level_val = parseInt( value.replace( 'h' , '' ) )

		setAttributes( { level: level_val } )
		setAttributes( { headingTag: value } )
	}

	splitBlock( before, after, ...blocks ) {
		const {
			attributes,
			insertBlocksAfter,
			setAttributes,
			onReplace,
		} = this.props

		if ( after ) {
			// Append "After" content as a new paragraph block to the end of
			// any other blocks being inserted after the current paragraph.
			blocks.push( createBlock( "core/paragraph", { content: after } ) )
		}

		if ( blocks.length && insertBlocksAfter ) {
			insertBlocksAfter( blocks )
		}

		const { content } = attributes
		if ( ! before ) {
			// If before content is omitted, treat as intent to delete block.
			onReplace( [] )
		} else if ( content !== before ) {
			// Only update content if it has in-fact changed. In case that user
			// has created a new paragraph at end of an existing one, the value
			// of before will be strictly equal to the current content.
			setAttributes( { content: before } )
		}
	}

	render() {

		// Setup the attributes
		const {
			isSelected,
			className,
			attributes,
			setAttributes,
			insertBlocksAfter,
			mergeBlocks,
			onReplace,
			anchor,
			attributes: {
				level,
				headingTitle,
				headingId,
				headingDesc,
				headingAlign,
				headingColor,
				subHeadingColor,
				separatorColor,
				headingTag,
				separatorWidth,
				separatorWidthType,
				seperatorStyle,
				separatorHeight,
				headSpace,
				separatorSpace,
				headLoadGoogleFonts,
				subHeadLoadGoogleFonts,
			},
		} = this.props

		var element = document.getElementById( "aeopr-adv-heading-style-" + this.props.clientId )

		if( null != element && "undefined" != typeof element ) {
			element.innerHTML = styling( this.props )
		}

		return (
			<Fragment>
				<BlockControls key='controls'>
					<AlignmentToolbar
						value={ headingAlign }
						onChange={ ( value ) => setAttributes( { headingAlign: value } ) }
					/>
				</BlockControls>
				<InspectorControls>
					<PanelBody title={ __( "Advanced Heading" ) }>
						<h2>{ __( "Heading" ) }</h2>
						<SelectControl
							label={ __( "Heading Tag" ) }
							value={ headingTag }
							onChange={ value => {
								this.onTagChange( value )
							} }
							options={ [
								{ value: "h1", label: __( "H1" ) },
								{ value: "h2", label: __( "H2" ) },
								{ value: "h3", label: __( "H3" ) },
								{ value: "h4", label: __( "H4" ) },
								{ value: "h5", label: __( "H5" ) },
								{ value: "h6", label: __( "H6" ) },
							] }
						/>
						<p className="aeopr-setting-label">{ __( "Heading Color" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={{ backgroundColor: headingColor }} ></span></span></p>
						<ColorPalette
							value={ headingColor }
							onChange={ ( value ) => setAttributes( { headingColor: value } ) }
							allowReset
						/>
						<hr className="aeopr-editor__separator" />
						<h2>{ __( "Sub-Heading" ) }</h2>
												<p className="aeopr-setting-label">{ __( "Sub Heading Color" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={{ backgroundColor: subHeadingColor }} ></span></span></p>
						<ColorPalette
							value={ subHeadingColor }
							onChange={ ( value ) => setAttributes( { subHeadingColor: value } ) }
							allowReset
						/>
					</PanelBody>
					<PanelBody title={ __( "Separator" ) } initialOpen={ false }>
						<SelectControl
							label={ __( "Style" ) }
							value={ seperatorStyle }
							onChange={ ( value ) => setAttributes( { seperatorStyle: value } ) }
							options={ [
								{ value: "none", label: __( "None" ) },
								{ value: "solid", label: __( "Solid" ) },
								{ value: "double", label: __( "Double" ) },
								{ value: "dashed", label: __( "Dashed" ) },
								{ value: "dotted", label: __( "Dotted" ) },
							] }
						/>
						{ seperatorStyle !== "none" && <Fragment>
							<RangeControl
								label={ __( "Thickness (px)" ) }
								value={ separatorHeight }
								onChange={ ( value ) => setAttributes( { separatorHeight: value } ) }
								min={ 0 }
								max={ 20 }
								beforeIcon=""
								allowReset
								initialPosition={3}
							/>
							<ButtonGroup className="aeopr-size-type-field" aria-label={ __( "Size Type" ) }>
								<Button key={ "px" } className="aeopr-size-btn" isSmall isPrimary={ separatorWidthType === "px" } aria-pressed={ separatorWidthType === "px" } onClick={ () => setAttributes( { separatorWidthType: "px" } ) }>{ "px" }</Button>
								<Button key={ "%" } className="aeopr-size-btn" isSmall isPrimary={ separatorWidthType === "%" } aria-pressed={ separatorWidthType === "%" } onClick={ () => setAttributes( { separatorWidthType: "%" } ) }>{ "%" }</Button>
							</ButtonGroup>
							<RangeControl
								label={ __( "Width" ) }
								value={ separatorWidth }
								onChange={ ( value ) => setAttributes( { separatorWidth: value } ) }
								min={ 0 }
								max={ ( "%" == separatorWidthType ) ? 100 : 500 }
								beforeIcon=""
								allowReset
								initialPosition={20}
							/>
							{ seperatorStyle !== "none" && <Fragment>
								<p className="aeopr-setting-label">{ __( "Separator Color" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={{ backgroundColor: separatorColor }} ></span></span></p>
								<ColorPalette
									value={ separatorColor }
									onChange={ ( colorValue ) => setAttributes( { separatorColor: colorValue } ) }
									allowReset
								/>
							</Fragment>
							}
						</Fragment>
						}
					</PanelBody>
					<PanelBody title={ __( "Spacing" ) } initialOpen={ false }>
						<RangeControl
							label={ __( "Heading Bottom Spacing (px)" ) }
							value={ headSpace }
							onChange={ ( value ) => setAttributes( { headSpace: value } ) }
							min={ 0 }
							max={ 500 }
							beforeIcon=""
							allowReset
							initialPosition={0}
						/>
						{ seperatorStyle !== "none" && <RangeControl
							label={ __( "Separator Bottom Spacing (px)" ) }
							value={ separatorSpace }
							onChange={ ( value ) => setAttributes( { separatorSpace: value } ) }
							min={ 0 }
							max={ 500 }
							beforeIcon=""
							allowReset
							initialPosition={0}
						/>
						}
					</PanelBody>
				</InspectorControls>
				<div
					className={ classnames(
						className,
						`aeopr-block-${this.props.clientId}`,					
					) }
				>
					<RichText
						tagName={ headingTag }
						placeholder={ __( "Write a Heading" ) }
						value={ headingTitle }
						className='aeopr-heading-text'
						multiline={ false }
						onChange={ ( value ) => {
							setAttributes( { headingTitle: value } ) }
						}
						onMerge={ mergeBlocks }
						unstableOnSplit={
							insertBlocksAfter ?
								( before, after, ...blocks ) => {
									setAttributes( { content: before } )
									insertBlocksAfter( [
										...blocks,
										createBlock( "core/paragraph", { content: after } ),
									] )
								} :
								undefined
						}
						onRemove={ () => onReplace( [] ) }
					/>
					{ seperatorStyle !== "none" && <div className="aeopr-separator-wrap" ><div className="aeopr-separator"></div></div> }
					<RichText
						tagName="p"
						placeholder={ __( "Write a Description" ) }
						value={ headingDesc }
						className='aeopr-desc-text'
						onChange={ ( value ) => setAttributes( { headingDesc: value } ) }
						onMerge={ mergeBlocks }
						unstableOnSplit={ this.splitBlock }
						onRemove={ () => onReplace( [] ) }
					/>
				</div>
				

			</Fragment>
		)
	}
}

export default withSelect( ( select, props ) => {
	const { anchor, attributes } = props
	return {
		anchor: attributes.headingId
	}
} )( AEOPRAdvancedHeading )
