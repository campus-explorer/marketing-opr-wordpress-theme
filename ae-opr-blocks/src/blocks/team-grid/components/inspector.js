/**
 * Inspector Controls
 */

///add url field for LInkOut True
// Setup the block
const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;

import compact from 'lodash/compact';
import map from 'lodash/map';
import RenderSettingControl from 'Src/utils/components/settings/renderSettingControl';
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



const MAX_POSTS_COLUMNS = 4;

/**
 * Create an Inspector Controls wrapper Component
 */
export default class Inspector extends Component {


	render() {

		// Setup the attributes
		const { attributes, setAttributes, teamList } = this.props;

		const { order, orderBy } = attributes;
		
		
		// Section title tags
		const sectionTags = [
			{ value: 'div', label: __( 'div', 'archer' ) },
			{ value: 'section', label: __( 'section', 'archer' ) },
			{ value: 'article', label: __( 'article', 'archer' ) },
		];

		// Section title tags
		const sectionTitleTags = [
			{ value: 'h3', label: __( 'H3', 'archer' ) },
			{ value: 'h4', label: __( 'H4', 'archer' ) },
		];

		// Check for posts
		const hasPosts = teamList && Array.isArray( teamList ) && teamList.length;


		return (
			<InspectorControls>
				<PanelBody
					title={ __(
						'Team Grid Settings',
						'archer'
					) }
				>

					{ 'grid' === attributes.postLayout && (
						<RenderSettingControl id="archer_teamgrid_columns">
							<RangeControl
								label={ __( 'Columns', 'archer' ) }
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
						'Team Grid Content',
						'archer'
					) }
					initialOpen={ false }
				>
				<RenderSettingControl id="archer_teamgrid_sectionTitle">
					<TextControl
						label={ __( 'Section Title', 'archer' ) }
						type="text"
						value={ attributes.sectionTitle }
						onChange={ ( value ) =>
							this.props.setAttributes( {
								sectionTitle: value,
							} )
						}
					/>
				</RenderSettingControl>
									
				
				

				</PanelBody>
				<PanelBody
					title={ __( 'Team Grid Markup', 'archer' ) }
					initialOpen={ false }
					className="archer-block-teamgrid-markup-settings"
				>
					<RenderSettingControl id="archer_teamgrid_sectionTag">
						<SelectControl
							label={ __(
								'Post Grid Section Tag',
								'archer'
							) }
							options={ sectionTags }
							value={ attributes.sectionTag }
							onChange={ ( value ) =>
								this.props.setAttributes( {
									sectionTag: value,
								} )
							}
							help={ __(
								'Change the team grid section tag to match your content hierarchy.',
								'archer'
							) }
						/>
					</RenderSettingControl>
					{ attributes.sectionTitle && (
						<RenderSettingControl id="archer_teamgrid_sectionTitleTag">
							<SelectControl
								label={ __(
									'Section Title Heading Tag',
									'archer'
								) }
								options={ sectionTitleTags }
								value={ attributes.sectionTitleTag }
								onChange={ ( value ) =>
									this.props.setAttributes( {
										sectionTitleTag: value,
									} )
								}
								help={ __(
									'Change the team section title tag to match your content hierarchy.',
									'archer'
								) }
							/>
						</RenderSettingControl>
					) }
						<RenderSettingControl id="archer_teamgrid_postTitleTag">
							<SelectControl
								label={ __(
									'Team Title Heading Tag',
									'archer'
								) }
								options={ sectionTitleTags }
								value={ attributes.postTitleTag }
								onChange={ ( value ) =>
									this.props.setAttributes( {
										postTitleTag: value,
									} )
								}
								help={ __(
									'Change the team title tag to match your content hierarchy.',
									'archer'
								) }
							/>
						</RenderSettingControl>

				</PanelBody>
			</InspectorControls>
		);
	}
}
