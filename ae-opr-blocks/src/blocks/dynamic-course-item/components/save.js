/**
 * BLOCK: Courses Block - Save Block
 */

// Import block dependencies and components.
import classnames from "classnames"

const {
	RichText
} = wp.blockEditor

const {
	RawHTML
}=wp.element

export default function save( props ) {
	
	const { attributes, className } = props

	const {
		label,
		block_id,
		link,
		target,
		disableLink,
		hideLabel,
		course,
		courseContent,
		courseTitle,
		coursePrerequisites
	} = attributes
	

	return (
		<div
			className={ classnames(
				"aeopr-course-item__wrapper",
				className,
				`aeopr-block-${ block_id }`
			) }
		>
				<p className="course-title">{courseContent.course_id} { courseTitle} <span>({courseContent.course_credit_hours} Credit Hours)</span></p>
					<div className="course-abstract" dangerouslySetInnerHTML={{__html:courseContent.course_abstract}}/> 
					{(coursePrerequisites) && (<p><span>Prerequisites:</span> {coursePrerequisites.join(', ')}</p>)}
				
		</div>
	)
}
