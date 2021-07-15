/***
 * Video grid component for Block Video Testimonial
 **/
import classnames from 'classnames';

const { __ } = wp.i18n;




export default function VideoItem(props){
	const {
		PostTag, 
		attributes,
		setAttributes
		} = props;

	
	const videoItem = 
			(attributes.video)?(
					<article
						id={ 'post-' + attributes.video }
						className={ classnames(
							`post-${attributes.video}`,
							'video-item',
							`is-aligned-${attributes.align}`
						) }
					>
						<div className="aeopr-block-video-testimonial-image">
							<img src={attributes.thumbnail}/>
						</div>
	
						<div className="aeopr-block-video-testimonial-text">
							<header className="aeopr-block-video-testimonial-header">
									<PostTag className="aeopr-block-video-testimonial-title">
										{attributes.title}
									</PostTag>
							</header>
	
							<div className="aeopr-block-video-testimonial-description">
								{ (attributes.displayPostExcerpt && attributes.description) &&
									(
										<div
											dangerouslySetInnerHTML={ {
												__html: 
													attributes.description
											} }
										/>
									) 
								}
							</div>
							{ attributes.displayPostLink && (
								<p className="aeopr-block-video-testimonial-more-link">
									<a
										className="aeopr-text-link"
										href={ attributes.readMoreLink }
										rel="bookmark noopener noreferrer"
									>
										{ attributes.readMoreText }
									</a>
								</p>
							) }

						</div>
					</article>
				):(<p>Choose a video to load</p>);
	
	return videoItem
}