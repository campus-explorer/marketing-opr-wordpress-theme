
/**
 * BLOCK: Table of Contents
 */

import classnames from "classnames"
import styling from "./styling"
import map from "lodash/map"
import AEOPR_Block_Icons from "Controls/block-icons"


import TOC from './table-of-contents';

const { select } = wp.data;
const striptags = require('striptags');
const { __ } = wp.i18n
const { withSelect, withDispatch } = wp.data
const { compose } = wp.compose

const {
	Component,
	Fragment,
} = wp.element

const {
	BlockControls,
	BlockAlignmentToolbar,
	InspectorControls,
	RichText,
	ColorPalette
} = wp.blockEditor

const {
	Button,
	ButtonGroup,
	PanelBody,
	PanelRow,
	SelectControl,
	RangeControl,
	ToggleControl,
	Dashicon,
	TabPanel
} = wp.components


class AEOPRTableOfContentsEdit extends Component {

	constructor() {
		super( ...arguments )
	}

	componentDidUpdate(prevProps, prevState) {
		if (
			JSON.stringify( this.props.headers ) !==
			JSON.stringify( prevProps.headers )
		) {
			this.props.setAttributes({
				headerLinks: JSON.stringify(this.props.headers)
			});
		}
	}

	componentDidMount() {

		// Assigning block_id in the attribute.
		this.props.setAttributes( { block_id: this.props.clientId } )

		this.props.setAttributes( { classMigrate: true } )

		this.props.setAttributes( { headerLinks: JSON.stringify( this.props.headers ) } )

		// Pushing Scroll To Top div
		var $scrollTop = document.createElement( "div" )
		$scrollTop.setAttribute( "class", "aeopr-toc__scroll-top dashicons dashicons-arrow-up-alt2" )
		document.body.insertBefore( $scrollTop, document.body.lastChild )

		// Pushing Style tag for this block css.
		const $style = document.createElement( "style" )
		$style.setAttribute( "id", "aeopr-style-toc-" + this.props.clientId )
		document.head.appendChild( $style )
	}

