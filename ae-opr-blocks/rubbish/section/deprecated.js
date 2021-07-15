/**
 * BLOCK: Price List - Deprecated Block
 */

// Import block dependencies and components.
import classnames from "classnames"
import attributes from "./attributes"

const {
	InnerBlocks,
} = wp.blockEditor

const deprecated = [
	{
		attributes,			
		save: function( props ) {

			const { attributes, className } = props

			const {
				block_id,
				tag,
				backgroundType,
				backgroundVideo,
				contentWidth,
				align
			} = props.attributes

			let block_controls_class = ""

			if ( "full_width" == contentWidth ) {

				if ( align == "wide" || align == "full" ) {
					block_controls_class = "align" + align
				}
			}

			const CustomTag = `${tag}`

			return (
				<CustomTag
					className={ classnames(
						className,
						"aeopr-section__wrap",
						`aeopr-section__background-${backgroundType}`,
						block_controls_class
					) }
					id={ `aeopr-section-${block_id}` }
				>
					<div className="aeopr-section__overlay"></div>
					{ "video" == backgroundType &&
						<div className="aeopr-section__video-wrap">
							{  backgroundVideo &&
							<video src={ backgroundVideo.url } autoPlay loop muted></video>
							}

						</div>
					}
					<div className="aeopr-section__inner-wrap">
						<InnerBlocks.Content />
					</div>
				</CustomTag>
			)
		},
	},
	{
		attributes,			
		save: function( props ) {

			const { attributes, className } = props

			const {
				block_id,
				tag,
				backgroundType,
				backgroundVideo,
				contentWidth,
				align
			} = props.attributes

			let block_controls_class = ""

			if ( "full_width" == contentWidth ) {

				if ( align == "wide" || align == "full" ) {
					block_controls_class = "align" + align
				}
			}

			const CustomTag = `${tag}`

			return (
				<CustomTag
					className={ classnames(
						className,
						"aeopr-section__wrap",
						`aeopr-section__background-${backgroundType}`,
						block_controls_class
					) }
					id={ `aeopr-section-${block_id}` }
				>
					<div className="aeopr-section__overlay"></div>
					{ "video" == backgroundType &&
						<div className="aeopr-section__video-wrap">
							{  backgroundVideo &&
							<video autoplay loop muted playsinline>
								<source src={ backgroundVideo.url } type='video/mp4' />
							</video>
							}

						</div>
					}
					<div className="aeopr-section__inner-wrap">
						<InnerBlocks.Content />
					</div>
				</CustomTag>
			)
		},
	}
]

export default deprecated;