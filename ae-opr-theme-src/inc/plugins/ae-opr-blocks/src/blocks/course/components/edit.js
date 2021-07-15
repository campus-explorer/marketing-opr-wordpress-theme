/**
 * BLOCK: Courses Block - Edit Class
 */

// Import classes
import classnames from "classnames"
import styling from "../helpers/styling"
import Select from "react-dropdown-select"

const { __ } = wp.i18n

const {
	Component,
	Fragment,
	createElement,
	RawHTML
} = wp.element

const {
	InspectorControls,
	MediaUpload,
	RichText,
	ColorPalette
} = wp.blockEditor

const {
	PanelBody,
	SelectControl,
	Button,
	TextControl,
	ToggleControl,
	TabPanel,
} = wp.components
const { 
	withDispatch, 
	withSelect, 
	subscribe,
	getEntityRecord 
	} = wp.data
	
const {
	compose
} = wp.compose



class AEOPRCourses extends Component {

	constructor() {
		super( ...arguments )
	}

	componentDidMount() {

		// Assigning block_id in the attribute.
		this.props.setAttributes( { block_id: this.props.clientId } )

		// Pushing Style tag for this block css.
		const $style = document.createElement( "style" )
		$style.setAttribute( "id", "aeopr-style-courses-block-" + this.props.clientId )
		document.head.appendChild( $style )
	}
	
	render() {
		const customDropdownRenderer = ({ props, state, methods }) => {
			const regexp = new RegExp(state.search, 'i');
	
		    return (
		      <div className="dropdown-search">
		          <h3>Search and select:</h3>
		          <input
		            type="text"
		            value={state.search}
		            onChange={methods.setSearch}
		            placeholder="Search..."
		          />
		        <div className="dropdown-item-list">
		          {props.options
		            .filter((item) => regexp.test(item[props.searchBy] || item[props.labelField]))
		            .map((option) => {
		
		              return (
		                <span
		                  className="dropdown-item react-dropdown-select-item"
		                  key={option[props.valueField]}
		                  onClick={() => methods.addItem(option)}>
		                  	{option[props.labelField]}
		                </span>
		              );
		            })}
		        </div>
		      </div>
		    );
	  };
		/// Decode Title
		function htmlDecode(input) {
		  var doc = new DOMParser().parseFromString(input, "text/html");
		  return doc.documentElement.textContent;
		}
		
		
		//creates an Inspector DropDown to choose each course. Need to make this a repeatable element
		const PostsDropdownControl = compose(
			// withDispatch allows to save the selected post ID into post meta
			withDispatch( function( dispatch, props ) {
				return {
					setMetaValue: function( metaValue ) {
						dispatch( 'core/editor' ).editPost(
							{ meta: { [ props.metaKey ]: metaValue } }
						);
					}
				}
			} ),
			// withSelect allows to get posts for our SelectControl and also to get the post meta value
			withSelect( function( select, props ) {
				return {
					posts: select( 'core' ).getEntityRecords( 
						'postType', 
						'course', 
						{
							per_page:-1,
							orderby:'title',
							order:'asc'
						} ),
					metaValue: select( 'core/editor' ).getEditedPostAttribute( 'meta' )[ props.metaKey ],
				}
			} ) )( function( props ) {
		 
				// options for SelectControl
				var options = [];
				// if posts found
				if( props.posts ) {
					props.posts.map((post) => { // simple foreach loop
						options.push({value:post.id, label:htmlDecode(post.title.rendered)+' ('+post.acf.course_id+')'});
					});
				}else{
					options.push({value:null, label:'Loading Courses...'})
				}
				
				return (
				<Select
					options= {options}
					searchable
					closeOnScroll={true}
					closeOnSelect={true}
					dropdownRenderer={customDropdownRenderer}
					sortBy="label"
					addPlaceholder="Search..."
					onChange= {function( content ) {
							const item = wp.data.select('core').getEntityRecord( 'postType', 'course' , content[0].value)
							if(item)setAttributes({course: item.id, courseTitle: htmlDecode(item.title.rendered), courseContent: item.acf})
						}
					}
					values= {[{value:attributes.course, label:attributes.courseTitle+' ('+attributes.courseContent.course_id+')'}]}
					/>
				)

		 
			}
		 
		);

		




		const { attributes, setAttributes } = this.props
		const {
			className,
			label,
			link,
			target,
			disableLink,
			hideLabel,
			course,
			courseContent,
			courseTitle,
			coursePrerequisites
		} = attributes

		var element = document.getElementById( "aeopr-style-icon-block-" + this.props.clientId )

		if( null != element && "undefined" != typeof element ) {
			element.innerHTML = styling( this.props )
		}
		
		
		const renderHtml = () => {
			///build prereqs list
			const {
				course_prerequisites, 
				course_corequisites, 
				course_credit_hours,
				course_abstract, 
				course_id
				} = courseContent;
				
			if(null == coursePrerequisites && course_prerequisites){

				const coursePrereqs = course_prerequisites.map((post, index)=>(
					post.post_title
				))
				setAttributes({coursePrerequisites: coursePrereqs})
				
				
			}
			return (
				<div
					className={ classnames(
						"aeopr-course-item__wrapper",
						className,
						`aeopr-block-${ this.props.clientId }`
					) }
				>
				
					<p className="course-title">{course_id} {courseTitle} <span>({course_credit_hours} Credit Hours)</span></p>
					<div className="course-abstract" dangerouslySetInnerHTML={{__html:course_abstract}}/> 
					
					
					{(coursePrerequisites) && (<p><span>Prerequisites:</span> {coursePrerequisites.join(', ')}</p>)}	
						
				</div>
			)
		}

		return (
			<Fragment>
				<InspectorControls>
					<PanelBody title={ __( "Course Settings" ) } initialOpen={ true } >
						<h2>{ __( "Select Course" ) }</h2>
							<PostsDropdownControl/>
					</PanelBody>
				</InspectorControls>
				{renderHtml()}
			</Fragment>
		)
	}
}

export default AEOPRCourses

