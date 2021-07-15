/**
 * BLOCK: Video Testimonial Block - Edit Class
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


export default class AEOPRVideo extends Component {

	constructor() {
		super( ...arguments );
	}

	componentDidMount() {

		// Assigning block_id in the attribute.
		this.props.setAttributes( { block_id: this.props.clientId } )

		// Pushing Style tag for this block css.
		const $style = document.createElement( "style" )
		$style.setAttribute( "id", "aeopr-style-video-block-" + this.props.clientId )
		document.head.appendChild( $style );
		
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
	  
	  /// capture youtube data vie API
	const fetchVideoInfo=( item )=>{
		const { attributes, setAttributes } = this.props;
		console.log('item',item)
        //const { video, videoContent } = attributes;
       // if(!videoContent)return null;
       // const url = videoContent.url;
       // const excerpt = videoContent.excerpt;

/// --> if no thumbnail was defined for post, get it from youtube	                       
		//if(item.acf.thumbnail=='false'||item.acf.thumbnail==false){
			const apiUrl = encodeURIComponent('https://youtube.com/watch?v='+item.acf.url);
			console.log(apiUrl)
			/*wp.apiFetch( { path: wp.url.addQueryArgs(`/oembed/1.0/proxy?url==${ apiUrl }`) } )
						.then(
			                (obj) => {
				                //console.log('video',obj); 
			                    setAttributes({fetchedThumbnail:obj.thumbnail_url}); 
			                }
			            )
			            .catch( ( error ) => {
			                console.log(error)
			                
			 
			            })*/
			   
			   setAttributes({
					video: item.id, 
					videoTitle: htmlDecode(item.title.rendered), 
					url:item.acf.url,
					thumbnail:item.acf.thumbnail,
					excerpt: item.acf.video_excerpt
				})
		//}
		   

            
    }
	  /// Decode Title
		function htmlDecode(input) {
		  var doc = new DOMParser().parseFromString(input, "text/html");
		  return doc.documentElement.textContent;
		}
		//creates an Inspector DropDown to choose each course. Need to make this a repeatable element
		const VideosDropdownControl = compose(
			// withSelect allows to get posts for our SelectControl and also to get the post meta value
			withSelect( function( select, props ) {
				return {
					posts: select( 'core' ).getEntityRecords( 
						'postType', 
						'video', 
						{
							per_page:-1,
							orderby:'title',
							order:'asc'
						} ),
					//metaValue: select( 'core/editor' ).getEditedPostAttribute( 'meta' )[ props.metaKey ],
				}
			} ) )( function( props ) {
		 
				// options for SelectControl
				var options = [];
				// if posts found
				if( props.posts ) {
					props.posts.map((post) => { // simple foreach loop
						options.push({value:post.id, label:htmlDecode(post.title.rendered)});
					});
				}else{
					options.push({value:null, label:'Loading Videos...'})
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
							const item = wp.data.select('core').getEntityRecord( 'postType', 'video' , content[0].value)
							
							if(item)fetchVideoInfo(item);
							;
						}
					}
					values= {[{value:attributes.video, label:attributes.videoTitle}]}
					/>
				)

		 
			}
		 
		);

		
		
		const { attributes, setAttributes, clientId, name, isSelected,context} = this.props
		const videoList = context['aeopr/videoList'];
		

		//Set selected value on load
		const videoInfo=(content)=>{
			const videoId = (Array.isArray(content))?content[0]['value']:content;
			const post = videoList.find(o => o.value === videoId)
			 if(post)setAttributes({
				video: post.value, 
				videoLabel: post.label+' ('+post.id+')',//for dropdown display only 
			})
	
		}
		//if no label has been saved, generate new one.
		//if(attributes.video && !attributes.videoLabel)videoInfo(attributes.video);
		
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
		



		console.log(attributes);
		return (
				<div className="aeopr-video-testimonial-container">
					{ isSelected && 
						<VideosDropdownControl
						/>}

					<ServerSideRender
			            block={name}
			            attributes={attributes}
			        />
		        </div>
		)
	}
}

