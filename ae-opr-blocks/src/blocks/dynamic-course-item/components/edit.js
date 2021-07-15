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
	createElement,
	Fragment,
	RawHTML
} = wp.element

const {
	ColorPalette,
	InspectorControls,
	MediaUpload,
	RichText,
} = wp.blockEditor

const {
	Button,
	PanelBody,
	SelectControl,
	ServerSideRender,
	TextControl,
	ToggleControl,
	TabPanel,
} = wp.components

const { 
	getEntityRecord,
	subscribe,
	withDispatch, 
	withSelect, 
	} = wp.data
	
const {
	compose
} = wp.compose


export default class AEOPRCourses extends Component {

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
		
		const { attributes, setAttributes, clientId, name, isSelected,context} = this.props
		const courseList = context['aeopr/courseList'];
		

		//Set selected value on load
		const courseInfo=(content)=>{
			const courseId = (Array.isArray(content))?content[0]['value']:content;
			const post = courseList.find(o => o.value === courseId)
			 if(post)setAttributes({
				course: post.value, 
				courseLabel: post.label+' ('+post.id+')',//for dropdown display only 
			})
	
		}
		//if no label has been saved, generate new one.
		if(attributes.course && !attributes.courseLabel)courseInfo(attributes.course);
		
		var element = document.getElementById( "aeopr-style-icon-block-" + clientId )

		/*if( null != element && "undefined" != typeof element ) {
			element.innerHTML = styling( this.props )
		}*/
		/*function filterIt(arr, searchKey) {
		 	return arr.filter(obj => Object.keys(obj).some(key => obj[key].includes(searchKey)));
		}*/
		function filterIt(arr, searchKey) {
		  return arr.filter(function(obj) {
		    return Object.keys(obj).some(function(key) {
		      return obj[key].includes(searchKey);
		    })
		  });
		}


		
		return (
				<div className="aeopr-course-item-container">
					{ isSelected && 
						<Select
							options= {context['aeopr/courseList']}
							searchable
							closeOnScroll={true}
							closeOnSelect={true}
							clearOnBlur={false}
							clearOnSelect={false}
							dropdownRenderer={customDropdownRenderer}
							sortBy="label"
							placeholder="Loading Courses..."
							addPlaceholder="Search..."
							onChange= {(content)=>courseInfo( content )}
							values= {[{value:attributes.course, label:attributes.courseLabel}]}
						/>}

					<ServerSideRender
			            block={name}
			            attributes={attributes}
			        />
		        </div>
		)
	}
}

