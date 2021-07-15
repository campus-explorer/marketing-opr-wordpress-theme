/**
 * Inspector Controls
 */

// Setup the block
const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;

import compact from 'lodash/compact';
import map from 'lodash/map';
import RenderSettingControl from '../../../utils/components/settings/renderSettingControl';
import Select from 'react-select';

// Import block components
const { InspectorControls } = wp.blockEditor;

// Import Inspector components
const {
	PanelBody,
	QueryControls,
	RangeControl,
	SelectControl,
	TextControl,
	ToggleControl,
} = wp.components;

const { addQueryArgs } = wp.url;

const { apiFetch } = wp;

const MAX_POSTS_COLUMNS = 4;

/**
 * Create an Inspector Controls wrapper Component
 */
export default class Inspector extends Component {
	constructor() {
		super( ...arguments );
		this.state = { categoriesList: [] };
	}

	componentDidMount() {
		this.stillMounted = true;
		this.fetchRequest = apiFetch( {
			path: addQueryArgs( '/wp/v2/categories', { per_page: -1 } ),
		} )
			.then( ( categoriesList ) => {
				if ( this.stillMounted ) {
					this.setState( { categoriesList } );
				}
			} )
			.catch( () => {
				if ( this.stillMounted ) {
					this.setState( { categoriesList: [] } );
				}
			} );
	}

	componentWillUnmount() {
		this.stillMounted = false;
	}

	/* Get the available image sizes */
	imageSizeSelect() {
		const getSettings = wp.data.select( 'core/editor' ).getEditorSettings();

		return compact(
			map( getSettings.imageSizes, ( { name, slug } ) => {
				return {
					value: slug,
					label: name,
				};
			} )
		);
	}

	/* Get the page list */
	pageSelect(postType) {
		if(postType=='post')return;
		const getPages = wp.data.select( 'core' ).getEntityRecords( 'postType', postType, { per_page: -1 } )

		return compact( map( getPages, ({ id, title }) => {
			return {
				value: id,
				label: title.raw
			};
		}) );
	}

