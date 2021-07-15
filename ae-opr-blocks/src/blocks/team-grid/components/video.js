/***
 * Video grid component for Block Post Grid
 **/
import classnames from 'classnames';

 const { render, useState, useEffect } = wp.element;
 
 const { compose } = wp.compose;

const { Component, Fragment } = wp.element;

const { __ } = wp.i18n;

const { decodeEntities } = wp.htmlEntities;

const { withSelect } = wp.data;

const { Placeholder, Spinner, Toolbar } = wp.components;

const { BlockAlignmentToolbar, BlockControls } = wp.blockEditor;

// Truncate excerpt
function truncate( str, no_words ) {
	return str
		.split( ' ' )
		.splice( 0, no_words )
		.join( ' ' );
}


export default function VideoGrid(props){
	const {
		videoPosts,
		PostTag, 
		attributes,
		setAttributes
		} = props;

	const apiKey = aeopr_settings.google_api_key;	
		
 /// --> create array of video ids for youtube api call
	const videoIds = videoPosts.map( ( post, i ) => post.acf.url)
	
	const videoIdQuery = encodeURIComponent(videoIds.join(','));
			
	const videoData = (videoIds && !attributes.videoList) &&
		fetch( 'https://www.googleapis.com/youtube/v3/videos?key='+ apiKey +'&part=snippet&id='+videoIdQuery , {
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

					const items = data.items.reduce((accum, item)=>{
						accum[item.id]={
							title:item.snippet.title,
							excerpt: item.snippet.description,
							thumbnail: item.snippet.thumbnails.medium.url
						}
						return accum;
						},{})
					
					setAttributes({videoList: items})
					return data.items;
			      })
		    }
        );
	
	const videoGridItems = 
		videoPosts.map( ( post, i ) => {
			if(attributes.videoList && attributes.videoList[post.acf.url]){
				return(
					<article
						key={ i }
						id={ 'post-' + post.id }
						className={ classnames(
							'post-' + post.id,
							'video-item'
						) }
					>
						{ (attributes.displayPostImage) && 
							(<img src={attributes.videoList[post.acf.url].thumbnail}/>)
						}
	
						<div className="aeopr-block-post-grid-text">
							<header className="aeopr-block-post-grid-header">
								{ (attributes.displayPostTitle) && (
									<PostTag className="aeopr-block-post-grid-title">
										{ post.acf.video_title || attributes.videoList[post.acf.url].title }
									</PostTag>
								) }
							</header>
	
							<div className="aeopr-block-post-grid-excerpt">
								{ (attributes.displayPostExcerpt) &&
									(
										<div
											dangerouslySetInnerHTML={ {
												__html: truncate(
													post.acf.video_excerpt || attributes.videoList[post.acf.url].excerpt,
													attributes.excerptLength
												),
											} }
										/>
									) 
								}
							</div>
						</div>
					</article>
				)}} )
	
	return videoGridItems
}