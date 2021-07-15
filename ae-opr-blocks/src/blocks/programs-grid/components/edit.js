/**
 * AEOPR Programs Grid Edit Block
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

class ProgramsGridBlock extends Component {
	render() {
		const { attributes, setAttributes, programsList } = this.props;


		// Check if there are posts
		const hasPosts = Array.isArray( programsList ) && programsList?.length;


		if ( ! hasPosts ) {
			return (
				<Fragment>
					<Inspector { ...{ setAttributes, ...this.props } } />
					<Placeholder
						icon="admin-post"
						label={ __(
							'AEOPR Programs Grid',
							'aeopr'
						) }
					>
						{ ! Array.isArray( programsList ) ? (
							<Spinner />
						) : (
							__( 'No programs found.', 'aeopr' )
						) }
					</Placeholder>
				</Fragment>
			);
		}

		
		
		const layoutControls = [
			{
				icon: 'grid-view',
				title: __( 'Grid View', 'aeopr' ),
				onClick: () => setAttributes( { postLayout: 'grid' } ),
				isActive: 'grid' === attributes.postLayout,
			},
			{
				icon: 'list-view',
				title: __( 'List View', 'aeopr' ),
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
						'aeopr-block-programs-grid',
						{
							'is-grid': 'grid' === attributes.postLayout,
							'is-list': 'list' === attributes.postLayout,
							[ `columns-${ attributes.columns }` ]:'grid' === attributes.postLayout,
						}
					) }
				>
				{ attributes.sectionTitle && (
					<SectionTitleTag className="aeopr-programs-grid-section-title">
						{ attributes.sectionTitle }
					</SectionTitleTag>
				) }

					
					{ 
						programsList?.map( ( post, i ) => {
							if(attributes.extPages == false && post.acf.program_external_url)return null
							return(
								<div
									key={ i }
									id={ 'program-' + post.id }
									className={ classnames(
										'program-' + post.id,
										'aeopr-programs-grid-item'
									) }
								>
									<img src={post.acf.program_image}/>
									<p className="aeopr-programs-grid-item-type">
										{
											 decodeEntities(
												post.acf.program_aos
											) ||''
										}
									</p>
									<h4 className="aeopr-block-programs-grid-title">
										{
											 post.acf.program_degree_level +'in '+ decodeEntities(
												post.title.rendered.trim()
											)
										}
									</h4>
									{attributes.linkOut===false &&
										(
											<div 
												className="aeopr-programs-grid-program-content"
												dangerouslySetInnerHTML= 
													{{__html: decodeEntities(post.acf.program_content)}}
											/>
										)
									}
	
								
										
								</div>
							)
								
						})//end map
					}
				</SectionTag>
			</Fragment>
		);
	}
}
/*
if linkout is false:
load in Program page content into hidden div. This will be pulled to panel on click for frontend

if linkout is true:
load in program page link field and not hidden content. 
need a way to select program card and update page link	
	
	*/
export default compose( [
	withSelect( ( select, props ) => {
		const { 
			order,
			program_types,
			postsToShow,
			orderBy
			 } = props.attributes;

		const { getEntityRecords } = select( 'core' );

		const programsQuery = pickBy(
			{
				order,
				orderby: orderBy,
				per_page: 100,
				...(program_types && {program_types:program_types})
			},
			( value ) => ! isUndefined( value )
		);
		
		// Return the post or page query
		return {
			programsList: getEntityRecords(
				'postType',
				'program',
				programsQuery
			)
		};
	} ),
] )( ProgramsGridBlock );

// Truncate excerpt
function truncate( str, no_words ) {
	return str
		.split( ' ' )
		.splice( 0, no_words )
		.join( ' ' );
}
