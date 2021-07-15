/**
 * BLOCK: Testimonial - Deprecated Block
 */

import classnames from "classnames"
import attributes from "./attributes"
import renderSVG from "../../../dist/blocks/controls/renderIcon"
import AuthorName from "./components/AuthorName"
import Company from "./components/Company"
import Description from "./components/Description"
import PositionClasses from "./classes"
import TestimonialImage from "./components/TestimonialImage"

const {
	RichText
} = wp.blockEditor

const { Fragment } = wp.element


const deprecated = [
	{
		attributes,
		save: function( props ) {
			const {
				block_id,
				className,
				columns,
				autoplaySpeed,
				autoplay,
				infiniteLoop,
				pauseOnHover,
				transitionSpeed,
				tcolumns,
				arrowSize,
				mcolumns,
				test_block,
				imagePosition,
				arrowColor,
			} = props.attributes

			const sldier_data = []
			sldier_data.push(
				{
					"block_id" : block_id,
					"columns" : columns,
					"autoplaySpeed" : autoplaySpeed,
					"autoplay" : autoplay,
					"infiniteLoop" : infiniteLoop,
					"pauseOnHover" : pauseOnHover,
					"transitionSpeed" : transitionSpeed,
					"tcolumns" : tcolumns,
					"arrowSize" : arrowSize,
					"mcolumns" : mcolumns,
					"arrowColor":arrowColor,
				}
			)

			return (
				<Fragment>
					<div className={ classnames(
						className,
						"aeopr-testomonial__outer-wrap aeopr-tm__arrow-outside"
					) }
					id = { `aeopr-testimonial-${block_id}` }
					>

						<div
							className={ classnames(
								`aeopr-tm__columns-${ columns }`,
								"aeopr-tm__items"
							) }
						>
							{ test_block.map( ( test, index ) =>

								<div className = { classnames(
									"aeopr-testimonial__wrap",
									...PositionClasses( props.attributes ),
								) } key ={ "wrap-"+index } >
									<div className = "aeopr-tm__content" key ={ "tm_content-"+index }>
										<div className = "aeopr-tm__overlay"></div>
										{ (imagePosition == "top" || imagePosition == "left" ) && <TestimonialImage  attributes={props.attributes} index_value = {index} /> }

										<div className ="aeopr-tm__text-wrap">
											{  // Get description.
												<Fragment>
													<div className = "aeopr-testinomial-text-wrap" key={"text-wrap-"+index}>
														<Description attributes={props.attributes} setAttributes = "not_set" props = { props }  index_value = {index}/>
													</div>
												</Fragment>
											}
											<div className ="aeopr-tm__meta">
												<div className ="aeopr-tm__meta-inner">

													{ (imagePosition == "bottom" ) && <TestimonialImage  attributes={props.attributes}  index_value = {index} /> }

													{ //title_text
														<Fragment>
															<div className = "aeopr-testimonial-details" key={"tm_wraps-"+index}>
																<AuthorName attributes={props.attributes} setAttributes = "not_set"  props = { props } index_value = {index}/>
																<Company attributes={props.attributes} setAttributes = "not_set"  props = { props }  index_value = {index}/>
															</div>
														</Fragment>
													}
												</div>
											</div>
										</div>
										{ ( imagePosition == "right" ) && <TestimonialImage  attributes={props.attributes} index_value = {index} /> }
									</div>
								</div>
							)}
						</div>
					</div>
				</Fragment>
			)
		},
	},
	{
		attributes,
		save: function( props ) {
			const {
				block_id,
				className,
				columns,
				autoplaySpeed,
				autoplay,
				infiniteLoop,
				pauseOnHover,
				transitionSpeed,
				tcolumns,
				arrowSize,
				mcolumns,
				test_block,
				imagePosition,
				arrowColor,
			} = props.attributes

			return (
				<Fragment>
					<div className={ classnames(
						className,
						"aeopr-testomonial__outer-wrap aeopr-tm__arrow-outside"
					) }
					id = { `aeopr-testimonial-${block_id}` }
					>

						<div
							className={ classnames(
								`aeopr-tm__columns-${ columns }`,
								"aeopr-tm__items"
							) }
						>
							{ test_block.map( ( test, index ) =>

								<div className = { classnames(
									"aeopr-testimonial__wrap",
									...PositionClasses( props.attributes ),
								) } key ={ "wrap-"+index } >
									<div className = "aeopr-tm__content" key ={ "tm_content-"+index }>
										<div className = "aeopr-tm__overlay"></div>
										{ (imagePosition == "top" || imagePosition == "left" ) && <TestimonialImage  attributes={props.attributes} index_value = {index} /> }

										<div className ="aeopr-tm__text-wrap">
											{  // Get description.
												<Fragment>
													<div className = "aeopr-testinomial-text-wrap" key={"text-wrap-"+index}>
														<Description attributes={props.attributes} setAttributes = "not_set" props = { props }  index_value = {index}/>
													</div>
												</Fragment>
											}
											<div className ="aeopr-tm__meta">
												<div className ="aeopr-tm__meta-inner">

													{ (imagePosition == "bottom" ) && <TestimonialImage  attributes={props.attributes}  index_value = {index} /> }

													{ //title_text
														<Fragment>
															<div className = "aeopr-testimonial-details" key={"tm_wraps-"+index}>
																<AuthorName attributes={props.attributes} setAttributes = "not_set"  props = { props } index_value = {index}/>
																<Company attributes={props.attributes} setAttributes = "not_set"  props = { props }  index_value = {index}/>
															</div>
														</Fragment>
													}
												</div>
											</div>
										</div>
										{ ( imagePosition == "right" ) && <TestimonialImage  attributes={props.attributes} index_value = {index} /> }
									</div>
								</div>
							)}
						</div>
					</div>
				</Fragment>
			)
		},
	}
]

export default deprecated;