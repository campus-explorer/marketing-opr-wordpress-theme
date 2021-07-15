/**
 * External dependencies
 */
import isUndefined from 'lodash/isUndefined';
import pickBy from 'lodash/pickBy';
import moment from 'moment';
import classnames from 'classnames';
import Select from "react-dropdown-select"
import {htmlDecode} from '../helpers/helpers';
import Inspector from './inspector';
import PostGridImage from './image';
import VideoItem from './video';

import VideoSelector from './videoSelector';


const { compose } = wp.compose;

const { Component, Fragment } = wp.element;

const { __ } = wp.i18n;

const { decodeEntities } = wp.htmlEntities;

const { withSelect } = wp.data;

const { Placeholder, Spinner, Toolbar } = wp.components;

const { BlockAlignmentToolbar, BlockControls } = wp.blockEditor;


function LatestPostsBlock(props) {

		const { attributes, setAttributes, latestPosts, isSelected } = props;
		
		const apiKey = aeopr_settings.google_api_key;
		
	  
		// Check if there are posts
		const hasPosts = latestPosts && Array.isArray( latestPosts ) && latestPosts.length;

		if ( ! hasPosts ) {
			return (
				<Fragment>
					<Inspector { ...{ setAttributes, ...props } } />
					<Placeholder
						icon="admin-post"
						label={ __(
							'AEOPR Video Testimonial',
							'aeopr'
						) }
					>
						{ ! Array.isArray( latestPosts ) ? (
							<Spinner />
						) : (
							__( 'No posts found.', 'aeopr' )
						) }
					</Placeholder>
				</Fragment>
			);
		}
		
							
		const videoData = (video)=> {
			const {acf:{url, video_title, video_excerpt}, id,title } = video;
			fetch( 'https://www.googleapis.com/youtube/v3/videos?key='+ apiKey +'&part=snippet&id='+url , {
		        cache: 'no-cache',
	            headers: {
	                'user-agent': 'WP Block',
	                'content-type': 'application/json'
	              },
	            method: 'GET',
	            redirect: 'follow', 
	            referrer: 'no-referrer', 
	        })
	        .then(
	            function(response){ 
		            response.json().then(function(data) {
						console.log('data',data)

						
						setAttributes({
							video: id, 
							url:video.acf.url,
							pageTitle: htmlDecode(title.rendered),
							title: video_title || data.items[0].snippet.title, 
							thumbnail:data.items[0].snippet.thumbnails.medium.url,
							description: video_excerpt||data.items[0].snippet.description
						})
						return data.items;
				      })
			    }
	        );
        }

		// Get the section tag
		const SectionTag = 'section';

		// Get the section title tag
		const SectionTitleTag =  'h2';

		// Get the post title tag
		const PostTag =  'h4';
		
		
		return (
			
			<Fragment>
				<Inspector 
					videoData={videoData}
					{ ...{ setAttributes, ...props } } 
					
				/>
				<BlockControls>
					<BlockAlignmentToolbar
						value={ attributes.align }
						onChange={ ( value ) => {
							setAttributes( { align: value } );
						} }
						controls={ [ 'center','left' ] }
					/>
				</BlockControls>
				<SectionTag
					className={ classnames(
						props.className,
						'aeopr-block-video-testimonial',
						isSelected?'is-selected':null,
						`block-align-${attributes.align}`
					) }
				>
					{ attributes.displaySectionTitle &&
						attributes.sectionTitle && (
							<SectionTitleTag className="aeopr-block-video-testimonial-section-title">
								{ attributes.sectionTitle }
							</SectionTitleTag>
						) }
					{ isSelected && 
						<VideoSelector {...props} />
					}
					<VideoItem
						{...props}
						PostTag = {PostTag}
					/>
				</SectionTag>
			</Fragment>
		);
}

export default compose( [
	withSelect( ( select, props ) => {
		const { order, categories } = props.attributes;

		const { getEntityRecords } = select( 'core' );	
		

		// Query for pages
		const pageQuery = pickBy(
			{
				orderby: 'title',
				per_page: -1
			},
			( value ) => ! isUndefined( value )
		);

		// Return the post or page query
		return {
			latestPosts: getEntityRecords( 
				'postType', 
				'video', 
				pageQuery 
			),
		};
	} ),
] )( LatestPostsBlock );


