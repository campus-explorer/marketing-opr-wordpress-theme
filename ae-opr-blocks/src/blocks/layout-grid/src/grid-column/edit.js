/**
 * External dependencies
 */

import classnames from 'classnames';

/**
 * WordPress dependencies
 */

import {
	InnerBlocks,
	InspectorControls,
	PanelColorSettings,
	withColors,
	BlockControls,
	BlockVerticalAlignmentToolbar,
	BlockAlignmentToolbar,
} from '@wordpress/block-editor';
import { Component } from '@wordpress/element';
import { compose } from '@wordpress/compose';
import { withSelect, withDispatch } from '@wordpress/data';
import { PanelBody, SelectControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { getPaddingValues } from '../constants';

class Edit extends Component {
	constructor( props ) {
		super( props );

		this.state = { direction: null };
	}

	onLeftIn = () => {
		this.setState( { direction: 'left' } );
		document.addEventListener( 'mouseup', this.onLeftOut );
	}

	onLeftOut = () => {
		this.setState( { direction: null } );
		document.removeEventListener( 'mouseup', this.onLeftOut );
	}

	onRightIn = () => {
		this.setState( { direction: 'right' } );
		document.addEventListener( 'mouseup', this.onRightOut );
	}

	onRightOut = () => {
		this.setState( { direction: null } );
		document.removeEventListener( 'mouseup', this.onRightOut );
	}

	render() {
		const {
			className,
			hasChildBlocks,
			backgroundColor,
			setBackgroundColor,
			attributes,
			setAttributes,
			updateAlignment,
			updateTextAlignment
		} = this.props;
		const { padding, verticalAlignment,align } = attributes;
		const { direction } = this.state;
		const classes = classnames( className, backgroundColor.class, {
			[ 'wp-block-aeopr-layout-grid__padding-' + padding ]: true,
			'has-background': backgroundColor.color,
			'components-resizable-box__container': true,
			[ backgroundColor.class ]: backgroundColor.class,
			'wp-blocks-aeopr-layout-grid__showleft': direction === 'right',
			'wp-blocks-aeopr-layout-grid__showright': direction === 'left',
			[ `is-vertically-aligned-${ verticalAlignment }` ]: verticalAlignment,
		} );
		const style = {
			backgroundColor: backgroundColor.color,
		};

		// Note we wrap the InnerBlock with 'fake' resize handles. These are here so they always match the current column dimensions. Functionally
		// they do nothing other than disappear when the mouse button is pressed. The real resizing happens in the ResizeGrid component.
		// We identify the left and right handles by data-resize-left and data-resize-right
		return (
			<div className={ classes } style={ style }>
				<span className="wp-blocks-aeopr-layout-grid__resize-handles">
					<div
						className="components-resizable-box__handle components-resizable-box__side-handle components-resizable-box__handle-right"
						onMouseDown={ this.onRightIn }
						data-resize-right
					>
					</div>
					<div
						className="components-resizable-box__handle components-resizable-box__side-handle components-resizable-box__handle-left"
						onMouseDown={ this.onLeftIn }
						data-resize-left
					>
					</div>
				</span>

				<InnerBlocks
					templateLock={ false }
					renderAppender={ hasChildBlocks
						? undefined
						: () => <InnerBlocks.ButtonBlockAppender />
					}
				/>

				<InspectorControls>
					<PanelColorSettings
						title={ __( 'Column Color', 'layout-grid' ) }
						initialOpen
						colorSettings={ [
							{
								value: backgroundColor.color,
								onChange: setBackgroundColor,
								label: __( 'Background', 'layout-grid' ),
							},
						] }
					/>

					<PanelBody title={ __( 'Column Padding', 'layout-grid' ) }>
						<p>{ __( 'Choose padding for this column:', 'layout-grid' ) }</p>
						<SelectControl
							value={ padding }
							onChange={ newValue => setAttributes( { padding: newValue } ) }
							options={ getPaddingValues() }
						/>
					</PanelBody>
				</InspectorControls>

				<BlockControls>
					<BlockVerticalAlignmentToolbar
						onChange={ updateAlignment }
						value={ verticalAlignment }
					/>

				</BlockControls>
			</div>
		);
	}
}

export default compose(
	withColors( 'backgroundColor' ),
	withSelect( ( select, ownProps ) => {
		const { clientId } = ownProps;
		const { getBlockOrder } = select( 'core/block-editor' );

		return {
			hasChildBlocks: getBlockOrder( clientId ).length > 0,
		};
	} ),
	withDispatch( ( dispatch, ownProps, registry ) => {
		return {
			updateAlignment( verticalAlignment ) {
				const { clientId, setAttributes } = ownProps;
				const { updateBlockAttributes } = dispatch(
					'core/block-editor'
				);
				const { getBlockRootClientId } = registry.select(
					'core/block-editor'
				);

				// Update own alignment.
				setAttributes( { verticalAlignment } );

				// Reset Parent Columns Block
				const rootClientId = getBlockRootClientId( clientId );
				updateBlockAttributes( rootClientId, {
					verticalAlignment: null,
				} );
			},
			updateTextAlignment( alignment ) {
				const { clientId, setAttributes } = ownProps;
				const { updateBlockAttributes } = dispatch(
					'core/block-editor'
				);
				const { getBlockRootClientId } = registry.select(
					'core/block-editor'
				);

				// Update own alignment.
				setAttributes( { alignment } );

				// Reset Parent Columns Block
				const rootClientId = getBlockRootClientId( clientId );
				updateBlockAttributes( rootClientId, {
					alignment: null,
				} );
			},
		};
	} )
)( Edit );
