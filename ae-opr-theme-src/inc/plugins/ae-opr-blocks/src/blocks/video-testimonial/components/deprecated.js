/**
 * BLOCK: Icon List - Child - Deprecated Block
 */

import classnames from "classnames"
//import attributes from "./attributes"


const {
	RichText
} = wp.blockEditor

const deprecated = [
	//convert from static block to dynamic
	{
		attributes,			
		save( { attributes, className } ) {
		
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
	}
]

export default deprecated;