/**
 * BLOCK: Columns - Deprecated Block
 */

// Import block dependencies and components.
import classnames from "classnames"
import renderSVG from "../../../dist/blocks/controls/renderIcon"

// Import link.
import attributes from "./attributes"

const { __ } = wp.i18n

const {
	RichText
} = wp.blockEditor

const deprecated = [
	{
		attributes,
		save: props => {

			const { attributes, className } = props

			const {
				block_id,
				links,
				link_count,
				link_layout,
				hideLabel,
				disableLink
			} = props.attributes

			const labelClass = ( hideLabel ) ? "aeopr-visual-links__no-label" : ""

			return (
				<div className={ classnames(
					className,
					"aeopr-visual-links__outer-wrap",
					`aeopr-visual-links__layout-${link_layout}`,
					labelClass
				) }
				id={ `aeopr-visual-links-${ block_id}` }>
					<div className="aeopr-visual-links__wrap">
						{
							links.map( ( link, index ) => {

								if ( link_count <= index ) {
									return
								}

								let url = ""
								let image_link_html = ""

								if ( link.image_link == "link" ) {
									if ( link.link ) {
										image_link_html = <span className={ classnames( link.link , "aeopr-visual-links__source-link" ) }></span>
									}
								} else {
									if ( link.image ) {
										image_link_html = <img className="aeopr-visual-links__source-image" src={link.image.url} />
									}
								}

								let target = ( link.target ) ? "_blank" : "_self"
								let link_url = ( !disableLink ) ? link.link : "javascript:void(0);"

								return (
									<a
										className={ classnames(
											"aeopr-visual-links__wrapper"
										) }
										key={ index }
										target={ target }
										rel="noopener noreferrer"
										href={ link_url }
									>
										<div className="aeopr-visual-links__content-wrap">
											<span className="aeopr-visual-links__source-wrap">{image_link_html}</span>
											{ ! hideLabel && "" != links[ index ].label &&
												<div className="aeopr-visual-links__label-wrap">
													<RichText.Content
														tagName="span"
														value={ links[ index ].label }
														className='aeopr-visual-links__label' />
												</div>
											}
										</div>
									</a>
								)
							})
						}
					</div>
				</div>
			)
		},
	},
	{
		attributes,
		save: props => {

			const { attributes, className } = props

			const {
				block_id,
				links,
				link_count,
				link_layout,
				hideLabel,
				disableLink
			} = props.attributes

			const labelClass = ( hideLabel ) ? "aeopr-visual-links__no-label" : ""

			return (
				<div className={ classnames(
					className,
					"aeopr-visual-links__outer-wrap",
					`aeopr-visual-links__layout-${link_layout}`,
					labelClass
				) }
				id={ `aeopr-visual-links-${ block_id}` }>
					<div className="aeopr-visual-links__wrap">
						{
							links.map( ( link, index ) => {

								if ( link_count <= index ) {
									return
								}

								let url = ""
								let image_link_html = ""

								if ( link.image_link == "link" ) {
									if ( link.link ) {
										image_link_html = <span className="aeopr-visual-links__source-link">{ renderSVG(link.link) }</span>
									}
								} else {
									if ( link.image ) {
										image_link_html = <img className="aeopr-visual-links__source-image" src={link.image.url} />
									}
								}

								let target = ( link.target ) ? "_blank" : "_self"
								let link_url = ( !disableLink ) ? link.link : "javascript:void(0);"

								return (
									<a
										className={ classnames(
											"aeopr-visual-links__wrapper"
										) }
										key={ index }
										target={ target }
										rel="noopener noreferrer"
										href={ link_url }
									>
										<div className="aeopr-visual-links__content-wrap">
											<span className="aeopr-visual-links__source-wrap">{image_link_html}</span>
											{ ! hideLabel && "" != links[ index ].label &&
												<div className="aeopr-visual-links__label-wrap">
													<RichText.Content
														tagName="span"
														value={ links[ index ].label }
														className='aeopr-visual-links__label' />
												</div>
											}
										</div>
									</a>
								)
							})
						}
					</div>
				</div>
			)
		},
	},
	{
		attributes,
		save: props => {
			const { attributes, className } = props

			const {
				block_id,
				links,
				link_count,
				link_layout,
				hideLabel,
				linkPosition
			} = props.attributes

			const labelClass = ( hideLabel ) ? "aeopr-visual-links__no-label" : ""

			return (
				<div className={ classnames(
					className,
					"aeopr-visual-links__outer-wrap",
					`aeopr-visual-links__layout-${link_layout}`,
					( linkPosition == "top" ? "aeopr-visual-links__link-at-top" : "" ),
					labelClass
				) }
				id={ `aeopr-visual-links-${ block_id}` }>
					<div className="aeopr-visual-links__wrap">
						{
							links.map( ( link, index ) => {

								if ( link_count <= index ) {
									return
								}

								let url = ""
								let image_link_html = ""

								if ( link.image_link == "link" ) {
									if ( link.link ) {
										image_link_html = <span className="aeopr-visual-links__source-link">{ renderSVG(link.link) }</span>
									}
								} else {
									if ( link.image ) {
										image_link_html = <img className="aeopr-visual-links__source-image" src={link.image.url} />
									}
								}

								let target = ( link.target ) ? "_blank" : "_self"
								let link_url = ( !link.disableLink ) ? link.link : "javascript:void(0);"

								return (
									<a
										className={ classnames(
											"aeopr-visual-links__wrapper"
										) }
										key={ index }
										target={ target }
										rel="noopener noreferrer"
										href={ link_url }
									>
										<div className="aeopr-visual-links__content-wrap">
											<span className="aeopr-visual-links__source-wrap">{image_link_html}</span>
											{ ! hideLabel && "" != links[ index ].label &&
												<div className="aeopr-visual-links__label-wrap">
													<RichText.Content
														tagName="span"
														value={ links[ index ].label }
														className='aeopr-visual-links__label' />
												</div>
											}
										</div>
									</a>
								)
							})
						}
					</div>
				</div>
			)
		}
	},
	{
		attributes,
		save: props => {
			const { attributes, className } = props

			const {
				block_id,
				links,
				link_count,
				link_layout,
				hideLabel,
				linkPosition
			} = props.attributes

			const labelClass = ( hideLabel ) ? "aeopr-visual-links__no-label" : ""

			return (
				<div className={ classnames(
					className,
					"aeopr-visual-links__outer-wrap",
					`aeopr-visual-links__layout-${link_layout}`,
					( linkPosition == "top" ? "aeopr-visual-links__link-at-top" : "" ),
					labelClass
				) }
				id={ `aeopr-visual-links-${ block_id}` }>
					<div className="aeopr-visual-links__wrap">
						{
							links.map( ( link, index ) => {

								if ( link_count <= index ) {
									return
								}

								let url = ""
								let image_link_html = ""

								if ( link.image_link == "link" ) {
									if ( link.link ) {
										image_link_html = <span className="aeopr-visual-links__source-link">{ renderSVG(link.link) }</span>
									}
								} else {
									if ( link.image ) {
										image_link_html = <img className="aeopr-visual-links__source-image" src={link.image.url} />
									}
								}

								let target = ( link.target ) ? "_blank" : "_self"
								let link_url = ( !link.disableLink ) ? link.link : "/"

								return (
									<a
										className={ classnames(
											"aeopr-visual-links__wrapper"
										) }
										key={ index }
										target={ target }
										rel="noopener noreferrer"
										href={ link_url }
									>
										<div className="aeopr-visual-links__content-wrap">
											<span className="aeopr-visual-links__source-wrap">{image_link_html}</span>
											{ ! hideLabel && "" != links[ index ].label &&
												<div className="aeopr-visual-links__label-wrap">
													<RichText.Content
														tagName="span"
														value={ links[ index ].label }
														className='aeopr-visual-links__label' />
												</div>
											}
										</div>
									</a>
								)
							})
						}
					</div>
				</div>
			)
		}
	},
	{
		attributes,
		save: props => {
			const { attributes, className } = props

			const {
				block_id,
				links,
				link_count,
				link_layout,
				hideLabel,
				linkPosition
			} = props.attributes

			const labelClass = ( hideLabel ) ? "aeopr-visual-links__no-label" : ""

			return (
				<div className={ classnames(
					className,
					"aeopr-visual-links__outer-wrap",
					`aeopr-visual-links__layout-${link_layout}`,
					( linkPosition == "top" ? "aeopr-visual-links__link-at-top" : "" ),
					labelClass,
					`uagb-block-${ block_id}`
				) }>
					<div className="aeopr-visual-links__wrap">
						{
							links.map( ( link, index ) => {

								if ( link_count <= index ) {
									return
								}

								let url = ""
								let image_link_html = ""

								if ( link.image_link == "link" ) {
									if ( link.link ) {
										image_link_html = <span className="aeopr-visual-links__source-link">{ renderSVG(link.link) }</span>
									}
								} else {
									if ( link.image ) {
										image_link_html = <img className="aeopr-visual-links__source-image" src={link.image.url} />
									}
								}

								let target = ( link.target ) ? "_blank" : "_self"
								let link_url = ( !link.disableLink ) ? link.link : "/"

								if ( link.disableLink ) {
									return (
										<div
											className={ classnames(
												"aeopr-visual-links__wrapper"
											) }
											key={ index }
										>
											<div className="aeopr-visual-links__content-wrap">
												<span className="aeopr-visual-links__source-wrap">{image_link_html}</span>
												{ ! hideLabel && "" != links[ index ].label &&
													<div className="aeopr-visual-links__label-wrap">
														<RichText.Content
															tagName="span"
															value={ links[ index ].label }
															className='aeopr-visual-links__label' />
													</div>
												}
											</div>
										</div>
									)
								} else {

									return (
										<a
											className={ classnames(
												`aeopr-visual-links-repeater-${index}`,
												"aeopr-visual-links__wrapper"
											) }
											key={ index }
											target={ target }
											rel="noopener noreferrer"
											href={ link_url }
										>
											<div className="aeopr-visual-links__content-wrap">
												<span className="aeopr-visual-links__source-wrap">{image_link_html}</span>
												{ ! hideLabel && "" != links[ index ].label &&
													<div className="aeopr-visual-links__label-wrap">
														<RichText.Content
															tagName="span"
															value={ links[ index ].label }
															className='aeopr-visual-links__label' />
													</div>
												}
											</div>
										</a>
									)
								}

							})
						}
					</div>
				</div>
			)
		}
	}
]

export default deprecated;