	render() {

		const { attributes, setAttributes, isSelected, className, headers } = this.props

		const {
			align,
			heading,
			disableBullets,
			makeCollapsible,
			initialCollapse,
			icon,
			iconColor,
			bulletColor,
			iconSize,
			smoothScroll,
			smoothScrollOffset,
			smoothScrollDelay,
			scrollToTop,
			scrollToTopColor,
			scrollToTopBgColor,
			customWidth,
			widthDesktop,
			widthTablet,
			widthMobile,
			widthTypeMobile,
			widthTypeTablet,
			widthTypeDesktop,
			tColumnsDesktop,
			tColumnsTablet,
			tColumnsMobile,
			
			headerLinks,
			mappingHeaders,
		} = attributes


		// Push Styling to Head.
		var element = document.getElementById( "aeopr-style-toc-" + this.props.clientId )
		if( null != element && "undefined" != typeof element ) {
			element.innerHTML = styling( this.props )
		}

		var scrollElement = jQuery( ".aeopr-toc__scroll-top" )
		if( null != scrollElement && "undefined" != typeof scrollElement ) {

			if ( scrollToTop ) {
				scrollElement.addClass( "aeopr-toc__show-scroll" )
			} else {
				scrollElement.removeClass( "aeopr-toc__show-scroll" )
			}
		}

		return (
			<Fragment>
				
				<InspectorControls>
					<PanelBody title={ __( "Scroll" ) } initialOpen={ false }>
						<ToggleControl
							label={ __( "Smooth Scroll" ) }
							checked={ smoothScroll }
							help={ __( "This will be in Action only in Front End." ) }
							onChange={ ( value ) => setAttributes( { smoothScroll: ! smoothScroll } ) }
						/>
						{ smoothScroll &&
							<Fragment>
								<RangeControl
									label={ __( "Smooth Scroll Offset (px)" ) }
									value={ smoothScrollOffset }
									onChange={ ( value ) => setAttributes( { smoothScrollOffset: value } ) }
									min={ 0 }
									max={ 1000 }
								/>
								<RangeControl
									label={ __( "Scroll Animation Delay (ms)" ) }
									value={ smoothScrollDelay }
									onChange={ ( value ) => setAttributes( { smoothScrollDelay: value } ) }
									min={ 100 }
									max={ 5000 }
								/>
							</Fragment>
						}
						<hr className="aeopr-editor__separator"/>
						<ToggleControl
							label={ __( "Show Scroll To Top" ) }
							checked={ scrollToTop }
							help={ __( "This will add a Scroll to Top arrow at the bottom of page." ) }
							onChange={ ( value ) => setAttributes( { scrollToTop: ! scrollToTop } ) }
						/>
						{ scrollToTop &&
							<Fragment>
								<p className="aeopr-setting-label">{ __( "Icon Color" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={{ backgroundColor: scrollToTopColor }} ></span></span></p>
								<ColorPalette
									value={ scrollToTopColor }
									onChange={ ( colorValue ) => setAttributes( { scrollToTopColor: colorValue } ) }
									allowReset
								/>
								<p className="aeopr-setting-label">{ __( "Background Color" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={{ backgroundColor: scrollToTopBgColor }} ></span></span></p>
								<ColorPalette
									value={ scrollToTopBgColor }
									onChange={ ( colorValue ) => setAttributes( { scrollToTopBgColor: colorValue } ) }
									allowReset
								/>
							</Fragment>
						}
					</PanelBody>
					
					
				</InspectorControls>
				<div className={ classnames(
					className,
					'aeopr-toc__block',
					`aeopr-toc__align-${align}`,
					`aeopr-toc__columns-${tColumnsDesktop}`,
					( initialCollapse ) ? `aeopr-toc__collapse` : '',
					`aeopr-block-${ this.props.clientId }`
				) }
				>
					<TOC
						mappingHeaders={mappingHeaders}
						headers={headers}
					/>
				</div>
			</Fragment>
		)
	}
}
///Future: allow anchors to be set on any element. Allows anchor on Reusable Blocks
export default compose(
	withSelect( ( select, ownProps ) => {

		const getData = ( headerData, a ) => {
			headerData.map( ( header ) => {
				
				let innerBlock = header.innerBlocks;
				if( innerBlock.length > 0 ) {
					innerBlock.forEach(function(element) {
						if( element.innerBlocks.length > 0 ) {
							getData( element.innerBlocks, a );
						} else {
							if( element.name === 'core/heading' && element.attributes.className === 'anchor' ) {
								a.push( element );
							}


						}
					});
				} else {
					if( header.name === 'core/heading' && header.attributes.className === 'anchor') {
						a.push( header );
					}
				}

			});
			return a; 
		}
		
		
		///process title to link
		const parseTocSlug = ( slug ) => {

			// If not have the element then return false!
			if( ! slug ) {
				return slug;
			}
			
			var parsedSlug = slug.toString().toLowerCase()
				.replace(/&(amp;)/g, '')					 // Remove &
				.replace(/&(mdash;)/g, '')					 // Remove long dash
				.replace(/\u2013|\u2014/g, '')				 // Remove long dash
				.replace(/[&]nbsp[;]/gi, '-')                // Replace inseccable spaces
				.replace(/\s+/g, '-')                        // Replace spaces with -
				.replace(/[&\/\\#,^!+()$~%.'":*?<>{}@‘’”“]/g, '')  // Remove special chars
				.replace(/\-\-+/g, '-')                      // Replace multiple - with single -
				.replace(/^-+/, '')                          // Trim - from start of text
				.replace(/-+$/, '');                         // Trim - from end of text

			return decodeURI( encodeURIComponent( parsedSlug ) );
		}

		let a = [];
		let all_headers = getData( select( 'core/block-editor' ).getBlocks(), a );//get all headers

		let headers = [];
		
		

		
		
//loop headers to get the contents
		if( typeof all_headers != 'undefined' ) {
			all_headers.forEach((heading, key) => {

				let heading_attr = heading.attributes
				const contentLevel = heading_attr.level

				const contentName = 'content'

				const headingContentEmpty = typeof heading_attr[contentName] === 'undefined' || heading_attr[contentName] === '';

				if ( !headingContentEmpty ) {
					headers.push(
						{
							tag: contentLevel,
							text: striptags( heading_attr[contentName] ),
							link: parseTocSlug( striptags( heading_attr[contentName] ) ),
							content: heading_attr[contentName]
						}
					);
				}


				
				
				const contentAnchor = ( typeof heading.originalContent === 'undefined' || heading.originalContent === '' ) ? 'headingId' : 'anchor'


				const headingAnchorEmpty =
						typeof heading_attr[contentAnchor] === 'undefined' ||
						heading_attr[contentAnchor] === '';



				const headingDefaultAnchor =
					!headingAnchorEmpty &&
					heading_attr[contentAnchor].indexOf(key + '-') === 0;


				if (
					!headingContentEmpty &&
					(headingAnchorEmpty || headingDefaultAnchor)
				) {
					heading_attr[contentAnchor] =
						striptags( heading_attr[contentName] )
							.toString()
							.toLowerCase()
							.replace(/( |<.+?>|&nbsp;)/g, '-');
					heading_attr[contentAnchor] = heading_attr[contentAnchor].replace(
						/[^\w\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF\s-]/g,
						''
					);
				}



			});
		}

		if ( headers !== undefined ) {

			headers.forEach( function ( heading, index ) {
				heading.level = 0;

				for ( var i = index - 1; i >= 0; i-- ) {
					var currentOrderedItem = headers[i];

					if ( currentOrderedItem.tag <= heading.tag ) {
						heading.level = currentOrderedItem.level;

						if ( currentOrderedItem.tag < heading.tag ) {
							heading.level++;
						}
						break;
					}
				}
			});
		}

		return {
			headers: headers
		};
	} )
) ( AEOPRTableOfContentsEdit )
