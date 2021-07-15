/**
 * BLOCK: Table of Contents - Save Block
 */

import classnames from "classnames"
import AEOPR_Block_Icons from "../../../dist/blocks/controls/block-icons"
import TOC from './table-of-contents';

const { __ } = wp.i18n;

const {
	RichText
} = wp.blockEditor

export default function save( props ) {
	
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


	return (

		<div className={ classnames(
			className,
			'aeopr-toc__block',
			`aeopr-toc__align-${align}`,
			`aeopr-toc__columns-${tColumns}`,
			( initialCollapse ) ? `aeopr-toc__collapse` : '',
			`aeopr-block-${ block_id }`
		) }
		data-scroll={smoothScroll}
		data-offset={smoothScrollOffset}
		data-delay={smoothScrollDelay}
		>
			<TOC
				mappingHeaders={mappingHeaders}
				headers={headerLinks && JSON.parse(headerLinks)}
			/>
		</div>
	)
}
