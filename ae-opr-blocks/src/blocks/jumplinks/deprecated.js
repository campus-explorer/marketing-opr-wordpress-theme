/**
 * BLOCK: Table of Contents - Deprecated Block
 */

import classnames from "classnames"
import TableOfContents from './components';
import attributes from "./attributes"
import renderSVG from "../../../dist/blocks/controls/renderIcon"

const {
	RichText
} = wp.blockEditor

const deprecated = [
	{
		attributes,			
		save: function( props ) {

			const { className } = props

			const {
				align,
				block_id,
				tColumns,
				heading,
				headerLinks,
				mappingHeaders,
				scrollToTop,
			} = props.attributes

			return (

				<div className={ classnames(
					className,
					'aeopr-toc__block',
					`aeopr-toc__align-${align}`,
					`aeopr-toc__columns-${tColumns}`
				) }
				id={ `aeopr-toc-${ block_id }` }>
						<TableOfContents
							align={align}
							numcolumns={tColumns}
							scrollToTop={scrollToTop}
							mappingHeaders={mappingHeaders}
							headers={headerLinks && JSON.parse(headerLinks)}
							blockProp={props}
						/>
				</div>
			)
		},
	},
	{
		attributes,			
		save: function( props ) {

			const { className } = props

			const {
				align,
				block_id,
				tColumns,
				heading,
				headerLinks,
				mappingHeaders,
				scrollToTop,
				smoothScroll,
				makeCollapsible,
				icon,
				initialCollapse,
				smoothScrollOffset,
				smoothScrollDelay,
			} = props.attributes

			let icon_html = ''

			if ( makeCollapsible && icon ) {
				icon_html = (
					<span className="aeopr-toc__collapsible-wrap">{renderSVG(icon)}</span>
				)	
			}

			return (

				<div className={ classnames(
					className,
					'aeopr-toc__block',
					`aeopr-toc__align-${align}`,
					`aeopr-toc__columns-${tColumns}`,
					( initialCollapse ) ? `aeopr-toc__collapse` : ''
				) }
				data-scroll={smoothScroll}
				data-offset={smoothScrollOffset}
				data-delay={smoothScrollDelay}
				id={ `aeopr-toc-${ block_id }` }>

						<TableOfContents
							align={align}
							numcolumns={tColumns}
							scrollToTop={scrollToTop}
							mappingHeaders={mappingHeaders}
							headers={headerLinks && JSON.parse(headerLinks)}
							blockProp={props}
						/>
				</div>
			)
		},
	}
]

export default deprecated;