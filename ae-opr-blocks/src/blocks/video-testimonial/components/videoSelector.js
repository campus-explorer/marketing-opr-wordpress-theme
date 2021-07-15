import Select from "react-dropdown-select"
import { htmlDecode } from '../helpers/helpers';

export default function VideoSelector(props){
	const { latestPosts, videoData, attributes, setAttributes} = props;
	// options for SelectControl
	var options = [];
	
	
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
  	
	// loop through video posts to create key=>value options
	latestPosts && 
	latestPosts.map((post) => { // simple foreach loop
			options.push({value:post.id, label:htmlDecode(post.title.rendered)});
		});				
	return (
		<Select
			options= {options}
			searchable
			closeOnScroll={true}
			closeOnSelect={true}
			dropdownRenderer={customDropdownRenderer}
			sortBy="label"
			addPlaceholder="Search..."
			className="aeopr-video-testimonial-select"
			onChange= {function( content ) {
					//retrieve item from wp.api
					const item = wp.data.select('core').getEntityRecord( 'postType', 'video' , content[0].value)
					videoData(item)
				}
			}
			values= {[{value:attributes.video, label:attributes.pageTitle}]}
			/>
	)

}