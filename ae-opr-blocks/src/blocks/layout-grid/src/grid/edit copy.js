/**
 * External dependencies
 */

import { times } from 'lodash';
import classnames from 'classnames';

/**
 * WordPress dependencies
 */

///---> Add tag chooser to outer html

import {
	InnerBlocks,
	InspectorControls,
	BlockControls,
	BlockVerticalAlignmentToolbar,
	MediaUpload,
	withColors,
	PanelColorSettings,
} from '@wordpress/block-editor';
import { Component, createRef } from '@wordpress/element';
import {
	PanelBody,
	TextControl,
	ButtonGroup,
	Button,
	IconButton,
	Placeholder,
	IsolatedEventContainer,
	ToggleControl,
	SelectControl,
	Disabled,
	RangeControl,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { ENTER, SPACE } from '@wordpress/keycodes';
import { withSelect, withDispatch } from '@wordpress/data';
import { compose } from '@wordpress/compose';
import { createBlock } from '@wordpress/blocks';

/**
 * Internal dependencies
 */

import {
	getAsEditorCSS,
	removeGridClasses,
	getGutterClasses,
} from './css-classname';
import ColumnIcon from '../icons';
import {
	getLayouts,
	getColumns,
	DEVICE_BREAKPOINTS,
	getSpanForDevice,
	getOffsetForDevice,
	getGutterValues,
} from '../constants';
import { getGridWidth, getDefaultSpan } from './grid-defaults';
import ResizeGrid from './resize-grid';
import LayoutGrid from './layout-grid';
import PreviewDevice from './preview-device';

const ALLOWED_BLOCKS = [ 'aecpc/layout-grid-column' ];
const MINIMUM_RESIZE_SIZE = 50; // Empirically determined to be a good size

class Edit extends Component {
	constructor( props ) {
		super( props );

		this.overlayRef = createRef();
		this.state = {
			inspectorDeviceType: 'Desktop',
			viewPort: 'Desktop',
		};
	}

	/*
	 * Change the layout (number of columns), resetting everything to the default
	 */
	onChangeLayout = ( columns ) => {
		const columnValues = {};

		for ( let pos = 0; pos < columns; pos++ ) {
			for (
				let device = 0;
				device < DEVICE_BREAKPOINTS.length;
				device++
			) {
				const defaultSpan = getDefaultSpan(
					DEVICE_BREAKPOINTS[ device ],
					columns,
					pos
				);

				columnValues[
					getSpanForDevice( pos, DEVICE_BREAKPOINTS[ device ] )
				] = defaultSpan;
				columnValues[
					getOffsetForDevice( pos, DEVICE_BREAKPOINTS[ device ] )
				] = 0;
			}
		}

		this.props.updateColumns( this.props.columns, columns, columnValues );
	};

	onResize = ( column, adjustment ) => {
		const { attributes, columns } = this.props;
		const grid = new LayoutGrid(
			attributes,
			this.getPreviewMode(),
			columns
		);
		const adjustedGrid = grid.getAdjustedGrid( column, adjustment );

		if ( adjustedGrid ) {
			this.adjustGrid( adjustedGrid );
		}
	};

	onChangeSpan = ( column, device, value ) => {
		const { attributes, columns } = this.props;
		const grid = new LayoutGrid( attributes, device, columns );
		const adjustedGrid = grid.getAdjustedGrid( column, {
			span: parseInt( value, 10 ),
		} );

		if ( adjustedGrid ) {
			this.adjustGrid( adjustedGrid );
		}
	};

	onChangeOffset = ( column, device, value ) => {
		const { attributes, columns } = this.props;
		const grid = new LayoutGrid( attributes, device, columns );
		const adjustedGrid = grid.getAdjustedGrid( column, {
			start: grid.convertOffsetToStart( column, parseInt( value, 10 ) ),
		} );

		if ( adjustedGrid ) {
			this.adjustGrid( adjustedGrid );
		}
	};
	
	onSelectImage = (media) => {
		const {setAttributes,attributes} =this.props;
		setAttributes({
			backgroundImage: media
		});
		console.log(attributes.backgroundImage);
	};
	
	onRemoveImage = () => {
		const {setAttributes} =this.props;
		setAttributes({
			backgroundImage: undefined
		});
	};

	adjustGrid( grid ) {
		const { setAttributes, attributes } = this.props;

		setAttributes( {
			...grid,
			className: removeGridClasses( attributes.className ),
		} );
	}

	renderDeviceSettings( columns, device, attributes ) {
		const grid = new LayoutGrid( attributes, device, this.props.columns );
		const settings = [];

		for ( let column = 0; column < columns; column++ ) {
			const span =
				grid.getSpan( column ) ||
				getDefaultSpan( device, columns, column );
			const offset = grid.getOffset( column ) || 0;

			settings.push(
				<div className="aecpc-layout-grid-settings" key={ column }>
					<strong>
						{ __( 'Column', 'layout-grid' ) } { column + 1 }
					</strong>
					<div className="aecpc-layout-grid-settings__group">
						<TextControl
							type="number"
							label={ __( 'Offset', 'layout-grid' ) }
							value={ offset || 0 }
							min={ 0 }
							max={ getGridWidth( device ) - 1 }
							onChange={ ( value ) =>
								this.onChangeOffset( column, device, value )
							}
						/>
						<TextControl
							type="number"
							label={ __( 'Span', 'layout-grid' ) }
							value={ span }
							min={ 1 }
							max={ getGridWidth( device ) }
							onChange={ ( value ) =>
								this.onChangeSpan( column, device, value )
							}
						/>
					</div>
				</div>
			);
		}

		return settings;
	}

	canResizeBreakpoint( device ) {
		if ( this.overlayRef && this.overlayRef.current ) {
			const { width } = this.overlayRef.current.getBoundingClientRect();

			return width / getGridWidth( device ) > MINIMUM_RESIZE_SIZE;
		}

		return false;
	}

	updateInspectorDevice( device ) {
		this.setState( { inspectorDeviceType: device } );

		// Only update if not on mobile
		if ( this.state.viewPort !== 'Mobile' ) {
			this.props.setPreviewDeviceType( device );
		}
	}

	getPreviewMode() {
		// If we're on desktop, or the preview is set to mobile, then return the preview mode
		if (
			this.state.viewPort === 'Desktop' ||
			this.props.previewDeviceType === 'Mobile'
		) {
			return this.props.previewDeviceType;
		}

		// Return something appropriate for the viewport (mobile or tablet)
		return this.state.viewPort;
	}

	getInspectorMode() {
		if ( this.state.viewPort === 'Desktop' ) {
			return this.props.previewDeviceType;
		}

		// Return something appropriate for the viewport (mobile or tablet)
		return this.state.inspectorDeviceType;
	}

	render() {
		const {
			className,
			attributes = {},
			isSelected,
			columns,
			setAttributes,
			updateAlignment,
			columnAttributes,
			previewDeviceType,
			backgroundColor,
			setBackgroundColor,

		} = this.props;
		const {
			backgroundImage,
			backgroundOpacity,
			backgroundPosition,
			backgroundSize,
			backgroundRepeat,
		}=attributes;
		const { viewPort } = this.state;
		const previewMode = this.getPreviewMode();
		const inspectorDeviceType = this.getInspectorMode();
		const extra = getAsEditorCSS(
			previewMode,
			columns,
			attributes,
			columnAttributes
		);
		const { gutterSize, addGutterEnds, verticalAlignment } = attributes;
		const layoutGrid = new LayoutGrid( attributes, previewMode, columns );
		const classes = classnames(
			removeGridClasses( className ),
			backgroundColor.class,
			extra,
			{
				'wp-block-aecpc-layout-tablet': previewMode === 'Tablet',
				'wp-block-aecpc-layout-desktop': previewMode === 'Desktop',
				'wp-block-aecpc-layout-mobile': previewMode === 'Mobile',
				'wp-block-aecpc-layout-resizable': this.canResizeBreakpoint(
					previewMode
				),
				[ `are-vertically-aligned-${ verticalAlignment }` ]: verticalAlignment,

				'has-background': backgroundColor.color,
				[ backgroundColor.class ]: backgroundColor.class,

			},
			getGutterClasses( attributes )
		);
		const style = {
			backgroundColor: backgroundColor.color,
		};

		if ( columns === 0 ) {
			return (
				<Placeholder
					icon="layout"
					label={ __( 'Choose Layout', 'layout-grid' ) }
					instructions={ __(
						'Select a layout to start with:',
						'layout-grid'
					) }
					className={ classes }
				>
					<ul className="block-editor-inner-blocks__template-picker-options">
						{ getColumns().map( ( column ) => (
							<li key={ column.value }>
								<IconButton
									isSecondary
									icon={
										<ColumnIcon columns={ column.value } />
									}
									onClick={ () =>
										this.onChangeLayout( column.value )
									}
									className="block-editor-inner-blocks__template-picker-option"
									label={ column.label }
								/>
							</li>
						) ) }
					</ul>
				</Placeholder>
			);
		}

		const toggleControl = (
			<ToggleControl
				label={ __( 'Add end gutters', 'layout-grid' ) }
				help={
					addGutterEnds
						? __(
								'Toggle off to remove the spacing left and right of the grid.',
								'layout-grid'
						  )
						: __(
								'Toggle on to add space left and right of the layout grid. ',
								'layout-grid'
						  )
				}
				checked={ addGutterEnds }
				onChange={ ( newValue ) =>
					setAttributes( { addGutterEnds: newValue } )
				}
			/>
		);
		

		return (
			<>
				<PreviewDevice
					currentViewport={ viewPort }
					updateViewport={ ( newPort ) =>
						this.setState( {
							viewPort: newPort,
							inspectorDeviceType: newPort,
						} )
					}
				/>

				<IsolatedEventContainer>
					
													
					
					<ResizeGrid
						className={ classes }
						onResize={ this.onResize }
						totalColumns={ getGridWidth( previewMode ) }
						layoutGrid={ layoutGrid }
						isSelected={ isSelected }
						{...attributes}
					>
						
						<div
							className="aecpc-overlay-grid"
							ref={ this.overlayRef }
						>
							{ times( getGridWidth( previewMode ) ).map(
								( item ) => (
									<div
										className="aecpc-overlay-grid__column"
										key={ item }
									></div>
								)
							) }
						</div>

						<InnerBlocks
							template={ null }
							templateLock="all"
							allowedBlocks={ ALLOWED_BLOCKS }
						/>

						<InspectorControls>
							<PanelBody title={ __( 'Layout', 'layout-grid' ) }>
								<div className="aecpc-layout-grid-columns block-editor-block-styles">
									{ getColumns().map( ( column ) => (
										<div
											key={ column.value }
											className={ classnames(
												'block-editor-block-styles__item',
												{
													'is-active':
														columns ===
														column.value,
												}
											) }
											onClick={ () =>
												this.onChangeLayout(
													column.value
												)
											}
											onKeyDown={ ( event ) => {
												if (
													ENTER === event.keyCode ||
													SPACE === event.keyCode
												) {
													event.preventDefault();
													this.onChangeLayout(
														column.value
													);
												}
											} }
											role="button"
											tabIndex="0"
											aria-label={ column.label }
										>
											<div className="block-editor-block-styles__item-preview">
												<ColumnIcon
													columns={ column.value }
												/>
											</div>
											<div className="editor-block-styles__item-label block-editor-block-styles__item-label">
												{ column.label }
											</div>
										</div>
									) ) }
								</div>

								<p>
									<em>
										{ __(
											'Changing the number of columns will reset your layout and could remove content.',
											'layout-grid'
										) }
									</em>
								</p>
							</PanelBody>

							<PanelBody
								title={ __(
									'Responsive Breakpoints',
									'layout-grid'
								) }
							>
								<p>
									<em>
										{ __(
											"Note that previewing your post will show your browser's breakpoint, not the currently selected one.",
											'layout-grid'
										) }
									</em>
								</p>
								<ButtonGroup>
									{ getLayouts().map( ( layout ) => (
										<Button
											key={ layout.value }
											isPrimary={
												layout.value ===
												inspectorDeviceType
											}
											onClick={ () =>
												this.updateInspectorDevice(
													layout.value
												)
											}
										>
											{ layout.label }
										</Button>
									) ) }
								</ButtonGroup>

								{ this.renderDeviceSettings(
									columns,
									inspectorDeviceType,
									attributes
								) }
							</PanelBody>

							<PanelBody title={ __( 'Gutter', 'layout-grid' ) }>
								<p>{ __( 'Gutter size', 'layout-grid' ) }</p>

								<SelectControl
									value={ gutterSize }
									onChange={ ( newValue ) =>
										setAttributes( {
											gutterSize: newValue,
											addGutterEnds:
												newValue === 'none'
													? false
													: addGutterEnds,
										} )
									}
									options={ getGutterValues() }
								/>

								{ gutterSize === 'none' ? (
									<Disabled>{ toggleControl }</Disabled>
								) : (
									toggleControl
								) }
							</PanelBody>
							<PanelColorSettings
								title={ __( 'Grid Color', 'layout-grid' ) }
								initialOpen
								colorSettings={ [
									{
										value: backgroundColor.color,
										onChange: setBackgroundColor,
										label: __( 'Background', 'layout-grid' ),
									},
								] }
							/>
							
							<PanelBody
								className="editor-bg-image-control"
								label={ __( "Background Image" ) }>
								{ backgroundImage &&
									(
										<img src={backgroundImage.url} width="100" height="100" />	
											
									)
								}
								<MediaUpload
									title={ __( "Select Background Image" ) }
						            key="mediaupload"
						            onSelect={this.onSelectImage}
						            type="image"
						            value={backgroundImage}
						            render={({ open }) => (
							            <>
							              	<Button isSecondary onClick={ open }>
												{ ! backgroundImage ? __( "Select Background Image" ) : __( "Replace image" ) }
											</Button>
											<Button className="aecpc-rm-btn" onClick={ this.onRemoveImage } isLink isDestructive>
												{ __( "Remove Image" ) }
											</Button> 
										</>
						            )}
						          />
						         <RangeControl
									label={ __( "Opacity" ) }
									value={ backgroundOpacity }
									onChange={ ( value ) => setAttributes( { backgroundOpacity: value } ) }
									min={ 0 }
									max={ 100 }
									allowReset
									initialPosition={100}
								/> 
								<SelectControl
										label={ __( "Image Position" ) }
										value={ backgroundPosition }
										onChange={ ( value ) => setAttributes( { backgroundPosition: value } ) }
										options={ [
											{ value: "left top", label: __( "Top Left" ) },
											{ value: "center top", label: __( "Top Center" ) },
											{ value: "right top", label: __( "Top Right" ) },
											{ value: "left center", label: __( "Center Left" ) },
											{ value: "center center", label: __( "Center Center" ) },
											{ value: "right center", label: __( "Center Right" ) },
											{ value: "left bottom", label: __( "Bottom Left" ) },
											{ value: "center bottom", label: __( "Bottom Center" ) },
											{ value: "right bottom", label: __( "Bottom Right" ) },
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
									<SelectControl
										label={ __( "Repeat" ) }
										value={ backgroundRepeat }
										onChange={ ( value ) => setAttributes( { backgroundRepeat: value } ) }
										options={ [
											{ value: "no-repeat", label: __( "No Repeat" ) },
											{ value: "repeat", label: __( "Repeat" ) },
											{ value: "repeat-x", label: __( "Repeat X" ) },
											{ value: "repeat-y", label: __( "Repeat Y" ) }
										] }
									/>
									
						          
						       
							</PanelBody>

						</InspectorControls>
					</ResizeGrid>
				</IsolatedEventContainer>

				<BlockControls>
					<BlockVerticalAlignmentToolbar
						onChange={ updateAlignment }
						value={ verticalAlignment }
					/>
				</BlockControls>
			</>
		);
	}
}

function getColumnBlocks( currentBlocks, previous, columns ) {
	if ( columns > previous ) {
		// Add new blocks to the end
		return [
			...currentBlocks,
			...times( columns - previous, () =>
				createBlock( 'aecpc/layout-grid-column' )
			),
		];
	}

	// A little ugly but... ideally we remove empty blocks first, and then anything with content from the end
	let cleanedBlocks = [ ...currentBlocks ];
	let totalRemoved = 0;

	// Reverse the blocks so we start at the end. This happens in-place
	cleanedBlocks.reverse();

	// Remove empty blocks
	cleanedBlocks = cleanedBlocks.filter( ( block ) => {
		if (
			totalRemoved < previous - columns &&
			block.innerBlocks.length === 0
		) {
			totalRemoved++;
			return false;
		}

		return true;
	} );

	// If we still need to remove blocks then do them from the beginning before flipping it back round
	return cleanedBlocks
		.slice( Math.max( 0, previous - columns - totalRemoved ) )
		.reverse();
}

export default compose( [
	withColors( 'backgroundColor' ),
	withDispatch( ( dispatch, ownProps, registry ) => ( {
		/**
		 * Update all child Column blocks with a new vertical alignment setting
		 * based on whatever alignment is passed in. This allows change to parent
		 * to overide anything set on a individual column basis.
		 *
		 * @param {string} verticalAlignment the vertical alignment setting
		 */
		updateAlignment( verticalAlignment ) {
			const { clientId, setAttributes } = ownProps;
			const { updateBlockAttributes } = dispatch( 'core/block-editor' );
			const { getBlockOrder } = registry.select( 'core/block-editor' );

			// Update own alignment.
			setAttributes( { verticalAlignment } );

			// Update all child Column Blocks to match
			const innerBlockClientIds = getBlockOrder( clientId );
			innerBlockClientIds.forEach( ( innerBlockClientId ) => {
				updateBlockAttributes( innerBlockClientId, {
					verticalAlignment,
				} );
			} );
		},
		updateColumns( previous, columns, columnValues ) {
			const { clientId } = ownProps;
			const { replaceBlock } = dispatch( 'core/block-editor' );
			const { getBlocks } = registry.select( 'core/block-editor' );
			const innerBlocks = getColumnBlocks(
				getBlocks( clientId ),
				previous,
				columns
			);

			// Replace the whole block with a new one so that our changes to both the attributes and innerBlocks are atomic
			// This ensures that the undo history has a single entry, preventing traversing to a 'half way' point where innerBlocks are changed
			// but the column attributes arent
			const blockCopy = createBlock(
				ownProps.name,
				{
					...ownProps.attributes,
					...columnValues,
					className: removeGridClasses(
						ownProps.attributes.className
					),
				},
				innerBlocks
			);

			replaceBlock( clientId, blockCopy );
		},
		setPreviewDeviceType( type ) {
			const { __experimentalSetPreviewDeviceType } = dispatch(
				'core/edit-post'
			);

			__experimentalSetPreviewDeviceType( type );
		},
	} ) ),
	withSelect( ( select, { clientId } ) => {
		const { getBlockOrder, getBlockCount, getBlocksByClientId } = select(
			'core/block-editor'
		);
		const { __experimentalGetPreviewDeviceType = null } = select(
			'core/edit-post'
		);

		return {
			columns: getBlockCount( clientId ),
			columnAttributes: getBlockOrder( clientId ).map(
				( innerBlockClientId ) =>
					getBlocksByClientId( innerBlockClientId )[ 0 ].attributes
			),
			previewDeviceType: __experimentalGetPreviewDeviceType(),
		};
	} ),
] )( Edit );