	render() {
		// Setup the attributes
		const { attributes, setAttributes, latestPosts } = this.props;

		const { order, orderBy } = attributes;

		const { categoriesList } = this.state;

		// Post type options
		const postTypeOptions = [
			{ value: 'post', label: __( 'Post', 'aeopr' ) },
			{ value: 'page', label: __( 'Page', 'aeopr' ) },
			{ value: 'video', label: __( 'Video', 'aeopr' ) },
		];

		// Section title tags
		const sectionTags = [
			{ value: 'div', label: __( 'div', 'aeopr' ) },
			{ value: 'header', label: __( 'header', 'aeopr' ) },
			{ value: 'section', label: __( 'section', 'aeopr' ) },
			{ value: 'article', label: __( 'article', 'aeopr' ) },
			{ value: 'main', label: __( 'main', 'aeopr' ) },
			{ value: 'aside', label: __( 'aside', 'aeopr' ) },
			{ value: 'footer', label: __( 'footer', 'aeopr' ) },
		];

		// Section title tags
		const sectionTitleTags = [
			{ value: 'h2', label: __( 'H2', 'aeopr' ) },
			{ value: 'h3', label: __( 'H3', 'aeopr' ) },
			{ value: 'h4', label: __( 'H4', 'aeopr' ) },
			{ value: 'h5', label: __( 'H5', 'aeopr' ) },
			{ value: 'h6', label: __( 'H6', 'aeopr' ) },
		];

		// Check for posts
		const hasPosts = latestPosts && Array.isArray( latestPosts ) && latestPosts.length;

		// Check the post type
		const isPost = 'post' === attributes.postType;

		// Add instruction text to the select
		const aeoprImageSizeSelect = {
			value: 'selectimage',
			label: __( 'Select image size' ),
		};

		// Add the landscape image size to the select
		const aeoprImageSizeLandscape = {
			value: 'aeopr-block-post-grid-landscape',
			label: __( 'AEOPR Grid Landscape' ),
		};

		// Add the square image size to the select
		const aeoprImageSizeSquare = {
			value: 'aeopr-block-post-grid-square',
			label: __( 'AEOPR Grid Square' ),
		};

		// Get the image size options
		const imageSizeOptions = this.imageSizeSelect();

		// Combine the objects
		imageSizeOptions.push( aeoprImageSizeSquare, aeoprImageSizeLandscape );
		imageSizeOptions.unshift( aeoprImageSizeSelect );

		const imageSizeValue = () => {
			for ( let i = 0; i < imageSizeOptions.length; i++ ) {
				if ( imageSizeOptions[ i ].value === attributes.imageSize ) {
					return attributes.imageSize;
				}
			}
			return 'full';
		};

		// Setup the page select options
		const pageOptions = this.pageSelect(attributes.postType);

		return (
			<InspectorControls>
				<PanelBody
					title={ __(
						'Post and Page Grid Settings',
						'aeopr'
					) }
					className={ isPost ? null : 'aeopr-hide-query' }
				>
					<RenderSettingControl id="aeopr_postgrid_postType">
						<SelectControl
							label={ __( 'Content Type', 'aeopr' ) }
							options={ postTypeOptions }
							value={ attributes.postType }
							onChange={ ( value ) =>
								this.props.setAttributes( { postType: value } )
							}
						/>
					</RenderSettingControl>
					{ 'video' !== attributes.postType && 
					<Fragment>

						<RenderSettingControl id="aeopr_postgrid_selectedPages">
							<div className="components-base-control select2-page">
								<div className="components-base-control__field">
									<label className="components-base-control__label" htmlFor="inspector-select-control">{ __( 'Pages To Show', 'aeopr') }</label>
									<Select
										options={ pageOptions }
										value={ attributes.selectedPages }
										onChange={ ( value ) =>
											this.props.setAttributes( {
												selectedPages: value,
											} )
										}
										isMulti={ true }
										closeMenuOnSelect={ false }
									/>
								</div>
							</div>
						</RenderSettingControl>
						<RenderSettingControl id="aeopr_postgrid_queryControls">
							<QueryControls
								{ ...{ order, orderBy } }
								numberOfItems={ attributes.postsToShow }
								categoriesList={ categoriesList }
								selectedCategoryId={ attributes.categories }
								onOrderChange={ ( value ) => setAttributes({ order: value }) }
								onOrderByChange={ ( value ) => setAttributes({ orderBy: value }) }
								onCategoryChange={ ( value ) => setAttributes({ categories: '' !== value ? value : undefined }) }
								onNumberOfItemsChange={ ( value ) => setAttributes({ postsToShow: value }) }
							/>
						</RenderSettingControl>
						<RenderSettingControl id="aeopr_postgrid_offset">
							<RangeControl
								label={ __( 'Number of items to offset', 'aeopr' ) }
								value={ attributes.offset }
								onChange={ ( value ) => setAttributes({ offset: value }) }
								min={ 0 }
								max={ 20 }
							/>
						</RenderSettingControl>
					</Fragment>
					}
					{ 'grid' === attributes.postLayout && (
						<RenderSettingControl id="aeopr_postgrid_columns">
							<RangeControl
								label={ __( 'Columns', 'aeopr' ) }
								value={ attributes.columns }
								onChange={ ( value ) =>
									setAttributes( { columns: value } )
								}
								min={ 1 }
								max={ MAX_POSTS_COLUMNS
									/*! hasPosts
										? MAX_POSTS_COLUMNS
										: Math.min(
												MAX_POSTS_COLUMNS,
												latestPosts.length
										  )*/
								}
							/>
						</RenderSettingControl>
					) }
				</PanelBody>
				<PanelBody
					title={ __(
						'Post and Page Grid Content',
						'aeopr'
					) }
					initialOpen={ false }
				>
					<RenderSettingControl id="aeopr_postgrid_displaySectionTitle">
						<ToggleControl
							label={ __(
								'Display Section Title',
								'aeopr'
							) }
							checked={ attributes.displaySectionTitle }
							onChange={ () =>
								this.props.setAttributes( {
									displaySectionTitle: ! attributes.displaySectionTitle,
								} )
							}
						/>
					</RenderSettingControl>
					{ attributes.displaySectionTitle && (
						<RenderSettingControl id="aeopr_postgrid_sectionTitle">
							<TextControl
								label={ __( 'Section Title', 'aeopr' ) }
								type="text"
								value={ attributes.sectionTitle }
								onChange={ ( value ) =>
									this.props.setAttributes( {
										sectionTitle: value,
									} )
								}
							/>
						</RenderSettingControl>
					) }
					<RenderSettingControl id="aeopr_postgrid_displayPostImage">
						<ToggleControl
							label={ __(
								'Display Featured Image',
								'aeopr'
							) }
							checked={ attributes.displayPostImage }
							onChange={ () =>
								this.props.setAttributes( {
									displayPostImage: ! attributes.displayPostImage,
								} )
							}
						/>
					</RenderSettingControl>
					{ attributes.displayPostImage && (
						<RenderSettingControl id="aeopr_postgrid_imageSizeValue">
							<SelectControl
								label={ __( 'Image Size', 'aeopr' ) }
								value={ imageSizeValue() }
								options={ imageSizeOptions }
								onChange={ ( value ) =>
									this.props.setAttributes( {
										imageSize: value,
									} )
								}
							/>
						</RenderSettingControl>
					) }
					<RenderSettingControl id="aeopr_postgrid_displayPostTitle">
						<ToggleControl
							label={ __( 'Display Title', 'aeopr' ) }
							checked={ attributes.displayPostTitle }
							onChange={ () =>
								this.props.setAttributes( {
									displayPostTitle: ! attributes.displayPostTitle,
								} )
							}
						/>
					</RenderSettingControl>
					{ isPost && (
						<RenderSettingControl id="aeopr_postgrid_displayPostAuthor">
							<ToggleControl
								label={ __(
									'Display Author',
									'aeopr'
								) }
								checked={ attributes.displayPostAuthor }
								onChange={ () =>
									this.props.setAttributes( {
										displayPostAuthor: ! attributes.displayPostAuthor,
									} )
								}
							/>
						</RenderSettingControl>
					) }
					{ isPost && (
						<RenderSettingControl id="aeopr_postgrid_displayPostDate">
							<ToggleControl
								label={ __( 'Display Date', 'aeopr' ) }
								checked={ attributes.displayPostDate }
								onChange={ () =>
									this.props.setAttributes( {
										displayPostDate: ! attributes.displayPostDate,
									} )
								}
							/>
						</RenderSettingControl>
					) }
					<RenderSettingControl id="aeopr_postgrid_displayPostExcerpt">
						<ToggleControl
							label={ __( 'Display Excerpt', 'aeopr' ) }
							checked={ attributes.displayPostExcerpt }
							onChange={ () =>
								this.props.setAttributes( {
									displayPostExcerpt: ! attributes.displayPostExcerpt,
								} )
							}
						/>
					</RenderSettingControl>
					{ attributes.displayPostExcerpt && (
						<RenderSettingControl id="aeopr_postgrid_excerptLength">
							<RangeControl
								label={ __(
									'Excerpt Length',
									'aeopr'
								) }
								value={ attributes.excerptLength }
								onChange={ ( value ) =>
									setAttributes( { excerptLength: value } )
								}
								min={ 0 }
								max={ 150 }
							/>
						</RenderSettingControl>
					) }
					<RenderSettingControl id="aeopr_postgrid_displayPostLink">
						<ToggleControl
							label={ __(
								'Display Continue Reading Link',
								'aeopr'
							) }
							checked={ attributes.displayPostLink }
							onChange={ () =>
								this.props.setAttributes( {
									displayPostLink: ! attributes.displayPostLink,
								} )
							}
						/>
					</RenderSettingControl>
					{ attributes.displayPostLink && (
						<RenderSettingControl id="aeopr_postgrid_readMoreText">
							<TextControl
								label={ __(
									'Customize Continue Reading Text',
									'aeopr'
								) }
								type="text"
								value={ attributes.readMoreText }
								onChange={ ( value ) =>
									this.props.setAttributes( {
										readMoreText: value,
									} )
								}
							/>
						</RenderSettingControl>
					) }
				</PanelBody>
				<PanelBody
					title={ __( 'Post and Page Grid Markup', 'aeopr' ) }
					initialOpen={ false }
					className="aeopr-block-post-grid-markup-settings"
				>
					<RenderSettingControl id="aeopr_postgrid_sectionTag">
						<SelectControl
							label={ __(
								'Post Grid Section Tag',
								'aeopr'
							) }
							options={ sectionTags }
							value={ attributes.sectionTag }
							onChange={ ( value ) =>
								this.props.setAttributes( {
									sectionTag: value,
								} )
							}
							help={ __(
								'Change the post grid section tag to match your content hierarchy.',
								'aeopr'
							) }
						/>
					</RenderSettingControl>
					{ attributes.sectionTitle && (
						<RenderSettingControl id="aeopr_postgrid_sectionTitleTag">
							<SelectControl
								label={ __(
									'Section Title Heading Tag',
									'aeopr'
								) }
								options={ sectionTitleTags }
								value={ attributes.sectionTitleTag }
								onChange={ ( value ) =>
									this.props.setAttributes( {
										sectionTitleTag: value,
									} )
								}
								help={ __(
									'Change the post/page section title tag to match your content hierarchy.',
									'aeopr'
								) }
							/>
						</RenderSettingControl>
					) }
					{ attributes.displayPostTitle && (
						<RenderSettingControl id="aeopr_postgrid_postTitleTag">
							<SelectControl
								label={ __(
									'Post Title Heading Tag',
									'aeopr'
								) }
								options={ sectionTitleTags }
								value={ attributes.postTitleTag }
								onChange={ ( value ) =>
									this.props.setAttributes( {
										postTitleTag: value,
									} )
								}
								help={ __(
									'Change the post/page title tag to match your content hierarchy.',
									'aeopr'
								) }
							/>
						</RenderSettingControl>
					) }
				</PanelBody>
			</InspectorControls>
		);
	}
}
