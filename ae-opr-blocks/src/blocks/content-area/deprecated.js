/**
 * BLOCK: Columns - Deprecated Block
 */

// Import block dependencies and components.
import classnames from "classnames"
import renderSVG from "../../../dist/blocks/controls/renderIcon"

// Import icon.
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
				icons,
				icon_count,
				icon_layout,
				hideLabel,
				disableLink
			} = props.attributes

			const labelClass = ( hideLabel ) ? "uagb-icon-block__no-label" : ""

			return (
				<div className={ classnames(
					className,
					"uagb-icon-block__outer-wrap",
					`uagb-icon-block__layout-${icon_layout}`,
					labelClass
				) }
				id={ `uagb-icon-block-${ block_id}` }>
					<div className="uagb-icon-block__wrap">
						{
							icons.map( ( icon, index ) => {

								if ( icon_count <= index ) {
									return
								}

								let url = ""
								let image_icon_html = ""

								if ( icon.image_icon == "icon" ) {
									if ( icon.icon ) {
										image_icon_html = <span className={ classnames( icon.icon , "uagb-icon-block__source-icon" ) }></span>
									}
								} else {
									if ( icon.image ) {
										image_icon_html = <img className="uagb-icon-block__source-image" src={icon.image.url} />
									}
								}

								let target = ( icon.target ) ? "_blank" : "_self"
								let link_url = ( !disableLink ) ? icon.link : "javascript:void(0);"

								return (
									<a
										className={ classnames(
											"uagb-icon-block__wrapper"
										) }
										key={ index }
										target={ target }
										rel="noopener noreferrer"
										href={ link_url }
									>
										<div className="uagb-icon-block__content-wrap">
											<span className="uagb-icon-block__source-wrap">{image_icon_html}</span>
											{ ! hideLabel && "" != icons[ index ].label &&
												<div className="uagb-icon-block__label-wrap">
													<RichText.Content
														tagName="span"
														value={ icons[ index ].label }
														className='uagb-icon-block__label' />
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
				icons,
				icon_count,
				icon_layout,
				hideLabel,
				disableLink
			} = props.attributes

			const labelClass = ( hideLabel ) ? "uagb-icon-block__no-label" : ""

			return (
				<div className={ classnames(
					className,
					"uagb-icon-block__outer-wrap",
					`uagb-icon-block__layout-${icon_layout}`,
					labelClass
				) }
				id={ `uagb-icon-block-${ block_id}` }>
					<div className="uagb-icon-block__wrap">
						{
							icons.map( ( icon, index ) => {

								if ( icon_count <= index ) {
									return
								}

								let url = ""
								let image_icon_html = ""

								if ( icon.image_icon == "icon" ) {
									if ( icon.icon ) {
										image_icon_html = <span className="uagb-icon-block__source-icon">{ renderSVG(icon.icon) }</span>
									}
								} else {
									if ( icon.image ) {
										image_icon_html = <img className="uagb-icon-block__source-image" src={icon.image.url} />
									}
								}

								let target = ( icon.target ) ? "_blank" : "_self"
								let link_url = ( !disableLink ) ? icon.link : "javascript:void(0);"

								return (
									<a
										className={ classnames(
											"uagb-icon-block__wrapper"
										) }
										key={ index }
										target={ target }
										rel="noopener noreferrer"
										href={ link_url }
									>
										<div className="uagb-icon-block__content-wrap">
											<span className="uagb-icon-block__source-wrap">{image_icon_html}</span>
											{ ! hideLabel && "" != icons[ index ].label &&
												<div className="uagb-icon-block__label-wrap">
													<RichText.Content
														tagName="span"
														value={ icons[ index ].label }
														className='uagb-icon-block__label' />
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
				icons,
				icon_count,
				icon_layout,
				hideLabel,
				iconPosition
			} = props.attributes

			const labelClass = ( hideLabel ) ? "uagb-icon-block__no-label" : ""

			return (
				<div className={ classnames(
					className,
					"uagb-icon-block__outer-wrap",
					`uagb-icon-block__layout-${icon_layout}`,
					( iconPosition == "top" ? "uagb-icon-block__icon-at-top" : "" ),
					labelClass
				) }
				id={ `uagb-icon-block-${ block_id}` }>
					<div className="uagb-icon-block__wrap">
						{
							icons.map( ( icon, index ) => {

								if ( icon_count <= index ) {
									return
								}

								let url = ""
								let image_icon_html = ""

								if ( icon.image_icon == "icon" ) {
									if ( icon.icon ) {
										image_icon_html = <span className="uagb-icon-block__source-icon">{ renderSVG(icon.icon) }</span>
									}
								} else {
									if ( icon.image ) {
										image_icon_html = <img className="uagb-icon-block__source-image" src={icon.image.url} />
									}
								}

								let target = ( icon.target ) ? "_blank" : "_self"
								let link_url = ( !icon.disableLink ) ? icon.link : "javascript:void(0);"

								return (
									<a
										className={ classnames(
											"uagb-icon-block__wrapper"
										) }
										key={ index }
										target={ target }
										rel="noopener noreferrer"
										href={ link_url }
									>
										<div className="uagb-icon-block__content-wrap">
											<span className="uagb-icon-block__source-wrap">{image_icon_html}</span>
											{ ! hideLabel && "" != icons[ index ].label &&
												<div className="uagb-icon-block__label-wrap">
													<RichText.Content
														tagName="span"
														value={ icons[ index ].label }
														className='uagb-icon-block__label' />
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
				icons,
				icon_count,
				icon_layout,
				hideLabel,
				iconPosition
			} = props.attributes

			const labelClass = ( hideLabel ) ? "uagb-icon-block__no-label" : ""

			return (
				<div className={ classnames(
					className,
					"uagb-icon-block__outer-wrap",
					`uagb-icon-block__layout-${icon_layout}`,
					( iconPosition == "top" ? "uagb-icon-block__icon-at-top" : "" ),
					labelClass
				) }
				id={ `uagb-icon-block-${ block_id}` }>
					<div className="uagb-icon-block__wrap">
						{
							icons.map( ( icon, index ) => {

								if ( icon_count <= index ) {
									return
								}

								let url = ""
								let image_icon_html = ""

								if ( icon.image_icon == "icon" ) {
									if ( icon.icon ) {
										image_icon_html = <span className="uagb-icon-block__source-icon">{ renderSVG(icon.icon) }</span>
									}
								} else {
									if ( icon.image ) {
										image_icon_html = <img className="uagb-icon-block__source-image" src={icon.image.url} />
									}
								}

								let target = ( icon.target ) ? "_blank" : "_self"
								let link_url = ( !icon.disableLink ) ? icon.link : "/"

								return (
									<a
										className={ classnames(
											"uagb-icon-block__wrapper"
										) }
										key={ index }
										target={ target }
										rel="noopener noreferrer"
										href={ link_url }
									>
										<div className="uagb-icon-block__content-wrap">
											<span className="uagb-icon-block__source-wrap">{image_icon_html}</span>
											{ ! hideLabel && "" != icons[ index ].label &&
												<div className="uagb-icon-block__label-wrap">
													<RichText.Content
														tagName="span"
														value={ icons[ index ].label }
														className='uagb-icon-block__label' />
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
				icons,
				icon_count,
				icon_layout,
				hideLabel,
				iconPosition
			} = props.attributes

			const labelClass = ( hideLabel ) ? "uagb-icon-block__no-label" : ""

			return (
				<div className={ classnames(
					className,
					"uagb-icon-block__outer-wrap",
					`uagb-icon-block__layout-${icon_layout}`,
					( iconPosition == "top" ? "uagb-icon-block__icon-at-top" : "" ),
					labelClass,
					`uagb-block-${ block_id}`
				) }>
					<div className="uagb-icon-block__wrap">
						{
							icons.map( ( icon, index ) => {

								if ( icon_count <= index ) {
									return
								}

								let url = ""
								let image_icon_html = ""

								if ( icon.image_icon == "icon" ) {
									if ( icon.icon ) {
										image_icon_html = <span className="uagb-icon-block__source-icon">{ renderSVG(icon.icon) }</span>
									}
								} else {
									if ( icon.image ) {
										image_icon_html = <img className="uagb-icon-block__source-image" src={icon.image.url} />
									}
								}

								let target = ( icon.target ) ? "_blank" : "_self"
								let link_url = ( !icon.disableLink ) ? icon.link : "/"

								if ( icon.disableLink ) {
									return (
										<div
											className={ classnames(
												"uagb-icon-block__wrapper"
											) }
											key={ index }
										>
											<div className="uagb-icon-block__content-wrap">
												<span className="uagb-icon-block__source-wrap">{image_icon_html}</span>
												{ ! hideLabel && "" != icons[ index ].label &&
													<div className="uagb-icon-block__label-wrap">
														<RichText.Content
															tagName="span"
															value={ icons[ index ].label }
															className='uagb-icon-block__label' />
													</div>
												}
											</div>
										</div>
									)
								} else {

									return (
										<a
											className={ classnames(
												`uagb-icon-block-repeater-${index}`,
												"uagb-icon-block__wrapper"
											) }
											key={ index }
											target={ target }
											rel="noopener noreferrer"
											href={ link_url }
										>
											<div className="uagb-icon-block__content-wrap">
												<span className="uagb-icon-block__source-wrap">{image_icon_html}</span>
												{ ! hideLabel && "" != icons[ index ].label &&
													<div className="uagb-icon-block__label-wrap">
														<RichText.Content
															tagName="span"
															value={ icons[ index ].label }
															className='uagb-icon-block__label' />
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