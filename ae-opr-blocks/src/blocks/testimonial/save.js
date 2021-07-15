/**
 * BLOCK: Testimonial - Save Block
 */

import classnames from "classnames"
import AuthorName from "./components/AuthorName"
import Company from "./components/Company"
import Description from "./components/Description"
import PositionClasses from "./classes"
import TestimonialImage from "./components/TestimonialImage"

const { Fragment } = wp.element

export default function save( props ) {
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
		backgroundColor,
		backgroundOpacity
	} = props.attributes

	const bgColor = (backgroundColor)?`has-${backgroundColor}-background-color`:'';
	return (
		<Fragment>
			<section className={ classnames(
				//className,
				"aeopr-testimonial__outer-wrap",
				"aeopr-content-section__wrap",
				`aeopr-block-${block_id}`,
				"aeopr-content-section__width-fullwidth",
				bgColor
			) }
			>
				<div className = { classnames(
					"aeopr-testimonial__wrap",
					...PositionClasses( props.attributes ),
				) }>
					<div className = "aeopr-tm__content" >								
						<div className = "aeopr-tm__overlay" style={{opacity:backgroundOpacity}}></div>
						<TestimonialImage  attributes={props.attributes}  index_value = "0" />

						<div className ="aeopr-tm__text-wrap">
							<Description attributes={props.attributes} setAttributes = "not_set" props = { props } index_value = "0"/>
							<AuthorName attributes={props.attributes} setAttributes = "not_set" props = { props } index_value = "0"/>
							<Company attributes={props.attributes} setAttributes = "not_set" props = { props }  index_value = "0"/>
						</div>
					</div>
				</div>
			</section>
		</Fragment>
	)
}
