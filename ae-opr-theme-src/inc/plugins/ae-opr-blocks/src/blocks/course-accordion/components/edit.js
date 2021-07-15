/**
 * Internal dependencies
 */
import Inspector from './inspector';
import Accordion from './accordion';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Component } = wp.element;
const {
	RichText,
	AlignmentToolbar,
	BlockControls,
		InspectorControls,
	InnerBlocks,
} = wp.blockEditor;

const { 
	getEntityRecord,
	subscribe,
	withDispatch, 
	withSelect, 
	} = wp.data
	
const {
	compose
} = wp.compose

export default class Edit extends Component {
	constructor() {
		super( ...arguments );
	}

	render() {
		const { attributes, setAttributes} = this.props
		/// Decode Title
		function htmlDecode(input) {
		  var doc = new DOMParser().parseFromString(input, "text/html");
		  return doc.documentElement.textContent;
		}
		
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
				console.log('parent', props);
				// options for SelectControl
				var options = [];
				// if posts found
				if( props.posts ) {
					props.posts.map((post) => { // simple foreach loop
						options.push({value:post.id, label:post.acf.course_id+' '+htmlDecode(post.title.rendered)});
					});
				}else{
					options.push({value:null, label:'Loading Courses...'})
				}
				
				
				
				return null
		 
			}
		 
		);

		
	
		return [
			// Show the block alignment controls on focus
			<BlockControls key="controls">
				<AlignmentToolbar
					value={ this.props.attributes.accordionAlignment }
					onChange={ ( value ) =>
						this.props.setAttributes( {
							accordionAlignment: value,
						} )
					}
				/>
			</BlockControls>,

			// Show the block controls on focus
			<Inspector key={ 'aeopr-course-accordion-inspector-' + this.props.clientId } { ...this.props } />,
			// Show the button markup in the editor
			<Accordion key={ 'aeopr-course-accordion-' + this.props.clientId } { ...this.props }>
				<RichText
					tagName="p"
					placeholder={ __( 'Course Group Title') }
					value={ this.props.attributes.accordionTitle }
					className="aeopr-course-accordion-title accordion-title"
					onChange={ ( value ) =>
						this.props.setAttributes( { accordionTitle: value } )
					}
				/>

				<div className="aeopr-course-accordion-text">
					<InnerBlocks 
						allowedBlocks={[
							'aeopr/dynamic-course-item', 
							'aeopr/course-accordion',
							'aeopr/list', 
							'core/paragraph', 
							'core/list', 
							'advgb/list',
							'advgb/accordions']}
						/>
				</div>
			</Accordion>,
		];
	}
}
