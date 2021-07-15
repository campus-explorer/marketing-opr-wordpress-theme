/**
 * External dependencies
 */

import isUndefined from 'lodash/isUndefined';
import pickBy from 'lodash/pickBy';
import moment from 'moment';
import classnames from 'classnames';
import Inspector from './inspector';
import PostGridImage from './image';
import '../assets/css/style.scss';
import '../assets/css/editor.scss';


const { compose } = wp.compose;

const { Component, Fragment } = wp.element;

const { __ } = wp.i18n;

const { decodeEntities } = wp.htmlEntities;

const { withSelect } = wp.data;

const { Placeholder, Spinner, Toolbar } = wp.components;

const { BlockAlignmentToolbar, BlockControls, InnerBlocks } = wp.blockEditor;

class LatestVideosBlock extends Component {
	render() {
		const { attributes, setAttributes, latestPosts } = this.props;
		if(!latestPosts){
			//console.log('no posts',attributes)
			return null;
			}
		// Check if there are posts
		const hasPosts = Array.isArray( latestPosts ) && latestPosts.length;
		//console.log('hasPosts',hasPosts)


		if ( ! hasPosts ) {
			console.log('no hasPosts')
			return (
				<Fragment>
					<Inspector { ...{ setAttributes, ...this.props } } />
					<Placeholder
						icon="admin-post"
						label={ __(
							'Post Grid',
							'aeopr'
						) }
					>
						{ ! Array.isArray( latestPosts ) ? (
							<Spinner />
						) : (
							__( 'No videos found.', 'aeopr' )
						) }
					</Placeholder>
				</Fragment>
			);
		}		

		// Removing posts from display should be instant.
		const displayPosts = latestPosts.filter(post=> post.acf.featured!=true || ! post.acf.featured);
		
		
		/// --> Create array of featured videos
		const featuredPosts = latestPosts.filter(post=> post.acf.featured==true);
		
		
		// Get the section tag
		const SectionTag =  'section';

		// Get the section title tag
		const SectionTitleTag = 'h2';

		// Get the post title tag
		const PostTag =  'h3';
		
		// Render grid of items
		const postGrid = (postObj) =>{
			let gridIDList = new Array();
			let grid = postObj.map( ( post, i ) =>{
				gridIDList.push(post.id);
				return(
					<article
						key={ i }
						id={ 'post-' + post.id }
						className={ classnames(
							'post-' + post.id,
							'post-'+i
						) }
					>
						<img src={`https://img.youtube.com/vi/${ post.acf.url }/0.jpg`}/>
						
	
						<div className="aeopr-block-video-grid-text">
							<header className="aeopr-block-video-grid-header">
									<PostTag className="aeopr-block-video-grid-title">
										
											{ decodeEntities(
												post.title.rendered.trim()
											) ||
												__(
													'(Untitled)',
													'aeopr'
												) }
									</PostTag>
	
								
							</header>
	
							<div className="aeopr-block-video-grid-excerpt">
								{ post.acf.video_excerpt && (
										<div
											dangerouslySetInnerHTML={ {
												__html: post.acf.video_excerpt
											} }
										/>
									) }
	
							</div>
						</div>
					</article>
				)})	
				console.log(gridIDList);
			return grid;
		}
console.log(attributes);
		return (
			<Fragment>
				
				
				<SectionTag
					className={ classnames(
						this.props.className,
						'aeopr-block-video-grid'
					) }
				>
					{(featuredPosts && (
						<div className={
							classnames( {
								'is-grid': 'grid' === attributes.postLayout,
								'is-list': 'list' === attributes.postLayout,
								[ `columns-${ attributes.columns }` ]:
									'grid' === attributes.postLayout,
								'aeopr-video-featured-grid-items': 'aeopr-video-featured-grid-items',
							} ) }>
							
							{ postGrid(featuredPosts)}
						</div> 
						))}				

					<div
						className={ classnames( {
							'is-grid': 'grid' === attributes.postLayout,
							'is-list': 'list' === attributes.postLayout,
							[ `columns-${ attributes.columns }` ]:
								'grid' === attributes.postLayout,
							'aeopr-video-grid-items': 'aeopr-video-grid-items',
						} ) }
					>
						
						{ postGrid(displayPosts)}
					</div>
				</SectionTag>
			</Fragment>
		);
	}
}

export default compose( [
	withSelect( ( select, props ) => {
		const { order, categories } = props.attributes;

		const { getEntityRecords } = select( 'core' );

		// Grab the page IDs from the array
		const pageIDs = null;

		// Query for pages
		const pageQuery = pickBy(
			{
				include: pageIDs ? pageIDs : null,
				orderby: pageIDs ? 'include' : null,
				per_page: 30
			},
			( value ) => ! isUndefined( value )
		);

		// Return the post or page query
		return {
			latestPosts: select( 'core' ).getEntityRecords( 
						'postType', 
						'video', 
						{
							per_page:-1,
							//orderby:'title',
							//order:'asc'
						} )
		};
	} ),
] )( LatestVideosBlock );

// Truncate excerpt
function truncate( str, no_words ) {
	return str
		.split( ' ' )
		.splice( 0, no_words )
		.join( ' ' );
}
