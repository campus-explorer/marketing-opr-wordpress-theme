/**
 * BLOCK: Column - Deprecated Block
 */

// Import block dependencies and components.
import classnames from "classnames"

// Import icon.
import attributes from "./attributes"

const {
	InnerBlocks
} = wp.blockEditor

const { __ } = wp.i18n

const deprecated = [
	{
		attributes,
		save: function( { attributes, className } ) {
			const { block_id, backgroundType, align, alignMobile, alignTablet  } = attributes

			let align_class = ( "center" == align ) ? "" : `uagb-column__align-${align}`
			let align_class_mobile = ( "" == alignMobile ) ? "" : `uagb-column__align-mobile-${alignMobile}`
			let align_class_tablet = ( "" == alignTablet ) ? "" : `uagb-column__align-tablet-${alignTablet}`

			return (
				<div
					className={ classnames(
						className,
						"uagb-column__wrap",
						`uagb-column__background-${backgroundType}`,
						align_class,
						align_class_mobile,
						align_class_tablet,
					) }
					id={ `uagb-column-${block_id}` }
				>
					<div className="uagb-column__overlay"></div>
					<div className="uagb-column__inner-wrap">
						<InnerBlocks.Content />
					</div>
				</div>
			)
		},
	},
]

export default deprecated;