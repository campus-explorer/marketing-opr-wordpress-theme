/**
 * BLOCK: Icon List - Child - Deprecated Block
 */

import classnames from "classnames"
import renderSVG from "../../../dist/blocks/uagb-controls/renderIcon"
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
                block_id,
                link,
                target,
                disableLink,
                hideLabel
            } = attributes

            let target_val = ( target ) ? "_blank" : "_self"
            let link_url = ( !disableLink ) ? link : "/"

            return (
                <div
                    className={ classnames(
                        `uagb-icon-list-repeater`,
                        "uagb-icon-list__wrapper",
                        className,
                        `uagb-block-${ block_id }`
                    ) }
                >
                    { ! disableLink &&
                        <a target={ target_val } rel="noopener noreferrer" href={ link_url }></a>
                    }
                    <div className="uagb-icon-list__content-wrap">
                        { ! hideLabel && "" != label &&
                            <div className="uagb-icon-list__label-wrap">
                                <RichText.Content
                                    tagName="span"
                                    value={ label }
                                    className='uagb-icon-list__label' />
                            </div>
                        }
                    </div>
                </div>
            )
		},
	}
]

export default deprecated;