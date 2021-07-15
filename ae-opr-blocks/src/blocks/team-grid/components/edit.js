/**
 * Archer Team Grid Edit Block
 * External dependencies
 * 
 */
import isUndefined from 'lodash/isUndefined';
import pickBy from 'lodash/pickBy';
import classnames from 'classnames';
import Inspector from './inspector';

const { compose } = wp.compose;

const { Component, Fragment } = wp.element;

const { __ } = wp.i18n;

const { decodeEntities } = wp.htmlEntities;

const { withSelect } = wp.data;

const { Placeholder, Spinner, Toolbar } = wp.components;

const { BlockAlignmentToolbar, BlockControls } = wp.blockEditor;

///grid class missing from editor

class TeamGridBlock extends Component {
	render() {
		const { attributes, setAttributes, teamList } = this.props;

		// Check if there are posts
		const hasPosts = Array.isArray( teamList ) && teamList?.length;


		if ( ! hasPosts ) {
			return (
				<Fragment>
					<Inspector { ...{ setAttributes, ...this.props } } />
					<Placeholder
						icon="admin-post"
						label={ __(
							'Archer Team Grid',
							'archer'
						) }
					>
						{ ! Array.isArray( teamList ) ? (
							<Spinner />
						) : (
							__( 'No members found.', 'archer' )
						) }
					</Placeholder>
				</Fragment>
			);
		}

		
		
		const layoutControls = [
			{
				icon: 'grid-view',
				title: __( 'Grid View', 'archer' ),
				onClick: () => setAttributes( { postLayout: 'grid' } ),
				isActive: 'grid' === attributes.postLayout,
			},
			{
				icon: 'list-view',
				title: __( 'List View', 'archer' ),
				onClick: () => setAttributes( { postLayout: 'list' } ),
				isActive: 'list' === attributes.postLayout,
			},
		];

		// Get the section tag
		const SectionTag = attributes.sectionTag || 'div';

		// Get the section title tag
		const SectionTitleTag = attributes.sectionTitleTag || 'h3';
		
		
		return (
			
			<Fragment>
				<Inspector { ...{ setAttributes, ...this.props } } />
				<BlockControls>
					<Toolbar controls={ layoutControls } />
				</BlockControls>

				<SectionTag
					className={ classnames(
						this.props.className,
						'archer-block-team-grid',
						{
							'is-grid': 'grid' === attributes.postLayout,
							'is-list': 'list' === attributes.postLayout,
							[ `columns-${ attributes.columns }` ]:'grid' === attributes.postLayout,
						}
					) }
				>
				{ attributes.sectionTitle && (
					<SectionTitleTag className="archer-team-grid-section-title">
						{ attributes.sectionTitle }
					</SectionTitleTag>
				) }

					
					{ 
						teamList?.map( ( post, i ) => {
							
							return(
								<div
									key={ i }
									id={ 'archer-team-' + post.id }
									className={ classnames(
										'archer-team-' + post.id,
										'archer-team-grid-item'
									) }
								>
									<figure class="archer-team-member-photo" >
										<img src={post?.acf?.photo?.url||'/wp-content/uploads/placeholder.jpg'}/>
										{post.acf.linkedin_url &&
											(
												<span class="archer-team-member-social-link">
													<a href={post.acf.linkedin_url} target="_blank">View Profile on LinkedIn</a>
												</span>
											)
										}
									</figure>
	
									<figcaption>
										<p className="archer-team-member-name">
										{
											 decodeEntities(
												post.acf.first_name+' '+post.acf.last_name
											) ||''
										}
									</p>
									<p className="archer-team-member-title">
										{
											 decodeEntities(
												post.acf.position
											) ||''
										}
									</p>
									</figcaption>
									
									
									
									
	
								
										
								</div>
							)
								
						})//end map
					}
				</SectionTag>
			</Fragment>
		);
	}
}

export default compose( [
	withSelect( ( select, props ) => {

		const { getEntityRecords } = select( 'core' );
		
		// Return the post or page query
		return {
			teamList: select( 'core' ).getEntityRecords(
				'postType',
				'archer_team',
				{
					custom_per_page:500,
					posts_per_page: -1,
					order:'asc',
					orderby: 'first_name',
				}
			)
		};
	} ),
] )( TeamGridBlock );

