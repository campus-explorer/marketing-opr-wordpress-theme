/**
 * BLOCK: Icon List - Child - Deprecated Block
 */

import classnames from "classnames"
import renderSVG from "../../../dist/blocks/controls/renderIcon"
import attributes from "./attributes"

const {
	RichText
} = wp.blockEditor

const deprecated = [
	{
		attributes,			
		save: function( props ) {

			const { attributes, className } = props

            const {
                label,
                image_icon,
                icon,
                image,
                block_id,
                link,
                target,
                disableLink,
                hideLabel
            } = attributes

            let image_icon_html = ""

            if ( image_icon == "icon" ) {
                if ( icon ) {
                    image_icon_html = <span className="aecpc-icon-list__source-icon">{ renderSVG(icon) }</span>
                }
            } else {
                if ( image && image.url ) {
                    image_icon_html = <img className="aecpc-icon-list__source-image" src={image.url} />
                }
            }

            let target_val = ( target ) ? "_blank" : "_self"
            let link_url = ( !disableLink ) ? link : "/"

            return (
                <div
                    className={ classnames(
                        `aecpc-icon-list-repeater`,
                        "aecpc-icon-list__wrapper",
                        className,
                        `aecpc-block-${ block_id }`
                    ) }
                >
                    { ! disableLink &&
                        <a target={ target_val } rel="noopener noreferrer" href={ link_url }></a>
                    }
                    <div className="aecpc-icon-list__content-wrap">
                        <span className="aecpc-icon-list__source-wrap">{image_icon_html}</span>
                        { ! hideLabel && "" != label &&
                            <div className="aecpc-icon-list__label-wrap">
                                <RichText.Content
                                    tagName="span"
                                    value={ label }
                                    className='aecpc-icon-list__label' />
                            </div>
                        }
                    </div>
                </div>
            )
		},
	}
]

export default deprecated;