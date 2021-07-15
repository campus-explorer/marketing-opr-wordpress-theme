/***
 * Post grid component for Block Post Grid
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


export default function PostGrid(props){
	const {
		displayPosts, 
		attributes,
		setAttributes,
		isPost,
		PostTag,
		PostGridImage
		} = props;
		
		
	
	const postGrid = displayPosts.map( ( post, i ) => (
		<article
			key={ i }
			id={ 'post-' + post.id }
			className={ classnames(
				'post-' + post.id,
				post.featured_image_src &&
					attributes.displayPostImage
					? 'has-post-thumbnail'
					: null,
			) }
		>
			{ attributes.displayPostImage &&
				post.featured_media ? (
					<PostGridImage
						{ ...props }
						imgAlt={
							decodeEntities(
								post.title.rendered.trim()
							) ||
							__( '(Untitled)', 'aeopr' )
						}
						imgClass={ `wp-image-${ post.featured_media.toString() }` }
						imgID={ post.featured_media.toString() }
						imgSize={ attributes.imageSize }
						imgSizeLandscape={
							post.featured_image_src
						}
						imgSizeSquare={
							post.featured_image_src_square
						}
						imgLink={ post.link }
					/>
				) : null }
		
			<div className="aeopr-block-post-grid-text">
				<header className="aeopr-block-post-grid-header">
					{ attributes.displayPostTitle && (
						<PostTag className="aeopr-block-post-grid-title">
							{
								 decodeEntities(
									post.title.rendered.trim()
								) ||
									__(
										'(Untitled)',
										'aeopr'
								)
							}
						</PostTag>
					) }
		
					{ isPost && (
						<div className="aeopr-block-post-grid-byline">
							{ attributes.displayPostAuthor &&
								post.author_info
									.display_name && (
									<div className="aeopr-block-post-grid-author">
										<a
											className="aeopr-text-link"
											target="_blank"
											rel="noopener noreferrer"
											href={
												post
													.author_info
													.author_link
											}
										>
											{
												post
													.author_info
													.display_name
											}
										</a>
									</div>
								) }
		
							{ attributes.displayPostDate &&
								post.date_gmt && (
									<time
										dateTime={ moment(
											post.date_gmt
										)
											.utc()
											.format() }
										className={
											'aeopr-block-post-grid-date'
										}
									>
										{ moment(
											post.date_gmt
										)
											.local()
											.format(
												'MMMM DD, Y',
												'aeopr'
											) }
									</time>
								) }
						</div>
					) }
				</header>
		
				<div className="aeopr-block-post-grid-excerpt">
					{ attributes.displayPostExcerpt &&
						post.excerpt && (
							<div
								dangerouslySetInnerHTML={ {
									__html: truncate(
										post.excerpt
											.rendered,
										attributes.excerptLength
									),
								} }
							/>
						) }
						
		
					{ attributes.displayPostLink && (
						<p>
							<a
								className="aeopr-block-post-grid-more-link aeopr-text-link"
								href={ post.link }
								target="_blank"
								rel="bookmark noopener noreferrer"
							>
								{ attributes.readMoreText }
							</a>
						</p>
					) }
				</div>
			</div>
		</article>
	) )
	
	return postGrid
}